# Sequence: Create Contact

**Source Spec:** main.md (FR2: Create Contact)
**Related CRC Cards:** crc-ContactListView.md, crc-ContactDetailView.md, crc-ContactService.md, crc-ContactValidator.md, crc-Contact.md, crc-ContactStorage.md

## Participants

- **User** - End user creating a contact
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
      |--click "Add"------>|                    |                  |                 |              |             |
      |                    |                    |                  |                 |              |             |
      |                    |--navigate(create)->|                  |                 |              |             |
      |                    |                    |                  |                 |              |             |
      |                    |                    |--render form---->|                 |              |             |
      |                    |                    |                  |                 |              |             |
      |--fill fields---------------------->----|                  |                 |              |             |
      |                    |                    |                  |                 |              |             |
      |                    |                    |--validateField-->|                 |              |             |
      |                    |                    |                  |--validate------>|              |             |
      |                    |                    |                  |<--result--------|              |             |
      |                    |                    |<--result---------|                 |              |             |
      |                    |                    |                  |                 |              |             |
      |--click "Save"---------------------->---|                  |                 |              |             |
      |                    |                    |                  |                 |              |             |
      |                    |                    |--createContact-->|                 |              |             |
      |                    |                    |                  |                 |              |             |
      |                    |                    |                  |--validateContact------------->|             |
      |                    |                    |                  |<--valid------------------------|             |
      |                    |                    |                  |                 |              |             |
      |                    |                    |                  |--generateId---->|              |             |
      |                    |                    |                  |<--uuid----------|              |             |
      |                    |                    |                  |                 |              |             |
      |                    |                    |                  |--new(id, data)--------------->|             |
      |                    |                    |                  |<--contact--------------------|             |
      |                    |                    |                  |                 |              |             |
      |                    |                    |                  |--saveContact(contact)---------------------->|
      |                    |                    |                  |                 |              |             |
      |                    |                    |                  |                 |              |    save to  |
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

**User → ContactListView**: User initiates contact creation from list view

**ContactListView → ContactDetailView**: Navigation to create mode with empty form

**ContactDetailView → ContactValidator**: Inline validation on field changes provides immediate feedback

**ContactDetailView → ContactService**: Service coordinates the creation process

**ContactService → ContactValidator**: Full contact validation before persistence

**ContactService → Contact**: Creates new contact instance with generated ID and timestamps

**ContactService → ContactStorage**: Atomic save operation to LocalStorage

**ContactDetailView → ContactListView**: Return to list view on successful save

### Design Notes

1. **Inline validation** - Each field is validated as user types for immediate feedback
2. **Full validation** - Complete contact validation happens before save attempt
3. **ID generation** - Service generates UUID to ensure uniqueness
4. **Auto-timestamps** - Service sets created and modified timestamps
5. **Atomic save** - Storage operation is all-or-nothing to prevent corruption
6. **Success notification** - User sees confirmation message on successful save

### Traceability

- Maps to FR2 (Create Contact) in main.md
- Implements validation rules from FR2
- Implements data flow from main.md (Create Flow section)
