# Sequence: Load Contacts

**Source Spec:** main.md (FR3: View Contact List, FR6: Data Persistence)
**Use Case:** Application loads and displays all contacts on startup

## Participants

- App: Application entry point
- ContactService: Business logic for contact operations
- LocalStorageContactRepository: Retrieves contacts from storage
- Router: Manages initial navigation
- ContactListView: Displays loaded contacts
- NotificationService: Reports load errors

## Sequence

```
     App          ContactService    Repository    Router    ContactListView   NotificationService
       |                 |               |           |              |                 |
       | initialize()    |               |           |              |                 |
       |                 |               |           |              |                 |
       | getAllContacts()|               |           |              |                 |
       |---------------->|               |           |              |                 |
       |                 | findAll()     |           |              |                 |
       |                 |-------------->|           |              |                 |
       |                 |               |           |              |                 |
       |                 |    [deserialize from LocalStorage]       |                 |
       |                 |    [parse Date fields]   |              |                 |
       |                 |    [validate structure]  |              |                 |
       |                 |               |           |              |                 |
       |                 |   Contact[]   |           |              |                 |
       |                 |<--------------|           |              |                 |
       |   Contact[]     |               |           |              |                 |
       |<----------------|               |           |              |                 |
       |                 |               |           |              |                 |
       | registerRoutes()|               |           |              |                 |
       |------------------------------>|           |              |                 |
       |                 |               |           |              |                 |
       | navigate("/")   |               |           |              |                 |
       |------------------------------>|           |              |                 |
       |                 |               | render(contacts)         |                 |
       |                 |               |---------->|              |                 |
       |                 |               |           | sortByName() |                 |
       |                 |               |           |              |                 |
       |                 |               |           | [render list or empty state]   |
       |                 |               |           |              |                 |
```

## Alternative Flow: Empty Storage

```
     App          ContactService    Repository    ContactListView
       |                 |               |               |
       | getAllContacts()|               |               |
       |---------------->|               |               |
       |                 | findAll()     |               |
       |                 |-------------->|               |
       |                 |     []        |               |
       |                 |<--------------|               |
       |       []        |               |               |
       |<----------------|               |               |
       |                 |               |               |
       |                 |               | render([])    |
       |                 |               |-------------->|
       |                 |               | renderEmptyState()
       |                 |               |               |
```

## Alternative Flow: Storage Error

```
     App          ContactService    Repository    NotificationService
       |                 |               |                 |
       | getAllContacts()|               |               |
       |---------------->|               |               |
       |                 | findAll()     |               |
       |                 |-------------->|               |
       |                 |    [error: corrupted data]    |
       |                 |<--------------|               |
       |                 |               |               |
       |                 | handleError() |               |
       |                 |------------------------------->|
       |                 |               | showError("Could not load contacts")
       |       []        |               |               |
       |<----------------|               |               |
       |                 |               |               |
```

## Notes

- **Data Validation**: Repository validates data structure on load
- **Date Parsing**: JSON dates are parsed back to Date objects
- **Sorting**: Contacts sorted alphabetically by name in view
- **Empty State**: Special UI shown when no contacts exist
- **Corruption Handling**: Malformed data triggers error, returns empty list
