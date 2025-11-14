# Traceability Map

**Purpose:** Bidirectional links between specs, design, and code

---

## Level 1 ↔ Level 2 (Specs to Design)

### main.md

**CRC Cards:**
- crc-Contact.md (FR1: Contact Data Model)
- crc-ContactValidator.md (FR2: Create Contact - Validation, FR4: View/Edit Contact - Validation)
- crc-ContactStorage.md (FR6: Data Persistence)
- crc-ContactService.md (FR2: Create Contact, FR3: View Contact List, FR4: View/Edit Contact, FR5: Delete Contact)
- crc-ContactListView.md (FR3: View Contact List, UI2: List View)
- crc-ContactDetailView.md (FR2: Create Contact, FR4: View/Edit Contact, FR5: Delete Contact, UI3: Detail/Edit View)

**Sequence Diagrams:**
- seq-create-contact.md (FR2: Create Contact)
- seq-edit-contact.md (FR4: View/Edit Contact)
- seq-delete-contact.md (FR5: Delete Contact)
- seq-load-contacts.md (FR3: View Contact List, FR6: Data Persistence)

**UI Specs:**
- ui-contact-list-view.md (FR3: View Contact List, UI2: List View)
- ui-contact-detail-view.md (FR2: Create Contact, FR4: View/Edit Contact, FR5: Delete Contact, UI3: Detail/Edit View)

**Global UI:**
- manifest-ui.md (UI1: Navigation, UI4: Visual Design, NFR2: Usability)

### coding-standards.md

**Referenced in Design:**
- manifest-ui.md (Accessibility requirements, code organization principles)
- All CRC cards (SOLID principles, naming conventions, error handling patterns)

---

## Level 2 ↔ Level 3 (Design to Implementation)

### crc-Contact.md

**Source Spec:** main.md (FR1)

**Implementation:**
- **src/models/Contact.ts**
  - [ ] File header (CRC + Spec + Sequences)
  - [ ] Contact interface comment → crc-Contact.md
  - [ ] IContact interface properties → crc-Contact.md
  - [ ] validate() method comment → crc-Contact.md
  - [ ] toJSON() method comment → crc-Contact.md
  - [ ] fromJSON() method comment → crc-Contact.md

**Tests:**
- **tests/models/Contact.test.ts**
  - [ ] File header referencing CRC card
  - [ ] Test suite for Contact validation
  - [ ] Test suite for Contact serialization

---

### crc-ContactValidator.md

**Source Spec:** main.md (FR2, FR4)

**Implementation:**
- **src/utils/ContactValidator.ts**
  - [ ] File header (CRC + Spec + Sequences)
  - [ ] ContactValidator class comment → crc-ContactValidator.md
  - [ ] Constants (MAX_NAME_LENGTH, etc.) → crc-ContactValidator.md
  - [ ] validateName() method comment → seq-create-contact.md, seq-edit-contact.md
  - [ ] validateEmail() method comment → seq-create-contact.md, seq-edit-contact.md
  - [ ] validatePhone() method comment → seq-create-contact.md, seq-edit-contact.md
  - [ ] validateNotes() method comment → seq-create-contact.md, seq-edit-contact.md
  - [ ] validateContact() method comment → seq-create-contact.md, seq-edit-contact.md

**Tests:**
- **tests/utils/ContactValidator.test.ts**
  - [ ] File header referencing CRC card
  - [ ] Test suite for each validation rule
  - [ ] Test suite for edge cases

---

### crc-ContactStorage.md

**Source Spec:** main.md (FR6)

**Implementation:**
- **src/services/ContactStorage.ts**
  - [ ] File header (CRC + Spec + Sequences)
  - [ ] ContactStorage class comment → crc-ContactStorage.md
  - [ ] IContactStorage interface comment → crc-ContactStorage.md
  - [ ] STORAGE_KEY constant → crc-ContactStorage.md
  - [ ] initialize() method comment → seq-load-contacts.md
  - [ ] saveContact() method comment → seq-create-contact.md, seq-edit-contact.md
  - [ ] getContact() method comment → seq-edit-contact.md
  - [ ] getAllContacts() method comment → seq-load-contacts.md
  - [ ] deleteContact() method comment → seq-delete-contact.md
  - [ ] handleStorageError() method comment → crc-ContactStorage.md

**Tests:**
- **tests/services/ContactStorage.test.ts**
  - [ ] File header referencing CRC card
  - [ ] Test suite for CRUD operations
  - [ ] Test suite for error handling
  - [ ] Test suite for data persistence

---

### crc-ContactService.md

**Source Spec:** main.md (FR2, FR3, FR4, FR5)

**Implementation:**
- **src/services/ContactService.ts**
  - [ ] File header (CRC + Spec + Sequences)
  - [ ] ContactService class comment → crc-ContactService.md
  - [ ] IContactService interface comment → crc-ContactService.md
  - [ ] createContact() method comment → seq-create-contact.md
  - [ ] updateContact() method comment → seq-edit-contact.md
  - [ ] deleteContact() method comment → seq-delete-contact.md
  - [ ] getContact() method comment → seq-edit-contact.md
  - [ ] getAllContacts() method comment → seq-load-contacts.md
  - [ ] generateId() method comment → crc-ContactService.md

**Tests:**
- **tests/services/ContactService.test.ts**
  - [ ] File header referencing CRC card
  - [ ] Test suite for createContact
  - [ ] Test suite for updateContact
  - [ ] Test suite for deleteContact
  - [ ] Test suite for getContact
  - [ ] Test suite for getAllContacts
  - [ ] Test suite for validation integration

---

### crc-ContactListView.md

**Source Spec:** main.md (FR3, UI2)

**Implementation:**
- **src/ui/ContactListView.ts**
  - [ ] File header (CRC + Spec + Sequences)
  - [ ] ContactListView class comment → crc-ContactListView.md
  - [ ] render() method comment → ui-contact-list-view.md
  - [ ] loadContacts() method comment → seq-load-contacts.md
  - [ ] onContactClick() method comment → seq-edit-contact.md
  - [ ] onAddContactClick() method comment → seq-create-contact.md
  - [ ] showEmptyState() method comment → ui-contact-list-view.md
  - [ ] sortContactsByName() method comment → seq-load-contacts.md

**Templates:**
- **public/templates/contact-list-view.html**
  - [ ] File header → ui-contact-list-view.md

**Tests:**
- **tests/ui/ContactListView.test.ts**
  - [ ] File header referencing CRC card
  - [ ] Test suite for rendering
  - [ ] Test suite for navigation
  - [ ] Test suite for empty state

---

### crc-ContactDetailView.md

**Source Spec:** main.md (FR2, FR4, FR5, UI3)

**Implementation:**
- **src/ui/ContactDetailView.ts**
  - [ ] File header (CRC + Spec + Sequences)
  - [ ] ContactDetailView class comment → crc-ContactDetailView.md
  - [ ] render() method comment → ui-contact-detail-view.md
  - [ ] loadContact() method comment → seq-edit-contact.md
  - [ ] onSaveClick() method comment → seq-create-contact.md, seq-edit-contact.md
  - [ ] onCancelClick() method comment → ui-contact-detail-view.md
  - [ ] onDeleteClick() method comment → seq-delete-contact.md
  - [ ] onFieldChange() method comment → seq-create-contact.md, seq-edit-contact.md
  - [ ] validateField() method comment → seq-create-contact.md, seq-edit-contact.md
  - [ ] showValidationErrors() method comment → ui-contact-detail-view.md
  - [ ] confirmUnsavedChanges() method comment → ui-contact-detail-view.md
  - [ ] confirmDelete() method comment → seq-delete-contact.md

**Templates:**
- **public/templates/contact-detail-view.html**
  - [ ] File header → ui-contact-detail-view.md

**Tests:**
- **tests/ui/ContactDetailView.test.ts**
  - [ ] File header referencing CRC card
  - [ ] Test suite for create mode
  - [ ] Test suite for edit mode
  - [ ] Test suite for validation
  - [ ] Test suite for dirty state detection
  - [ ] Test suite for confirmation dialogs

---

## Verification Checklist

- [ ] All specs have design artifacts
- [ ] All CRC cards have implementation checkboxes
- [ ] All sequences reference participants from CRC cards
- [ ] All UI specs reference CRC cards and manifest-ui.md
- [ ] All designs will have tests
- [ ] Traceability comments to be added when code is implemented
