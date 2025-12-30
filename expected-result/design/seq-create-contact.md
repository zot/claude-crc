# Sequence: Create Contact

**Source Spec:** main.md (FR2: Create Contact)
**Use Case:** User creates a new contact with validated data

## Participants

- User: Actor initiating the create flow
- ContactListView: Displays contact list with "Add Contact" button
- Router: Manages navigation between views
- ContactFormView: Form for entering contact data
- ContactValidator: Validates contact field data
- ContactService: Business logic for contact operations
- LocalStorageContactRepository: Persists contact to storage
- NotificationService: Displays success/error messages

## Sequence

```
     User          ContactListView    Router    ContactFormView   ContactValidator   ContactService    Repository    NotificationService
       |                 |              |              |                 |                 |               |                 |
       | click "Add"     |              |              |                 |                 |               |                 |
       |---------------->|              |              |                 |                 |               |                 |
       |                 | navigate("/new")            |                 |                 |               |                 |
       |                 |------------->|              |                 |                 |               |                 |
       |                 |              | render(create)                 |                 |               |                 |
       |                 |              |------------->|                 |                 |               |                 |
       |                 |              |              |                 |                 |               |                 |
       | fill fields     |              |              |                 |                 |               |                 |
       |-------------------------------->|              |                 |                 |               |                 |
       |                 |              |              | validateField() |                 |               |                 |
       |                 |              |              |---------------->|                 |               |                 |
       |                 |              |              |   result        |                 |               |                 |
       |                 |              |              |<----------------|                 |               |                 |
       |                 |              |              |                 |                 |               |                 |
       | click "Save"    |              |              |                 |                 |               |                 |
       |-------------------------------->|              |                 |                 |               |                 |
       |                 |              |              | validateContact()                 |               |                 |
       |                 |              |              |---------------->|                 |               |                 |
       |                 |              |              |   valid         |                 |               |                 |
       |                 |              |              |<----------------|                 |               |                 |
       |                 |              |              |                 |                 |               |                 |
       |                 |              |              |    createContact(formData)       |               |                 |
       |                 |              |              |---------------------------------->|               |                 |
       |                 |              |              |                 |    generateId() |               |                 |
       |                 |              |              |                 |    setTimestamps()              |                 |
       |                 |              |              |                 |                 | save(contact) |                 |
       |                 |              |              |                 |                 |-------------->|                 |
       |                 |              |              |                 |                 |    success    |                 |
       |                 |              |              |                 |                 |<--------------|                 |
       |                 |              |              |      Contact    |                 |               |                 |
       |                 |              |              |<----------------------------------|               |                 |
       |                 |              |              |                 |                 |               |                 |
       |                 |              |              |              showSuccess("Contact created")       |                 |
       |                 |              |              |-------------------------------------------------------------->|
       |                 |              |              |                 |                 |               |                 |
       |                 |              |              | navigate("/")   |                 |               |                 |
       |                 |              |              |------>|         |                 |               |                 |
       |                 |              |   render()   |       |         |                 |               |                 |
       |                 |<-------------|              |       |         |                 |               |                 |
       |                 |              |              |       |         |                 |               |                 |
```

## Notes

- **Validation Failure**: If validation fails, form displays inline errors and does not proceed
- **Storage Error**: If save fails, NotificationService.showError() is called instead
- **ID Generation**: Uses UUID v4 for unique contact IDs
- **Timestamps**: Both `created` and `modified` set to current Date
