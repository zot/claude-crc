/**
 * LocalStorageContactRepository tests
 * Test Design: test-LocalStorageContactRepository.md
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LocalStorageContactRepository, STORAGE_KEY } from '../src/services/LocalStorageContactRepository';
import { Contact } from '../src/models/Contact';

const createTestContact = (overrides: Partial<Contact> = {}): Contact => ({
  id: 'test-id-123',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  notes: 'Test notes',
  created: new Date('2024-01-01T00:00:00.000Z'),
  modified: new Date('2024-01-01T00:00:00.000Z'),
  ...overrides,
});

const createMockStorage = (): Storage => {
  const store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { Object.keys(store).forEach(k => delete store[k]); }),
    length: 0,
    key: vi.fn(() => null),
  };
};

describe('LocalStorageContactRepository', () => {
  let repository: LocalStorageContactRepository;
  let mockStorage: Storage;

  beforeEach(() => {
    mockStorage = createMockStorage();
    repository = new LocalStorageContactRepository(mockStorage);
  });

  describe('save', () => {
    it('TC-1: should serialize and save contact to LocalStorage', async () => {
      const contact = createTestContact();

      await repository.save(contact);

      expect(mockStorage.setItem).toHaveBeenCalled();
      const savedData = vi.mocked(mockStorage.setItem).mock.calls[0][1];
      const parsed = JSON.parse(savedData);
      expect(parsed[0].id).toBe(contact.id);
      expect(parsed[0].name).toBe(contact.name);
      expect(parsed[0].created).toBe(contact.created.toISOString());
    });
  });

  describe('findAll', () => {
    it('TC-2: should retrieve and deserialize all contacts', async () => {
      const contacts = [
        { id: '1', name: 'John', created: '2024-01-01T00:00:00.000Z', modified: '2024-01-01T00:00:00.000Z' },
        { id: '2', name: 'Jane', created: '2024-01-02T00:00:00.000Z', modified: '2024-01-02T00:00:00.000Z' },
      ];
      vi.mocked(mockStorage.getItem).mockReturnValue(JSON.stringify(contacts));

      const result = await repository.findAll();

      expect(result).toHaveLength(2);
      expect(result[0].created).toBeInstanceOf(Date);
      expect(result[1].created).toBeInstanceOf(Date);
    });

    it('TC-3: should return empty array when storage is empty', async () => {
      vi.mocked(mockStorage.getItem).mockReturnValue(null);

      const result = await repository.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findById', () => {
    it('TC-4: should return contact matching ID', async () => {
      const contacts = [
        { id: '1', name: 'John', created: '2024-01-01T00:00:00.000Z', modified: '2024-01-01T00:00:00.000Z' },
        { id: '2', name: 'Jane', created: '2024-01-02T00:00:00.000Z', modified: '2024-01-02T00:00:00.000Z' },
      ];
      vi.mocked(mockStorage.getItem).mockReturnValue(JSON.stringify(contacts));

      const result = await repository.findById('2');

      expect(result?.name).toBe('Jane');
    });

    it('TC-5: should return undefined for non-existent ID', async () => {
      const contacts = [
        { id: '1', name: 'John', created: '2024-01-01T00:00:00.000Z', modified: '2024-01-01T00:00:00.000Z' },
      ];
      vi.mocked(mockStorage.getItem).mockReturnValue(JSON.stringify(contacts));

      const result = await repository.findById('non-existent');

      expect(result).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('TC-6: should remove contact from storage', async () => {
      const contacts = [
        { id: '1', name: 'John', created: '2024-01-01T00:00:00.000Z', modified: '2024-01-01T00:00:00.000Z' },
        { id: '2', name: 'Jane', created: '2024-01-02T00:00:00.000Z', modified: '2024-01-02T00:00:00.000Z' },
      ];
      vi.mocked(mockStorage.getItem).mockReturnValue(JSON.stringify(contacts));

      await repository.delete('1');

      const savedData = vi.mocked(mockStorage.setItem).mock.calls[0][1];
      const parsed = JSON.parse(savedData);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].id).toBe('2');
    });
  });

  describe('clear', () => {
    it('TC-7: should remove all contacts', async () => {
      await repository.clear();

      expect(mockStorage.removeItem).toHaveBeenCalledWith(STORAGE_KEY);
    });
  });

  describe('Date serialization', () => {
    it('TC-8: should preserve Date objects through round-trip', async () => {
      const originalDate = new Date('2024-06-15T12:30:00.000Z');
      const contact = createTestContact({ created: originalDate, modified: originalDate });

      await repository.save(contact);
      const result = await repository.findById(contact.id);

      expect(result?.created).toBeInstanceOf(Date);
      expect(result?.created.getTime()).toBe(originalDate.getTime());
    });
  });

  describe('Error handling', () => {
    it('TC-9: should handle quota exceeded error', async () => {
      const error = new DOMException('Quota exceeded', 'QuotaExceededError');
      vi.mocked(mockStorage.setItem).mockImplementation(() => { throw error; });

      await expect(repository.save(createTestContact()))
        .rejects.toThrow('Storage quota exceeded');
    });

    it('TC-10: should handle security error', async () => {
      const error = new DOMException('Access denied', 'SecurityError');
      vi.mocked(mockStorage.setItem).mockImplementation(() => { throw error; });

      await expect(repository.save(createTestContact()))
        .rejects.toThrow('Storage access denied');
    });

    it('TC-11: should handle corrupted JSON data', async () => {
      vi.mocked(mockStorage.getItem).mockReturnValue('invalid json {{{');

      const result = await repository.findAll();

      expect(result).toEqual([]);
    });
  });
});
