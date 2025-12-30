# NotificationView

**Source**: main.md (FR2, FR4, FR5)
**Route**: Global overlay (see manifest-ui.md)

**Purpose**: Display toast notifications for operation results

## Data (see crc-NotificationView.md)

- `notification: Notification | null` - Current notification
- `type: "success" | "error" | "warning"` - Notification style

## Layout

```
+--------------------------------------------------+
|  +----------------------------------------------+ |
|  |  [icon] Contact created successfully      [x] | |
|  +----------------------------------------------+ |
|                                                   |
|                                                   |
|                   (page content)                  |
|                                                   |
|                                                   |
+--------------------------------------------------+
```

## Notification Types

```
Success (green):
+----------------------------------------------+
|  [check] Contact created successfully     [x] |
+----------------------------------------------+

Error (red):
+----------------------------------------------+
|  [!] Could not save contact. Try again.   [x] |
+----------------------------------------------+

Warning (yellow):
+----------------------------------------------+
|  [!] Storage is almost full.              [x] |
+----------------------------------------------+
```

## Events (see crc-NotificationView.md)

- `handleDismiss()` - Close notification

## CSS Classes

- `notification` - Main container
- `notification--success` - Green success style
- `notification--error` - Red error style
- `notification--warning` - Yellow warning style
- `notification__icon` - Status icon
- `notification__message` - Message text
- `notification__dismiss` - Close button

## Animation

- Slide in from top
- Auto-dismiss after 3-5 seconds
- Slide out on dismiss
