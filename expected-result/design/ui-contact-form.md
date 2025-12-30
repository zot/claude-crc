# ContactFormView

**Source**: main.md (FR2, FR4, UI3)
**Route**: /new, /edit/:id (see manifest-ui.md)

**Purpose**: Form for creating or editing a contact

## Data (see crc-ContactFormView.md)

- `contact: Contact | null` - Existing contact (edit mode) or null (create mode)
- `formData: ContactFormData` - Current form values
- `errors: ValidationErrors` - Field validation errors
- `isDirty: boolean` - Unsaved changes indicator
- `mode: "create" | "edit"` - Current form mode

## Layout

```
+--------------------------------------------------+
|  < Back      Create Contact / Edit Contact        |
+--------------------------------------------------+
|                                                   |
|  Name *                                           |
|  +----------------------------------------------+ |
|  |                                              | |
|  +----------------------------------------------+ |
|  Name is required                                 |
|                                                   |
|  Email                                            |
|  +----------------------------------------------+ |
|  |                                              | |
|  +----------------------------------------------+ |
|  Invalid email format                             |
|                                                   |
|  Phone                                            |
|  +----------------------------------------------+ |
|  |                                              | |
|  +----------------------------------------------+ |
|                                                   |
|  Notes                                            |
|  +----------------------------------------------+ |
|  |                                              | |
|  |                                              | |
|  |                                              | |
|  +----------------------------------------------+ |
|  0/500 characters                                 |
|                                                   |
|  +----------+  +----------+      +----------+     |
|  |   Save   |  |  Cancel  |      |  Delete  |     |
|  +----------+  +----------+      +----------+     |
|                                   (edit only)     |
+--------------------------------------------------+
```

## Events (see crc-ContactFormView.md)

- `handleInputChange(field, value)` - Update form data, validate
- `handleSave()` - Validate all, save if valid
- `handleCancel()` - Prompt if dirty, navigate back
- `handleDelete()` - Show confirmation, delete if confirmed

## CSS Classes

- `contact-form` - Main form container
- `contact-form__header` - Header with back and title
- `contact-form__field` - Field container (label + input + error)
- `contact-form__label` - Field label
- `contact-form__label--required` - Required field marker (*)
- `contact-form__input` - Text input
- `contact-form__textarea` - Notes textarea
- `contact-form__error` - Validation error message (red)
- `contact-form__char-count` - Character count for notes
- `contact-form__actions` - Button container
- `btn-primary` - Save button
- `btn-secondary` - Cancel button
- `btn-danger` - Delete button

## States

- **Pristine**: No changes, Cancel navigates without prompt
- **Dirty**: Has changes, Cancel shows confirmation
- **Invalid**: Has validation errors, Save disabled
- **Submitting**: Save in progress, buttons disabled
