/**
 * CRC: crc-ContactListView.md
 * Spec: main.md (FR3: View Contact List, UI2: List View)
 * Sequence: seq-load-contacts.md
 */

import { Contact } from '../models/Contact';
import { ContactService } from '../services/ContactService';

/**
 * CRC: crc-ContactListView.md
 * Contact list UI with navigation
 */
export class ContactListView {
  /**
   * CRC: crc-ContactListView.md - "Knows: contacts"
   */
  private contacts: Contact[] = [];

  /**
   * CRC: crc-ContactListView.md - "Knows: service"
   */
  private service: ContactService;

  /**
   * CRC: crc-ContactListView.md - "Knows: selectedContactId"
   */
  private selectedContactId?: string;

  private container: HTMLElement;
  private onNavigateToDetail?: (id?: string) => void;

  constructor(container: HTMLElement, service: ContactService) {
    this.container = container;
    this.service = service;
  }

  /**
   * Set navigation callback
   */
  setNavigationHandler(handler: (id?: string) => void) {
    this.onNavigateToDetail = handler;
  }

  /**
   * CRC: crc-ContactListView.md - "Does: loadContacts()"
   * Sequence: seq-load-contacts.md
   * Loads contacts from service
   */
  async loadContacts(): Promise<void> {
    this.contacts = await this.service.getAllContacts();
    this.render();
  }

  /**
   * CRC: crc-ContactListView.md - "Does: render()"
   * Renders the contact list HTML
   */
  render(): void {
    if (this.contacts.length === 0) {
      this.showEmptyState();
      return;
    }

    const html = `
      <div class="contact-list-view">
        <div class="header">
          <h1>Contacts</h1>
          <button id="add-contact-btn" class="btn-primary">Add Contact</button>
        </div>
        <div class="contact-list">
          ${this.contacts.map(contact => this.renderContactRow(contact)).join('')}
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.attachEventListeners();
  }

  /**
   * Render single contact row
   */
  private renderContactRow(contact: Contact): string {
    return `
      <div class="contact-row" data-id="${contact.id}">
        <div class="contact-name">${this.escapeHtml(contact.name)}</div>
        <div class="contact-email">${this.escapeHtml(contact.email || '')}</div>
        <div class="contact-phone">${this.escapeHtml(contact.phone || '')}</div>
      </div>
    `;
  }

  /**
   * CRC: crc-ContactListView.md - "Does: showEmptyState()"
   * Displays "no contacts" message
   */
  showEmptyState(): void {
    const html = `
      <div class="contact-list-view">
        <div class="header">
          <h1>Contacts</h1>
          <button id="add-contact-btn" class="btn-primary">Add Contact</button>
        </div>
        <div class="empty-state">
          <p>No contacts yet</p>
          <p>Click "Add Contact" to create your first contact</p>
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.attachEventListeners();
  }

  /**
   * Attach event listeners to DOM elements
   */
  private attachEventListeners(): void {
    // Add Contact button
    const addBtn = this.container.querySelector('#add-contact-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => this.onAddContactClick());
    }

    // Contact row clicks
    const rows = this.container.querySelectorAll('.contact-row');
    rows.forEach(row => {
      row.addEventListener('click', () => {
        const id = row.getAttribute('data-id');
        if (id) {
          this.onContactClick(id);
        }
      });
    });
  }

  /**
   * CRC: crc-ContactListView.md - "Does: onContactClick()"
   * Navigates to contact detail view
   */
  onContactClick(id: string): void {
    this.selectedContactId = id;
    if (this.onNavigateToDetail) {
      this.onNavigateToDetail(id);
    }
  }

  /**
   * CRC: crc-ContactListView.md - "Does: onAddContactClick()"
   * Navigates to create contact view
   */
  onAddContactClick(): void {
    if (this.onNavigateToDetail) {
      this.onNavigateToDetail(); // undefined = create mode
    }
  }

  /**
   * CRC: crc-ContactListView.md - "Does: sortContactsByName()"
   * Sorts contacts alphabetically
   * Note: Service already sorts, this is for consistency
   */
  sortContactsByName(contacts: Contact[]): Contact[] {
    return contacts.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
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
