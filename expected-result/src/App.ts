/**
 * Application bootstrap
 * CRC: crc-App.md
 * Spec: main.md, coding-standards.md
 * Sequences: seq-load-contacts.md
 */

import { ContactService } from './services/ContactService';
import { LocalStorageContactRepository } from './services/LocalStorageContactRepository';
import { NotificationService } from './services/NotificationService';
import { Router } from './services/Router';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { ContactFormView } from './ui/ContactFormView';
import { ContactListView } from './ui/ContactListView';
import { NotificationView } from './ui/NotificationView';

export class App {
  private contactService: ContactService;
  private notificationService: NotificationService;
  private router: Router;

  private listView: ContactListView;
  private formView: ContactFormView;
  private confirmDialog: ConfirmDialog;
  private notificationView: NotificationView;

  private appContainer: HTMLElement;
  private viewContainer: HTMLElement;

  constructor() {
    // Get DOM containers
    this.appContainer = document.getElementById('app')!;
    this.viewContainer = document.createElement('div');
    this.viewContainer.className = 'view-container';
    this.appContainer.appendChild(this.viewContainer);

    // Create notification container
    const notificationContainer = document.createElement('div');
    notificationContainer.className = 'notification-container';
    this.appContainer.appendChild(notificationContainer);

    // Create dialog container
    const dialogContainer = document.createElement('div');
    dialogContainer.className = 'dialog-container';
    this.appContainer.appendChild(dialogContainer);

    // Initialize services with dependency injection
    const repository = new LocalStorageContactRepository();
    this.contactService = new ContactService(repository);
    this.notificationService = new NotificationService();
    this.router = new Router();

    // Initialize views
    this.confirmDialog = new ConfirmDialog(dialogContainer);
    this.notificationView = new NotificationView(notificationContainer, this.notificationService);
    this.listView = new ContactListView(this.viewContainer, this.contactService, this.router);
    this.formView = new ContactFormView(
      this.viewContainer,
      this.contactService,
      this.notificationService,
      this.router,
      this.confirmDialog
    );
  }

  initialize(): void {
    // Register routes
    this.router.registerRoute('/', () => this.showListView());
    this.router.registerRoute('/new', () => this.showFormView());
    this.router.registerRoute('/edit/:id', (params) => this.showFormView(params.id));

    // Start router
    this.router.start();
  }

  private async showListView(): Promise<void> {
    try {
      this.router.setNavigationGuard(null);
      await this.listView.render();
    } catch (error) {
      this.handleError(error);
    }
  }

  private async showFormView(contactId?: string): Promise<void> {
    try {
      await this.formView.render(contactId);
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown): void {
    console.error('Application error:', error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    this.notificationService.showError(message);
  }
}
