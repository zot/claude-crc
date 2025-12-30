# ContactListView

**Source**: main.md (FR3, UI2)
**Route**: / (see manifest-ui.md)

**Purpose**: Display all contacts with navigation to create/edit

## Data (see crc-ContactListView.md)

- `contacts: Contact[]` - All contacts sorted by name
- `isEmpty: boolean` - Whether contact list is empty

## Layout

```
+--------------------------------------------------+
|  Contact Manager                    [+ Add Contact]|
+--------------------------------------------------+
|                                                   |
|  +----------------------------------------------+ |
|  | Name                  Email         Phone    | |
|  +----------------------------------------------+ |
|  | Alice Johnson         alice@ex...  555-1234  | |
|  | Bob Smith             bob@exam...  555-5678  | |
|  | Carol Williams        carol@e...   555-9012  | |
|  |                                              | |
|  +----------------------------------------------+ |
|                                                   |
+--------------------------------------------------+

Empty State:
+--------------------------------------------------+
|  Contact Manager                    [+ Add Contact]|
+--------------------------------------------------+
|                                                   |
|                                                   |
|               No contacts yet.                    |
|         Click "Add Contact" to create one.        |
|                                                   |
|                                                   |
+--------------------------------------------------+
```

## Events (see crc-ContactListView.md)

- `handleAddClick()` - Navigate to /new
- `handleContactClick(id: string)` - Navigate to /edit/:id

## CSS Classes

- `contact-list` - Main container
- `contact-list__header` - Header with title and add button
- `contact-list__table` - Contact table
- `contact-list__row` - Individual contact row (clickable)
- `contact-list__row--hover` - Row hover state
- `contact-list__empty` - Empty state container
- `btn-primary` - Add Contact button
