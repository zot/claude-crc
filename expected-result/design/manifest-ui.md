# UI Manifest

**Source Spec:** main.md (UI1-UI4)

## Routes

| Route | View | Description |
|-------|------|-------------|
| `/` | ContactListView | Contact list (default) |
| `/new` | ContactFormView | Create new contact |
| `/edit/:id` | ContactFormView | Edit existing contact |

## View Hierarchy

```
App
+-- NotificationView (global overlay)
+-- Router
    +-- ContactListView (/)
    +-- ContactFormView (/new, /edit/:id)
        +-- ConfirmDialog (modal overlay)
```

## Global Components

- **NotificationView**: Top-positioned toast notifications
- **ConfirmDialog**: Centered modal with overlay backdrop

## UI Patterns

### Form Fields
- Label above input
- Error message below input (red text)
- Required fields marked with asterisk
- Real-time validation on blur

### Buttons
- Primary: Save actions (blue/accent color)
- Secondary: Cancel actions (gray)
- Danger: Delete actions (red)

### Empty States
- Centered message with illustration placeholder
- Call-to-action button

### Lists
- Click entire row to select
- Hover state for rows
- Zebra striping optional

## Theme

- **Colors**: Neutral grays, accent blue, error red, success green
- **Typography**: System font stack, 16px base
- **Spacing**: 8px unit grid (8, 16, 24, 32px)
- **Border Radius**: 4px for inputs, buttons

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, full-width forms |
| Tablet | 640-1024px | Centered content, max-width 600px |
| Desktop | > 1024px | Centered content, max-width 800px |

## Accessibility

- Focus visible on all interactive elements
- ARIA labels on icon-only buttons
- Form labels properly associated
- Color contrast WCAG AA compliant
- Keyboard navigation for all actions

## Browser History

- pushState for SPA navigation
- popstate handler for back/forward
- Confirm before leaving dirty form
