# Sequence: Delete Contact

**Source Spec:** main.md (FR5: Delete Contact)
**Use Case:** User deletes an existing contact with confirmation

## Participants

- User: Actor initiating the delete flow
- ContactFormView: Form view with delete button
- ConfirmDialog: Confirmation dialog for destructive action
- ContactService: Business logic for contact operations
- LocalStorageContactRepository: Removes contact from storage
- Router: Manages navigation after delete
- NotificationService: Displays success/error messages

## Sequence

```
     User          ContactFormView   ConfirmDialog    ContactService    Repository    Router    NotificationService
       |                 |                 |                 |               |           |              |
       | click "Delete"  |                 |                 |               |           |              |
       |---------------->|                 |                 |               |           |              |
       |                 | show("Delete contact?")           |               |           |              |
       |                 |---------------->|                 |               |           |              |
       |                 |                 |                 |               |           |              |
       | click "Confirm" |                 |                 |               |           |              |
       |---------------------------------->|                 |               |           |              |
       |                 |                 | onConfirm()     |               |           |              |
       |                 |<----------------|                 |               |           |              |
       |                 |                 |                 |               |           |              |
       |                 | deleteContact(id)                 |               |           |              |
       |                 |---------------------------------->|               |           |              |
       |                 |                 |                 | delete(id)    |           |              |
       |                 |                 |                 |-------------->|           |              |
       |                 |                 |                 |    success    |           |              |
       |                 |                 |                 |<--------------|           |              |
       |                 |      success    |                 |               |           |              |
       |                 |<----------------------------------|               |           |              |
       |                 |                 |                 |               |           |              |
       |                 |                    showSuccess("Contact deleted") |           |              |
       |                 |---------------------------------------------------------------------->|
       |                 |                 |                 |               |           |              |
       |                 | navigate("/")   |                 |               |           |              |
       |                 |---------------------------------------------------------->|              |
       |                 |                 |                 |               | render()  |              |
       |                 |                 |                 |               |<----------|              |
       |                 |                 |                 |               |           |              |
```

## Alternative Flow: Cancel Deletion

```
     User          ContactFormView   ConfirmDialog
       |                 |                 |
       | click "Delete"  |                 |
       |---------------->|                 |
       |                 | show("Delete?") |
       |                 |---------------->|
       |                 |                 |
       | click "Cancel"  |                 |
       |---------------------------------->|
       |                 |                 | onCancel()
       |                 |<----------------|
       |                 | [remain in form]|
       |                 |                 |
```

## Notes

- **Confirmation Required**: Delete is a destructive action, always confirmed
- **No Undo**: Deletion is permanent in current implementation
- **Navigation**: Returns to list view after successful delete
- **Error Handling**: Storage errors display error notification
