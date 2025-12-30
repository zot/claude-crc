/**
 * ContactService tests
 * Test Design: test-ContactService.md
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ContactService, ValidationError } from '../src/services/ContactService';
import { IContactRepository } from '../src/services/IContactRepository';
import { Contact } from '../src/models/Contact';

const createMockRepository = (): IContactRepository => ({
  save: vi.fn().mockResolvedValue(undefined),
  saveAll: vi.fn().mockResolvedValue(undefined),
  findById: vi.fn().mockResolvedValue(undefined),
  findAll: vi.fn().mockResolvedValue([]),
  delete: vi.fn().mockResolvedValue(undefined),
  clear: vi.fn().mockResolvedValue(undefined),
});

const createTestContact = (overrides: Partial<Contact> = {}): Contact => ({
  id: 'test-id-123',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  notes: 'Test notes',
  created: new Date('2024-01-01'),
  modified: new Date('2024-01-01'),
  ...overrides,
});

describe('ContactService', () => {
  let service: ContactService;
  let mockRepo: IContactRepository;

  beforeEach(() => {
    mockRepo = createMockRepository();
    service = new ContactService(mockRepo);
  });

  describe('createContact', () => {
    it('TC-1: should create contact with valid data', async () => {
      const data = { name: 'John Doe', email: 'john@example.com' };

      const result = await service.createContact(data);

      expect(result.id).toBeDefined();
      expect(result.name).toBe('John Doe');
      expect(result.email).toBe('john@example.com');
      expect(result.created).toBeInstanceOf(Date);
      expect(result.modified).toBeInstanceOf(Date);
      expect(mockRepo.save).toHaveBeenCalledWith(expect.objectContaining({ name: 'John Doe' }));
    });

    it('TC-2: should throw ValidationError for invalid data', async () => {
      const data = { name: '' };

      await expect(service.createContact(data)).rejects.toThrow(ValidationError);
      expect(mockRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('updateContact', () => {
    it('TC-3: should update contact with valid data', async () => {
      const existing = createTestContact();
      vi.mocked(mockRepo.findById).mockResolvedValue(existing);

      const data = { name: 'Jane Doe', email: 'jane@example.com' };
      const result = await service.updateContact('test-id-123', data);

      expect(result.name).toBe('Jane Doe');
      expect(result.email).toBe('jane@example.com');
      expect(result.created).toEqual(existing.created); // unchanged
      expect(result.modified.getTime()).toBeGreaterThan(existing.modified.getTime());
      expect(mockRepo.save).toHaveBeenCalled();
    });

    it('TC-4: should throw error for non-existent contact', async () => {
      vi.mocked(mockRepo.findById).mockResolvedValue(undefined);

      await expect(service.updateContact('non-existent', { name: 'Test' }))
        .rejects.toThrow('Contact not found');
      expect(mockRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('deleteContact', () => {
    it('TC-5: should delete existing contact', async () => {
      vi.mocked(mockRepo.findById).mockResolvedValue(createTestContact());

      await service.deleteContact('test-id-123');

      expect(mockRepo.delete).toHaveBeenCalledWith('test-id-123');
    });

    it('TC-6: should throw error for non-existent contact', async () => {
      vi.mocked(mockRepo.findById).mockResolvedValue(undefined);

      await expect(service.deleteContact('non-existent'))
        .rejects.toThrow('Contact not found');
      expect(mockRepo.delete).not.toHaveBeenCalled();
    });
  });

  describe('getContact', () => {
    it('TC-7: should return contact by ID', async () => {
      const contact = createTestContact();
      vi.mocked(mockRepo.findById).mockResolvedValue(contact);

      const result = await service.getContact('test-id-123');

      expect(result).toEqual(contact);
      expect(mockRepo.findById).toHaveBeenCalledWith('test-id-123');
    });

    it('TC-8: should return undefined for non-existent contact', async () => {
      vi.mocked(mockRepo.findById).mockResolvedValue(undefined);

      const result = await service.getContact('non-existent');

      expect(result).toBeUndefined();
    });
  });

  describe('getAllContacts', () => {
    it('TC-9: should return all contacts sorted by name', async () => {
      const contacts = [
        createTestContact({ id: '1', name: 'Zoe' }),
        createTestContact({ id: '2', name: 'Alice' }),
        createTestContact({ id: '3', name: 'Bob' }),
      ];
      vi.mocked(mockRepo.findAll).mockResolvedValue(contacts);

      const result = await service.getAllContacts();

      expect(result[0].name).toBe('Alice');
      expect(result[1].name).toBe('Bob');
      expect(result[2].name).toBe('Zoe');
    });

    it('TC-10: should return empty array when no contacts', async () => {
      vi.mocked(mockRepo.findAll).mockResolvedValue([]);

      const result = await service.getAllContacts();

      expect(result).toEqual([]);
    });
  });

  describe('ID generation', () => {
    it('TC-11: should generate unique UUIDs', async () => {
      const ids = new Set<string>();

      for (let i = 0; i < 10; i++) {
        const contact = await service.createContact({ name: `Test ${i}` });
        ids.add(contact.id);
      }

      expect(ids.size).toBe(10); // All IDs unique
    });
  });
});
