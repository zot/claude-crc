/**
 * ConfirmDialog tests
 * Test Design: test-ConfirmDialog.md
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ConfirmDialog } from '../src/ui/ConfirmDialog';

describe('ConfirmDialog', () => {
  let container: HTMLElement;
  let dialog: ConfirmDialog;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    dialog = new ConfirmDialog(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('TC-1: Show Dialog', () => {
    it('should display dialog with correct content', async () => {
      const promise = dialog.show({
        title: 'Test Title',
        message: 'Test message',
        confirmLabel: 'Yes',
        cancelLabel: 'No',
      });

      expect(container.classList.contains('visible')).toBe(true);
      expect(container.textContent).toContain('Test Title');
      expect(container.textContent).toContain('Test message');
      expect(container.querySelector('.dialog-confirm')?.textContent).toBe('Yes');
      expect(container.querySelector('.dialog-cancel')?.textContent).toBe('No');

      // Clean up
      container.querySelector<HTMLButtonElement>('.dialog-cancel')?.click();
      await promise;
    });

    it('should use default button labels when not specified', async () => {
      const promise = dialog.show({
        title: 'Title',
        message: 'Message',
      });

      expect(container.querySelector('.dialog-confirm')?.textContent).toBe('Confirm');
      expect(container.querySelector('.dialog-cancel')?.textContent).toBe('Cancel');

      container.querySelector<HTMLButtonElement>('.dialog-cancel')?.click();
      await promise;
    });
  });

  describe('TC-2: Confirm Action', () => {
    it('should resolve true when confirm clicked', async () => {
      const promise = dialog.show({
        title: 'Title',
        message: 'Message',
      });

      container.querySelector<HTMLButtonElement>('.dialog-confirm')?.click();

      const result = await promise;
      expect(result).toBe(true);
      expect(container.classList.contains('visible')).toBe(false);
    });
  });

  describe('TC-3: Cancel Action', () => {
    it('should resolve false when cancel clicked', async () => {
      const promise = dialog.show({
        title: 'Title',
        message: 'Message',
      });

      container.querySelector<HTMLButtonElement>('.dialog-cancel')?.click();

      const result = await promise;
      expect(result).toBe(false);
      expect(container.classList.contains('visible')).toBe(false);
    });
  });

  describe('TC-4: Overlay Click Closes', () => {
    it('should close and resolve false when overlay clicked', async () => {
      const promise = dialog.show({
        title: 'Title',
        message: 'Message',
      });

      // Click on overlay (container), not the dialog itself
      container.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      const result = await promise;
      expect(result).toBe(false);
    });
  });

  describe('TC-5: Escape Key Closes', () => {
    it('should close and resolve false when Escape pressed', async () => {
      const promise = dialog.show({
        title: 'Title',
        message: 'Message',
      });

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      const result = await promise;
      expect(result).toBe(false);
    });
  });

  describe('TC-7: Initial Focus', () => {
    it('should focus cancel button initially', async () => {
      const promise = dialog.show({
        title: 'Title',
        message: 'Message',
      });

      const cancelBtn = container.querySelector('.dialog-cancel');
      expect(document.activeElement).toBe(cancelBtn);

      container.querySelector<HTMLButtonElement>('.dialog-cancel')?.click();
      await promise;
    });
  });

  describe('TC-8: ARIA Attributes', () => {
    it('should have correct accessibility attributes', async () => {
      const promise = dialog.show({
        title: 'Title',
        message: 'Message',
      });

      const dialogEl = container.querySelector('.dialog');
      expect(dialogEl?.getAttribute('role')).toBe('alertdialog');
      expect(dialogEl?.getAttribute('aria-modal')).toBe('true');
      expect(dialogEl?.getAttribute('aria-labelledby')).toBe('dialog-title');
      expect(dialogEl?.getAttribute('aria-describedby')).toBe('dialog-message');

      container.querySelector<HTMLButtonElement>('.dialog-cancel')?.click();
      await promise;
    });
  });
});
