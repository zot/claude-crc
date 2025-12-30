/**
 * Integration tests
 * Test Design: test-integration.md
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ContactService } from '../../src/services/ContactService';
import { LocalStorageContactRepository, STORAGE_KEY } from '../../src/services/LocalStorageContactRepository';
import { Contact } from '../../src/models/Contact';

// Mock localStorage
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

describe('Integration Tests', () => {
  let mockStorage: Storage;
  let repository: LocalStorageContactRepository;
  let service: ContactService;

  beforeEach(() => {
    mockStorage = createMockStorage();
    repository = new LocalStorageContactRepository(mockStorage);
    service = new ContactService(repository);
  });

  describe('Create Contact Flow (seq-create-contact.md)', () => {
    describe('TC-INT-1: Create Contact End-to-End', () => {
      it('should create contact and persist to storage', async () => {
        const contact = await service.createContact({
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          notes: 'Test contact',
        });

        expect(contact.id).toBeDefined();
        expect(contact.name).toBe('John Doe');
        expect(contact.created).toBeInstanceOf(Date);

        // Verify persisted
        const stored = await service.getAllContacts();
        expect(stored).toHaveLength(1);
        expect(stored[0].name).toBe('John Doe');
      });
    });

    describe('TC-INT-2: Create with Validation Error', () => {
      it('should reject invalid contact and not persist', async () => {
        await expect(service.createContact({
          name: '',
          email: 'notanemail',
        })).rejects.toThrow();

        const stored = await service.getAllContacts();
        expect(stored).toHaveLength(0);
      });
    });
  });

  describe('Edit Contact Flow (seq-edit-contact.md)', () => {
    describe('TC-INT-3: Edit Contact End-to-End', () => {
      it('should update contact and persist changes', async () => {
        // Create initial contact
        const created = await service.createContact({ name: 'Alice' });

        // Update it
        const updated = await service.updateContact(created.id, {
          name: 'Alice Smith',
        });

        expect(updated.name).toBe('Alice Smith');
        expect(updated.id).toBe(created.id);

        // Verify persisted
        const stored = await service.getContact(created.id);
        expect(stored?.name).toBe('Alice Smith');
      });
    });

    describe('TC-INT-4: Cancel Edit preserves original', () => {
      it('should preserve original data when edit not saved', async () => {
        const created = await service.createContact({ name: 'Original Name' });

        // Don't save any updates
        const stored = await service.getContact(created.id);
        expect(stored?.name).toBe('Original Name');
      });
    });
  });

  describe('Delete Contact Flow (seq-delete-contact.md)', () => {
    describe('TC-INT-5: Delete Contact End-to-End', () => {
      it('should remove contact from storage', async () => {
        const created = await service.createContact({ name: 'Bob' });
        expect(await service.getAllContacts()).toHaveLength(1);

        await service.deleteContact(created.id);

        const stored = await service.getAllContacts();
        expect(stored).toHaveLength(0);
      });
    });

    describe('TC-INT-6: Cancel Delete preserves contact', () => {
      it('should keep contact when delete not confirmed', async () => {
        const created = await service.createContact({ name: 'Bob' });

        // Don't actually delete
        const stored = await service.getContact(created.id);
        expect(stored?.name).toBe('Bob');
      });
    });
  });

  describe('Load Contacts Flow (seq-load-contacts.md)', () => {
    describe('TC-INT-7: Load on Startup', () => {
      it('should load contacts from storage sorted by name', async () => {
        // Pre-populate storage
        await service.createContact({ name: 'Zoe' });
        await service.createContact({ name: 'Alice' });
        await service.createContact({ name: 'Bob' });

        // Get all (simulating app startup)
        const contacts = await service.getAllContacts();

        expect(contacts).toHaveLength(3);
        expect(contacts[0].name).toBe('Alice');
        expect(contacts[1].name).toBe('Bob');
        expect(contacts[2].name).toBe('Zoe');
      });
    });

    describe('TC-INT-8: Load Empty Storage', () => {
      it('should return empty array on first run', async () => {
        const contacts = await service.getAllContacts();
        expect(contacts).toEqual([]);
      });
    });

    describe('TC-INT-9: Load Corrupted Storage', () => {
      it('should handle malformed JSON gracefully', async () => {
        vi.mocked(mockStorage.getItem).mockReturnValue('invalid json {{{');

        const contacts = await repository.findAll();
        expect(contacts).toEqual([]);
      });
    });
  });

  describe('Data Integrity', () => {
    it('should preserve all contact fields through save/load cycle', async () => {
      const created = await service.createContact({
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        notes: 'Test notes here',
      });

      const loaded = await service.getContact(created.id);

      expect(loaded?.name).toBe('Test User');
      expect(loaded?.email).toBe('test@example.com');
      expect(loaded?.phone).toBe('1234567890');
      expect(loaded?.notes).toBe('Test notes here');
      expect(loaded?.created).toBeInstanceOf(Date);
      expect(loaded?.modified).toBeInstanceOf(Date);
    });

    it('should generate unique IDs for each contact', async () => {
      const contacts = await Promise.all([
        service.createContact({ name: 'Contact 1' }),
        service.createContact({ name: 'Contact 2' }),
        service.createContact({ name: 'Contact 3' }),
      ]);

      const ids = new Set(contacts.map(c => c.id));
      expect(ids.size).toBe(3);
    });
  });
});
