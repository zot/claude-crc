# ContactListView

**Source Spec:** main.md (FR3: View Contact List, UI2: List View)

## Responsibilities

### Knows
- `contacts: Contact[]` - Current list of contacts to display
- `service: ContactService` - Reference to contact service
- `selectedContactId?: string` - Currently selected/hovered contact

### Does
- `render(): void` - Renders the contact list HTML
- `loadContacts(): Promise<void>` - Loads contacts from service
- `onContactClick(id: string): void` - Navigates to contact detail view
- `onAddContactClick(): void` - Navigates to create contact view
- `showEmptyState(): void` - Displays "no contacts" message
- `sortContactsByName(contacts: Contact[]): Contact[]` - Sorts contacts alphabetically

## Collaborators

- **ContactService** (src/services/ContactService.ts) - Retrieves contact list
- **ContactDetailView** (src/ui/ContactDetailView.ts) - Navigates to detail view on click
- **Contact** (src/models/Contact.ts) - Displays contact data

## Sequences

- seq-load-contacts.md
- seq-create-contact.md (navigation from "Add Contact" button)

## Related CRC Cards

- crc-ContactService.md
- crc-ContactDetailView.md
- crc-Contact.md

## Design Patterns

- **Observer Pattern** - Updates view when contact data changes
- **MVC Pattern** - View component in Model-View-Controller

## Key Design Decisions

1. **List view only** - Shows name, email, phone (not notes) for scannability
2. **Clickable rows** - Entire row is clickable for better UX
3. **Empty state** - Clear message when no contacts exist
4. **Alphabetical sorting** - Always sorted by name for predictability
