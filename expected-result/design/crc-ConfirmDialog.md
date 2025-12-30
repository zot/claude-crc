# ConfirmDialog

**Source Spec:** main.md

## Responsibilities

### Knows
- isOpen: boolean - Dialog visibility state
- title: string - Dialog title
- message: string - Confirmation message
- confirmLabel: string - Confirm button text
- cancelLabel: string - Cancel button text
- onConfirm: () => void - Callback for confirm action
- onCancel: () => void - Callback for cancel action

### Does
- show: Display dialog with configuration
- hide: Close dialog
- handleConfirm: Execute confirm callback, close
- handleCancel: Execute cancel callback, close
- handleOverlayClick: Close on backdrop click
- handleEscapeKey: Close on Escape key

## Collaborators

- ContactFormView: Confirms delete and discard changes
- Router: May be used for navigation confirmation

## Sequences

- seq-delete-contact.md: Confirms contact deletion
- seq-edit-contact.md: Confirms discard unsaved changes
