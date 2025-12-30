/**
 * Contact business logic service
 * CRC: crc-ContactService.md
 * Spec: main.md, coding-standards.md
 * Sequences: seq-create-contact.md, seq-edit-contact.md, seq-delete-contact.md, seq-load-contacts.md
 */

import { Contact, ContactData, createContact, updateContact } from '../models/Contact';
import { validateContact, ValidationResult } from '../utils/ContactValidator';
import { IContactRepository } from './IContactRepository';

export class ContactService {
  private repository: IContactRepository;

  constructor(repository: IContactRepository) {
    this.repository = repository;
  }

  async createContact(data: ContactData): Promise<Contact> {
    const validation = validateContact(data);
    if (!validation.valid) {
      throw new ValidationError(validation);
    }

    const id = this.generateId();
    const now = new Date();
    const contact = createContact(id, data, now, now);
    await this.repository.save(contact);
    return contact;
  }

  async updateContact(id: string, data: ContactData): Promise<Contact> {
    const validation = validateContact(data);
    if (!validation.valid) {
      throw new ValidationError(validation);
    }

    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new Error(`Contact not found: ${id}`);
    }

    const updated = updateContact(existing, data);
    await this.repository.save(updated);
    return updated;
  }

  async deleteContact(id: string): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new Error(`Contact not found: ${id}`);
    }
    await this.repository.delete(id);
  }

  async getContact(id: string): Promise<Contact | undefined> {
    return this.repository.findById(id);
  }

  async getAllContacts(): Promise<Contact[]> {
    const contacts = await this.repository.findAll();
    return this.sortContactsByName(contacts);
  }

  private sortContactsByName(contacts: Contact[]): Contact[] {
    return [...contacts].sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
  }

  private generateId(): string {
    return crypto.randomUUID();
  }
}

export class ValidationError extends Error {
  public readonly validation: ValidationResult;

  constructor(validation: ValidationResult) {
    const messages = validation.errors.map((e) => e.message).join(', ');
    super(`Validation failed: ${messages}`);
    this.name = 'ValidationError';
    this.validation = validation;
  }
}
