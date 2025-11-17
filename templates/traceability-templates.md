# UI Template Traceability Template

**Purpose:** Link HTML templates to their UI specifications

---

## Comment Format

Every HTML template MUST have a header comment:

```html
<!-- @layout ui-view-name.md -->
<!-- @spec specs/feature.md -->
```

**Tags:**
- `@layout` - UI spec in design/ (REQUIRED)
- `@spec` - Human spec in specs/ (OPTIONAL)

### Section Comments

```html
<!-- @layout ui-view-name.md → Section Name -->
<div class="section-name">
  ...
</div>
```

---

## Example

**File:** `public/templates/view-name.html`

```html
<!-- @layout ui-view-name.md -->
<!-- @spec specs/feature.md -->
<!DOCTYPE html>
<html>
  <body>
    <!-- @layout ui-view-name.md → Header -->
    <div class="view-header">
      <h1>{{title}}</h1>
    </div>
  </body>
</html>
```

---

## Benefits

- Bidirectional linking
- Easy navigation
- Clear documentation
- Maintenance clarity
