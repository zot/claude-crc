# UI Manifest - Global UI Concerns

**Global UI structure, routes, view relationships, and shared components for Contact Manager**

**Sources**:
- main.md - Application structure, UI requirements, functional requirements
- coding-standards.md - Accessibility and code organization principles

---

## Routes

**Source**: main.md (UI1: Navigation)

| Route | View | Description | Handler |
|-------|------|-------------|---------|
| `/` | ContactListView | Main contact list | `renderList()` |
| `/contact/new` | ContactDetailView | Create new contact | `renderDetail('create')` |
| `/contact/:id` | ContactDetailView | View/edit contact | `renderDetail('edit', id)` |

### Route Parameters
- `:id` - Contact UUID identifier

### Route Requirements
- Browser back button support
- Page refresh support (data persists via LocalStorage)
- Direct URL navigation support

---

## View Hierarchy

**Source**: main.md (UI1: Navigation, data flows)

```
ContactListView (/)
  ├─→ ContactDetailView (/contact/new) - Click "Add Contact"
  └─→ ContactDetailView (/contact/:id) - Click contact row
        └─→ ContactListView (/) - Save/Cancel/Delete returns to list
```

### Navigation Entry Points

**From ContactListView:**
- Click "Add Contact" button → ContactDetailView (create mode)
- Click contact row → ContactDetailView (edit mode with contact ID)

**From ContactDetailView:**
- Click "Save" → ContactListView (after successful save)
- Click "Cancel" → ContactListView (with unsaved change confirmation if dirty)
- Click "Delete" → ContactListView (after successful delete with confirmation)

---

## Global UI Patterns

**Source**: main.md (FR2, FR4, FR5, NFR2, UI3)

### Validation Pattern

**Pattern**: Inline validation with immediate feedback

**Behavior**:
- Validate each field on change (inline)
- Display field-level error messages below input
- Prevent save until all errors corrected
- Preserve user input on validation failure

**Implementation**:
- ContactValidator provides validation logic
- ContactDetailView displays validation errors
- Error messages are clear and actionable (NFR2)

### Unsaved Change Detection

**Pattern**: Track dirty state and confirm before navigation

**Behavior**:
- Set `isDirty = true` when any field changes
- Show confirmation dialog before Cancel if dirty
- Show confirmation dialog before navigation if dirty
- Dialog: "You have unsaved changes. Are you sure you want to leave?"

**Implementation**:
- ContactDetailView tracks isDirty flag
- confirmUnsavedChanges() method shows dialog

### Confirmation Dialogs

**Pattern**: Confirm destructive actions

**Behavior**:
- Delete contact requires confirmation
- Dialog: "Are you sure you want to delete this contact? This cannot be undone."
- Cancel with unsaved changes requires confirmation

**Implementation**:
- ContactDetailView confirmDelete() method
- ContactDetailView confirmUnsavedChanges() method

### Success Messages

**Pattern**: Transient success notifications

**Behavior**:
- Show success message after create: "Contact created successfully"
- Show success message after update: "Contact updated successfully"
- Show success message after delete: "Contact deleted successfully"
- Auto-dismiss after 3 seconds

**Implementation**:
- ContactListView showSuccessMessage() method

---

## Visual Theme

**Source**: main.md (UI4: Visual Design)

**Global theme requirements for all views**

### Design Principles
- Clean, minimal interface
- Responsive layout (mobile and desktop)
- Accessible (WCAG 2.1 Level AA)

### Accessibility Requirements
**Source**: coding-standards.md (Accessibility section)

- Semantic HTML (`<button>` for buttons, `<label>` for inputs)
- ARIA labels on interactive elements
- Keyboard navigation support (Tab, Enter, Escape)
- Sufficient color contrast (4.5:1 for normal text)
- Focus indicators visible
- Screen reader compatibility

### Form Design
- Labeled inputs (associated with `<label>`)
- Inline validation error messages
- Required fields indicated (visual + ARIA)
- Clear "Save", "Cancel", "Delete" buttons

---

## Browser History Integration

**Source**: main.md (UI1: Navigation)

**Pattern**: Single-page application with URL-based navigation

**Navigation Behavior**:
- Browser back button navigates between views
- Direct URL navigation works (bookmarkable routes)
- Page refresh preserves data (LocalStorage)

---

## Performance Requirements

**Source**: main.md (NFR1: Performance)

**Targets**:
- List view render: < 100ms for up to 1000 contacts
- Save operations: < 200ms
- Form validation: Immediate (< 50ms per field)

---

## Data Persistence

**Source**: main.md (FR6: Data Persistence)

**Pattern**: LocalStorage with immediate persistence

**Behavior**:
- Save immediately on commit (no auto-save)
- Load on application start
- No data loss on browser refresh
- Atomic operations (all-or-nothing saves)

**Error Handling**:
- Storage quota exceeded: Show error with recovery options
- Storage access denied: Show error explaining permissions
- Data corruption: Validate on load, offer to reset

---

*Last updated: 2025-11-14*
