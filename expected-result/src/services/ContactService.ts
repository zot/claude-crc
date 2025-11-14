/**
 * CRC: crc-ContactService.md
 * Spec: main.md (FR2: Create, FR3: List, FR4: Edit, FR5: Delete)
 * Sequences: seq-create-contact.md, seq-edit-contact.md, seq-delete-contact.md, seq-load-contacts.md
 */

import { Contact } from '../models/Contact';
import { ContactValidator } from '../utils/ContactValidator';
import { ContactStorage } from './ContactStorage';

/**
 * CRC: crc-ContactService.md
 * Business logic coordinator (facade pattern)
 */
export class ContactService {
  /**
   * CRC: crc-ContactService.md - "Knows: storage"
   */
  private storage: ContactStorage;

  constructor(storage?: ContactStorage) {
    this.storage = storage || ContactStorage.getInstance();
  }

  /**
   * CRC: crc-ContactService.md - "Does: createContact()"
   * Sequence: seq-create-contact.md
   * Creates new contact with validation
   */
  async createContact(
    name: string,
    email?: string,
    phone?: string,
    notes?: string
  ): Promise<Contact> {
    // Generate unique ID
    const id = this.generateId();
    const now = new Date();

    // Create contact object
    const contact = new Contact(id, name, email, phone, notes, now, now);

    // Validate
    const validation = ContactValidator.validateContact(contact);
    if (!validation.isValid) {
      const errorMessages = Array.from(validation.errors.values()).join(', ');
      throw new Error(`Validation failed: ${errorMessages}`);
    }

    // Persist
    await this.storage.saveContact(contact);

    return contact;
  }

  /**
   * CRC: crc-ContactService.md - "Does: updateContact()"
   * Sequence: seq-edit-contact.md
   * Updates existing contact with validation
   */
  async updateContact(
    id: string,
    updates: Partial<Omit<Contact, 'id' | 'created'>>
  ): Promise<Contact> {
    // Retrieve existing contact
    const existing = await this.storage.getContact(id);
    if (!existing) {
      throw new Error(`Contact not found: ${id}`);
    }

    // Create updated contact
    const updated = new Contact(
      existing.id,
      updates.name !== undefined ? updates.name : existing.name,
      updates.email !== undefined ? updates.email : existing.email,
      updates.phone !== undefined ? updates.phone : existing.phone,
      updates.notes !== undefined ? updates.notes : existing.notes,
      existing.created,
      new Date() // Update modified timestamp
    );

    // Validate
    const validation = ContactValidator.validateContact(updated);
    if (!validation.isValid) {
      const errorMessages = Array.from(validation.errors.values()).join(', ');
      throw new Error(`Validation failed: ${errorMessages}`);
    }

    // Persist
    await this.storage.saveContact(updated);

    return updated;
  }

  /**
   * CRC: crc-ContactService.md - "Does: deleteContact()"
   * Sequence: seq-delete-contact.md
   * Deletes contact
   */
  async deleteContact(id: string): Promise<void> {
    await this.storage.deleteContact(id);
  }

  /**
   * CRC: crc-ContactService.md - "Does: getContact()"
   * Retrieves single contact
   */
  async getContact(id: string): Promise<Contact | null> {
    return await this.storage.getContact(id);
  }

  /**
   * CRC: crc-ContactService.md - "Does: getAllContacts()"
   * Sequence: seq-load-contacts.md
   * Retrieves all contacts sorted by name
   */
  async getAllContacts(): Promise<Contact[]> {
    const contacts = await this.storage.getAllContacts();

    // Sort alphabetically by name (case-insensitive)
    return contacts.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
  }

  /**
   * CRC: crc-ContactService.md - "Does: generateId()"
   * Generates unique UUID for new contacts
   */
  generateId(): string {
    return Contact.generateId();
  }

  /**
   * Initialize storage (to be called on app startup)
   */
  async initialize(): Promise<void> {
    await this.storage.initialize();
  }
}
