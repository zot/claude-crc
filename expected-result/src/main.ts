/**
 * Main Application Entry Point
 * Spec: main.md
 * CRC: crc-ContactService.md, crc-ContactListView.md, crc-ContactDetailView.md
 * Sequences: seq-load-contacts.md
 */

import { ContactService } from './services/ContactService';
import { ContactListView } from './ui/ContactListView';
import { ContactDetailView } from './ui/ContactDetailView';

/**
 * Application class
 * Handles routing and view management
 */
class App {
  private service: ContactService;
  private listView: ContactListView;
  private detailView: ContactDetailView;
  private container: HTMLElement;
  private currentView: 'list' | 'detail' = 'list';

  constructor() {
    this.container = document.getElementById('app')!;
    if (!this.container) {
      throw new Error('App container not found');
    }

    // Initialize service
    this.service = new ContactService();

    // Initialize views
    this.listView = new ContactListView(this.container, this.service);
    this.detailView = new ContactDetailView(this.container, this.service);

    // Set up navigation handlers
    this.listView.setNavigationHandler((id) => this.navigateToDetail(id));
    this.detailView.setNavigationHandler(() => this.navigateToList());
  }

  /**
   * Initialize and start the application
   * Sequence: seq-load-contacts.md
   */
  async initialize(): Promise<void> {
    try {
      // Initialize storage
      await this.service.initialize();

      // Show list view
      await this.showListView();
    } catch (error) {
      console.error('Failed to initialize app:', error);
      this.container.innerHTML = `
        <div class="error-state">
          <h1>Error</h1>
          <p>Failed to initialize application. Please refresh the page.</p>
          <p>${(error as Error).message}</p>
        </div>
      `;
    }
  }

  /**
   * Navigate to list view
   */
  private async navigateToList(): Promise<void> {
    this.currentView = 'list';
    await this.showListView();
  }

  /**
   * Navigate to detail view
   * @param id Contact ID (undefined for create mode)
   */
  private async navigateToDetail(id?: string): Promise<void> {
    this.currentView = 'detail';
    await this.showDetailView(id);
  }

  /**
   * Show list view
   * Sequence: seq-load-contacts.md
   */
  private async showListView(): Promise<void> {
    try {
      await this.listView.loadContacts();
    } catch (error) {
      console.error('Failed to load contacts:', error);
      alert('Failed to load contacts. Please try again.');
    }
  }

  /**
   * Show detail view
   * @param id Contact ID (undefined for create mode)
   * Sequences: seq-create-contact.md, seq-edit-contact.md
   */
  private async showDetailView(id?: string): Promise<void> {
    try {
      if (id) {
        await this.detailView.loadContact(id);
      } else {
        this.detailView.loadCreateMode();
      }
    } catch (error) {
      console.error('Failed to load contact detail:', error);
      alert('Failed to load contact. Returning to list.');
      await this.navigateToList();
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  const app = new App();
  await app.initialize();
});
