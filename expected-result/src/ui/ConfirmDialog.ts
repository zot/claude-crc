/**
 * Confirmation dialog modal
 * CRC: crc-ConfirmDialog.md
 * Spec: main.md
 * Sequences: seq-delete-contact.md, seq-edit-contact.md
 */

export interface ConfirmDialogOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

export class ConfirmDialog {
  private container: HTMLElement;
  private isOpen: boolean = false;
  private resolvePromise: ((confirmed: boolean) => void) | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    document.addEventListener('keydown', (e) => this.handleEscapeKey(e));
  }

  show(options: ConfirmDialogOptions): Promise<boolean> {
    return new Promise((resolve) => {
      this.resolvePromise = resolve;
      this.isOpen = true;
      this.render(options);
    });
  }

  hide(): void {
    this.isOpen = false;
    this.container.innerHTML = '';
    this.container.classList.remove('visible');
  }

  private render(options: ConfirmDialogOptions): void {
    const confirmLabel = options.confirmLabel || 'Confirm';
    const cancelLabel = options.cancelLabel || 'Cancel';

    this.container.className = 'dialog-overlay visible';
    this.container.innerHTML = `
      <div class="dialog" role="alertdialog" aria-modal="true" aria-labelledby="dialog-title" aria-describedby="dialog-message">
        <h2 id="dialog-title" class="dialog-title">${this.escapeHtml(options.title)}</h2>
        <p id="dialog-message" class="dialog-message">${this.escapeHtml(options.message)}</p>
        <div class="dialog-actions">
          <button class="btn btn-secondary dialog-cancel">${this.escapeHtml(cancelLabel)}</button>
          <button class="btn btn-danger dialog-confirm">${this.escapeHtml(confirmLabel)}</button>
        </div>
      </div>
    `;

    const overlay = this.container;
    const dialog = this.container.querySelector('.dialog');
    const confirmBtn = this.container.querySelector('.dialog-confirm');
    const cancelBtn = this.container.querySelector('.dialog-cancel');

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.handleCancel();
    });
    confirmBtn?.addEventListener('click', () => this.handleConfirm());
    cancelBtn?.addEventListener('click', () => this.handleCancel());

    // Focus the cancel button for safety
    (cancelBtn as HTMLButtonElement)?.focus();
  }

  private handleConfirm(): void {
    this.hide();
    this.resolvePromise?.(true);
    this.resolvePromise = null;
  }

  private handleCancel(): void {
    this.hide();
    this.resolvePromise?.(false);
    this.resolvePromise = null;
  }

  private handleEscapeKey(event: KeyboardEvent): void {
    if (this.isOpen && event.key === 'Escape') {
      this.handleCancel();
    }
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
