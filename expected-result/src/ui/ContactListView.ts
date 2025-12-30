/**
 * Contact list view
 * CRC: crc-ContactListView.md
 * Spec: main.md
 * Sequences: seq-load-contacts.md, seq-create-contact.md, seq-edit-contact.md
 */

import { Contact } from '../models/Contact';
import { ContactService } from '../services/ContactService';
import { Router } from '../services/Router';

export class ContactListView {
  private container: HTMLElement;
  private contactService: ContactService;
  private router: Router;
  private contacts: Contact[] = [];

  constructor(
    container: HTMLElement,
    contactService: ContactService,
    router: Router
  ) {
    this.container = container;
    this.contactService = contactService;
    this.router = router;
  }

  async render(): Promise<void> {
    this.contacts = await this.contactService.getAllContacts();

    if (this.contacts.length === 0) {
      this.renderEmptyState();
      return;
    }

    this.container.innerHTML = `
      <div class="contact-list-header">
        <h1>Contacts</h1>
        <button class="btn btn-primary add-contact-btn">Add Contact</button>
      </div>
      <ul class="contact-list">
        ${this.contacts.map((contact) => this.renderContactItem(contact)).join('')}
      </ul>
    `;

    this.attachEventListeners();
  }

  private renderEmptyState(): void {
    this.container.innerHTML = `
      <div class="contact-list-header">
        <h1>Contacts</h1>
        <button class="btn btn-primary add-contact-btn">Add Contact</button>
      </div>
      <div class="empty-state">
        <p>No contacts yet. Add your first contact!</p>
      </div>
    `;

    this.attachEventListeners();
  }

  private renderContactItem(contact: Contact): string {
    return `
      <li class="contact-item" data-id="${contact.id}">
        <div class="contact-name">${this.escapeHtml(contact.name)}</div>
        <div class="contact-details">
          ${contact.email ? `<span class="contact-email">${this.escapeHtml(contact.email)}</span>` : ''}
          ${contact.phone ? `<span class="contact-phone">${this.escapeHtml(contact.phone)}</span>` : ''}
        </div>
      </li>
    `;
  }

  private attachEventListeners(): void {
    const addBtn = this.container.querySelector('.add-contact-btn');
    addBtn?.addEventListener('click', () => this.handleAddClick());

    const contactItems = this.container.querySelectorAll('.contact-item');
    contactItems.forEach((item) => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        if (id) this.handleContactClick(id);
      });
    });
  }

  private handleAddClick(): void {
    this.router.navigate('/new');
  }

  private handleContactClick(id: string): void {
    this.router.navigate(`/edit/${id}`);
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
