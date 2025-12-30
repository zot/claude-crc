# Test Design: Integration Tests

**Source Sequences:** seq-create-contact.md, seq-edit-contact.md, seq-delete-contact.md, seq-load-contacts.md
**Source Spec:** main.md

## Purpose

Test end-to-end workflows from user action to storage.

## Create Contact Flow (seq-create-contact.md)

### TC-INT-1: Create Contact End-to-End

**Purpose:** Verify complete create flow

**Setup:**
- Full application with real LocalStorage
- Clear storage before test

**Steps:**
1. Navigate to list view
2. Click "Add Contact"
3. Fill name: "John Doe"
4. Fill email: "john@example.com"
5. Fill phone: "1234567890"
6. Fill notes: "Test contact"
7. Click Save

**Expected Result:**
- Navigates to list view
- "John Doe" appears in list
- Success notification displayed
- LocalStorage contains contact

### TC-INT-2: Create with Validation Error

**Purpose:** Verify validation prevents invalid save

**Setup:**
- Application on create form

**Steps:**
1. Leave name empty
2. Enter invalid email "notanemail"
3. Click Save

**Expected Result:**
- Remains on form
- Name error displayed
- Email error displayed
- No contact in storage

## Edit Contact Flow (seq-edit-contact.md)

### TC-INT-3: Edit Contact End-to-End

**Purpose:** Verify complete edit flow

**Setup:**
- Application with existing contact "Alice"

**Steps:**
1. Click on "Alice" in list
2. Change name to "Alice Smith"
3. Click Save

**Expected Result:**
- Navigates to list view
- "Alice Smith" in list (was "Alice")
- Success notification displayed
- LocalStorage updated

### TC-INT-4: Cancel Edit with Changes

**Purpose:** Verify discard confirmation

**Setup:**
- Application on edit form with contact

**Steps:**
1. Modify name field
2. Click Cancel
3. Click "Discard" in confirmation

**Expected Result:**
- Confirmation dialog appears
- Navigates to list on confirm
- Original data preserved in storage

## Delete Contact Flow (seq-delete-contact.md)

### TC-INT-5: Delete Contact End-to-End

**Purpose:** Verify complete delete flow

**Setup:**
- Application with existing contact "Bob"

**Steps:**
1. Click on "Bob" in list
2. Click Delete
3. Click Confirm in dialog

**Expected Result:**
- Confirmation dialog appears
- Navigates to list on confirm
- "Bob" no longer in list
- Success notification displayed
- LocalStorage updated (no Bob)

### TC-INT-6: Cancel Delete

**Purpose:** Verify delete can be cancelled

**Setup:**
- Application on edit form with contact

**Steps:**
1. Click Delete
2. Click Cancel in confirmation

**Expected Result:**
- Confirmation closes
- Remains on form
- Contact still in storage

## Load Contacts Flow (seq-load-contacts.md)

### TC-INT-7: Load on Startup

**Purpose:** Verify contacts loaded from storage on app init

**Setup:**
- LocalStorage with 3 contacts
- Fresh application load

**Steps:**
1. Initialize application

**Expected Result:**
- List view shows 3 contacts
- Contacts sorted alphabetically
- All data correct from storage

### TC-INT-8: Load Empty Storage

**Purpose:** Verify empty state on first run

**Setup:**
- Empty LocalStorage
- Fresh application load

**Steps:**
1. Initialize application

**Expected Result:**
- List view shows empty state
- "Add Contact" CTA visible

### TC-INT-9: Load Corrupted Storage

**Purpose:** Verify graceful handling of bad data

**Setup:**
- LocalStorage with malformed JSON

**Steps:**
1. Initialize application

**Expected Result:**
- Error notification displayed
- Empty list shown (or recovery option)
- Application still usable

## Browser Navigation

### TC-INT-10: Back Button

**Purpose:** Verify browser back works correctly

**Setup:**
- Application on list view

**Steps:**
1. Click "Add Contact" (goes to /new)
2. Click browser back button

**Expected Result:**
- Returns to list view
- No errors

### TC-INT-11: Dirty Form Back Button

**Purpose:** Verify confirmation on back with unsaved changes

**Setup:**
- Application on create form with changes

**Steps:**
1. Modify form
2. Click browser back button

**Expected Result:**
- Confirmation dialog appears
- Behavior depends on user choice
