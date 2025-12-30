# Test Design: App

**Source CRC:** crc-App.md
**Source Spec:** main.md, coding-standards.md

## Purpose

Test application bootstrap and dependency injection.

## Test Cases

### TC-1: Initialize Application

**Purpose:** Verify app initializes all dependencies

**Setup:** DOM with #app element

**Input:** new App(), app.initialize()

**Expected Result:**
- ContactService created with repository
- Router created and routes registered
- Views created with dependencies
- Router started

### TC-2: Route Registration

**Purpose:** Verify all routes registered correctly

**Setup:** App instance

**Input:** initialize()

**Expected Result:**
- "/" route registered (list view)
- "/new" route registered (create form)
- "/edit/:id" route registered (edit form)

### TC-3: Show List View

**Purpose:** Verify list view renders on "/" route

**Setup:** Initialized App

**Input:** Navigate to "/"

**Expected Result:**
- ContactListView.render() called
- Navigation guard cleared

### TC-4: Show Create Form

**Purpose:** Verify form view renders for new contact

**Setup:** Initialized App

**Input:** Navigate to "/new"

**Expected Result:**
- ContactFormView.render() called without ID

### TC-5: Show Edit Form

**Purpose:** Verify form view renders with contact ID

**Setup:** Initialized App

**Input:** Navigate to "/edit/123"

**Expected Result:**
- ContactFormView.render("123") called

### TC-6: Error Handling

**Purpose:** Verify errors show notification

**Setup:** App with failing service

**Input:** Trigger error in view

**Expected Result:**
- Error logged to console
- NotificationService.showError() called
