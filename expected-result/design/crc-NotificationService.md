# NotificationService

**Source Spec:** main.md

## Responsibilities

### Knows
- currentNotification: Notification | null - Currently displayed notification
- timeout: number - Auto-dismiss timeout in milliseconds

### Does
- showSuccess: Display success message (green)
- showError: Display error message (red)
- showWarning: Display warning message (yellow)
- dismiss: Hide current notification
- setAutoDissmissTimeout: Configure auto-dismiss duration

## Collaborators

- ContactService: Reports operation success/failure
- LocalStorageContactRepository: Reports storage errors
- NotificationView: Renders notification UI

## Sequences

- seq-create-contact.md: Shows success after save
- seq-edit-contact.md: Shows success after save
- seq-delete-contact.md: Shows success after delete
