# NotificationView

**Source Spec:** main.md

## Responsibilities

### Knows
- notification: Notification | null - Current notification to display
- position: "top" | "bottom" - Display position

### Does
- render: Display notification with appropriate styling
- handleDismiss: Close notification on click
- animateIn: Slide in animation
- animateOut: Slide out animation

## Collaborators

- NotificationService: Provides notification data

## Sequences

- seq-create-contact.md: Shows success notification
- seq-edit-contact.md: Shows success notification
- seq-delete-contact.md: Shows success notification

## Notes

Renders success (green), error (red), and warning (yellow) styles.
Auto-dismisses after timeout configured in NotificationService.
