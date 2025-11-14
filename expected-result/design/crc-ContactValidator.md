# ContactValidator

**Source Spec:** main.md (FR2: Create Contact - Validation, FR4: View/Edit Contact - Validation)

## Responsibilities

### Knows
- `MAX_NAME_LENGTH: number` - Maximum length for name field (100)
- `MIN_NAME_LENGTH: number` - Minimum length for name field (1)
- `MAX_NOTES_LENGTH: number` - Maximum length for notes field (500)
- `MIN_PHONE_LENGTH: number` - Minimum length for phone (10)
- `MAX_PHONE_LENGTH: number` - Maximum length for phone (20)

### Does
- `validateName(name: string): ValidationResult` - Ensures name is 1-100 characters
- `validateEmail(email: string): ValidationResult` - Ensures valid email format if provided
- `validatePhone(phone: string): ValidationResult` - Ensures valid phone format if provided (10-20 chars)
- `validateNotes(notes: string): ValidationResult` - Ensures notes are within 500 characters
- `validateContact(contact: Contact): ValidationResult` - Validates entire contact object

## Collaborators

- **Contact** (src/models/Contact.ts) - Provides contact data to validate

## Sequences

- seq-create-contact.md
- seq-edit-contact.md

## Related CRC Cards

- crc-Contact.md

## Design Patterns

- **Strategy Pattern** - Each validation rule is independent and composable

## Key Design Decisions

1. **Fail fast** - Return validation errors immediately without partial saves
2. **Clear error messages** - Include field name, constraint, and current value
3. **Optional field handling** - Empty/null optional fields pass validation
