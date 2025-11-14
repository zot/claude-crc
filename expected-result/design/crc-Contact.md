# Contact

**Source Spec:** main.md (FR1: Contact Data Model)

## Responsibilities

### Knows
- `id: string` - Unique identifier (auto-generated UUID)
- `name: string` - Full name (required, 1-100 characters)
- `email?: string` - Email address (optional, valid email format)
- `phone?: string` - Phone number (optional, 10-20 characters)
- `notes?: string` - Additional notes (optional, up to 500 characters)
- `created: Date` - Timestamp when contact was created (auto-generated)
- `modified: Date` - Timestamp when contact was last modified (auto-updated)

### Does
- `validate(): ValidationResult` - Validates contact data against rules
- `toJSON(): string` - Serializes contact for storage
- `fromJSON(json: string): Contact` - Deserializes contact from storage

## Collaborators

- **ContactValidator** (src/utils/ContactValidator.ts) - Validates name, email, phone formats

## Sequences

- seq-create-contact.md
- seq-edit-contact.md
- seq-delete-contact.md

## Related CRC Cards

- crc-ContactValidator.md
- crc-ContactService.md

## Design Patterns

- **Value Object** - Immutable data structure with validation

## Key Design Decisions

1. **UUID for IDs** - Ensures uniqueness without database coordination
2. **Optional fields** - Only name is required for flexibility
3. **Auto-timestamps** - System manages created/modified for audit trail
