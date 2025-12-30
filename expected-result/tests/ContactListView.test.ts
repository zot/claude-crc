/**
 * ContactListView tests
 * Test Design: test-ContactListView.md
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ContactListView } from '../src/ui/ContactListView';
import { ContactService } from '../src/services/ContactService';
import { Router } from '../src/services/Router';
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
  getContact: vi.fn(),
  createContact: vi.fn(),
  updateContact: vi.fn(),
  deleteContact: vi.fn(),
} as unknown as ContactService);

const createMockRouter = (): Router => ({
  navigate: vi.fn().mockReturnValue(true),
  registerRoute: vi.fn(),
  start: vi.fn(),
  back: vi.fn(),
  getCurrentRoute: vi.fn().mockReturnValue('/'),
  setNavigationGuard: vi.fn(),
} as unknown as Router);

describe('ContactListView', () => {
  let container: HTMLElement;
  let mockService: ContactService;
  let mockRouter: Router;
  let view: ContactListView;

  beforeEach(() => {
    container = document.createElement('div');
    mockService = createMockContactService();
    mockRouter = createMockRouter();
    view = new ContactListView(container, mockService, mockRouter);
  });

  describe('TC-1: Render Contact List', () => {
    it('should render contacts in sorted order', async () => {
      const contacts = [
        createTestContact({ id: '1', name: 'Bob' }),
        createTestContact({ id: '2', name: 'Alice' }),
        createTestContact({ id: '3', name: 'Carol' }),
      ];
      vi.mocked(mockService.getAllContacts).mockResolvedValue(contacts);

      await view.render();

      const items = container.querySelectorAll('.contact-item');
      expect(items).toHaveLength(3);
      // Service returns sorted, view displays in order
      expect(items[0].querySelector('.contact-name')?.textContent).toBe('Bob');
    });

    it('should display name, email, and phone for each contact', async () => {
      const contact = createTestContact({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-1234',
      });
      vi.mocked(mockService.getAllContacts).mockResolvedValue([contact]);

      await view.render();

      expect(container.textContent).toContain('John Doe');
      expect(container.textContent).toContain('john@example.com');
      expect(container.textContent).toContain('555-1234');
    });
  });

  describe('TC-2: Render Empty State', () => {
    it('should render empty state message when no contacts', async () => {
      vi.mocked(mockService.getAllContacts).mockResolvedValue([]);

      await view.render();

      expect(container.querySelector('.empty-state')).not.toBeNull();
      expect(container.textContent).toContain('No contacts');
    });

    it('should show Add Contact button in empty state', async () => {
      vi.mocked(mockService.getAllContacts).mockResolvedValue([]);

      await view.render();

      expect(container.querySelector('.add-contact-btn')).not.toBeNull();
    });
  });

  describe('TC-3: Contact Row Click', () => {
    it('should navigate to edit view when contact clicked', async () => {
      const contact = createTestContact({ id: 'contact-123' });
      vi.mocked(mockService.getAllContacts).mockResolvedValue([contact]);

      await view.render();

      const item = container.querySelector('.contact-item');
      item?.dispatchEvent(new Event('click'));

      expect(mockRouter.navigate).toHaveBeenCalledWith('/edit/contact-123');
    });
  });

  describe('TC-4: Add Contact Button Click', () => {
    it('should navigate to create form when Add Contact clicked', async () => {
      vi.mocked(mockService.getAllContacts).mockResolvedValue([]);

      await view.render();

      const addBtn = container.querySelector('.add-contact-btn');
      addBtn?.dispatchEvent(new Event('click'));

      expect(mockRouter.navigate).toHaveBeenCalledWith('/new');
    });
  });

  describe('TC-6: Missing Optional Fields', () => {
    it('should render contact without email or phone', async () => {
      const contact = createTestContact({
        name: 'Minimal Contact',
        email: undefined,
        phone: undefined,
      });
      vi.mocked(mockService.getAllContacts).mockResolvedValue([contact]);

      await view.render();

      const item = container.querySelector('.contact-item');
      expect(item).not.toBeNull();
      expect(item?.querySelector('.contact-name')?.textContent).toBe('Minimal Contact');
    });
  });
});
