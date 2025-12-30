# Test Design: ConfirmDialog

**Source CRC:** crc-ConfirmDialog.md
**Source Spec:** main.md (FR4, FR5, UI3)

## Purpose

Test confirmation dialog behavior and accessibility.

## Test Cases

### TC-1: Show Dialog

**Purpose:** Verify dialog displays with correct content

**Setup:**
- ConfirmDialog instance

**Input:** show({ title, message, confirmLabel, cancelLabel })

**Expected Result:**
- Dialog visible
- Title displays
- Message displays
- Button labels correct

### TC-2: Confirm Action

**Purpose:** Verify confirm callback executed

**Setup:**
- ConfirmDialog instance
- Mock onConfirm callback

**Input:** Click confirm button

**Expected Result:**
- onConfirm callback called
- Dialog closes

### TC-3: Cancel Action

**Purpose:** Verify cancel callback executed

**Setup:**
- ConfirmDialog instance
- Mock onCancel callback

**Input:** Click cancel button

**Expected Result:**
- onCancel callback called
- Dialog closes

### TC-4: Overlay Click Closes

**Purpose:** Verify clicking backdrop closes dialog

**Setup:**
- ConfirmDialog instance (open)

**Input:** Click outside dialog box

**Expected Result:**
- Dialog closes
- Treated as cancel (onCancel called)

### TC-5: Escape Key Closes

**Purpose:** Verify Escape key closes dialog

**Setup:**
- ConfirmDialog instance (open)

**Input:** Press Escape key

**Expected Result:**
- Dialog closes
- Treated as cancel (onCancel called)

### TC-6: Focus Trap

**Purpose:** Verify focus stays within dialog

**Setup:**
- ConfirmDialog instance (open)

**Input:** Tab through dialog

**Expected Result:**
- Focus cycles between Cancel and Confirm buttons
- Focus cannot leave dialog

### TC-7: Initial Focus

**Purpose:** Verify initial focus on safer option

**Setup:**
- ConfirmDialog instance

**Input:** show() called

**Expected Result:**
- Cancel button receives initial focus
- (Safer default for destructive actions)

### TC-8: ARIA Attributes

**Purpose:** Verify accessibility attributes present

**Setup:**
- ConfirmDialog instance (open)

**Input:** Inspect DOM

**Expected Result:**
- role="dialog" on dialog
- aria-modal="true"
- aria-labelledby pointing to title
- aria-describedby pointing to message
