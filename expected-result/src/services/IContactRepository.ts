/**
 * Contact repository interface
 * CRC: crc-IContactRepository.md
 * Spec: main.md, coding-standards.md
 */

import { Contact } from '../models/Contact';

export interface IContactRepository {
  save(contact: Contact): Promise<void>;
  saveAll(contacts: Contact[]): Promise<void>;
  findById(id: string): Promise<Contact | undefined>;
  findAll(): Promise<Contact[]>;
  delete(id: string): Promise<void>;
  clear(): Promise<void>;
}
