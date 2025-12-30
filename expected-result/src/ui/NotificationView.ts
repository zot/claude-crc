/**
 * Notification toast view
 * CRC: crc-NotificationView.md
 * Spec: main.md
 * Sequences: seq-create-contact.md, seq-edit-contact.md, seq-delete-contact.md
 */

import { Notification, NotificationService } from '../services/NotificationService';

export class NotificationView {
  private container: HTMLElement;
  private notificationService: NotificationService;

  constructor(container: HTMLElement, notificationService: NotificationService) {
    this.container = container;
    this.notificationService = notificationService;
    this.notificationService.addListener((n) => this.render(n));
  }

  render(notification: Notification | null): void {
    if (!notification) {
      this.container.innerHTML = '';
      this.container.classList.remove('visible');
      return;
    }

    this.container.className = `notification notification-${notification.type} visible`;
    this.container.innerHTML = `
      <span class="notification-message">${this.escapeHtml(notification.message)}</span>
      <button class="notification-dismiss" aria-label="Dismiss notification">&times;</button>
    `;

    const dismissBtn = this.container.querySelector('.notification-dismiss');
    dismissBtn?.addEventListener('click', () => this.handleDismiss());
  }

  private handleDismiss(): void {
    this.notificationService.dismiss();
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
