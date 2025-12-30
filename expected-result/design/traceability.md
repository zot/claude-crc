# Traceability Map

## Level 1 to Level 2 (Specs to Design Models)

### main.md

**CRC Cards:**
- crc-Contact.md (FR1: Contact Data Model)
- crc-ContactValidator.md (FR2, FR4: Validation)
- crc-ContactService.md (FR2-FR6: CRUD operations)
- crc-IContactRepository.md (FR6: Data Persistence)
- crc-LocalStorageContactRepository.md (FR6: Data Persistence)
- crc-NotificationService.md (FR2, FR4, FR5: Success messages)
- crc-Router.md (UI1: Navigation)
- crc-App.md (Application bootstrap)
- crc-ContactListView.md (FR3, UI2: View Contact List)
- crc-ContactFormView.md (FR2, FR4: Create/Edit Contact)
- crc-ConfirmDialog.md (FR5: Delete confirmation)
- crc-NotificationView.md (FR2, FR4, FR5: Notifications)

**Sequence Diagrams:**
- seq-create-contact.md (FR2: Create Contact)
- seq-edit-contact.md (FR4: View/Edit Contact)
- seq-delete-contact.md (FR5: Delete Contact)
- seq-load-contacts.md (FR3, FR6: View List, Persistence)

**UI Specs:**
- manifest-ui.md (UI1-UI4: Global UI concerns)
- ui-contact-list.md (UI2: List View)
- ui-contact-form.md (UI3: Detail/Edit View)
- ui-confirm-dialog.md (UI3: Confirmation dialog)
- ui-notification.md (UI3: Notifications)

### coding-standards.md

**CRC Cards:**
- crc-IContactRepository.md (SOLID: Dependency Inversion)
- crc-ContactService.md (SOLID: Single Responsibility)
- crc-ContactValidator.md (SOLID: Single Responsibility)

---

## Level 2 to Level 3 (Design Models to Implementation)

### crc-Contact.md

**Source Spec:** main.md

**Implementation:**
- [x] **src/models/Contact.ts**
  - [x] File header (CRC + Spec + Sequences)
  - [x] Contact interface with all fields
  - [x] ContactData type for form state

### crc-ContactValidator.md

**Source Spec:** main.md, coding-standards.md

**Implementation:**
- [x] **src/utils/ContactValidator.ts**
  - [x] File header (CRC + Spec + Sequences)
  - [x] ValidationResult type
  - [x] validateName(), validateEmail(), validatePhone(), validateNotes()
  - [x] validateContact() method
  - [x] Constants for field limits

### crc-ContactService.md

**Source Spec:** main.md, coding-standards.md

**Implementation:**
- [x] **src/services/ContactService.ts**
  - [x] File header (CRC + Spec + Sequences)
  - [x] Constructor with dependency injection (validator, repository)
  - [x] createContact(), updateContact(), deleteContact()
  - [x] getContact(), getAllContacts()
  - [x] generateId() using UUID

### crc-IContactRepository.md

**Source Spec:** main.md, coding-standards.md

**Implementation:**
- [x] **src/services/IContactRepository.ts**
  - [x] File header (CRC + Spec)
  - [x] Interface definition with all methods

### crc-LocalStorageContactRepository.md

**Source Spec:** main.md

**Implementation:**
- [x] **src/services/LocalStorageContactRepository.ts**
  - [x] File header (CRC + Spec + Sequences)
  - [x] Implements IContactRepository
  - [x] serialize(), deserialize() methods
  - [x] Error handling for storage issues

### crc-NotificationService.md

**Source Spec:** main.md

**Implementation:**
- [x] **src/services/NotificationService.ts**
  - [x] File header (CRC + Spec + Sequences)
  - [x] Notification type definition
  - [x] showSuccess(), showError(), showWarning()
  - [x] Auto-dismiss timer

### crc-Router.md

**Source Spec:** main.md

**Implementation:**
- [x] **src/services/Router.ts**
  - [x] File header (CRC + Spec + Sequences)
  - [x] Route registration
  - [x] navigate(), back() methods
  - [x] popstate event handler

### crc-App.md

**Source Spec:** main.md, coding-standards.md

**Implementation:**
- [x] **src/App.ts**
  - [x] File header (CRC + Spec + Sequences)
  - [x] initialize() method
  - [x] Dependency injection setup
  - [x] Route registration

### crc-ContactListView.md

**Source Spec:** main.md

**Implementation:**
- [x] **src/ui/ContactListView.ts**
  - [x] File header (CRC + Spec + Sequences)
  - [x] render() method
  - [x] Event handlers for click actions

### crc-ContactFormView.md

**Source Spec:** main.md

**Implementation:**
- [x] **src/ui/ContactFormView.ts**
  - [x] File header (CRC + Spec + Sequences)
  - [x] render() for both create and edit modes
  - [x] Form state management
  - [x] Validation display

### crc-ConfirmDialog.md

**Source Spec:** main.md

**Implementation:**
- [x] **src/ui/ConfirmDialog.ts**
  - [x] File header (CRC + Spec + Sequences)
  - [x] show(), hide() methods
  - [x] Event handlers for confirm/cancel

### crc-NotificationView.md

**Source Spec:** main.md

**Implementation:**
- [x] **src/ui/NotificationView.ts**
  - [x] File header (CRC + Spec + Sequences)
  - [x] render() for notification types
  - [x] Animation handling

---

## Tests

### Unit Tests

- [x] **tests/Contact.test.ts** -> crc-Contact.md, test-Contact.md
- [x] **tests/ContactValidator.test.ts** -> crc-ContactValidator.md, test-ContactValidator.md
- [x] **tests/ContactService.test.ts** -> crc-ContactService.md, test-ContactService.md
- [x] **tests/LocalStorageContactRepository.test.ts** -> crc-LocalStorageContactRepository.md, test-LocalStorageContactRepository.md
- [x] **tests/ContactListView.test.ts** -> crc-ContactListView.md, test-ContactListView.md
- [x] **tests/ContactFormView.test.ts** -> crc-ContactFormView.md, test-ContactFormView.md
- [x] **tests/ConfirmDialog.test.ts** -> crc-ConfirmDialog.md, test-ConfirmDialog.md

### Integration Tests

- [x] **tests/integration/app.integration.test.ts** -> seq-create-contact.md, seq-edit-contact.md, seq-delete-contact.md, seq-load-contacts.md, test-integration.md
