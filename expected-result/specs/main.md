# Contact Manager Specification

**Project:** Simple Contact Manager
**Purpose:** Demonstrate CRC modeling methodology with a basic CRUD application

---

## Overview

A simple contact manager application that allows users to create, view, edit, and delete contacts. Contacts are stored locally and persist between sessions.

---

## Functional Requirements

### FR1: Contact Data Model

Each contact shall have the following fields:
- **ID**: Unique identifier (auto-generated UUID)
- **Name**: Full name (required, 1-100 characters)
- **Email**: Email address (optional, valid email format)
- **Phone**: Phone number (optional, 10-20 characters)
- **Notes**: Additional notes (optional, up to 500 characters)
- **Created**: Timestamp when contact was created (auto-generated)
- **Modified**: Timestamp when contact was last modified (auto-updated)

### FR2: Create Contact

Users shall be able to create a new contact by:
1. Clicking "Add Contact" button
2. Filling in contact fields in a form
3. Clicking "Save" to persist the contact

**Validation:**
- Name is required
- Email must be valid format if provided
- Phone must be valid format if provided

**Behavior:**
- Generate unique ID automatically
- Set created and modified timestamps
- Save to storage
- Return to contact list view
- Show success message

### FR3: View Contact List

Users shall see a list of all contacts displaying:
- Name (clickable to view/edit)
- Email
- Phone

**Behavior:**
- Contacts sorted alphabetically by name
- Empty state shown if no contacts
- Click contact to view/edit details

### FR4: View/Edit Contact

Users shall be able to view and edit an existing contact by:
1. Clicking on a contact from the list
2. Viewing all contact fields
3. Modifying any field
4. Clicking "Save" to persist changes or "Cancel" to discard

**Validation:**
- Same validation rules as create
- Detect unsaved changes
- Prompt before discarding changes

**Behavior:**
- Update modified timestamp on save
- Return to contact list on save/cancel

### FR5: Delete Contact

Users shall be able to delete a contact by:
1. Viewing a contact
2. Clicking "Delete" button
3. Confirming deletion

**Behavior:**
- Show confirmation dialog
- Remove from storage on confirm
- Return to contact list
- Show success message

### FR6: Data Persistence

All contact data shall be persisted locally using browser storage:
- Use LocalStorage or IndexedDB
- Persist immediately on save
- Load on application start
- Handle storage errors gracefully

---

## Non-Functional Requirements

### NFR1: Performance
- List view shall render within 100ms for up to 1000 contacts
- Save operations shall complete within 200ms

### NFR2: Usability
- Form validation feedback shall be immediate
- Unsaved changes shall be clearly indicated
- Error messages shall be clear and actionable

### NFR3: Data Integrity
- No data loss on browser refresh
- Atomic save operations (all-or-nothing)
- Validate data before saving

### NFR4: Browser Compatibility
- Support modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation for older browsers

---

## User Interface Requirements

### UI1: Navigation
- Simple single-page application
- Clear navigation between list and detail views
- Browser back button shall work correctly

### UI2: List View
- Show all contacts in a scrollable list
- "Add Contact" button prominently displayed
- Search/filter capability (future enhancement)

### UI3: Detail/Edit View
- Form layout with labeled fields
- Clear "Save", "Cancel", and "Delete" buttons
- Validation errors displayed inline
- Confirmation dialog for destructive actions

### UI4: Visual Design
- Clean, minimal interface
- Responsive layout (works on mobile and desktop)
- Accessible (keyboard navigation, screen readers)

---

## Data Flow

### Create Flow
```
User clicks "Add Contact"
  → Show empty contact form
  → User fills fields
  → User clicks "Save"
  → Validate input
  → Generate ID and timestamps
  → Save to storage
  → Navigate to list view
  → Show success message
```

### Edit Flow
```
User clicks contact from list
  → Load contact from storage
  → Show populated form
  → User modifies fields
  → User clicks "Save"
  → Validate input
  → Update modified timestamp
  → Save to storage
  → Navigate to list view
  → Show success message
```

### Delete Flow
```
User clicks "Delete" button
  → Show confirmation dialog
  → User confirms
  → Remove from storage
  → Navigate to list view
  → Show success message
```

---

## Error Handling

### EH1: Validation Errors
- Display field-level error messages
- Prevent save until errors corrected
- Do not lose user input on validation failure

### EH2: Storage Errors
- Detect storage quota exceeded
- Detect storage access denied
- Show user-friendly error messages
- Provide recovery options when possible

### EH3: Data Corruption
- Validate data structure on load
- Handle missing or malformed data
- Provide option to reset/clear data

---

## Future Enhancements

(Out of scope for initial version)
- Search and filter contacts
- Import/export contacts (CSV, vCard)
- Contact groups/categories
- Photo attachments
- Sync across devices
- Undo/redo functionality

---

## Acceptance Criteria

1. ✅ Can create contacts with all fields
2. ✅ Can view list of all contacts
3. ✅ Can edit existing contacts
4. ✅ Can delete contacts with confirmation
5. ✅ Data persists across page refreshes
6. ✅ Validation prevents invalid data
7. ✅ UI is responsive and accessible
8. ✅ All operations complete within performance targets
