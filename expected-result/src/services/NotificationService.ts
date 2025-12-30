/**
 * Notification service for toast messages
 * CRC: crc-NotificationService.md
 * Spec: main.md
 * Sequences: seq-create-contact.md, seq-edit-contact.md, seq-delete-contact.md
 */

export type NotificationType = 'success' | 'error' | 'warning';

export interface Notification {
  type: NotificationType;
  message: string;
}

export type NotificationListener = (notification: Notification | null) => void;

export class NotificationService {
  private currentNotification: Notification | null = null;
  private timeout: number = 3000;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private listeners: NotificationListener[] = [];

  showSuccess(message: string): void {
    this.show({ type: 'success', message });
  }

  showError(message: string): void {
    this.show({ type: 'error', message });
  }

  showWarning(message: string): void {
    this.show({ type: 'warning', message });
  }

  dismiss(): void {
    this.clearTimeout();
    this.currentNotification = null;
    this.notifyListeners();
  }

  setAutoDismissTimeout(timeout: number): void {
    this.timeout = timeout;
  }

  getCurrentNotification(): Notification | null {
    return this.currentNotification;
  }

  addListener(listener: NotificationListener): void {
    this.listeners.push(listener);
  }

  removeListener(listener: NotificationListener): void {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  private show(notification: Notification): void {
    this.clearTimeout();
    this.currentNotification = notification;
    this.notifyListeners();
    this.timeoutId = setTimeout(() => this.dismiss(), this.timeout);
  }

  private clearTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.currentNotification));
  }
}
