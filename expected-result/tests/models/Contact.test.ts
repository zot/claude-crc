/**
 * Test Design: test-Contact.md
 * CRC: crc-Contact.md
 * Spec: main.md (FR1: Contact Data Model)
 */

import { describe, it, expect } from 'vitest';
import { Contact } from '../../src/models/Contact';

describe('Contact', () => {
  /**
   * Test Design: test-Contact.md - "Create contact with all fields"
   */
  it('should create contact with all fields', () => {
    const id = 'uuid-123';
    const name = 'John Doe';
    const email = 'john@example.com';
    const phone = '555-1234';
    const notes = 'Test notes';
    const created = new Date('2025-11-14T12:00:00Z');
    const modified = new Date('2025-11-14T12:00:00Z');

    const contact = new Contact(id, name, email, phone, notes, created, modified);

    expect(contact.id).toBe(id);
    expect(contact.name).toBe(name);
    expect(contact.email).toBe(email);
    expect(contact.phone).toBe(phone);
    expect(contact.notes).toBe(notes);
    expect(contact.created).toEqual(created);
    expect(contact.modified).toEqual(modified);
  });

  /**
   * Test Design: test-Contact.md - "Create contact with only required fields"
   */
  it('should create contact with only required fields', () => {
    const id = 'uuid-456';
    const name = 'Jane Smith';
    const created = new Date('2025-11-14T12:00:00Z');
    const modified = new Date('2025-11-14T12:00:00Z');

    const contact = new Contact(id, name, undefined, undefined, undefined, created, modified);

    expect(contact.id).toBe(id);
    expect(contact.name).toBe(name);
    expect(contact.email).toBeUndefined();
    expect(contact.phone).toBeUndefined();
    expect(contact.notes).toBeUndefined();
    expect(contact.created).toEqual(created);
    expect(contact.modified).toEqual(modified);
  });

  /**
   * Test Design: test-Contact.md - "Serialize contact to JSON"
   */
  it('should serialize contact to JSON', () => {
    const contact = new Contact(
      'uuid-789',
      'Test User',
      'test@example.com',
      '555-9999',
      'Some notes'
    );

    const json = contact.toJSON();
    const parsed = JSON.parse(json);

    expect(parsed.id).toBe('uuid-789');
    expect(parsed.name).toBe('Test User');
    expect(parsed.email).toBe('test@example.com');
    expect(parsed.phone).toBe('555-9999');
    expect(parsed.notes).toBe('Some notes');
    expect(parsed.created).toBeDefined();
    expect(parsed.modified).toBeDefined();
  });

  /**
   * Test Design: test-Contact.md - "Deserialize contact from JSON"
   */
  it('should deserialize contact from JSON', () => {
    const json = JSON.stringify({
      id: 'uuid-abc',
      name: 'Alice',
      email: 'alice@example.com',
      phone: '555-1111',
      notes: 'Test',
      created: '2025-11-14T12:00:00.000Z',
      modified: '2025-11-14T12:00:00.000Z',
    });

    const contact = Contact.fromJSON(json);

    expect(contact.id).toBe('uuid-abc');
    expect(contact.name).toBe('Alice');
    expect(contact.email).toBe('alice@example.com');
    expect(contact.phone).toBe('555-1111');
    expect(contact.notes).toBe('Test');
    expect(contact.created).toBeInstanceOf(Date);
    expect(contact.modified).toBeInstanceOf(Date);
  });

  /**
   * Test Design: test-Contact.md - "Deserialize invalid JSON"
   */
  it('should throw error for invalid JSON', () => {
    const invalidJson = 'not valid json{';

    expect(() => Contact.fromJSON(invalidJson)).toThrow('Invalid JSON format');
  });

  /**
   * Test Design: test-Contact.md - "Deserialize JSON missing required field"
   */
  it('should throw error for missing required field', () => {
    const json = JSON.stringify({
      id: 'uuid-def',
      email: 'test@test.com',
    });

    expect(() => Contact.fromJSON(json)).toThrow('Contact data missing required field: name');
  });

  /**
   * Test: Generate unique ID
   */
  it('should generate unique UUID', () => {
    const id1 = Contact.generateId();
    const id2 = Contact.generateId();

    expect(id1).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    expect(id1).not.toBe(id2);
  });
});
