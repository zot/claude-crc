# ContactFormView

**Source Spec:** main.md

## Responsibilities

### Knows
- contact: Contact | null - Contact being edited (null for create)
- formData: ContactFormData - Current form field values
- errors: ValidationErrors - Current validation errors
- isDirty: boolean - Whether form has unsaved changes
- mode: "create" | "edit" - Form mode

### Does
- render: Render form with all contact fields
- renderValidationErrors: Show inline field errors
- handleInputChange: Update form data, validate field
- handleSave: Validate and save contact
- handleCancel: Prompt if dirty, navigate back
- handleDelete: Show confirmation, delete if confirmed
- loadContact: Load contact data for edit mode
- markDirty: Track unsaved changes

## Collaborators

- ContactService: Creates/updates/deletes contacts
- ContactValidator: Validates form input
- Router: Navigates after save/cancel
- ConfirmDialog: Confirms discard changes and delete

## Sequences

- seq-create-contact.md: Create mode form submission
- seq-edit-contact.md: Edit mode form submission
- seq-delete-contact.md: Delete from edit view
