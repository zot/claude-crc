# User Manual

<!-- Spec: main.md -->
<!-- UI: ui-contact-list-view.md, ui-contact-detail-view.md, manifest-ui.md -->

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Features](#features)
- [How-To Guides](#how-to-guides)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Troubleshooting](#troubleshooting)

## Introduction

<!-- Spec: main.md -->

### What is Contact Manager?

Contact Manager is a simple, privacy-focused application for managing your personal contacts. All your contact information is stored locally in your browser, ensuring your data stays private and accessible even without an internet connection.

### Who is it for?

Contact Manager is perfect for:
- Anyone who wants to keep a simple contact list
- Users who value privacy and don't want cloud storage
- People who need offline access to their contacts
- Those who want a lightweight alternative to complex contact apps

### Key Features

- **Create contacts** with name, email, phone, and notes
- **View all contacts** in an easy-to-scan alphabetical list
- **Edit contacts** to keep information up to date
- **Delete contacts** you no longer need
- **Data persists** across browser sessions
- **Works offline** - no internet required
- **Privacy first** - all data stays on your device

## Getting Started

### Accessing the Application

1. Open your web browser (Chrome, Firefox, Safari, or Edge)
2. Navigate to the Contact Manager URL
3. The contact list appears automatically

### First-Time Setup

No setup required! Contact Manager works immediately. When you first open the application:

1. You'll see an empty contact list
2. Click "Add Contact" to create your first contact
3. All contacts are automatically saved to your browser

### User Interface Overview

<!-- UI: ui-contact-list-view.md -->

**Main Interface (Contact List)**:

```
┌────────────────────────────────────────────────┐
│  Contact Manager                               │
│                                                │
│  [Add Contact]                                 │
├────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────┐ │
│  │ Alice Johnson                            │ │
│  │ alice@example.com | 555-1234            │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ Bob Smith                                │ │
│  │ bob@work.com | 555-5678                 │ │
│  └──────────────────────────────────────────┘ │
└────────────────────────────────────────────────┘
```

**Main Areas**:
- **Header** - Shows "Contact Manager" title
- **Add Contact Button** - Click to create a new contact
- **Contact List** - Scrollable list of all your contacts
- **Contact Cards** - Each contact shows name, email, and phone (click to view/edit)

**When you have no contacts**:
```
┌────────────────────────────────────────────────┐
│  Contact Manager                               │
│                                                │
│  [Add Contact]                                 │
├────────────────────────────────────────────────┤
│                                                │
│           No contacts yet                      │
│                                                │
│      Click "Add Contact" to get started        │
│                                                │
└────────────────────────────────────────────────┘
```

## Features

### Contact Information

<!-- Spec: main.md (FR1: Contact Data Model) -->

Each contact can store:

- **Name** (required) - The person's full name
  - Must be 1-100 characters
  - This is the only required field

- **Email** (optional) - Email address
  - Must be valid email format if provided
  - Example: name@example.com

- **Phone** (optional) - Phone number
  - Must be 10-20 characters if provided
  - Example: 555-1234-5678

- **Notes** (optional) - Any additional information
  - Up to 500 characters
  - Store addresses, birthdays, or other details

**Automatic Information**:
- **ID** - Unique identifier (automatically generated)
- **Created** - When the contact was first added
- **Modified** - When the contact was last updated

### View Contact List

<!-- Spec: main.md (FR3: View Contact List) -->
<!-- UI: ui-contact-list-view.md -->

**What you see**:
- All your contacts in alphabetical order by name
- For each contact: name, email, and phone
- Helpful message if you have no contacts yet

**How to use**:
- Scroll through the list to browse contacts
- Click any contact to view full details and edit
- Click "Add Contact" to create a new contact

**Tips**:
- Contacts are always sorted A-Z for easy finding
- Use the browser's back button to return to this list
- The list updates automatically when you add, edit, or delete contacts

### Create a New Contact

<!-- Spec: main.md (FR2: Create Contact) -->
<!-- UI: ui-contact-detail-view.md -->

**How to create**:
1. Click the "Add Contact" button
2. Fill in the contact information
3. Click "Save" to add the contact
4. Or click "Cancel" to go back without saving

**Form Layout**:
```
┌────────────────────────────────────────────────┐
│  ← Back to List                                │
│                                                │
│  New Contact                                   │
├────────────────────────────────────────────────┤
│  Name *                                        │
│  [                                       ]     │
│                                                │
│  Email                                         │
│  [                                       ]     │
│                                                │
│  Phone                                         │
│  [                                       ]     │
│                                                │
│  Notes                                         │
│  [                                       ]     │
│  [                                       ]     │
│                                                │
│  [Save]  [Cancel]                              │
└────────────────────────────────────────────────┘
```

**Required Fields**:
- Fields marked with * are required
- Only **Name** is required - all other fields are optional

**Validation**:
- As you type, the form checks your input
- Error messages appear immediately if something is wrong
- You cannot save until all errors are fixed

**Common Errors**:
- "Name is required (1-100 characters)" - You must enter a name
- "Invalid email format" - Email must be like name@example.com
- "Phone must be 10-20 characters" - Phone number length is invalid

### View and Edit a Contact

<!-- Spec: main.md (FR4: View/Edit Contact) -->
<!-- UI: ui-contact-detail-view.md -->

**How to view/edit**:
1. Click a contact from the list
2. View all contact details
3. Click in any field to edit
4. Click "Save" to keep changes
5. Or click "Cancel" to discard changes

**Form Layout** (same as create, but with "Edit Contact" title and "Delete" button):
```
┌────────────────────────────────────────────────┐
│  ← Back to List                                │
│                                                │
│  Edit Contact                                  │
├────────────────────────────────────────────────┤
│  Name *                                        │
│  [Alice Johnson                          ]     │
│                                                │
│  Email                                         │
│  [alice@example.com                      ]     │
│                                                │
│  Phone                                         │
│  [555-1234                               ]     │
│                                                │
│  Notes                                         │
│  [Birthday: Jan 15                       ]     │
│                                                │
│  [Save]  [Cancel]  [Delete]                    │
└────────────────────────────────────────────────┘
```

**Unsaved Changes Warning**:
- If you make changes and click Cancel, you'll see a confirmation
- "You have unsaved changes. Are you sure you want to leave?"
- Click "OK" to discard changes, or "Cancel" to keep editing

**Tips**:
- The "Modified" timestamp updates automatically when you save
- All the same validation rules apply as when creating
- Use the "Back to List" link to cancel without changes

### Delete a Contact

<!-- Spec: main.md (FR5: Delete Contact) -->

**How to delete**:
1. Open the contact you want to delete
2. Click the "Delete" button (red)
3. Confirm deletion in the dialog
4. Contact is permanently removed

**Confirmation Dialog**:
```
┌──────────────────────────────────────┐
│  Are you sure you want to delete     │
│  this contact? This cannot be undone.│
│                                      │
│           [Cancel]  [Delete]         │
└──────────────────────────────────────┘
```

**Important**:
- Deleted contacts CANNOT be recovered
- Always confirm the deletion dialog carefully
- You'll see a success message after deletion

### Data Persistence

<!-- Spec: main.md (FR6: Data Persistence) -->

**How your data is saved**:
- Contacts are saved automatically when you click "Save"
- Data is stored in your browser's local storage
- Contacts persist across browser sessions
- No internet connection required

**What this means**:
- Close your browser - your contacts are safe
- Refresh the page - your contacts remain
- Work offline - everything still works
- No account needed - data stays on your device

**Privacy**:
- Your contacts never leave your computer
- No cloud storage or servers involved
- Complete privacy and control

## How-To Guides

### How to Add Your First Contact

<!-- Spec: main.md (FR2: Create Contact) -->
<!-- Sequence: seq-create-contact.md -->

**Step-by-step**:

1. **Open Contact Manager**
   - You'll see "No contacts yet" message
   - "Add Contact" button is prominently displayed

2. **Click "Add Contact"**
   - Form opens with empty fields
   - Title shows "New Contact"

3. **Enter contact name** (required)
   - Type the person's full name
   - Must be 1-100 characters
   - Example: "Alice Johnson"

4. **Add email** (optional)
   - Type email address if you have it
   - Must be valid format: name@example.com
   - Leave blank if unknown

5. **Add phone** (optional)
   - Type phone number if you have it
   - Must be 10-20 characters
   - Example: "555-123-4567"

6. **Add notes** (optional)
   - Add any extra information
   - Birthdays, addresses, reminders
   - Up to 500 characters

7. **Click "Save"**
   - Contact is saved immediately
   - You return to the contact list
   - Success message: "Contact created successfully"
   - New contact appears in the list (alphabetically)

**Tips**:
- Only name is required - add other info later if needed
- Watch for validation errors as you type
- Click "Cancel" anytime to discard and go back

### How to Find and Edit a Contact

<!-- Spec: main.md (FR4: View/Edit Contact) -->
<!-- Sequence: seq-edit-contact.md -->

**Step-by-step**:

1. **Browse your contact list**
   - Contacts are sorted A-Z by name
   - Scroll to find the contact you want

2. **Click the contact**
   - Contact details open in edit form
   - All fields are populated with current information
   - Title shows "Edit Contact"

3. **Make your changes**
   - Click any field to edit
   - Type new information
   - Validation checks happen as you type
   - Little dot or indicator shows unsaved changes

4. **Fix any errors**
   - Red error messages appear below invalid fields
   - Examples: "Invalid email format", "Name is required"
   - Cannot save until all errors fixed

5. **Save your changes**
   - Click "Save" button
   - Changes saved immediately
   - "Modified" timestamp updated automatically
   - Return to contact list
   - Success message: "Contact updated successfully"

**Alternative: Cancel changes**
- Click "Cancel" to discard changes
- If you made changes, confirmation dialog appears
- "You have unsaved changes. Are you sure you want to leave?"
- Click "OK" to discard, "Cancel" to keep editing

**Tips**:
- Update just one field - you don't need to edit everything
- Use "Back to List" link as another way to cancel
- Modified timestamp helps you track when you last updated info

### How to Delete Multiple Contacts

<!-- Spec: main.md (FR5: Delete Contact) -->
<!-- Sequence: seq-delete-contact.md -->

Currently, you can only delete one contact at a time. Here's the fastest way to delete multiple contacts:

**Step-by-step**:

1. **Open first contact to delete**
   - Click contact from list
   - Details open in edit view

2. **Click "Delete" button**
   - Red "Delete" button at bottom
   - Confirmation dialog appears
   - "Are you sure you want to delete this contact? This cannot be undone."

3. **Confirm deletion**
   - Click "Delete" in dialog
   - Contact removed immediately
   - Return to contact list
   - Success message: "Contact deleted successfully"

4. **Repeat for other contacts**
   - Click next contact to delete
   - Delete and confirm
   - Repeat until done

**Important warnings**:
- Deleted contacts cannot be recovered
- No undo functionality available
- Double-check before confirming deletion
- Consider if you really need to delete vs. just updating info

**Tip**: If you need to delete many contacts regularly, consider if you actually want to keep them but mark them as inactive (add note: "Inactive").

### How to Keep Your Data Safe

<!-- Spec: main.md (FR6: Data Persistence) -->

Your contact data is stored locally in your browser. Here's how to keep it safe:

**Automatic Backup via Browser**:

1. **Don't clear browser data carelessly**
   - Clearing browser data deletes your contacts
   - In browser settings, you can clear cache WITHOUT clearing local storage
   - Be careful with "Clear browsing data" options

2. **Use the same browser**
   - Contacts are stored per browser
   - Chrome contacts won't appear in Firefox
   - Use your preferred browser consistently

3. **Don't use private/incognito mode**
   - Private browsing doesn't save local storage
   - Your contacts won't be there next time
   - Use normal browser mode

**Browser Settings to Check**:

- **Chrome**: Settings → Privacy → Site Settings → Cookies → Allow sites to save data
- **Firefox**: Settings → Privacy → History → Use custom settings → Accept cookies
- **Safari**: Preferences → Privacy → Uncheck "Block all cookies"
- **Edge**: Settings → Cookies → Allow sites to save data

**Future Export Feature** (not yet available):
- Export to CSV file for backup
- Import contacts from file
- Transfer between browsers

**Current Limitations**:
- No automatic cloud backup
- No sync between devices
- No export/import (yet)
- If you clear browser storage, contacts are lost

**Best Practice**:
- Keep using the same browser
- Don't clear browser data unless necessary
- Take screenshots of important contacts as manual backup

## Keyboard Shortcuts

<!-- Source: manifest-ui.md, coding-standards.md -->

Contact Manager is fully keyboard accessible for faster navigation and accessibility.

### Global Shortcuts

| Key | Action |
|-----|--------|
| **Tab** | Move to next field or button |
| **Shift + Tab** | Move to previous field or button |
| **Enter** | Activate button, submit form, select contact |
| **Escape** | Cancel current action, close form |

### Contact List View

| Key | Action |
|-----|--------|
| **Tab** | Navigate between contacts and buttons |
| **Enter** | Open selected contact |
| **Click or Enter on "Add Contact"** | Create new contact |

### Contact Detail/Edit View

| Key | Action |
|-----|--------|
| **Tab** | Move between form fields |
| **Enter in text field** | Move to next field |
| **Enter on button** | Activate button (Save, Cancel, Delete) |
| **Escape** | Cancel and return to list (confirms if unsaved changes) |

### Accessibility Features

<!-- Source: coding-standards.md, manifest-ui.md -->

**Screen Reader Support**:
- All buttons have descriptive labels
- Form fields have associated labels
- Error messages are announced
- Success messages are announced

**Visual Accessibility**:
- High contrast text (4.5:1 ratio)
- Clear focus indicators (visible outline on focused elements)
- Required fields marked with *
- Error messages in red with warning icon

**Keyboard Navigation**:
- All functionality accessible via keyboard
- Logical tab order
- No keyboard traps
- Clear visual focus

## Troubleshooting

### Validation Errors

<!-- Spec: main.md (EH1: Validation Errors) -->

**Problem**: Cannot save contact - error messages appear

**Common Errors**:

**"Name is required (1-100 characters)"**
- Solution: Enter a name between 1 and 100 characters
- The name field cannot be empty
- Remove extra spaces if name is too long

**"Invalid email format"**
- Solution: Enter email like name@example.com
- Must have @ symbol and domain
- Check for typos
- If no email, leave field blank

**"Phone must be 10-20 characters"**
- Solution: Enter phone number between 10-20 characters
- Too short: Add area code or country code
- Too long: Remove extra formatting
- If no phone, leave field blank

**"Notes must be 500 characters or less"**
- Solution: Shorten notes to 500 characters or less
- Counter shows character count as you type
- Consider moving some info to separate contact

**General Tips**:
- Error messages appear immediately as you type
- Fix all errors before "Save" button works
- Your input is never lost due to validation errors
- Click "Cancel" if you want to give up and start over

### Storage Errors

<!-- Spec: main.md (EH2: Storage Errors) -->

**Problem**: "Storage quota exceeded" error

**Solution**:
1. Your browser's storage is full (usually 5-10MB)
2. Clear other websites' data: Browser Settings → Site Data
3. Delete old contacts you no longer need
4. Use browser's built-in storage management

**Problem**: "Storage access denied" error

**Solution**:
1. Check browser settings allow local storage
2. Not in private/incognito mode
3. Browser permissions for site are enabled
4. Try refreshing the page
5. Try restarting browser

**Problem**: "Cannot save contact" error

**Solution**:
1. Check internet connection (wait, no internet needed!)
2. Verify browser allows local storage
3. Try refreshing page and trying again
4. Check browser console for detailed error
5. Try different browser

### Data Loss Issues

<!-- Spec: main.md (EH3: Data Corruption) -->

**Problem**: Contacts disappeared after browser restart

**Possible Causes**:
1. Used private/incognito mode (doesn't save data)
2. Cleared browser data/cookies
3. Used different browser
4. Browser updated and reset settings

**Prevention**:
- Always use normal (not private) browsing mode
- Don't clear browser data carelessly
- Use the same browser consistently
- Check browser settings allow data storage

**Problem**: "Data corrupted" error on load

**Solution**:
1. Browser will offer to reset and clear corrupted data
2. Click "Reset" to start fresh (all contacts will be lost)
3. Or check browser console for technical details
4. Export data first if possible (future feature)

**Problem**: Contact data looks wrong or incomplete

**Solution**:
1. Edit the contact and re-enter correct information
2. If severe corruption, delete and recreate contact
3. Check if you're using correct browser
4. Verify no browser extensions are interfering

### Performance Issues

<!-- Spec: main.md (NFR1: Performance) -->

**Problem**: Contact list loads slowly

**Expected Performance**:
- Should load in under 100ms for up to 1000 contacts
- Save should complete in under 200ms

**If slower**:
1. Check how many contacts you have (1000+ may be slow)
2. Close other browser tabs to free memory
3. Restart browser
4. Check browser extensions aren't interfering
5. Try different browser

**Problem**: Form feels sluggish or unresponsive

**Solution**:
1. Validation should be instant (under 50ms)
2. If typing feels slow, close other tabs
3. Restart browser to free memory
4. Check CPU usage (other programs hogging resources)
5. Try on different device to compare

### Browser Compatibility

<!-- Spec: main.md (NFR4: Browser Compatibility) -->

**Supported Browsers**:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

**If application doesn't work**:
1. Update browser to latest version
2. Enable JavaScript in browser settings
3. Enable cookies and local storage
4. Disable extensions that might interfere
5. Try different browser to isolate issue

**Known Issues**:
- Internet Explorer not supported (use Edge instead)
- Very old browsers may not work
- Mobile browsers work but layout optimized for desktop

---

*Last updated: 2025-11-15*
*Complete user manual for Contact Manager application*

**Need more help?** Check the [Developer Guide](developer-guide.md) for technical details or [Design Documentation](design.md) for architecture information.
