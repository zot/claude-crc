# Test Design: NotificationView

**Source CRC:** crc-NotificationView.md
**Source Spec:** main.md

## Purpose

Test notification toast rendering.

## Test Cases

### TC-1: Render Success Notification

**Purpose:** Verify success notification styled correctly

**Setup:** NotificationView with container

**Input:** Notification { type: "success", message: "Saved" }

**Expected Result:**
- Container has "notification-success" class
- Message text displayed
- Dismiss button visible

### TC-2: Render Error Notification

**Purpose:** Verify error notification styled correctly

**Setup:** NotificationView with container

**Input:** Notification { type: "error", message: "Failed" }

**Expected Result:**
- Container has "notification-error" class
- Message text displayed

### TC-3: Render Warning Notification

**Purpose:** Verify warning notification styled correctly

**Setup:** NotificationView with container

**Input:** Notification { type: "warning", message: "Warning" }

**Expected Result:**
- Container has "notification-warning" class

### TC-4: Render Null (Hidden)

**Purpose:** Verify notification hides when null

**Setup:** NotificationView showing notification

**Input:** null notification

**Expected Result:**
- Container empty
- "visible" class removed

### TC-5: Dismiss Click

**Purpose:** Verify clicking dismiss closes notification

**Setup:** NotificationView with notification

**Input:** Click dismiss button

**Expected Result:**
- NotificationService.dismiss() called

### TC-6: XSS Prevention

**Purpose:** Verify HTML in message is escaped

**Setup:** NotificationView

**Input:** Message with "<script>alert(1)</script>"

**Expected Result:**
- Script tag rendered as text, not executed
- No XSS vulnerability
