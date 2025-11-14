# Sequence: Edit Contact

**Source Spec:** main.md (FR4: View/Edit Contact)
**Related CRC Cards:** crc-ContactListView.md, crc-ContactDetailView.md, crc-ContactService.md, crc-ContactValidator.md, crc-Contact.md, crc-ContactStorage.md

## Participants

- **User** - End user editing a contact
- **ContactListView** - src/ui/ContactListView.ts - Displays contact list
- **ContactDetailView** - src/ui/ContactDetailView.ts - Handles contact form
- **ContactService** - src/services/ContactService.ts - Business logic coordinator
- **ContactValidator** - src/utils/ContactValidator.ts - Validates contact data
- **Contact** - src/models/Contact.ts - Contact data model
- **ContactStorage** - src/services/ContactStorage.ts - Persistence layer

## Sequence

```
     User           ContactListView    ContactDetailView    ContactService    ContactValidator    Contact    ContactStorage
      |                    |                    |                  |                 |              |             |
      |--click contact---->|                    |                  |                 |              |             |
      |                    |                    |                  |                 |              |             |
      |                    |--navigate(id)----->|                  |                 |              |             |
      |                    |                    |                  |                 |              |             |
      |                    |                    |--loadContact(id)->|                 |              |             |
      |                    |                    |                  |--getContact(id)--------------->|             |
      |                    |                    |                  |                 |              |  load from  |
      |                    |                    |                  |                 |              | LocalStorage|
      |                    |                    |                  |<--contact---------------------------|       |
      |                    |                    |                  |                 |              |             |
      |                    |                    |<--contact--------|                 |              |             |
      |                    |                    |                  |                 |              |             |
      |                    |                    |--render form---->|                 |              |             |
      |<--display form----------------------------|                 |              |             |
      |                    |                    |                  |                 |              |             |
      |--modify fields---------------------------->|                 |              |             |
      |                    |                    |                  |                 |              |             |
      |                    |                    |--validateField-->|                 |              |             |
      |                    |                    |                  |--validate------>|              |             |
      |                    |                    |                  |<--result--------|              |             |
      |                    |                    |<--result---------|                 |              |             |
      |                    |                    |                  |                 |              |             |
      |                    |                    |--set isDirty---->|                 |              |             |
      |                    |                    |                  |                 |              |             |
      |--click "Save"---------------------->---|                  |                 |              |             |
      |                    |                    |                  |                 |              |             |
      |                    |                    |--updateContact-->|                 |              |             |
      |                    |                    |                  |                 |              |             |
      |                    |                    |                  |--validateContact------------->|             |
      |                    |                    |                  |<--valid------------------------|             |
      |                    |                    |                  |                 |              |             |
      |                    |                    |                  |--update timestamps----------->|             |
      |                    |                    |                  |<--contact--------------------|             |
      |                    |                    |                  |                 |              |             |
      |                    |                    |                  |--saveContact(contact)---------------------->|
      |                    |                    |                  |                 |              |             |
      |                    |                    |                  |                 |              |   update    |
      |                    |                    |                  |                 |              | LocalStorage|
      |                    |                    |                  |                 |              |             |
      |                    |                    |                  |<--success--------------------------------------|
      |                    |                    |                  |                 |              |             |
      |                    |                    |<--contact--------|                 |              |             |
      |                    |                    |                  |                 |              |             |
      |                    |<--navigate---------|                  |                 |              |             |
      |                    |                    |                  |                 |              |             |
      |                    |--show success----->|                 |              |             |
      |<--display list-----|                    |                  |                 |              |             |
```

## Analysis

### Key Interactions

**User → ContactListView**: User clicks contact from list to edit

**ContactListView → ContactDetailView**: Navigation to edit mode with contact ID

**ContactDetailView → ContactService**: Loads existing contact data

**ContactService → ContactStorage**: Retrieves contact from LocalStorage

**ContactDetailView → ContactValidator**: Inline validation on field changes

**ContactDetailView**: Tracks isDirty state for unsaved change detection

**ContactDetailView → ContactService**: Service coordinates the update process

**ContactService → ContactValidator**: Full contact validation before persistence

**ContactService → Contact**: Updates modified timestamp

**ContactService → ContactStorage**: Atomic update operation to LocalStorage

**ContactDetailView → ContactListView**: Return to list view on successful save

### Design Notes

1. **Load existing data** - Contact data is loaded from storage and populated in form
2. **Inline validation** - Each field is validated as user modifies for immediate feedback
3. **Dirty state tracking** - View tracks when user makes changes for unsaved change warnings
4. **Full validation** - Complete contact validation happens before save attempt
5. **Update timestamp** - Modified timestamp is automatically updated on save
6. **Atomic update** - Storage operation is all-or-nothing to prevent corruption
7. **Success notification** - User sees confirmation message on successful save

### Traceability

- Maps to FR4 (View/Edit Contact) in main.md
- Implements validation rules from FR4
- Implements data flow from main.md (Edit Flow section)
- Implements unsaved change detection from FR4
