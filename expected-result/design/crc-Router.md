# Router

**Source Spec:** main.md

## Responsibilities

### Knows
- currentRoute: string - Current route path
- routes: Map<string, View> - Route to view mapping
- history: History - Browser history API reference

### Does
- navigate: Navigate to a route, update history
- back: Navigate to previous route
- getCurrentRoute: Get current route path
- registerRoute: Register route-to-view mapping
- handlePopState: Handle browser back/forward buttons

## Collaborators

- App: Initializes router with routes
- ContactListView: Displays on "/" route
- ContactFormView: Displays on "/new" and "/edit/:id" routes
- ConfirmDialog: Modal overlay on any route

## Sequences

- seq-create-contact.md: Navigates to form, then back to list
- seq-edit-contact.md: Navigates to form, then back to list
- seq-delete-contact.md: Returns to list after delete
- seq-load-contacts.md: Initial navigation to list view

## Notes

Implements browser history integration per UI1 requirements.
Uses pushState for SPA navigation without page reloads.
