# ConfirmDialog

**Source**: main.md (FR4, FR5, UI3)
**Route**: Modal overlay on any route (see manifest-ui.md)

**Purpose**: Confirmation dialog for destructive actions

## Data (see crc-ConfirmDialog.md)

- `isOpen: boolean` - Dialog visibility
- `title: string` - Dialog title
- `message: string` - Confirmation message
- `confirmLabel: string` - Confirm button text
- `cancelLabel: string` - Cancel button text

## Layout

```
+--------------------------------------------------+
|                  (backdrop overlay)               |
|                                                   |
|       +------------------------------------+      |
|       |  Delete Contact?                   |      |
|       +------------------------------------+      |
|       |                                    |      |
|       |  Are you sure you want to delete   |      |
|       |  this contact? This action cannot  |      |
|       |  be undone.                        |      |
|       |                                    |      |
|       +------------------------------------+      |
|       |       [Cancel]       [Delete]      |      |
|       +------------------------------------+      |
|                                                   |
+--------------------------------------------------+
```

## Events (see crc-ConfirmDialog.md)

- `handleConfirm()` - Execute confirm action, close
- `handleCancel()` - Execute cancel action, close
- `handleOverlayClick()` - Close on backdrop click
- `handleEscapeKey()` - Close on Escape key

## CSS Classes

- `confirm-dialog` - Main dialog container
- `confirm-dialog__overlay` - Backdrop (semi-transparent)
- `confirm-dialog__modal` - Dialog box
- `confirm-dialog__title` - Title text
- `confirm-dialog__message` - Body message
- `confirm-dialog__actions` - Button container
- `btn-secondary` - Cancel button
- `btn-danger` - Confirm/Delete button

## Accessibility

- Focus trapped within dialog when open
- Initial focus on Cancel button (safer default)
- Escape key closes dialog
- ARIA role="dialog" with aria-modal="true"
