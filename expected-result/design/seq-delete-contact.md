# Sequence: Delete Contact

**Source Spec:** main.md (FR5: Delete Contact)
**Related CRC Cards:** crc-ContactDetailView.md, crc-ContactService.md, crc-ContactStorage.md, crc-ContactListView.md

## Participants

- **User** - End user deleting a contact
- **ContactDetailView** - src/ui/ContactDetailView.ts - Handles contact form and delete action
- **ContactService** - src/services/ContactService.ts - Business logic coordinator
- **ContactStorage** - src/services/ContactStorage.ts - Persistence layer
- **ContactListView** - src/ui/ContactListView.ts - Displays updated contact list

## Sequence

```
     User           ContactDetailView    ContactService    ContactStorage    ContactListView
      |                    |                  |                 |                  |
      |--click "Delete"--->|                  |                 |                  |
      |                    |                  |                 |                  |
      |                    |--confirmDelete()->|                 |                  |
      |<--dialog-----------|                  |                 |                  |
      |                    |                  |                 |                  |
      |--click "Confirm"-->|                  |                 |                  |
      |                    |                  |                 |                  |
      |                    |--deleteContact(id)-->               |                  |
      |                    |                  |                 |                  |
      |                    |                  |--deleteContact(id)-->              |
      |                    |                  |                 |                  |
      |                    |                  |                 |  remove from     |
      |                    |                  |                 | LocalStorage     |
      |                    |                  |                 |                  |
      |                    |                  |<--success-------|                  |
      |                    |                  |                 |                  |
      |                    |<--success--------|                 |                  |
      |                    |                  |                 |                  |
      |                    |--navigate()------------------------------>            |
      |                    |                  |                 |                  |
      |                    |                  |                 |                  |
      |                    |                  |                 |      show success|
      |<--display list------------------------------------------------------------|
```

## Analysis

### Key Interactions

**User → ContactDetailView**: User clicks "Delete" button while viewing contact

**ContactDetailView → User**: Confirmation dialog prevents accidental deletion

**User → ContactDetailView**: User confirms deletion intent

**ContactDetailView → ContactService**: Service coordinates the deletion process

**ContactService → ContactStorage**: Storage removes contact from LocalStorage

**ContactDetailView → ContactListView**: Navigation back to list view

**ContactListView → User**: Success message confirms deletion

### Design Notes

1. **Confirmation required** - User must explicitly confirm deletion to prevent accidents
2. **Atomic deletion** - Storage operation removes contact completely or not at all
3. **No undo** - Once deleted, contact cannot be recovered (future enhancement opportunity)
4. **Success notification** - User sees confirmation message after successful deletion
5. **Return to list** - User is navigated back to contact list after deletion

### Traceability

- Maps to FR5 (Delete Contact) in main.md
- Implements confirmation dialog from FR5
- Implements data flow from main.md (Delete Flow section)
- Implements destructive action confirmation from UI3
