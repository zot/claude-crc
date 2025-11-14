# ContactDetailView

**Source Spec:** main.md (FR2: Create Contact, FR4: View/Edit Contact, FR5: Delete Contact, UI3: Detail/Edit View)

## Responsibilities

### Knows
- `contact?: Contact` - Contact being viewed/edited (null for create mode)
- `service: ContactService` - Reference to contact service
- `validator: ContactValidator` - Reference to validator
- `isDirty: boolean` - Tracks unsaved changes
- `validationErrors: Map<string, string>` - Current validation errors by field
- `mode: 'create' | 'edit'` - Current operation mode

### Does
- `render(): void` - Renders the contact form HTML
- `loadContact(id: string): Promise<void>` - Loads contact for editing
- `onSaveClick(): Promise<void>` - Validates and saves contact
- `onCancelClick(): void` - Cancels and returns to list (confirms if dirty)
- `onDeleteClick(): Promise<void>` - Deletes contact with confirmation
- `onFieldChange(field: string, value: string): void` - Tracks changes and validates
- `validateField(field: string, value: string): void` - Validates single field inline
- `showValidationErrors(errors: ValidationResult): void` - Displays validation errors
- `confirmUnsavedChanges(): Promise<boolean>` - Prompts user before discarding changes
- `confirmDelete(): Promise<boolean>` - Prompts user before deleting

## Collaborators

- **ContactService** (src/services/ContactService.ts) - Creates, updates, deletes contacts
- **ContactValidator** (src/utils/ContactValidator.ts) - Validates field inputs
- **Contact** (src/models/Contact.ts) - Displays and edits contact data
- **ContactListView** (src/ui/ContactListView.ts) - Navigates back to list on save/cancel

## Sequences

- seq-create-contact.md
- seq-edit-contact.md
- seq-delete-contact.md

## Related CRC Cards

- crc-ContactService.md
- crc-ContactValidator.md
- crc-Contact.md
- crc-ContactListView.md

## Design Patterns

- **State Pattern** - Different behavior for create vs edit modes
- **MVC Pattern** - View component with form handling logic

## Key Design Decisions

1. **Inline validation** - Immediate feedback on field changes
2. **Unsaved change detection** - Tracks dirty state to prevent data loss
3. **Confirmation dialogs** - Protects against accidental delete/cancel
4. **Single form** - Create and edit use same form with different modes
