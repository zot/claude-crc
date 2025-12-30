/**
 * LocalStorage implementation of contact repository
 * CRC: crc-LocalStorageContactRepository.md
 * Spec: main.md
 * Sequences: seq-create-contact.md, seq-edit-contact.md, seq-delete-contact.md, seq-load-contacts.md
 */

import { Contact } from '../models/Contact';
import { IContactRepository } from './IContactRepository';

export const STORAGE_KEY = 'contacts';

interface StoredContact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  notes?: string;
  created: string;
  modified: string;
}

export class LocalStorageContactRepository implements IContactRepository {
  private storage: Storage;

  constructor(storage: Storage = localStorage) {
    this.storage = storage;
  }

  async save(contact: Contact): Promise<void> {
    const contacts = await this.findAll();
    const index = contacts.findIndex((c) => c.id === contact.id);
    if (index >= 0) {
      contacts[index] = contact;
    } else {
      contacts.push(contact);
    }
    await this.saveAll(contacts);
  }

  async saveAll(contacts: Contact[]): Promise<void> {
    try {
      const serialized = JSON.stringify(contacts.map(this.serialize));
      this.storage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
      this.handleStorageError(error);
    }
  }

  async findById(id: string): Promise<Contact | undefined> {
    const contacts = await this.findAll();
    return contacts.find((c) => c.id === id);
  }

  async findAll(): Promise<Contact[]> {
    try {
      const serialized = this.storage.getItem(STORAGE_KEY);
      if (!serialized) {
        return [];
      }
      const stored: StoredContact[] = JSON.parse(serialized);
      return stored.map(this.deserialize).filter((c): c is Contact => c !== null);
    } catch (error) {
      console.error('Error loading contacts:', error);
      return [];
    }
  }

  async delete(id: string): Promise<void> {
    const contacts = await this.findAll();
    const filtered = contacts.filter((c) => c.id !== id);
    await this.saveAll(filtered);
  }

  async clear(): Promise<void> {
    this.storage.removeItem(STORAGE_KEY);
  }

  private serialize(contact: Contact): StoredContact {
    return {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      notes: contact.notes,
      created: contact.created.toISOString(),
      modified: contact.modified.toISOString(),
    };
  }

  private deserialize(stored: StoredContact): Contact | null {
    try {
      if (!stored.id || !stored.name || !stored.created || !stored.modified) {
        return null;
      }
      return {
        id: stored.id,
        name: stored.name,
        email: stored.email || undefined,
        phone: stored.phone || undefined,
        notes: stored.notes || undefined,
        created: new Date(stored.created),
        modified: new Date(stored.modified),
      };
    } catch {
      return null;
    }
  }

  private handleStorageError(error: unknown): void {
    if (error instanceof DOMException) {
      if (error.name === 'QuotaExceededError') {
        throw new Error('Storage quota exceeded. Please delete some contacts.');
      }
      if (error.name === 'SecurityError') {
        throw new Error('Storage access denied. Please enable cookies/storage.');
      }
    }
    throw error;
  }
}
