# Test Design: ContactDetailView

**Source Specs**: main.md (FR2, FR4, FR5, UI3, NFR2)
**CRC Cards**: crc-ContactDetailView.md
**UI Specs**: ui-contact-detail-view.md
**Sequences**: seq-create-contact.md, seq-edit-contact.md, seq-delete-contact.md

## Overview

Test suite for ContactDetailView covering create mode, edit mode, validation, dirty state detection, and confirmation dialogs.

## Test Cases

### Test: Render form in create mode

**Purpose**: Verify that form renders empty in create mode with correct title and buttons.

**Motivation**: Entry point for creating contacts. Ensures proper UI state.

**Input**:
- Navigate to /contact/new (create mode)

**References**:
- CRC: crc-ContactDetailView.md - "Does: render()"
- UI: ui-contact-detail-view.md - Layout Structure

**Expected Results**:
- Form title: "New Contact"
- All fields empty
- "Save" and "Cancel" buttons visible
- "Delete" button NOT visible (create mode)
- Name field marked as required

**References**:
- CRC: crc-ContactDetailView.md - "Knows: mode ('create')"
- UI: ui-contact-detail-view.md - Create mode layout

---

### Test: Render form in edit mode

**Purpose**: Verify that form renders with existing contact data in edit mode.

**Motivation**: Entry point for editing contacts. Ensures data is loaded.

**Input**:
- Navigate to /contact/uuid-123 (edit mode)
- Contact exists with:
  - name: "John Doe"
  - email: "john@example.com"
  - phone: "555-1234"
  - notes: "Test notes"

**References**:
- CRC: crc-ContactDetailView.md - "Does: loadContact()"
- UI: ui-contact-detail-view.md - Layout Structure

**Expected Results**:
- Form title: "Edit Contact"
- All fields populated with contact data
- "Save", "Cancel", and "Delete" buttons visible
- isDirty initially false

**References**:
- CRC: crc-ContactDetailView.md - "Knows: mode ('edit'), contact, isDirty"
- Sequence: seq-edit-contact.md

---

### Test: Validate field on change (inline validation)

**Purpose**: Verify that fields are validated as user types with immediate feedback.

**Motivation**: Inline validation requirement. Improves UX.

**Input**:
- User types "invalid-email" in email field
- User clears name field (required)

**References**:
- CRC: crc-ContactDetailView.md - "Does: validateField()"
- UI: ui-contact-detail-view.md - Validation Rules

**Expected Results**:
- onFieldChange() called for each field change
- validateField() called for each field
- Error messages displayed below invalid fields:
  - Email: "Invalid email format"
  - Name: "Name is required (1-100 characters)"
- Fields marked with error styling

**References**:
- CRC: crc-ContactDetailView.md - "Does: onFieldChange(), validateField()"
- Manifest: manifest-ui.md - Validation Pattern

---

### Test: Track dirty state

**Purpose**: Verify that isDirty flag is set when user modifies any field.

**Motivation**: Unsaved change detection. Prevents data loss.

**Input**:
- Form in edit mode with existing data
- User modifies name field

**References**:
- CRC: crc-ContactDetailView.md - "Does: onFieldChange()"
- Manifest: manifest-ui.md - Unsaved Change Detection

**Expected Results**:
- isDirty initially false
- After field change, isDirty becomes true
- isDirty remains true until save or cancel

**References**:
- CRC: crc-ContactDetailView.md - "Knows: isDirty"
- UI: ui-contact-detail-view.md - State Management

---

### Test: Save contact with valid data (create mode)

**Purpose**: Verify that creating a contact with valid data saves and navigates to list.

**Motivation**: Core create flow. Ensures data is persisted.

**Input**:
- Form in create mode
- User fills all fields with valid data
- User clicks "Save"

**References**:
- CRC: crc-ContactDetailView.md - "Does: onSaveClick()"
- Sequence: seq-create-contact.md

**Expected Results**:
- All fields validated
- ContactService.createContact() called with field values
- Contact created successfully
- Navigate to ContactListView
- Success message: "Contact created successfully"

**References**:
- CRC: crc-ContactDetailView.md - "Does: onSaveClick()"
- Spec: main.md FR2 - "Save to storage, return to list, show success message"

---

### Test: Save contact with validation errors

**Purpose**: Verify that attempting to save with validation errors prevents save and shows errors.

**Motivation**: Prevents invalid data from being saved.

**Input**:
- Form with invalid data:
  - name: "" (empty)
  - email: "invalid-email"
- User clicks "Save"

**References**:
- CRC: crc-ContactDetailView.md - "Does: onSaveClick()"
- UI: ui-contact-detail-view.md - Validation Rules

**Expected Results**:
- Validation runs on all fields
- Validation errors displayed inline
- ContactService.createContact() NOT called
- Form remains on detail view (no navigation)
- User can correct errors and retry

**References**:
- CRC: crc-ContactDetailView.md - "Does: showValidationErrors()"
- Spec: main.md EH1 - "Display field-level error messages, prevent save until errors corrected"

---

### Test: Update contact (edit mode)

**Purpose**: Verify that updating a contact saves changes and navigates to list.

**Motivation**: Core edit flow. Ensures changes are persisted.

**Input**:
- Form in edit mode with existing contact
- User modifies name to "John Smith"
- User clicks "Save"

**References**:
- CRC: crc-ContactDetailView.md - "Does: onSaveClick()"
- Sequence: seq-edit-contact.md

**Expected Results**:
- Fields validated
- ContactService.updateContact() called with contact id and updated data
- Contact updated successfully
- Navigate to ContactListView
- Success message: "Contact updated successfully"

**References**:
- CRC: crc-ContactDetailView.md - "Does: onSaveClick()"
- Spec: main.md FR4 - "Save to storage, return to list"

---

### Test: Cancel without changes

**Purpose**: Verify that canceling without changes navigates back immediately.

**Motivation**: Clean cancel flow when no data loss risk.

**Input**:
- Form in edit mode
- User has NOT modified any fields (isDirty === false)
- User clicks "Cancel"

**References**:
- CRC: crc-ContactDetailView.md - "Does: onCancelClick()"
- UI: ui-contact-detail-view.md - Events

**Expected Results**:
- onCancelClick() called
- No confirmation dialog (isDirty is false)
- Navigate to ContactListView immediately
- No data saved

**References**:
- CRC: crc-ContactDetailView.md - "Does: onCancelClick()"
- Spec: main.md FR4 - "Clicking 'Cancel' to discard"

---

### Test: Cancel with unsaved changes

**Purpose**: Verify that canceling with unsaved changes shows confirmation dialog.

**Motivation**: Prevents accidental data loss. Required by spec.

**Input**:
- Form in edit mode
- User modifies fields (isDirty === true)
- User clicks "Cancel"

**References**:
- CRC: crc-ContactDetailView.md - "Does: confirmUnsavedChanges()"
- Manifest: manifest-ui.md - Unsaved Change Detection

**Expected Results**:
- Confirmation dialog shown: "You have unsaved changes. Are you sure you want to leave?"
- If user confirms: Navigate to ContactListView, changes discarded
- If user cancels dialog: Remain on detail view, can continue editing

**References**:
- CRC: crc-ContactDetailView.md - "Does: confirmUnsavedChanges()"
- Spec: main.md FR4 - "Detect unsaved changes, prompt before discarding changes"

---

### Test: Delete contact with confirmation

**Purpose**: Verify that deleting a contact requires confirmation and removes contact.

**Motivation**: Destructive action protection. Prevents accidental deletion.

**Input**:
- Form in edit mode for contact with id "uuid-123"
- User clicks "Delete"
- User confirms deletion

**References**:
- CRC: crc-ContactDetailView.md - "Does: onDeleteClick(), confirmDelete()"
- Sequence: seq-delete-contact.md

**Expected Results**:
- Confirmation dialog shown: "Are you sure you want to delete this contact? This cannot be undone."
- User clicks "Confirm"
- ContactService.deleteContact("uuid-123") called
- Contact deleted successfully
- Navigate to ContactListView
- Success message: "Contact deleted successfully"

**References**:
- CRC: crc-ContactDetailView.md - "Does: confirmDelete()"
- Spec: main.md FR5 - "Show confirmation dialog, remove from storage, return to list, show success"

---

### Test: Cancel delete confirmation

**Purpose**: Verify that canceling delete confirmation preserves contact.

**Motivation**: Allows user to reconsider. Prevents accidental deletion.

**Input**:
- Form in edit mode
- User clicks "Delete"
- User cancels deletion dialog

**References**:
- CRC: crc-ContactDetailView.md - "Does: confirmDelete()"
- Manifest: manifest-ui.md - Confirmation Dialogs

**Expected Results**:
- Confirmation dialog shown
- User clicks "Cancel"
- ContactService.deleteContact() NOT called
- Remain on detail view
- Contact unchanged

**References**:
- CRC: crc-ContactDetailView.md - "Does: confirmDelete()"
- Spec: main.md FR5 - "Show confirmation dialog"

---

### Test: Keyboard support (Escape to cancel)

**Purpose**: Verify that pressing Escape key triggers cancel action.

**Motivation**: Accessibility requirement. Keyboard support.

**Input**:
- Form displayed (create or edit mode)
- User presses Escape key

**References**:
- UI: ui-contact-detail-view.md - Events (keyboard)
- Manifest: manifest-ui.md - Accessibility

**Expected Results**:
- onCancelClick() triggered
- If dirty, confirmation dialog shown
- If not dirty, navigate to list

**References**:
- Manifest: manifest-ui.md - Accessibility (Keyboard navigation)
- Spec: main.md UI4 - "Accessible (keyboard navigation)"

---

### Test: Save operation completes within 200ms

**Purpose**: Verify that save operations complete within performance target.

**Motivation**: Performance requirement. Ensures responsive UI.

**Input**:
- Form with valid data
- User clicks "Save"

**References**:
- Spec: main.md NFR1 - "Save operations shall complete within 200ms"

**Expected Results**:
- Total time from "Save" click to navigation < 200ms
- Includes validation, service call, storage, navigation
- UI remains responsive during save

**References**:
- Spec: main.md NFR1 - Performance

---

## Coverage Summary

**Responsibilities Covered**:
- ✅ render() - 2 test cases (create mode, edit mode)
- ✅ loadContact() - 1 test case (integrated with edit mode)
- ✅ onSaveClick() - 3 test cases (create valid, validation errors, update)
- ✅ onCancelClick() - 2 test cases (with/without changes)
- ✅ onDeleteClick() - 2 test cases (confirm, cancel)
- ✅ onFieldChange() - 1 test case (dirty state)
- ✅ validateField() - 1 test case (inline validation)
- ✅ showValidationErrors() - 1 test case (integrated with save)
- ✅ confirmUnsavedChanges() - 1 test case
- ✅ confirmDelete() - 2 test cases (confirm, cancel)
- ✅ Keyboard support - 1 test case
- ✅ Performance - 1 test case

**Scenarios Covered**:
- ✅ Happy path: Create contact, update contact, delete contact
- ✅ Error path: Validation errors prevent save
- ✅ User protection: Unsaved changes confirmation, delete confirmation
- ✅ Dirty state: Tracking changes, confirmation dialogs
- ✅ User interactions: Click, keyboard
- ✅ Performance: Save within 200ms
- ✅ Accessibility: Keyboard support

**Gaps**:
- None - all ContactDetailView responsibilities have tests
