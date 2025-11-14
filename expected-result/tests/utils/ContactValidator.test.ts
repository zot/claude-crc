/**
 * Test Design: test-ContactValidator.md
 * CRC: crc-ContactValidator.md
 * Spec: main.md (FR2: Create Contact - Validation, FR4: View/Edit Contact - Validation)
 */

import { describe, it, expect } from 'vitest';
import { ContactValidator } from '../../src/utils/ContactValidator';
import { Contact } from '../../src/models/Contact';

describe('ContactValidator', () => {
  /**
   * Test Design: test-ContactValidator.md - "Validate valid name"
   */
  it('should validate valid names', () => {
    const result1 = ContactValidator.validateName('John Doe');
    expect(result1.isValid).toBe(true);
    expect(result1.errors.size).toBe(0);

    const result2 = ContactValidator.validateName('A');
    expect(result2.isValid).toBe(true);

    const result3 = ContactValidator.validateName('a'.repeat(100));
    expect(result3.isValid).toBe(true);
  });

  /**
   * Test Design: test-ContactValidator.md - "Validate invalid name - too short"
   */
  it('should reject empty name', () => {
    const result = ContactValidator.validateName('');

    expect(result.isValid).toBe(false);
    expect(result.errors.get('name')).toBe('Name is required (1-100 characters)');
  });

  /**
   * Test Design: test-ContactValidator.md - "Validate invalid name - too long"
   */
  it('should reject name too long', () => {
    const result = ContactValidator.validateName('a'.repeat(101));

    expect(result.isValid).toBe(false);
    expect(result.errors.get('name')).toBe('Name is required (1-100 characters)');
  });

  /**
   * Test Design: test-ContactValidator.md - "Validate valid email"
   */
  it('should validate valid email addresses', () => {
    const result1 = ContactValidator.validateEmail('john@example.com');
    expect(result1.isValid).toBe(true);

    const result2 = ContactValidator.validateEmail('user+tag@domain.co.uk');
    expect(result2.isValid).toBe(true);

    // Optional field - undefined is valid
    const result3 = ContactValidator.validateEmail(undefined);
    expect(result3.isValid).toBe(true);
  });

  /**
   * Test Design: test-ContactValidator.md - "Validate invalid email"
   */
  it('should reject invalid email format', () => {
    const result1 = ContactValidator.validateEmail('not-an-email');
    expect(result1.isValid).toBe(false);
    expect(result1.errors.get('email')).toBe('Invalid email format');

    const result2 = ContactValidator.validateEmail('missing@domain');
    expect(result2.isValid).toBe(false);

    const result3 = ContactValidator.validateEmail('@domain.com');
    expect(result3.isValid).toBe(false);
  });

  /**
   * Test Design: test-ContactValidator.md - "Validate valid phone"
   */
  it('should validate valid phone numbers', () => {
    const result1 = ContactValidator.validatePhone('555-123-4567');
    expect(result1.isValid).toBe(true);

    const result2 = ContactValidator.validatePhone('(555) 123-4567');
    expect(result2.isValid).toBe(true);

    // Optional field - undefined is valid
    const result3 = ContactValidator.validatePhone(undefined);
    expect(result3.isValid).toBe(true);
  });

  /**
   * Test Design: test-ContactValidator.md - "Validate invalid phone - too short"
   */
  it('should reject phone too short', () => {
    const result = ContactValidator.validatePhone('123');

    expect(result.isValid).toBe(false);
    expect(result.errors.get('phone')).toBe('Phone must be 10-20 characters');
  });

  /**
   * Test Design: test-ContactValidator.md - "Validate invalid phone - too long"
   */
  it('should reject phone too long', () => {
    const result = ContactValidator.validatePhone('1'.repeat(25));

    expect(result.isValid).toBe(false);
    expect(result.errors.get('phone')).toBe('Phone must be 10-20 characters');
  });

  /**
   * Test Design: test-ContactValidator.md - "Validate valid notes"
   */
  it('should validate valid notes', () => {
    const result1 = ContactValidator.validateNotes('Some notes');
    expect(result1.isValid).toBe(true);

    const result2 = ContactValidator.validateNotes('a'.repeat(500));
    expect(result2.isValid).toBe(true);

    // Optional field - undefined is valid
    const result3 = ContactValidator.validateNotes(undefined);
    expect(result3.isValid).toBe(true);
  });

  /**
   * Test Design: test-ContactValidator.md - "Validate invalid notes - too long"
   */
  it('should reject notes too long', () => {
    const result = ContactValidator.validateNotes('a'.repeat(501));

    expect(result.isValid).toBe(false);
    expect(result.errors.get('notes')).toBe('Notes must be 500 characters or less');
  });

  /**
   * Test Design: test-ContactValidator.md - "Validate entire contact"
   */
  it('should validate entire contact object', () => {
    const validContact = new Contact(
      '123',
      'John Doe',
      'john@example.com',
      '555-123-4567',
      'Some notes'
    );

    const result = ContactValidator.validateContact(validContact);
    expect(result.isValid).toBe(true);
    expect(result.errors.size).toBe(0);
  });

  /**
   * Test Design: test-ContactValidator.md - "Validate contact with multiple errors"
   */
  it('should return all validation errors for contact', () => {
    const invalidContact = new Contact(
      '123',
      '', // Invalid: empty name
      'not-an-email', // Invalid: bad email format
      '123', // Invalid: phone too short
      'a'.repeat(501) // Invalid: notes too long
    );

    const result = ContactValidator.validateContact(invalidContact);
    expect(result.isValid).toBe(false);
    expect(result.errors.size).toBe(4);
    expect(result.errors.has('name')).toBe(true);
    expect(result.errors.has('email')).toBe(true);
    expect(result.errors.has('phone')).toBe(true);
    expect(result.errors.has('notes')).toBe(true);
  });
});
