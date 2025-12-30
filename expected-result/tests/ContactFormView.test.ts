/**
 * ContactFormView tests
 * Test Design: test-ContactFormView.md
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ContactFormView } from '../src/ui/ContactFormView';
import { ContactService } from '../src/services/ContactService';
import { NotificationService } from '../src/services/NotificationService';
import { Router } from '../src/services/Router';
import { ConfirmDialog } from '../src/ui/ConfirmDialog';
import { Contact } from '../src/models/Contact';

const createTestContact = (overrides: Partial<Contact> = {}): Contact => ({
  id: 'test-id',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  notes: 'Test notes',
  created: new Date('2024-01-01'),
  modified: new Date('2024-01-01'),
  ...overrides,
});

const createMockContactService = (): ContactService => ({
  getAllContacts: vi.fn().mockResolvedValue([]),
  getContact: vi.fn().mockResolvedValue(undefined),
  createContact: vi.fn().mockResolvedValue(createTestContact()),
  updateContact: vi.fn().mockResolvedValue(createTestContact()),
  deleteContact: vi.fn().mockResolvedValue(undefined),
} as unknown as ContactService);

const createMockNotificationService = (): NotificationService => ({
  showSuccess: vi.fn(),
  showError: vi.fn(),
  showWarning: vi.fn(),
  dismiss: vi.fn(),
} as unknown as NotificationService);

const createMockRouter = (): Router => ({
  navigate: vi.fn().mockReturnValue(true),
  setNavigationGuard: vi.fn(),
} as unknown as Router);

const createMockConfirmDialog = (): ConfirmDialog => ({
  show: vi.fn().mockResolvedValue(true),
  hide: vi.fn(),
} as unknown as ConfirmDialog);

describe('ContactFormView', () => {
  let container: HTMLElement;
  let mockService: ContactService;
  let mockNotification: NotificationService;
  let mockRouter: Router;
  let mockDialog: ConfirmDialog;
  let view: ContactFormView;

  beforeEach(() => {
    container = document.createElement('div');
    mockService = createMockContactService();
    mockNotification = createMockNotificationService();
    mockRouter = createMockRouter();
    mockDialog = createMockConfirmDialog();
    view = new ContactFormView(container, mockService, mockNotification, mockRouter, mockDialog);
  });

  describe('TC-1: Render Create Mode', () => {
    it('should render empty form for new contact', async () => {
      await view.render();

      expect(container.textContent).toContain('New Contact');
      expect(container.querySelector('.delete-btn')).toBeNull();
      expect(container.querySelector('.save-btn')).not.toBeNull();
      expect(container.querySelector('.cancel-btn')).not.toBeNull();
    });

    it('should have empty input fields', async () => {
      await view.render();

      const nameInput = container.querySelector('#name') as HTMLInputElement;
      const emailInput = container.querySelector('#email') as HTMLInputElement;

      expect(nameInput?.value).toBe('');
      expect(emailInput?.value).toBe('');
    });
  });

  describe('TC-2: Render Edit Mode', () => {
    it('should render form with existing contact data', async () => {
      const contact = createTestContact({ name: 'Alice', email: 'alice@example.com' });
      vi.mocked(mockService.getContact).mockResolvedValue(contact);

      await view.render('test-id');

      expect(container.textContent).toContain('Edit Contact');
      const nameInput = container.querySelector('#name') as HTMLInputElement;
      expect(nameInput?.value).toBe('Alice');
    });

    it('should show Delete button in edit mode', async () => {
      vi.mocked(mockService.getContact).mockResolvedValue(createTestContact());

      await view.render('test-id');

      expect(container.querySelector('.delete-btn')).not.toBeNull();
    });
  });

  describe('TC-3: Real-time Validation', () => {
    it('should show error on invalid email blur', async () => {
      await view.render();

      const emailInput = container.querySelector('#email') as HTMLInputElement;
      emailInput.value = 'invalid-email';
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
      emailInput.dispatchEvent(new Event('blur', { bubbles: true }));

      const errorSpan = container.querySelector('.error-message[data-field="email"]');
      expect(errorSpan?.textContent).toContain('valid email');
    });
  });

  describe('TC-4: Save Valid Contact (Create)', () => {
    it('should create contact and navigate on save', async () => {
      await view.render();

      const nameInput = container.querySelector('#name') as HTMLInputElement;
      nameInput.value = 'New Contact';
      nameInput.dispatchEvent(new Event('input', { bubbles: true }));

      const form = container.querySelector('.contact-form') as HTMLFormElement;
      form.dispatchEvent(new Event('submit', { bubbles: true }));

      await vi.waitFor(() => {
        expect(mockService.createContact).toHaveBeenCalled();
        expect(mockNotification.showSuccess).toHaveBeenCalled();
        expect(mockRouter.navigate).toHaveBeenCalledWith('/');
      });
    });
  });

  describe('TC-5: Save Valid Contact (Edit)', () => {
    it('should update contact and navigate on save', async () => {
      vi.mocked(mockService.getContact).mockResolvedValue(createTestContact());
      await view.render('test-id');

      const nameInput = container.querySelector('#name') as HTMLInputElement;
      nameInput.value = 'Updated Name';
      nameInput.dispatchEvent(new Event('input', { bubbles: true }));

      const form = container.querySelector('.contact-form') as HTMLFormElement;
      form.dispatchEvent(new Event('submit', { bubbles: true }));

      await vi.waitFor(() => {
        expect(mockService.updateContact).toHaveBeenCalled();
        expect(mockNotification.showSuccess).toHaveBeenCalled();
      });
    });
  });

  describe('TC-6: Save Invalid Contact', () => {
    it('should not save when validation fails', async () => {
      await view.render();

      // Leave name empty
      const form = container.querySelector('.contact-form') as HTMLFormElement;
      form.dispatchEvent(new Event('submit', { bubbles: true }));

      expect(mockService.createContact).not.toHaveBeenCalled();
    });
  });

  describe('TC-7: Cancel Without Changes', () => {
    it('should navigate directly when form is pristine', async () => {
      await view.render();

      const cancelBtn = container.querySelector('.cancel-btn');
      cancelBtn?.dispatchEvent(new Event('click'));

      await vi.waitFor(() => {
        expect(mockRouter.navigate).toHaveBeenCalledWith('/');
      });
      expect(mockDialog.show).not.toHaveBeenCalled();
    });
  });

  describe('TC-8: Cancel With Unsaved Changes', () => {
    it('should show confirmation when form is dirty', async () => {
      await view.render();

      // Make form dirty
      const nameInput = container.querySelector('#name') as HTMLInputElement;
      nameInput.value = 'Changed';
      nameInput.dispatchEvent(new Event('input', { bubbles: true }));

      const cancelBtn = container.querySelector('.cancel-btn');
      cancelBtn?.dispatchEvent(new Event('click'));

      await vi.waitFor(() => {
        expect(mockDialog.show).toHaveBeenCalled();
      });
    });
  });

  describe('TC-9: Delete Contact', () => {
    it('should delete contact after confirmation', async () => {
      vi.mocked(mockService.getContact).mockResolvedValue(createTestContact());
      vi.mocked(mockDialog.show).mockResolvedValue(true);
      await view.render('test-id');

      const deleteBtn = container.querySelector('.delete-btn');
      deleteBtn?.dispatchEvent(new Event('click'));

      await vi.waitFor(() => {
        expect(mockDialog.show).toHaveBeenCalled();
      });
      await vi.waitFor(() => {
        expect(mockService.deleteContact).toHaveBeenCalledWith('test-id');
      });
    });
  });

  describe('TC-10: Delete Cancel', () => {
    it('should not delete when confirmation cancelled', async () => {
      vi.mocked(mockService.getContact).mockResolvedValue(createTestContact());
      vi.mocked(mockDialog.show).mockResolvedValue(false);
      await view.render('test-id');

      const deleteBtn = container.querySelector('.delete-btn');
      deleteBtn?.dispatchEvent(new Event('click'));

      await vi.waitFor(() => {
        expect(mockDialog.show).toHaveBeenCalled();
      });
      expect(mockService.deleteContact).not.toHaveBeenCalled();
    });
  });

  describe('TC-11: Dirty State Tracking', () => {
    it('should track dirty state on field change', async () => {
      await view.render();

      const nameInput = container.querySelector('#name') as HTMLInputElement;
      nameInput.value = 'Modified';
      nameInput.dispatchEvent(new Event('input', { bubbles: true }));

      // Verify dirty by checking that cancel would trigger dialog
      const cancelBtn = container.querySelector('.cancel-btn');
      cancelBtn?.dispatchEvent(new Event('click'));

      await vi.waitFor(() => {
        expect(mockDialog.show).toHaveBeenCalled();
      });
    });
  });
});
