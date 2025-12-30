/**
 * ContactValidator tests
 * Test Design: test-ContactValidator.md
 */

import { describe, it, expect } from 'vitest';
import {
  validateName,
  validateEmail,
  validatePhone,
  validateNotes,
  validateContact,
  isValid,
  NAME_MAX_LENGTH,
  PHONE_MIN_LENGTH,
  PHONE_MAX_LENGTH,
  NOTES_MAX_LENGTH,
} from '../src/utils/ContactValidator';

describe('ContactValidator', () => {
  describe('validateName', () => {
    it('TC-1: should accept valid names', () => {
      expect(validateName('John')).toBeNull();
      expect(validateName('A')).toBeNull();
      expect(validateName('a'.repeat(100))).toBeNull();
    });

    it('TC-2: should reject empty name', () => {
      const error = validateName('');
      expect(error).not.toBeNull();
      expect(error?.field).toBe('name');
      expect(error?.message).toContain('required');
    });

    it('TC-2: should reject undefined name', () => {
      const error = validateName(undefined);
      expect(error).not.toBeNull();
      expect(error?.field).toBe('name');
    });

    it('TC-3: should reject name exceeding 100 characters', () => {
      const error = validateName('a'.repeat(101));
      expect(error).not.toBeNull();
      expect(error?.field).toBe('name');
      expect(error?.message).toContain(`${NAME_MAX_LENGTH}`);
    });
  });

  describe('validateEmail', () => {
    it('TC-4: should accept valid email formats', () => {
      expect(validateEmail('user@example.com')).toBeNull();
      expect(validateEmail('name.last@domain.org')).toBeNull();
      expect(validateEmail('test+filter@mail.co.uk')).toBeNull();
    });

    it('TC-5: should reject invalid email formats', () => {
      expect(validateEmail('notanemail')).not.toBeNull();
      expect(validateEmail('@nodomain')).not.toBeNull();
      expect(validateEmail('no@.com')).not.toBeNull();
      expect(validateEmail('missing@domain')).not.toBeNull();
    });

    it('TC-6: should accept empty email (optional field)', () => {
      expect(validateEmail('')).toBeNull();
      expect(validateEmail(undefined)).toBeNull();
    });
  });

  describe('validatePhone', () => {
    it('TC-7: should accept valid phone numbers', () => {
      expect(validatePhone('1234567890')).toBeNull(); // 10 chars
      expect(validatePhone('12345678901234567890')).toBeNull(); // 20 chars
      expect(validatePhone('+1-555-123-4567')).toBeNull();
    });

    it('TC-8: should reject phone under 10 characters', () => {
      const error = validatePhone('123456789'); // 9 chars
      expect(error).not.toBeNull();
      expect(error?.field).toBe('phone');
      expect(error?.message).toContain(`${PHONE_MIN_LENGTH}`);
    });

    it('TC-9: should reject phone over 20 characters', () => {
      const error = validatePhone('123456789012345678901'); // 21 chars
      expect(error).not.toBeNull();
      expect(error?.field).toBe('phone');
      expect(error?.message).toContain(`${PHONE_MAX_LENGTH}`);
    });

    it('TC-10: should accept empty phone (optional field)', () => {
      expect(validatePhone('')).toBeNull();
      expect(validatePhone(undefined)).toBeNull();
    });
  });

  describe('validateNotes', () => {
    it('TC-11: should accept notes within 500 characters', () => {
      expect(validateNotes('Short note')).toBeNull();
      expect(validateNotes('a'.repeat(500))).toBeNull();
    });

    it('TC-12: should reject notes over 500 characters', () => {
      const error = validateNotes('a'.repeat(501));
      expect(error).not.toBeNull();
      expect(error?.field).toBe('notes');
      expect(error?.message).toContain(`${NOTES_MAX_LENGTH}`);
    });

    it('should accept empty notes (optional field)', () => {
      expect(validateNotes('')).toBeNull();
      expect(validateNotes(undefined)).toBeNull();
    });
  });

  describe('validateContact', () => {
    it('TC-13: should return valid for all valid fields', () => {
      const result = validateContact({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        notes: 'Test notes',
      });
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('TC-14: should return multiple errors for multiple invalid fields', () => {
      const result = validateContact({
        name: '',
        email: 'invalid-email',
        phone: '123', // too short
        notes: 'a'.repeat(501),
      });
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
      expect(result.errors.some((e) => e.field === 'name')).toBe(true);
      expect(result.errors.some((e) => e.field === 'email')).toBe(true);
    });
  });

  describe('isValid', () => {
    it('should return true for valid contact data', () => {
      expect(isValid({ name: 'John' })).toBe(true);
    });

    it('should return false for invalid contact data', () => {
      expect(isValid({ name: '' })).toBe(false);
    });
  });
});
