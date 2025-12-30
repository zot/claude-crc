# ContactValidator

**Source Spec:** main.md, coding-standards.md

## Responsibilities

### Knows
- NAME_MIN_LENGTH: number - Minimum name length (1)
- NAME_MAX_LENGTH: number - Maximum name length (100)
- PHONE_MIN_LENGTH: number - Minimum phone length (10)
- PHONE_MAX_LENGTH: number - Maximum phone length (20)
- NOTES_MAX_LENGTH: number - Maximum notes length (500)
- EMAIL_PATTERN: RegExp - Valid email format pattern

### Does
- validateName: Validate name is present and within length limits
- validateEmail: Validate email format if provided
- validatePhone: Validate phone format if provided
- validateNotes: Validate notes length if provided
- validateContact: Validate all fields, return ValidationResult
- isValid: Check if contact data is valid (boolean)
- getErrors: Get all validation errors for a contact

## Collaborators

- ContactService: Calls validator before save operations
- ContactFormView: Calls validator for real-time form validation

## Sequences

- seq-create-contact.md: Validates new contact data
- seq-edit-contact.md: Validates updated contact data
