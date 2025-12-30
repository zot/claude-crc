/**
 * Contact data model
 * CRC: crc-Contact.md
 * Spec: main.md
 * Sequences: seq-create-contact.md, seq-edit-contact.md
 */

export interface Contact {
  readonly id: string;
  readonly name: string;
  readonly email: string | undefined;
  readonly phone: string | undefined;
  readonly notes: string | undefined;
  readonly created: Date;
  readonly modified: Date;
}

export interface ContactData {
  name: string;
  email?: string;
  phone?: string;
  notes?: string;
}

export function createContact(
  id: string,
  data: ContactData,
  created: Date,
  modified: Date
): Contact {
  return {
    id,
    name: data.name,
    email: data.email || undefined,
    phone: data.phone || undefined,
    notes: data.notes || undefined,
    created,
    modified,
  };
}

export function updateContact(contact: Contact, data: ContactData): Contact {
  return {
    ...contact,
    name: data.name,
    email: data.email || undefined,
    phone: data.phone || undefined,
    notes: data.notes || undefined,
    modified: new Date(),
  };
}
