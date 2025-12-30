/**
 * Contact model tests
 * Test Design: test-Contact.md
 */

import { describe, it, expect } from 'vitest';
import { Contact, ContactData, createContact, updateContact } from '../src/models/Contact';

describe('Contact', () => {
  describe('TC-1: Contact Structure', () => {
    it('should have all required fields with correct types', () => {
      const contact: Contact = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        notes: 'Test notes',
        created: new Date('2024-01-01'),
        modified: new Date('2024-01-02'),
      };

      expect(typeof contact.id).toBe('string');
      expect(typeof contact.name).toBe('string');
      expect(typeof contact.email).toBe('string');
      expect(typeof contact.phone).toBe('string');
      expect(typeof contact.notes).toBe('string');
      expect(contact.created).toBeInstanceOf(Date);
      expect(contact.modified).toBeInstanceOf(Date);
    });
  });

  describe('TC-2: Required vs Optional Fields', () => {
    it('should allow undefined for optional fields', () => {
      const contact: Contact = {
        id: 'test-id',
        name: 'John Doe',
        email: undefined,
        phone: undefined,
        notes: undefined,
        created: new Date(),
        modified: new Date(),
      };

      expect(contact.email).toBeUndefined();
      expect(contact.phone).toBeUndefined();
      expect(contact.notes).toBeUndefined();
    });

    it('should create contact with only required fields via createContact', () => {
      const data: ContactData = { name: 'Jane Doe' };
      const now = new Date();
      const contact = createContact('test-id', data, now, now);

      expect(contact.id).toBe('test-id');
      expect(contact.name).toBe('Jane Doe');
      expect(contact.email).toBeUndefined();
      expect(contact.phone).toBeUndefined();
      expect(contact.notes).toBeUndefined();
    });
  });

  describe('TC-3: Immutability', () => {
    it('should create new object when updating contact', () => {
      const original: Contact = {
        id: 'test-id',
        name: 'John Doe',
        email: 'john@example.com',
        phone: undefined,
        notes: undefined,
        created: new Date('2024-01-01'),
        modified: new Date('2024-01-01'),
      };

      const updated = updateContact(original, {
        name: 'Jane Doe',
        email: 'jane@example.com',
      });

      // Original unchanged
      expect(original.name).toBe('John Doe');
      expect(original.email).toBe('john@example.com');

      // New object created with updates
      expect(updated.name).toBe('Jane Doe');
      expect(updated.email).toBe('jane@example.com');
      expect(updated).not.toBe(original);

      // Preserved fields
      expect(updated.id).toBe(original.id);
      expect(updated.created).toEqual(original.created);
    });

    it('should update modified timestamp when updating', () => {
      const original: Contact = {
        id: 'test-id',
        name: 'John Doe',
        email: undefined,
        phone: undefined,
        notes: undefined,
        created: new Date('2024-01-01'),
        modified: new Date('2024-01-01'),
      };

      const updated = updateContact(original, { name: 'Jane Doe' });

      expect(updated.modified.getTime()).toBeGreaterThan(original.modified.getTime());
    });
  });
});
