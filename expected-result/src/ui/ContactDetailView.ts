/**
 * CRC: crc-ContactDetailView.md
 * Spec: main.md (FR2: Create, FR4: Edit, FR5: Delete, UI3: Detail/Edit View)
 * Sequences: seq-create-contact.md, seq-edit-contact.md, seq-delete-contact.md
 */

import { Contact, ValidationResult } from '../models/Contact';
import { ContactService } from '../services/ContactService';
import { ContactValidator } from '../utils/ContactValidator';

/**
 * CRC: crc-ContactDetailView.md
 * Create/edit/delete form with validation and confirmations
 */
export class ContactDetailView {
  /**
   * CRC: crc-ContactDetailView.md - "Knows: contact"
   */
  private contact?: Contact;

  /**
   * CRC: crc-ContactDetailView.md - "Knows: service"
   */
  private service: ContactService;

  /**
   * CRC: crc-ContactDetailView.md - "Knows: isDirty"
   */
  private isDirty: boolean = false;

  /**
   * CRC: crc-ContactDetailView.md - "Knows: validationErrors"
   */
  private validationErrors: Map<string, string> = new Map();

  /**
   * CRC: crc-ContactDetailView.md - "Knows: mode"
   */
  private mode: 'create' | 'edit' = 'create';

  private container: HTMLElement;
  private onNavigateToList?: () => void;
  private originalValues: Map<string, string> = new Map();

  constructor(container: HTMLElement, service: ContactService) {
    this.container = container;
    this.service = service;
  }

  /**
   * Set navigation callback
   */
  setNavigationHandler(handler: () => void) {
    this.onNavigateToList = handler;
  }

  /**
   * CRC: crc-ContactDetailView.md - "Does: loadContact()"
   * Sequence: seq-edit-contact.md
   * Loads contact for editing
   */
  async loadContact(id: string): Promise<void> {
    this.contact = await this.service.getContact(id);
    if (!this.contact) {
      throw new Error(`Contact not found: ${id}`);
    }
    this.mode = 'edit';
    this.isDirty = false;
    this.storeOriginalValues();
    this.render();
  }

  /**
   * Load create mode
   */
  loadCreateMode(): void {
    this.contact = undefined;
    this.mode = 'create';
    this.isDirty = false;
    this.originalValues.clear();
    this.render();
  }

  /**
   * Store original values for dirty tracking
   */
  private storeOriginalValues(): void {
    if (!this.contact) return;

    this.originalValues.set('name', this.contact.name);
    this.originalValues.set('email', this.contact.email || '');
    this.originalValues.set('phone', this.contact.phone || '');
    this.originalValues.set('notes', this.contact.notes || '');
  }

  /**
   * CRC: crc-ContactDetailView.md - "Does: render()"
   * Renders the contact form HTML
   */
  render(): void {
    const title = this.mode === 'create' ? 'New Contact' : 'Edit Contact';
    const nameValue = this.contact?.name || '';
    const emailValue = this.contact?.email || '';
    const phoneValue = this.contact?.phone || '';
    const notesValue = this.contact?.notes || '';

    const html = `
      <div class="contact-detail-view">
        <div class="header">
          <h1>${title}</h1>
        </div>
        <form id="contact-form" class="contact-form">
          <div class="form-group">
            <label for="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value="${this.escapeHtml(nameValue)}"
              required
              maxlength="100"
            />
            <span class="error" id="name-error"></span>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value="${this.escapeHtml(emailValue)}"
            />
            <span class="error" id="email-error"></span>
          </div>

          <div class="form-group">
            <label for="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value="${this.escapeHtml(phoneValue)}"
            />
            <span class="error" id="phone-error"></span>
          </div>

          <div class="form-group">
            <label for="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              rows="4"
              maxlength="500"
            >${this.escapeHtml(notesValue)}</textarea>
            <span class="error" id="notes-error"></span>
          </div>

          <div class="form-actions">
            <button type="button" id="save-btn" class="btn-primary">Save</button>
            <button type="button" id="cancel-btn" class="btn-secondary">Cancel</button>
            ${this.mode === 'edit' ? '<button type="button" id="delete-btn" class="btn-danger">Delete</button>' : ''}
          </div>
        </form>
      </div>
    `;

    this.container.innerHTML = html;
    this.attachEventListeners();
  }

  /**
   * Attach event listeners
   */
  private attachEventListeners(): void {
    // Form field changes
    const form = this.container.querySelector('#contact-form') as HTMLFormElement;
    if (form) {
      const fields = ['name', 'email', 'phone', 'notes'];
      fields.forEach(field => {
        const input = form.elements.namedItem(field) as HTMLInputElement;
        if (input) {
          input.addEventListener('input', () => {
            this.onFieldChange(field, input.value);
          });
        }
      });
    }

    // Save button
    const saveBtn = this.container.querySelector('#save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.onSaveClick());
    }

    // Cancel button
    const cancelBtn = this.container.querySelector('#cancel-btn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => this.onCancelClick());
    }

    // Delete button (edit mode only)
    const deleteBtn = this.container.querySelector('#delete-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => this.onDeleteClick());
    }
  }

  /**
   * CRC: crc-ContactDetailView.md - "Does: onFieldChange()"
   * Tracks changes and validates
   */
  onFieldChange(field: string, value: string): void {
    // Track dirty state
    const originalValue = this.originalValues.get(field) || '';
    this.isDirty = value !== originalValue;

    // Validate field
    this.validateField(field, value);
  }

  /**
   * CRC: crc-ContactDetailView.md - "Does: validateField()"
   * Validates single field inline
   */
  validateField(field: string, value: string): void {
    let result: ValidationResult;

    switch (field) {
      case 'name':
        result = ContactValidator.validateName(value);
        break;
      case 'email':
        result = ContactValidator.validateEmail(value);
        break;
      case 'phone':
        result = ContactValidator.validatePhone(value);
        break;
      case 'notes':
        result = ContactValidator.validateNotes(value);
        break;
      default:
        return;
    }

    // Update validation errors
    if (result.isValid) {
      this.validationErrors.delete(field);
    } else {
      const error = result.errors.get(field);
      if (error) {
        this.validationErrors.set(field, error);
      }
    }

    // Display error
    const errorSpan = this.container.querySelector(`#${field}-error`);
    if (errorSpan) {
      errorSpan.textContent = this.validationErrors.get(field) || '';
    }
  }

  /**
   * CRC: crc-ContactDetailView.md - "Does: onSaveClick()"
   * Sequence: seq-create-contact.md, seq-edit-contact.md
   * Validates and saves contact
   */
  async onSaveClick(): Promise<void> {
    try {
      const form = this.container.querySelector('#contact-form') as HTMLFormElement;
      const formData = new FormData(form);

      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const phone = formData.get('phone') as string;
      const notes = formData.get('notes') as string;

      if (this.mode === 'create') {
        await this.service.createContact(name, email, phone, notes);
        alert('Contact created successfully');
      } else if (this.contact) {
        await this.service.updateContact(this.contact.id, {
          name,
          email: email || undefined,
          phone: phone || undefined,
          notes: notes || undefined,
        });
        alert('Contact updated successfully');
      }

      this.isDirty = false;
      if (this.onNavigateToList) {
        this.onNavigateToList();
      }
    } catch (error) {
      alert(`Error saving contact: ${(error as Error).message}`);
    }
  }

  /**
   * CRC: crc-ContactDetailView.md - "Does: onCancelClick()"
   * Cancels and returns to list (confirms if dirty)
   */
  async onCancelClick(): Promise<void> {
    if (this.isDirty) {
      const confirmed = await this.confirmUnsavedChanges();
      if (!confirmed) {
        return;
      }
    }

    if (this.onNavigateToList) {
      this.onNavigateToList();
    }
  }

  /**
   * CRC: crc-ContactDetailView.md - "Does: onDeleteClick()"
   * Sequence: seq-delete-contact.md
   * Deletes contact with confirmation
   */
  async onDeleteClick(): Promise<void> {
    if (!this.contact) return;

    const confirmed = await this.confirmDelete();
    if (!confirmed) return;

    try {
      await this.service.deleteContact(this.contact.id);
      alert('Contact deleted successfully');
      this.isDirty = false;
      if (this.onNavigateToList) {
        this.onNavigateToList();
      }
    } catch (error) {
      alert(`Error deleting contact: ${(error as Error).message}`);
    }
  }

  /**
   * CRC: crc-ContactDetailView.md - "Does: confirmUnsavedChanges()"
   * Prompts user before discarding changes
   */
  async confirmUnsavedChanges(): Promise<boolean> {
    return confirm('You have unsaved changes. Discard them?');
  }

  /**
   * CRC: crc-ContactDetailView.md - "Does: confirmDelete()"
   * Prompts user before deleting
   */
  async confirmDelete(): Promise<boolean> {
    return confirm('Are you sure you want to delete this contact? This cannot be undone.');
  }

  /**
   * CRC: crc-ContactDetailView.md - "Does: showValidationErrors()"
   * Displays validation errors
   */
  showValidationErrors(errors: ValidationResult): void {
    errors.errors.forEach((message, field) => {
      const errorSpan = this.container.querySelector(`#${field}-error`);
      if (errorSpan) {
        errorSpan.textContent = message;
      }
    });
  }

  /**
   * Escape HTML to prevent XSS
   */
  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
