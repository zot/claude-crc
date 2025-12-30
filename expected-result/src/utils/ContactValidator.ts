/**
 * Contact validation logic
 * CRC: crc-ContactValidator.md
 * Spec: main.md, coding-standards.md
 * Sequences: seq-create-contact.md, seq-edit-contact.md
 */

import { ContactData } from '../models/Contact';

export const NAME_MIN_LENGTH = 1;
export const NAME_MAX_LENGTH = 100;
export const PHONE_MIN_LENGTH = 10;
export const PHONE_MAX_LENGTH = 20;
export const NOTES_MAX_LENGTH = 500;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export function validateName(name: string | undefined): ValidationError | null {
  if (!name || name.trim().length === 0) {
    return { field: 'name', message: 'Name is required' };
  }
  if (name.length < NAME_MIN_LENGTH) {
    return { field: 'name', message: `Name must be at least ${NAME_MIN_LENGTH} character` };
  }
  if (name.length > NAME_MAX_LENGTH) {
    return { field: 'name', message: `Name must be at most ${NAME_MAX_LENGTH} characters` };
  }
  return null;
}

export function validateEmail(email: string | undefined): ValidationError | null {
  if (!email || email.trim().length === 0) {
    return null; // Email is optional
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { field: 'email', message: 'Email must be a valid email address' };
  }
  return null;
}

export function validatePhone(phone: string | undefined): ValidationError | null {
  if (!phone || phone.trim().length === 0) {
    return null; // Phone is optional
  }
  if (phone.length < PHONE_MIN_LENGTH) {
    return { field: 'phone', message: `Phone must be at least ${PHONE_MIN_LENGTH} characters` };
  }
  if (phone.length > PHONE_MAX_LENGTH) {
    return { field: 'phone', message: `Phone must be at most ${PHONE_MAX_LENGTH} characters` };
  }
  return null;
}

export function validateNotes(notes: string | undefined): ValidationError | null {
  if (!notes || notes.trim().length === 0) {
    return null; // Notes are optional
  }
  if (notes.length > NOTES_MAX_LENGTH) {
    return { field: 'notes', message: `Notes must be at most ${NOTES_MAX_LENGTH} characters` };
  }
  return null;
}

export function validateContact(data: ContactData): ValidationResult {
  const errors: ValidationError[] = [];

  const nameError = validateName(data.name);
  if (nameError) errors.push(nameError);

  const emailError = validateEmail(data.email);
  if (emailError) errors.push(emailError);

  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.push(phoneError);

  const notesError = validateNotes(data.notes);
  if (notesError) errors.push(notesError);

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function isValid(data: ContactData): boolean {
  return validateContact(data).valid;
}

export function getErrors(data: ContactData): ValidationError[] {
  return validateContact(data).errors;
}
