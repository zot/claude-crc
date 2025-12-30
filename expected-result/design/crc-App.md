# App

**Source Spec:** main.md, coding-standards.md

## Responsibilities

### Knows
- contactService: ContactService - Business logic service
- router: Router - Navigation controller
- views: Map<string, View> - All view instances

### Does
- initialize: Bootstrap application, load contacts, setup routes
- render: Render current view based on route
- handleError: Global error handling

## Collaborators

- ContactService: Dependency injection, business logic
- Router: Navigation management
- ContactListView: List view instance
- ContactFormView: Form view instance
- NotificationService: Error reporting

## Sequences

- seq-load-contacts.md: Application startup flow
