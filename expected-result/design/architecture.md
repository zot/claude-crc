# Architecture

**Entry point to the design - shows how design elements are organized into logical systems**

**Sources**: All CRC cards, sequences, UI specs, and manifest created from Level 1 specs

---

## Systems

### Contact Domain System

**Purpose**: Core contact data model and validation logic

**Design Elements**:
- crc-Contact.md
- crc-ContactValidator.md
- test-Contact.md
- test-ContactValidator.md

### Contact Persistence System

**Purpose**: Contact storage, retrieval, and data lifecycle management

**Design Elements**:
- crc-ContactStorage.md
- crc-ContactService.md
- seq-load-contacts.md
- test-ContactStorage.md
- test-ContactService.md

### Contact UI System

**Purpose**: User interface for viewing, creating, editing, and deleting contacts

**Design Elements**:
- crc-ContactListView.md
- crc-ContactDetailView.md
- ui-contact-list-view.md
- ui-contact-detail-view.md
- seq-create-contact.md
- seq-edit-contact.md
- seq-delete-contact.md
- test-ContactListView.md
- test-ContactDetailView.md

---

## Cross-Cutting Concerns

**Design elements that span multiple systems**

**Design Elements**:
- manifest-ui.md

---

*This file serves as the architectural "main program" - start here to understand the design structure*
