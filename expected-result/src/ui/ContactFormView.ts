/**
 * Contact form view (create/edit)
 * CRC: crc-ContactFormView.md
 * Spec: main.md
 * Sequences: seq-create-contact.md, seq-edit-contact.md, seq-delete-contact.md
 */

import { Contact, ContactData } from '../models/Contact';
import { ContactService, ValidationError } from '../services/ContactService';
import { NotificationService } from '../services/NotificationService';
import { Router } from '../services/Router';
import {
  validateName,
  validateEmail,
  validatePhone,
  validateNotes,
  ValidationError as FieldError,
} from '../utils/ContactValidator';
import { ConfirmDialog } from './ConfirmDialog';

export type FormMode = 'create' | 'edit';

interface FormData {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export class ContactFormView {
  private container: HTMLElement;
  private contactService: ContactService;
  private notificationService: NotificationService;
  private router: Router;
  private confirmDialog: ConfirmDialog;

  private contact: Contact | null = null;
  private formData: FormData = { name: '', email: '', phone: '', notes: '' };
  private errors: Map<string, string> = new Map();
  private isDirty: boolean = false;
  private mode: FormMode = 'create';

  constructor(
    container: HTMLElement,
    contactService: ContactService,
    notificationService: NotificationService,
    router: Router,
    confirmDialog: ConfirmDialog
  ) {
    this.container = container;
    this.contactService = contactService;
    this.notificationService = notificationService;
    this.router = router;
    this.confirmDialog = confirmDialog;
  }

  async render(contactId?: string): Promise<void> {
    this.isDirty = false;
    this.errors.clear();

    if (contactId) {
      this.mode = 'edit';
      await this.loadContact(contactId);
    } else {
      this.mode = 'create';
      this.contact = null;
      this.formData = { name: '', email: '', phone: '', notes: '' };
    }

    this.renderForm();
    this.attachEventListeners();
    this.setupNavigationGuard();
  }

  private async loadContact(id: string): Promise<void> {
    const contact = await this.contactService.getContact(id);
    if (!contact) {
      this.notificationService.showError('Contact not found');
      this.router.navigate('/');
      return;
    }
    this.contact = contact;
    this.formData = {
      name: contact.name,
      email: contact.email || '',
      phone: contact.phone || '',
      notes: contact.notes || '',
    };
  }

  private renderForm(): void {
    const title = this.mode === 'create' ? 'New Contact' : 'Edit Contact';

    this.container.innerHTML = `
      <div class="form-header">
        <h1>${title}</h1>
      </div>
      <form class="contact-form" novalidate>
        <div class="form-group">
          <label for="name">Name *</label>
          <input type="text" id="name" name="name" value="${this.escapeHtml(this.formData.name)}" required maxlength="100" />
          <span class="error-message" data-field="name">${this.errors.get('name') || ''}</span>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" value="${this.escapeHtml(this.formData.email)}" />
          <span class="error-message" data-field="email">${this.errors.get('email') || ''}</span>
        </div>
        <div class="form-group">
          <label for="phone">Phone</label>
          <input type="tel" id="phone" name="phone" value="${this.escapeHtml(this.formData.phone)}" maxlength="20" />
          <span class="error-message" data-field="phone">${this.errors.get('phone') || ''}</span>
        </div>
        <div class="form-group">
          <label for="notes">Notes</label>
          <textarea id="notes" name="notes" maxlength="500" rows="4">${this.escapeHtml(this.formData.notes)}</textarea>
          <span class="error-message" data-field="notes">${this.errors.get('notes') || ''}</span>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary cancel-btn">Cancel</button>
          ${this.mode === 'edit' ? '<button type="button" class="btn btn-danger delete-btn">Delete</button>' : ''}
          <button type="submit" class="btn btn-primary save-btn">Save</button>
        </div>
      </form>
    `;
  }

  private attachEventListeners(): void {
    const form = this.container.querySelector('.contact-form') as HTMLFormElement;
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach((input) => {
      input.addEventListener('input', (e) => this.handleInputChange(e));
      input.addEventListener('blur', (e) => this.validateField(e.target as HTMLInputElement));
    });

    form.addEventListener('submit', (e) => this.handleSave(e));

    const cancelBtn = this.container.querySelector('.cancel-btn');
    cancelBtn?.addEventListener('click', () => this.handleCancel());

    const deleteBtn = this.container.querySelector('.delete-btn');
    deleteBtn?.addEventListener('click', () => this.handleDelete());
  }

  private handleInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const field = input.name as keyof FormData;
    this.formData[field] = input.value;
    this.markDirty();
  }

  private validateField(input: HTMLInputElement): void {
    const field = input.name;
    let error: FieldError | null = null;

    switch (field) {
      case 'name':
        error = validateName(this.formData.name);
        break;
      case 'email':
        error = validateEmail(this.formData.email || undefined);
        break;
      case 'phone':
        error = validatePhone(this.formData.phone || undefined);
        break;
      case 'notes':
        error = validateNotes(this.formData.notes || undefined);
        break;
    }

    if (error) {
      this.errors.set(field, error.message);
    } else {
      this.errors.delete(field);
    }

    this.renderFieldError(field);
  }

  private renderFieldError(field: string): void {
    const errorSpan = this.container.querySelector(`.error-message[data-field="${field}"]`);
    if (errorSpan) {
      errorSpan.textContent = this.errors.get(field) || '';
    }
  }

  private async handleSave(event: Event): Promise<void> {
    event.preventDefault();

    // Validate all fields
    const inputs = this.container.querySelectorAll('input, textarea');
    inputs.forEach((input) => this.validateField(input as HTMLInputElement));

    if (this.errors.size > 0) {
      return;
    }

    const data: ContactData = {
      name: this.formData.name,
      email: this.formData.email || undefined,
      phone: this.formData.phone || undefined,
      notes: this.formData.notes || undefined,
    };

    try {
      if (this.mode === 'create') {
        await this.contactService.createContact(data);
        this.notificationService.showSuccess('Contact created successfully');
      } else if (this.contact) {
        await this.contactService.updateContact(this.contact.id, data);
        this.notificationService.showSuccess('Contact updated successfully');
      }
      this.isDirty = false;
      this.router.setNavigationGuard(null);
      this.router.navigate('/');
    } catch (error) {
      if (error instanceof ValidationError) {
        error.validation.errors.forEach((e) => {
          this.errors.set(e.field, e.message);
          this.renderFieldError(e.field);
        });
      } else {
        this.notificationService.showError('Failed to save contact');
      }
    }
  }

  private async handleCancel(): Promise<void> {
    if (this.isDirty) {
      const confirmed = await this.confirmDialog.show({
        title: 'Discard Changes?',
        message: 'You have unsaved changes. Are you sure you want to discard them?',
        confirmLabel: 'Discard',
        cancelLabel: 'Keep Editing',
      });
      if (!confirmed) return;
    }
    this.isDirty = false;
    this.router.setNavigationGuard(null);
    this.router.navigate('/');
  }

  private async handleDelete(): Promise<void> {
    if (!this.contact) return;

    const confirmed = await this.confirmDialog.show({
      title: 'Delete Contact?',
      message: `Are you sure you want to delete ${this.contact.name}? This action cannot be undone.`,
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel',
    });

    if (!confirmed) return;

    try {
      await this.contactService.deleteContact(this.contact.id);
      this.notificationService.showSuccess('Contact deleted successfully');
      this.isDirty = false;
      this.router.setNavigationGuard(null);
      this.router.navigate('/');
    } catch {
      this.notificationService.showError('Failed to delete contact');
    }
  }

  private markDirty(): void {
    this.isDirty = true;
  }

  private setupNavigationGuard(): void {
    this.router.setNavigationGuard(() => {
      if (this.isDirty) {
        // For browser navigation, we can't use async confirm dialog
        // so we use the native confirm
        return window.confirm('You have unsaved changes. Are you sure you want to leave?');
      }
      return true;
    });
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
