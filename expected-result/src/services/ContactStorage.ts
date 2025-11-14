/**
 * CRC: crc-ContactStorage.md
 * Spec: main.md (FR6: Data Persistence)
 * Sequences: seq-create-contact.md, seq-edit-contact.md, seq-delete-contact.md, seq-load-contacts.md
 */

import { Contact } from '../models/Contact';

/**
 * CRC: crc-ContactStorage.md
 * LocalStorage persistence with caching and error handling
 */
export class ContactStorage {
  /**
   * CRC: crc-ContactStorage.md - "Knows: STORAGE_KEY"
   */
  private static readonly STORAGE_KEY = 'contacts';

  /**
   * CRC: crc-ContactStorage.md - "Knows: contacts"
   */
  private contacts: Map<string, Contact>;

  private static instance: ContactStorage;

  private constructor() {
    this.contacts = new Map();
  }

  /**
   * Singleton instance getter
   */
  static getInstance(): ContactStorage {
    if (!ContactStorage.instance) {
      ContactStorage.instance = new ContactStorage();
    }
    return ContactStorage.instance;
  }

  /**
   * CRC: crc-ContactStorage.md - "Does: initialize()"
   * Sequence: seq-load-contacts.md
   * Loads contacts from LocalStorage on startup
   */
  async initialize(): Promise<void> {
    try {
      const data = localStorage.getItem(ContactStorage.STORAGE_KEY);

      if (!data) {
        // No existing data - clean start
        this.contacts = new Map();
        return;
      }

      const contactsArray = JSON.parse(data);

      if (!Array.isArray(contactsArray)) {
        throw new Error('Invalid contacts data structure');
      }

      // Deserialize each contact
      this.contacts = new Map();
      for (const contactData of contactsArray) {
        try {
          const contact = Contact.fromJSON(JSON.stringify(contactData));
          this.contacts.set(contact.id, contact);
        } catch (error) {
          console.warn(`Skipping invalid contact during load:`, error);
          // Continue loading other contacts
        }
      }
    } catch (error) {
      this.handleStorageError(error as Error);
      // Initialize with empty map to allow app to continue
      this.contacts = new Map();
    }
  }

  /**
   * CRC: crc-ContactStorage.md - "Does: saveContact()"
   * Sequence: seq-create-contact.md, seq-edit-contact.md
   * Persists contact to LocalStorage
   */
  async saveContact(contact: Contact): Promise<void> {
    try {
      // Update in-memory cache
      this.contacts.set(contact.id, contact);

      // Persist to LocalStorage
      await this.persistAll();
    } catch (error) {
      // Roll back cache on save failure
      this.contacts.delete(contact.id);
      this.handleStorageError(error as Error);
      throw error;
    }
  }

  /**
   * CRC: crc-ContactStorage.md - "Does: getContact()"
   * Retrieves single contact by ID
   */
  async getContact(id: string): Promise<Contact | null> {
    return this.contacts.get(id) || null;
  }

  /**
   * CRC: crc-ContactStorage.md - "Does: getAllContacts()"
   * Sequence: seq-load-contacts.md
   * Retrieves all contacts
   */
  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  /**
   * CRC: crc-ContactStorage.md - "Does: deleteContact()"
   * Sequence: seq-delete-contact.md
   * Removes contact from storage
   */
  async deleteContact(id: string): Promise<void> {
    try {
      const contact = this.contacts.get(id);
      if (!contact) {
        throw new Error(`Contact not found: ${id}`);
      }

      // Remove from cache
      this.contacts.delete(id);

      // Persist to LocalStorage
      await this.persistAll();
    } catch (error) {
      this.handleStorageError(error as Error);
      throw error;
    }
  }

  /**
   * CRC: crc-ContactStorage.md - "Does: handleStorageError()"
   * Handles quota exceeded and access denied errors
   */
  handleStorageError(error: Error): void {
    if (error.name === 'QuotaExceededError') {
      console.error('LocalStorage quota exceeded. Consider clearing old data.');
      alert('Storage is full. Please delete some contacts to free up space.');
    } else if (error.message.includes('access denied')) {
      console.error('LocalStorage access denied. Check browser settings.');
      alert('Cannot access storage. Please check your browser settings.');
    } else {
      console.error('Storage error:', error);
      alert('An error occurred while saving data. Please try again.');
    }
  }

  /**
   * Helper method to persist all contacts to LocalStorage
   */
  private async persistAll(): Promise<void> {
    const contactsArray = Array.from(this.contacts.values()).map(contact => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      notes: contact.notes,
      created: contact.created.toISOString(),
      modified: contact.modified.toISOString(),
    }));

    const json = JSON.stringify(contactsArray);
    localStorage.setItem(ContactStorage.STORAGE_KEY, json);
  }

  /**
   * Clear all contacts (for testing)
   */
  async clear(): Promise<void> {
    this.contacts.clear();
    localStorage.removeItem(ContactStorage.STORAGE_KEY);
  }
}
