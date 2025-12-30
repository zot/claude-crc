# Architecture

**Entry point to the design - shows how design elements are organized into logical systems**

**Sources**: main.md, coding-standards.md

---

## Systems

### Contact Domain System

**Purpose**: Contact data model, validation, and business logic

**Design Elements**:
- crc-Contact.md
- crc-ContactValidator.md
- crc-ContactService.md

### Persistence System

**Purpose**: Data storage and retrieval abstraction

**Design Elements**:
- crc-IContactRepository.md
- crc-LocalStorageContactRepository.md
- seq-load-contacts.md

### UI System

**Purpose**: User interface views and components

**Design Elements**:
- crc-ContactListView.md
- crc-ContactFormView.md
- crc-ConfirmDialog.md
- crc-NotificationView.md
- ui-contact-list.md
- ui-contact-form.md
- ui-confirm-dialog.md
- ui-notification.md

### Workflow System

**Purpose**: User interaction flows and scenarios

**Design Elements**:
- seq-create-contact.md
- seq-edit-contact.md
- seq-delete-contact.md

---

## Cross-Cutting Concerns

**Design elements that span multiple systems**

**Design Elements**:
- crc-App.md
- crc-Router.md
- crc-NotificationService.md
- manifest-ui.md

---

*This file serves as the architectural "main program" - start here to understand the design structure*
