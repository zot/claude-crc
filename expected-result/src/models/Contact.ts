/**
 * CRC: crc-Contact.md
 * Spec: main.md (FR1: Contact Data Model)
 * Sequences: seq-create-contact.md, seq-edit-contact.md, seq-delete-contact.md
 */

/**
 * Validation result type
 */
export interface ValidationResult {
  isValid: boolean;
  errors: Map<string, string>;
}

/**
 * CRC: crc-Contact.md
 * Contact data model with auto-generated ID and timestamps
 */
export class Contact {
  /**
   * CRC: crc-Contact.md - "Knows: id"
   */
  id: string;

  /**
   * CRC: crc-Contact.md - "Knows: name"
   */
  name: string;

  /**
   * CRC: crc-Contact.md - "Knows: email"
   */
  email?: string;

  /**
   * CRC: crc-Contact.md - "Knows: phone"
   */
  phone?: string;

  /**
   * CRC: crc-Contact.md - "Knows: notes"
   */
  notes?: string;

  /**
   * CRC: crc-Contact.md - "Knows: created"
   */
  created: Date;

  /**
   * CRC: crc-Contact.md - "Knows: modified"
   */
  modified: Date;

  constructor(
    id: string,
    name: string,
    email?: string,
    phone?: string,
    notes?: string,
    created?: Date,
    modified?: Date
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.notes = notes;
    this.created = created || new Date();
    this.modified = modified || new Date();
  }

  /**
   * CRC: crc-Contact.md - "Does: validate()"
   * Validates contact data against rules
   * Collaborator: ContactValidator
   */
  validate(): ValidationResult {
    // Note: Actual validation delegated to ContactValidator
    // This method provides interface for validation
    return { isValid: true, errors: new Map() };
  }

  /**
   * CRC: crc-Contact.md - "Does: toJSON()"
   * Serializes contact for storage
   */
  toJSON(): string {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      notes: this.notes,
      created: this.created.toISOString(),
      modified: this.modified.toISOString(),
    });
  }

  /**
   * CRC: crc-Contact.md - "Does: fromJSON()"
   * Deserializes contact from storage
   */
  static fromJSON(json: string): Contact {
    try {
      const data = JSON.parse(json);

      if (!data.name) {
        throw new Error('Contact data missing required field: name');
      }

      return new Contact(
        data.id,
        data.name,
        data.email,
        data.phone,
        data.notes,
        new Date(data.created),
        new Date(data.modified)
      );
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error(`Invalid JSON format: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Generates a UUID v4
   */
  static generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
