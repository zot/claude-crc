# Contact

**Source Spec:** main.md

## Responsibilities

### Knows
- id: string - Unique identifier (UUID)
- name: string - Full name (required, 1-100 characters)
- email: string | undefined - Email address (optional, valid format)
- phone: string | undefined - Phone number (optional, 10-20 characters)
- notes: string | undefined - Additional notes (optional, up to 500 characters)
- created: Date - Timestamp when contact was created
- modified: Date - Timestamp when contact was last modified

### Does
- N/A - Pure data model (immutable value object)

## Collaborators

- ContactValidator: Validates field values before Contact creation
- ContactService: Creates, updates, and manages Contact instances
- ContactRepository: Persists and retrieves Contact data

## Sequences

- seq-create-contact.md: Contact instantiation during create flow
- seq-edit-contact.md: Contact update during edit flow
