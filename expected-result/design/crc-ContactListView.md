# ContactListView

**Source Spec:** main.md

## Responsibilities

### Knows
- contacts: Contact[] - List of contacts to display
- contactService: ContactService - For data operations

### Does
- render: Render contact list with name, email, phone
- renderEmptyState: Show message when no contacts exist
- handleContactClick: Navigate to edit view for selected contact
- handleAddClick: Navigate to create form
- sortContactsByName: Sort contacts alphabetically

## Collaborators

- ContactService: Retrieves contact list
- Router: Navigates to form views
- Contact: Data model displayed in list

## Sequences

- seq-load-contacts.md: Renders loaded contacts
- seq-edit-contact.md: Handles contact click to edit
- seq-create-contact.md: Handles add button click
