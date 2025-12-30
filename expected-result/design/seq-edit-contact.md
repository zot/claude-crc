# Sequence: Edit Contact

**Source Spec:** main.md (FR4: View/Edit Contact)
**Use Case:** User edits an existing contact with validated data

## Participants

- User: Actor initiating the edit flow
- ContactListView: Displays contact list
- Router: Manages navigation between views
- ContactFormView: Form for editing contact data
- ContactService: Business logic for contact operations
- ContactValidator: Validates contact field data
- LocalStorageContactRepository: Persists updated contact
- NotificationService: Displays success/error messages
- ConfirmDialog: Confirms discard of unsaved changes

## Sequence

```
     User          ContactListView    Router    ContactFormView   ContactService   ContactValidator    Repository    NotificationService
       |                 |              |              |                 |                 |               |                 |
       | click contact   |              |              |                 |                 |               |                 |
       |---------------->|              |              |                 |                 |               |                 |
       |                 | navigate("/edit/:id")       |                 |                 |               |                 |
       |                 |------------->|              |                 |                 |               |                 |
       |                 |              | render(edit) |                 |                 |               |                 |
       |                 |              |------------->|                 |                 |               |                 |
       |                 |              |              | getContact(id)  |                 |               |                 |
       |                 |              |              |---------------->|                 |               |                 |
       |                 |              |              |     Contact     |                 |               |                 |
       |                 |              |              |<----------------|                 |               |                 |
       |                 |              |              | loadContact()   |                 |               |                 |
       |                 |              |              |                 |                 |               |                 |
       | modify fields   |              |              |                 |                 |               |                 |
       |-------------------------------->|              |                 |                 |               |                 |
       |                 |              |              | markDirty()     |                 |               |                 |
       |                 |              |              | validateField() |                 |               |                 |
       |                 |              |              |---------------------------------->|               |                 |
       |                 |              |              |     result      |                 |               |                 |
       |                 |              |              |<----------------------------------|               |                 |
       |                 |              |              |                 |                 |               |                 |
       | click "Save"    |              |              |                 |                 |               |                 |
       |-------------------------------->|              |                 |                 |               |                 |
       |                 |              |              | validateContact()                 |               |                 |
       |                 |              |              |---------------------------------->|               |                 |
       |                 |              |              |     valid       |                 |               |                 |
       |                 |              |              |<----------------------------------|               |                 |
       |                 |              |              |                 |                 |               |                 |
       |                 |              |              | updateContact(id, formData)      |               |                 |
       |                 |              |              |---------------->|                 |               |                 |
       |                 |              |              |                 | updateModified()|               |                 |
       |                 |              |              |                 |                 | save(contact) |                 |
       |                 |              |              |                 |-----------------|-------------->|                 |
       |                 |              |              |                 |                 |   success     |                 |
       |                 |              |              |                 |<----------------|---------------|                 |
       |                 |              |              |     Contact     |                 |               |                 |
       |                 |              |              |<----------------|                 |               |                 |
       |                 |              |              |                 |                 |               |                 |
       |                 |              |              |            showSuccess("Contact updated")         |                 |
       |                 |              |              |-------------------------------------------------------------->|
       |                 |              |              |                 |                 |               |                 |
       |                 |              |              | navigate("/")   |                 |               |                 |
       |                 |              |              |------>|         |                 |               |                 |
       |                 |              |   render()   |       |         |                 |               |                 |
       |                 |<-------------|              |       |         |                 |               |                 |
       |                 |              |              |       |         |                 |               |                 |
```

## Alternative Flow: Cancel with Unsaved Changes

```
     User          ContactFormView   ConfirmDialog    Router
       |                 |                 |             |
       | click "Cancel"  |                 |             |
       |---------------->|                 |             |
       |                 | [isDirty=true]  |             |
       |                 | show("Discard?")              |
       |                 |---------------->|             |
       |                 |                 |             |
       | click "Discard" |                 |             |
       |---------------------------------->|             |
       |                 |                 | confirm()   |
       |                 |<----------------|             |
       |                 | navigate("/")   |             |
       |                 |---------------------------->|
       |                 |                 |             |
```

## Notes

- **Unsaved Changes**: Form tracks dirty state, prompts before discarding
- **Validation Failure**: Same as create - inline errors prevent save
- **Modified Timestamp**: Only `modified` is updated, `created` preserved
- **Cancel without Changes**: Direct navigation, no confirmation needed
