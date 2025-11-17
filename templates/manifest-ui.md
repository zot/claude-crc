# UI Manifest - Global UI Concerns Template

**Global UI structure, routes, view relationships for [Your Project]**

**Sources:** specs/routes.md, specs/ui.md

---

## Routes

| Route        | View          | Description          | Handler           |
|--------------|---------------|----------------------|-------------------|
| `/`          | HomeView      | Main landing page    | `renderHome()`    |
| `/item/:id`  | ItemView      | Item detail/edit     | `renderItem()`    |

### Route Parameters

- `:id` - Item identifier

### Route Requirements

- Direct navigation
- Page refresh support
- Browser back/forward

---

## View Hierarchy

```
HomeView (/)
  ├─→ ListView (/list)
  │     └─→ ItemView (/item/:id)
  └─→ SettingsView (/settings)
```

---

## Global UI Components

### Navigation Bar
- Logo/home link
- Main navigation
- User menu

### Toast/Notifications
- Success/error messages
- Fixed position

---

## Shared UI Principles

### Visual Theme
- Primary color: #XXXXXX
- Typography: Font family, sizes
- Spacing: Base unit (e.g., 8px)

### Interaction Patterns
- Button states (default, hover, active, disabled)
- Form validation (inline messages)
- Loading states (spinners, skeletons)

### Accessibility
- Keyboard navigation
- Screen reader support
- ARIA labels
- Focus indicators

---

## Related CRC Cards

- crc-Router.md
- crc-ViewManager.md
