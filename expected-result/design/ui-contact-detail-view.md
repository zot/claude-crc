# UI: ContactDetailView

**Source Spec:** main.md (FR2, FR4, FR5, UI3)
**CRC Card:** crc-ContactDetailView.md
**Routes:** `/contact/new` (create), `/contact/:id` (edit) (see manifest-ui.md)
**Template File:** public/templates/contact-detail-view.html

## Purpose

Form for creating new contacts or editing existing contacts. Handles validation, unsaved change detection, and deletion.

## Data

(See crc-ContactDetailView.md for implementation details)

- `contact?: Contact` - Contact being edited (null for create mode)
- `mode: 'create' | 'edit'` - Current operation mode
- `isDirty: boolean` - Tracks unsaved changes
- `validationErrors: Map<string, string>` - Current validation errors by field name

## Layout Structure

**ASCII Layout (Edit Mode):**
```
┌────────────────────────────────────────────────┐
│  ← Back to List                                │
│                                                │
│  Edit Contact                                  │
├────────────────────────────────────────────────┤
│                                                │
│  Name *                                        │
│  [John Doe                              ]      │
│                                                │
│  Email                                         │
│  [john@example.com                      ]      │
│                                                │
│  Phone                                         │
│  [555-1234                              ]      │
│                                                │
│  Notes                                         │
│  [                                       ]     │
│  [                                       ]     │
│  [                                       ]     │
│                                                │
│  [Save]  [Cancel]  [Delete]                    │
│                                                │
└────────────────────────────────────────────────┘

(Create mode same but title="New Contact" and no Delete button)

With validation errors:

┌────────────────────────────────────────────────┐
│  Name *                                        │
│  [                                       ]     │
│  ⚠ Name is required (1-100 characters)        │
│                                                │
│  Email                                         │
│  [invalid-email                          ]     │
│  ⚠ Invalid email format                       │
└────────────────────────────────────────────────┘
```

**Container Hierarchy:**
- `.contact-detail-container`
  - `.contact-detail-header`
    - `a.back-link` - "← Back to List"
    - `h1` - "New Contact" or "Edit Contact"
  - `.contact-detail-form`
    - `.form-group` (repeated for each field)
      - `label` - Field label with * for required
      - `input` or `textarea` - Field input
      - `.field-error` - Validation error message (if any)
  - `.contact-detail-actions`
    - `button.btn-save` - "Save"
    - `button.btn-cancel` - "Cancel"
    - `button.btn-delete` - "Delete" (edit mode only)

## CSS Classes

- `.contact-detail-container` - Main container
- `.contact-detail-header` - Header with back link and title
- `.back-link` - Back to list link
- `.contact-detail-form` - Form container
- `.form-group` - Individual field group
- `.form-group.has-error` - Field group with validation error
- `label` - Field label
- `label.required::after` - "* " indicator for required fields
- `input`, `textarea` - Form inputs
- `input.error`, `textarea.error` - Input with validation error
- `.field-error` - Validation error message (red text)
- `.contact-detail-actions` - Button group
- `.btn-save` - Primary save button
- `.btn-cancel` - Secondary cancel button
- `.btn-delete` - Destructive delete button (red)

## Data Bindings

(See crc-ContactDetailView.md for implementation)

**Input fields:**
- `name` - Text input (required, max 100 chars)
- `email` - Email input (optional, email validation)
- `phone` - Tel input (optional, 10-20 chars)
- `notes` - Textarea (optional, max 500 chars)

**Display values (edit mode):**
- `{{contact.name}}` - Pre-populate name
- `{{contact.email}}` - Pre-populate email
- `{{contact.phone}}` - Pre-populate phone
- `{{contact.notes}}` - Pre-populate notes

**Validation errors:**
- `{{validationErrors.get('name')}}` - Name error message
- `{{validationErrors.get('email')}}` - Email error message
- `{{validationErrors.get('phone')}}` - Phone error message
- `{{validationErrors.get('notes')}}` - Notes error message

## Events

(See crc-ContactDetailView.md for implementation)

- `input[name="name"]` → `onFieldChange('name', value)` - Track changes and validate
- `input[name="email"]` → `onFieldChange('email', value)` - Track changes and validate
- `input[name="phone"]` → `onFieldChange('phone', value)` - Track changes and validate
- `textarea[name="notes"]` → `onFieldChange('notes', value)` - Track changes and validate
- `.btn-save` → `onSaveClick()` - Validate and save contact
- `.btn-cancel` → `onCancelClick()` - Cancel (confirm if dirty)
- `.btn-delete` → `onDeleteClick()` - Delete contact (confirm)
- Keyboard: Escape → `onCancelClick()`

## State Management

- `mode` - Set from route ('create' for /contact/new, 'edit' for /contact/:id)
- `contact` - Loaded from ContactService for edit mode, null for create mode
- `isDirty` - Set to true on first field change
- `validationErrors` - Updated on field change and save attempt

## Navigation

(See manifest-ui.md for global navigation patterns)

**Entry Points:**
- From ContactListView "Add Contact" button → create mode
- From ContactListView contact row click → edit mode

**Exit Points:**
- Save success → ContactListView (with success message)
- Cancel → ContactListView (confirm if isDirty)
- Delete success → ContactListView (with success message)

## Global Patterns

(See manifest-ui.md)

- **Inline validation**: Validate each field on change, show errors immediately
- **Unsaved change detection**: Track isDirty, confirm before Cancel if true
- **Confirmation dialogs**:
  - Delete: "Are you sure you want to delete this contact? This cannot be undone."
  - Cancel with changes: "You have unsaved changes. Are you sure you want to leave?"
- **Success messages**: Displayed by ContactListView after navigation
- **Performance**: Save operations complete within 200ms
- **Accessibility**: Full keyboard support, ARIA labels, focus management

## Validation Rules

(See crc-ContactValidator.md for implementation)

**Name:**
- Required
- 1-100 characters
- Error: "Name is required (1-100 characters)"

**Email:**
- Optional
- Valid email format
- Error: "Invalid email format"

**Phone:**
- Optional
- 10-20 characters
- Error: "Phone must be 10-20 characters"

**Notes:**
- Optional
- Max 500 characters
- Error: "Notes must be 500 characters or less"

## Related Components

- ContactListView - Navigation destination
- ContactService - Business logic for create/update/delete
- ContactValidator - Validation logic
