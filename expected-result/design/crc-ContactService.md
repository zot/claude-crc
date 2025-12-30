# ContactService

**Source Spec:** main.md, coding-standards.md

## Responsibilities

### Knows
- repository: IContactRepository - Storage abstraction for persistence
- validator: ContactValidator - Validation logic

### Does
- createContact: Create new contact with auto-generated ID and timestamps
- updateContact: Update existing contact, update modified timestamp
- deleteContact: Remove contact by ID
- getContact: Retrieve single contact by ID
- getAllContacts: Retrieve all contacts sorted by name
- generateId: Generate unique UUID for new contacts

## Collaborators

- ContactValidator: Validates contact data before persistence
- IContactRepository: Abstracts storage operations (Dependency Inversion)
- Contact: Data model being managed

## Sequences

- seq-create-contact.md: Orchestrates create flow
- seq-edit-contact.md: Orchestrates edit flow
- seq-delete-contact.md: Orchestrates delete flow
- seq-load-contacts.md: Orchestrates initial data load
