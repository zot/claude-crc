# Test Design: ContactFormView

**Source CRC:** crc-ContactFormView.md
**Source Spec:** main.md (FR2, FR4, UI3)

## Purpose

Test contact form view for create and edit modes.

## Test Cases

### TC-1: Render Create Mode

**Purpose:** Verify form renders empty for new contact

**Setup:**
- ContactFormView in create mode
- Mock dependencies

**Input:** Route to /new

**Expected Result:**
- Title shows "Create Contact"
- All fields empty
- Delete button NOT visible
- Save and Cancel buttons visible

### TC-2: Render Edit Mode

**Purpose:** Verify form populates with existing contact

**Setup:**
- ContactFormView in edit mode
- Mock ContactService with existing contact

**Input:** Route to /edit/{id}

**Expected Result:**
- Title shows "Edit Contact"
- Fields populated with contact data
- Delete button visible
- Save and Cancel buttons visible

### TC-3: Real-time Validation

**Purpose:** Verify validation on field blur

**Setup:**
- ContactFormView instance
- Mock ContactValidator

**Input:** Enter invalid email, blur field

**Expected Result:**
- Error message displayed below field
- Field marked as invalid (red border)

### TC-4: Save Valid Contact (Create)

**Purpose:** Verify successful create submission

**Setup:**
- ContactFormView in create mode
- Mock all dependencies (validation passes)

**Input:** Fill valid data, click Save

**Expected Result:**
- ContactService.createContact() called
- NotificationService.showSuccess() called
- Router.navigate("/") called

### TC-5: Save Valid Contact (Edit)

**Purpose:** Verify successful edit submission

**Setup:**
- ContactFormView in edit mode
- Mock all dependencies (validation passes)

**Input:** Modify data, click Save

**Expected Result:**
- ContactService.updateContact() called
- NotificationService.showSuccess() called
- Router.navigate("/") called

### TC-6: Save Invalid Contact

**Purpose:** Verify form prevents save with errors

**Setup:**
- ContactFormView instance
- Mock ContactValidator (returns errors)

**Input:** Invalid data, click Save

**Expected Result:**
- Validation errors displayed
- ContactService NOT called
- User remains on form

### TC-7: Cancel Without Changes

**Purpose:** Verify cancel navigates directly when pristine

**Setup:**
- ContactFormView instance (pristine)
- Mock Router

**Input:** Click Cancel

**Expected Result:**
- Router.navigate("/") called immediately
- No confirmation dialog

### TC-8: Cancel With Unsaved Changes

**Purpose:** Verify confirmation before discarding changes

**Setup:**
- ContactFormView instance (dirty)
- Mock ConfirmDialog, Router

**Input:** Modify field, click Cancel

**Expected Result:**
- ConfirmDialog shown with discard message
- Navigation only after confirm

### TC-9: Delete Contact

**Purpose:** Verify delete with confirmation

**Setup:**
- ContactFormView in edit mode
- Mock ConfirmDialog, ContactService

**Input:** Click Delete, confirm

**Expected Result:**
- ConfirmDialog shown
- ContactService.deleteContact() called after confirm
- Router.navigate("/") called

### TC-10: Delete Cancel

**Purpose:** Verify delete can be cancelled

**Setup:**
- ContactFormView in edit mode
- Mock ConfirmDialog

**Input:** Click Delete, cancel dialog

**Expected Result:**
- ContactService.deleteContact() NOT called
- User remains on form

### TC-11: Dirty State Tracking

**Purpose:** Verify isDirty updates on field change

**Setup:**
- ContactFormView instance

**Input:** Modify any field

**Expected Result:**
- isDirty becomes true
- Subsequent changes maintain dirty state

### TC-12: Character Count Display

**Purpose:** Verify notes character counter

**Setup:**
- ContactFormView instance

**Input:** Enter notes text

**Expected Result:**
- Counter shows "X/500 characters"
- Updates as user types
