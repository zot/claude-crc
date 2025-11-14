# UI: ContactListView

**Source Spec:** main.md (FR3, UI2)
**CRC Card:** crc-ContactListView.md
**Route:** `/` (see manifest-ui.md)
**Template File:** public/templates/contact-list-view.html

## Purpose

Display all contacts in a scrollable list with navigation to detail view. Shows empty state when no contacts exist.

## Data

(See crc-ContactListView.md for implementation details)

- `contacts: Contact[]` - Array of contacts to display (sorted alphabetically by name)
- `selectedContactId?: string` - Currently hovered/focused contact

## Layout Structure

**ASCII Layout:**
```
┌────────────────────────────────────────────────┐
│  Contact Manager                               │
│                                                │
│  [Add Contact]                                 │
├────────────────────────────────────────────────┤
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │ John Doe                                 │ │
│  │ john@example.com | 555-1234             │ │
│  └──────────────────────────────────────────┘ │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │ Jane Smith                               │ │
│  │ jane@example.com | 555-5678             │ │
│  └──────────────────────────────────────────┘ │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │ Bob Johnson                              │ │
│  │ bob@example.com | 555-9012              │ │
│  └──────────────────────────────────────────┘ │
│                                                │
└────────────────────────────────────────────────┘

OR (when no contacts):

┌────────────────────────────────────────────────┐
│  Contact Manager                               │
│                                                │
│  [Add Contact]                                 │
├────────────────────────────────────────────────┤
│                                                │
│           No contacts yet                      │
│                                                │
│      Click "Add Contact" to get started        │
│                                                │
└────────────────────────────────────────────────┘
```

**Container Hierarchy:**
- `.contact-list-container`
  - `.contact-list-header`
    - `h1` - "Contact Manager"
    - `button.btn-add-contact` - "Add Contact"
  - `.contact-list-content`
    - `.contact-card` (repeated for each contact)
      - `.contact-name` - Name
      - `.contact-info` - Email | Phone
    - OR `.empty-state` - "No contacts yet" message

## CSS Classes

- `.contact-list-container` - Main container
- `.contact-list-header` - Header with title and add button
- `.btn-add-contact` - Primary action button
- `.contact-list-content` - Scrollable content area
- `.contact-card` - Individual contact row (clickable)
- `.contact-card:hover` - Hover state for contact row
- `.contact-card:focus` - Focus state for keyboard navigation
- `.contact-name` - Contact name (larger, bold)
- `.contact-info` - Email and phone (smaller, gray)
- `.empty-state` - Empty state message

## Data Bindings

(See crc-ContactListView.md for implementation)

- `{{contact.name}}` - Contact name
- `{{contact.email}}` - Email address (or empty string)
- `{{contact.phone}}` - Phone number (or empty string)
- Display format: "email | phone" (show only what exists)

## Events

(See crc-ContactListView.md for implementation)

- `.btn-add-contact` → `onAddContactClick()` - Navigate to create mode
- `.contact-card` → `onContactClick(id)` - Navigate to edit mode with contact ID
- Keyboard: Enter on focused contact → `onContactClick(id)`

## State Management

- `contacts` - Loaded from ContactService on view mount
- `selectedContactId` - Tracks keyboard navigation focus

## Navigation

(See manifest-ui.md for global navigation patterns)

**Entry Points:**
- Application start (default route)
- After save/cancel/delete from ContactDetailView

**Exit Points:**
- Click "Add Contact" → `/contact/new` (ContactDetailView create mode)
- Click contact row → `/contact/:id` (ContactDetailView edit mode)

## Global Patterns

(See manifest-ui.md)

- **Success messages**: Display after create/update/delete operations
- **Performance**: Render within 100ms for up to 1000 contacts
- **Accessibility**: Full keyboard navigation, ARIA labels, screen reader support

## Related Components

- ContactDetailView - Destination for navigation
- ContactService - Provides contact data
