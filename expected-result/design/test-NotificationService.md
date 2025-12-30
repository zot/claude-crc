# Test Design: NotificationService

**Source CRC:** crc-NotificationService.md
**Source Spec:** main.md

## Purpose

Test notification service for displaying toast messages.

## Test Cases

### TC-1: Show Success Notification

**Purpose:** Verify success notification displays correctly

**Setup:** NotificationService instance

**Input:** showSuccess("Contact saved")

**Expected Result:**
- currentNotification.type = "success"
- currentNotification.message = "Contact saved"
- Listeners notified

### TC-2: Show Error Notification

**Purpose:** Verify error notification displays correctly

**Setup:** NotificationService instance

**Input:** showError("Failed to save")

**Expected Result:**
- currentNotification.type = "error"
- currentNotification.message = "Failed to save"

### TC-3: Show Warning Notification

**Purpose:** Verify warning notification displays correctly

**Setup:** NotificationService instance

**Input:** showWarning("Unsaved changes")

**Expected Result:**
- currentNotification.type = "warning"
- currentNotification.message = "Unsaved changes"

### TC-4: Auto-Dismiss

**Purpose:** Verify notification auto-dismisses after timeout

**Setup:** NotificationService with 100ms timeout

**Input:** showSuccess("Test"), wait 150ms

**Expected Result:**
- currentNotification is null after timeout
- Listeners notified of dismissal

### TC-5: Manual Dismiss

**Purpose:** Verify notification can be dismissed manually

**Setup:** NotificationService with notification showing

**Input:** dismiss()

**Expected Result:**
- currentNotification is null
- Listeners notified

### TC-6: Listener Registration

**Purpose:** Verify listeners receive notifications

**Setup:** NotificationService with registered listener

**Input:** showSuccess("Test")

**Expected Result:**
- Listener callback invoked with notification
- Listener receives null on dismiss

### TC-7: Listener Removal

**Purpose:** Verify removed listeners stop receiving updates

**Setup:** NotificationService with listener

**Input:** removeListener(), then showSuccess()

**Expected Result:**
- Removed listener not called
