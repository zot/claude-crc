# LocalStorageContactRepository

**Source Spec:** main.md

## Responsibilities

### Knows
- STORAGE_KEY: string - LocalStorage key for contacts data
- storage: Storage - Browser LocalStorage reference

### Does
- save: Serialize and persist single contact to LocalStorage
- saveAll: Serialize and persist all contacts atomically
- findById: Deserialize and retrieve contact by ID
- findAll: Deserialize and retrieve all contacts
- delete: Remove contact from LocalStorage
- clear: Clear all contact data from LocalStorage
- serialize: Convert Contact to JSON string
- deserialize: Convert JSON string to Contact (with Date parsing)
- handleStorageError: Handle quota exceeded and access denied errors

## Collaborators

- ContactService: Provides storage operations via IContactRepository interface
- Contact: Data model being serialized/deserialized
- NotificationService: Reports storage errors to user

## Sequences

- seq-create-contact.md: Persists new contact
- seq-edit-contact.md: Persists updated contact
- seq-delete-contact.md: Removes contact data
- seq-load-contacts.md: Loads all contacts on startup

## Notes

Implements IContactRepository interface.
Handles Date serialization/deserialization for created/modified timestamps.
Validates data structure on load to handle corruption.
