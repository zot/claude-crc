# Test Design: ContactListView

**Source Specs**: main.md (FR3, UI2, NFR1)
**CRC Cards**: crc-ContactListView.md
**UI Specs**: ui-contact-list-view.md
**Sequences**: seq-load-contacts.md

## Overview

Test suite for ContactListView covering rendering, navigation, and user interactions.

## Test Cases

### Test: Render contact list

**Purpose**: Verify that contact list renders all contacts with correct data.

**Motivation**: Core display functionality. Ensures users can see their contacts.

**Input**:
- ContactService returns 3 contacts:
  - Contact 1: name "Alice", email "alice@test.com", phone "555-1111"
  - Contact 2: name "Bob", email "bob@test.com", phone "555-2222"
  - Contact 3: name "Charlie", email "", phone "555-3333"

**References**:
- CRC: crc-ContactListView.md - "Does: render()"
- UI: ui-contact-list-view.md - Layout Structure

**Expected Results**:
- 3 contact cards rendered in DOM
- Each card displays contact name, email, phone
- Contact 3 shows phone but no email (optional field)
- Cards are in alphabetically sorted order
- "Add Contact" button is visible

**References**:
- UI: ui-contact-list-view.md - Data Bindings
- Spec: main.md FR3 - "Display Name, Email, Phone"

---

### Test: Render empty state

**Purpose**: Verify that empty state message displays when no contacts exist.

**Motivation**: Guides new users. Better UX than blank screen.

**Input**:
- ContactService returns empty array

**References**:
- CRC: crc-ContactListView.md - "Does: showEmptyState()"
- UI: ui-contact-list-view.md - Layout (empty state)

**Expected Results**:
- No contact cards rendered
- Empty state message displayed: "No contacts yet"
- Prompt message: "Click 'Add Contact' to get started"
- "Add Contact" button still visible

**References**:
- UI: ui-contact-list-view.md - CSS Classes (.empty-state)
- Spec: main.md FR3 - "Empty state shown if no contacts"

---

### Test: Navigate to create contact

**Purpose**: Verify that clicking "Add Contact" button navigates to create view.

**Motivation**: Primary user action. Entry point for adding contacts.

**Input**:
- User clicks "Add Contact" button

**References**:
- CRC: crc-ContactListView.md - "Does: onAddContactClick()"
- UI: ui-contact-list-view.md - Events

**Expected Results**:
- onAddContactClick() called
- Navigation to /contact/new (ContactDetailView in create mode)

**References**:
- UI: ui-contact-list-view.md - Navigation
- Manifest: manifest-ui.md - Routes

---

### Test: Navigate to edit contact

**Purpose**: Verify that clicking a contact card navigates to edit view with contact ID.

**Motivation**: Primary user action. Entry point for viewing/editing contacts.

**Input**:
- User clicks contact card for contact with id "uuid-123"

**References**:
- CRC: crc-ContactListView.md - "Does: onContactClick()"
- UI: ui-contact-list-view.md - Events

**Expected Results**:
- onContactClick("uuid-123") called
- Navigation to /contact/uuid-123 (ContactDetailView in edit mode)

**References**:
- UI: ui-contact-list-view.md - Navigation
- Manifest: manifest-ui.md - Routes

---

### Test: Load contacts on initialization

**Purpose**: Verify that contacts are loaded from service when view initializes.

**Motivation**: Initial data load. Ensures view displays current data.

**Input**:
- View initialization
- ContactService.getAllContacts() returns 5 contacts

**References**:
- CRC: crc-ContactListView.md - "Does: loadContacts()"
- Sequence: seq-load-contacts.md

**Expected Results**:
- loadContacts() called during initialization
- ContactService.getAllContacts() called
- 5 contacts stored in view state
- render() called to display contacts

**References**:
- CRC: crc-ContactListView.md - "Knows: contacts array"
- Spec: main.md FR3 - "View Contact List"

---

### Test: Sort contacts alphabetically

**Purpose**: Verify that contacts are displayed in alphabetical order by name.

**Motivation**: Predictable ordering. Easier to find contacts.

**Input**:
- ContactService returns contacts in unsorted order: "Zebra", "Apple", "Mango"

**References**:
- CRC: crc-ContactListView.md - "Does: sortContactsByName()"
- Sequence: seq-load-contacts.md

**Expected Results**:
- Contacts displayed in order: "Apple", "Mango", "Zebra"
- Sorting is case-insensitive

**References**:
- CRC: crc-ContactListView.md - "Does: sortContactsByName()"
- Spec: main.md FR3 - "Contacts sorted alphabetically by name"

---

### Test: Display success message

**Purpose**: Verify that success messages are displayed after operations (create/update/delete).

**Motivation**: User feedback. Confirms operations completed successfully.

**Input**:
- View receives success message "Contact created successfully"

**References**:
- CRC: crc-ContactListView.md - "Does: showSuccessMessage()"
- Manifest: manifest-ui.md - Success Messages

**Expected Results**:
- Success message displayed on screen
- Message auto-dismisses after 3 seconds
- Message does not block user interaction

**References**:
- Manifest: manifest-ui.md - Global UI Patterns (Success Messages)
- Spec: main.md FR2, FR4, FR5 - "Show success message"

---

### Test: Keyboard navigation

**Purpose**: Verify that contact list supports keyboard navigation (Tab, Enter).

**Motivation**: Accessibility requirement. Supports keyboard-only users.

**Input**:
- User navigates with Tab key to contact card
- User presses Enter on focused contact

**References**:
- UI: ui-contact-list-view.md - Events (keyboard)
- Manifest: manifest-ui.md - Accessibility

**Expected Results**:
- Tab key moves focus between contacts and "Add Contact" button
- Focus indicator visible on focused element
- Enter key on focused contact navigates to edit view
- Enter key on "Add Contact" button navigates to create view

**References**:
- Manifest: manifest-ui.md - Accessibility (Keyboard navigation support)
- Spec: main.md UI4 - "Accessible (keyboard navigation)"

---

### Test: Render performance with 1000 contacts

**Purpose**: Verify that list view renders within 100ms for up to 1000 contacts.

**Motivation**: Performance requirement. Ensures responsive UI.

**Input**:
- ContactService returns 1000 contacts

**References**:
- Spec: main.md NFR1 - "List view shall render within 100ms for up to 1000 contacts"

**Expected Results**:
- render() completes within 100ms
- All 1000 contacts visible (or virtualized)
- UI remains responsive

**References**:
- Spec: main.md NFR1 - Performance

---

## Coverage Summary

**Responsibilities Covered**:
- ✅ render() - 2 test cases (with contacts, empty state)
- ✅ loadContacts() - 1 test case
- ✅ onContactClick() - 1 test case
- ✅ onAddContactClick() - 1 test case
- ✅ showEmptyState() - 1 test case (integrated with render)
- ✅ sortContactsByName() - 1 test case (integrated with load)
- ✅ Success messages - 1 test case
- ✅ Keyboard navigation - 1 test case
- ✅ Performance - 1 test case

**Scenarios Covered**:
- ✅ Happy path: Display contacts, navigate to create/edit
- ✅ Empty state: No contacts
- ✅ User interactions: Click, keyboard
- ✅ Performance: 1000 contacts
- ✅ Accessibility: Keyboard support

**Gaps**:
- None - all ContactListView responsibilities have tests
