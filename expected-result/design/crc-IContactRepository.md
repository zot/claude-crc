# IContactRepository

**Source Spec:** main.md, coding-standards.md

## Responsibilities

### Knows
- N/A - Interface only, no state

### Does
- save: Persist single contact
- saveAll: Persist all contacts atomically
- findById: Retrieve contact by ID
- findAll: Retrieve all contacts
- delete: Remove contact by ID
- clear: Remove all contacts (for testing/reset)

## Collaborators

- ContactService: Uses repository for all persistence operations
- Contact: Data model being persisted

## Sequences

- seq-create-contact.md: save() called after validation
- seq-edit-contact.md: save() called after validation
- seq-delete-contact.md: delete() called after confirmation
- seq-load-contacts.md: findAll() called on app startup

## Notes

This is an interface (abstraction) following Dependency Inversion Principle.
Concrete implementations: LocalStorageContactRepository
