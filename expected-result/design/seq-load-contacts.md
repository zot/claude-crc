# Sequence: Load Contacts

**Source Spec:** main.md (FR3: View Contact List, FR6: Data Persistence)
**Related CRC Cards:** crc-ContactListView.md, crc-ContactService.md, crc-ContactStorage.md

## Participants

- **User** - End user viewing contact list
- **ContactListView** - src/ui/ContactListView.ts - Displays contact list
- **ContactService** - src/services/ContactService.ts - Business logic coordinator
- **ContactStorage** - src/services/ContactStorage.ts - Persistence layer

## Sequence

```
     User           ContactListView    ContactService    ContactStorage
      |                    |                  |                 |
      |--open app--------->|                  |                 |
      |                    |                  |                 |
      |                    |--initialize----->|                 |
      |                    |                  |                 |
      |                    |                  |--initialize()-->|
      |                    |                  |                 |
      |                    |                  |                 |  load from
      |                    |                  |                 | LocalStorage
      |                    |                  |                 |
      |                    |                  |<--contacts------|
      |                    |                  |                 |
      |                    |<--ready----------|                 |
      |                    |                  |                 |
      |                    |--loadContacts()->|                 |
      |                    |                  |                 |
      |                    |                  |--getAllContacts()->
      |                    |                  |                 |
      |                    |                  |<--contacts------|
      |                    |                  |                 |
      |                    |                  |--sortByName()-->|
      |                    |                  |<--sorted--------|
      |                    |                  |                 |
      |                    |<--contacts-------|                 |
      |                    |                  |                 |
      |                    |--render()------->|                 |
      |<--display list-----|                  |                 |
      |                    |                  |                 |
      |   OR (no contacts) |                  |                 |
      |                    |                  |                 |
      |                    |--showEmptyState()->                |
      |<--empty message----|                  |                 |
```

## Analysis

### Key Interactions

**User → ContactListView**: User opens application or navigates to contact list

**ContactListView → ContactService**: View requests service initialization

**ContactService → ContactStorage**: Storage initializes and loads from LocalStorage

**ContactListView → ContactService**: View requests all contacts

**ContactService → ContactStorage**: Service retrieves contacts from storage

**ContactService**: Sorts contacts alphabetically by name

**ContactListView**: Renders contact list or shows empty state

### Design Notes

1. **Initialization** - Storage loads contacts from LocalStorage on startup
2. **Alphabetical sorting** - Contacts always displayed in predictable order
3. **Empty state** - Clear message when no contacts exist
4. **Performance** - In-memory cache after initial load for fast rendering
5. **Refresh support** - Data persists and loads correctly on page refresh

### Traceability

- Maps to FR3 (View Contact List) in main.md
- Maps to FR6 (Data Persistence) in main.md
- Implements sorting requirement (alphabetically by name) from FR3
- Implements empty state from FR3
- Implements LocalStorage loading from FR6
