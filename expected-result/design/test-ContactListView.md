# Test Design: ContactListView

**Source CRC:** crc-ContactListView.md
**Source Spec:** main.md (FR3, UI2)

## Purpose

Test contact list view rendering and interactions.

## Test Cases

### TC-1: Render Contact List

**Purpose:** Verify contacts displayed in sorted order

**Setup:**
- Mock ContactService with contacts
- ContactListView instance

**Input:** Contacts: [Bob, Alice, Carol]

**Expected Result:**
- Renders table with rows
- Order: Alice, Bob, Carol (alphabetical)
- Each row shows name, email, phone

### TC-2: Render Empty State

**Purpose:** Verify empty state message when no contacts

**Setup:**
- Mock ContactService with empty array
- ContactListView instance

**Input:** Empty contacts array

**Expected Result:**
- Renders empty state message
- Shows "Add Contact" call-to-action

### TC-3: Contact Row Click

**Purpose:** Verify clicking contact navigates to edit

**Setup:**
- Mock Router
- ContactListView instance with contacts

**Input:** Click on contact row

**Expected Result:**
- router.navigate("/edit/{id}") called with contact ID

### TC-4: Add Contact Button Click

**Purpose:** Verify clicking Add navigates to create form

**Setup:**
- Mock Router
- ContactListView instance

**Input:** Click "Add Contact" button

**Expected Result:**
- router.navigate("/new") called

### TC-5: Truncated Email Display

**Purpose:** Verify long emails are truncated in list

**Setup:**
- Contact with long email
- ContactListView instance

**Input:** Contact with email "verylongemail@verylongdomain.com"

**Expected Result:**
- Email truncated with ellipsis in display
- Full email available on hover/title attribute

### TC-6: Missing Optional Fields

**Purpose:** Verify empty display for missing email/phone

**Setup:**
- Contact with no email or phone
- ContactListView instance

**Input:** Contact with only name

**Expected Result:**
- Email column shows "-" or empty
- Phone column shows "-" or empty
