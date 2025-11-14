/**
 * CRC: crc-ContactValidator.md
 * Spec: main.md (FR2: Create Contact - Validation, FR4: View/Edit Contact - Validation)
 * Sequences: seq-create-contact.md, seq-edit-contact.md
 */

import { Contact, ValidationResult } from '../models/Contact';

/**
 * CRC: crc-ContactValidator.md
 * Field validation logic and error messages
 */
export class ContactValidator {
  /**
   * CRC: crc-ContactValidator.md - "Knows: MAX_NAME_LENGTH"
   */
  static readonly MAX_NAME_LENGTH = 100;

  /**
   * CRC: crc-ContactValidator.md - "Knows: MIN_NAME_LENGTH"
   */
  static readonly MIN_NAME_LENGTH = 1;

  /**
   * CRC: crc-ContactValidator.md - "Knows: MAX_NOTES_LENGTH"
   */
  static readonly MAX_NOTES_LENGTH = 500;

  /**
   * CRC: crc-ContactValidator.md - "Knows: MIN_PHONE_LENGTH"
   */
  static readonly MIN_PHONE_LENGTH = 10;

  /**
   * CRC: crc-ContactValidator.md - "Knows: MAX_PHONE_LENGTH"
   */
  static readonly MAX_PHONE_LENGTH = 20;

  /**
   * CRC: crc-ContactValidator.md - "Does: validateName()"
   * Ensures name is 1-100 characters
   */
  static validateName(name: string | undefined): ValidationResult {
    const errors = new Map<string, string>();

    if (!name || name.trim().length < this.MIN_NAME_LENGTH) {
      errors.set('name', `Name is required (${this.MIN_NAME_LENGTH}-${this.MAX_NAME_LENGTH} characters)`);
    } else if (name.length > this.MAX_NAME_LENGTH) {
      errors.set('name', `Name is required (${this.MIN_NAME_LENGTH}-${this.MAX_NAME_LENGTH} characters)`);
    }

    return {
      isValid: errors.size === 0,
      errors,
    };
  }

  /**
   * CRC: crc-ContactValidator.md - "Does: validateEmail()"
   * Ensures valid email format if provided
   */
  static validateEmail(email: string | undefined): ValidationResult {
    const errors = new Map<string, string>();

    // Optional field - empty/undefined is valid
    if (!email || email.trim().length === 0) {
      return { isValid: true, errors };
    }

    // Simple email regex: name@domain.tld
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.set('email', 'Invalid email format');
    }

    return {
      isValid: errors.size === 0,
      errors,
    };
  }

  /**
   * CRC: crc-ContactValidator.md - "Does: validatePhone()"
   * Ensures valid phone format if provided (10-20 chars)
   */
  static validatePhone(phone: string | undefined): ValidationResult {
    const errors = new Map<string, string>();

    // Optional field - empty/undefined is valid
    if (!phone || phone.trim().length === 0) {
      return { isValid: true, errors };
    }

    // Remove common separators for length check
    const digits = phone.replace(/[\s\-().]/g, '');

    if (digits.length < this.MIN_PHONE_LENGTH || digits.length > this.MAX_PHONE_LENGTH) {
      errors.set('phone', `Phone must be ${this.MIN_PHONE_LENGTH}-${this.MAX_PHONE_LENGTH} characters`);
    }

    return {
      isValid: errors.size === 0,
      errors,
    };
  }

  /**
   * CRC: crc-ContactValidator.md - "Does: validateNotes()"
   * Ensures notes are within 500 characters
   */
  static validateNotes(notes: string | undefined): ValidationResult {
    const errors = new Map<string, string>();

    // Optional field - empty/undefined is valid
    if (!notes || notes.trim().length === 0) {
      return { isValid: true, errors };
    }

    if (notes.length > this.MAX_NOTES_LENGTH) {
      errors.set('notes', `Notes must be ${this.MAX_NOTES_LENGTH} characters or less`);
    }

    return {
      isValid: errors.size === 0,
      errors,
    };
  }

  /**
   * CRC: crc-ContactValidator.md - "Does: validateContact()"
   * Validates entire contact object
   * Collaborator: Contact
   */
  static validateContact(contact: Contact): ValidationResult {
    const allErrors = new Map<string, string>();

    // Validate each field
    const nameResult = this.validateName(contact.name);
    const emailResult = this.validateEmail(contact.email);
    const phoneResult = this.validatePhone(contact.phone);
    const notesResult = this.validateNotes(contact.notes);

    // Merge all errors
    nameResult.errors.forEach((msg, field) => allErrors.set(field, msg));
    emailResult.errors.forEach((msg, field) => allErrors.set(field, msg));
    phoneResult.errors.forEach((msg, field) => allErrors.set(field, msg));
    notesResult.errors.forEach((msg, field) => allErrors.set(field, msg));

    return {
      isValid: allErrors.size === 0,
      errors: allErrors,
    };
  }
}
