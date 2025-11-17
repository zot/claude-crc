# UI Specification Template

## UI: ViewName

**Source Spec:** specs/feature.md
**CRC Card:** design/crc-ViewName.md
**Template File:** public/templates/view-name.html

### Layout Structure

**Container Hierarchy:**
- Main container: `.view-container`
  - Header: `.view-header`
  - Content: `.view-content`
  - Footer: `.view-footer`

**ASCII Layout:**
```
┌───────────────────────────┐
│ Header                    │
├───────────────────────────┤
│                           │
│ Content                   │
│                           │
├───────────────────────────┤
│ Footer                    │
└───────────────────────────┘
```

### Styling

#### CSS Classes
- `.view-container` - Main container styling
- `.view-header` - Header styling

### Data Bindings

#### Template Variables
- `{{title}}` - String - View title
- `{{items}}` - Array - List of items

### Behavior

#### Event Handlers
- `.btn-save` → `onSave()` - Saves data
- `.btn-cancel` → `onCancel()` - Cancels and returns

#### State Management
- `isEditing: boolean` - Edit mode flag
- `isDirty: boolean` - Unsaved changes flag

### Navigation

**Entry Points:** From Parent View
**Exit Points:** To Parent View on save/cancel

### Related Components

- ParentView - Launches this view
