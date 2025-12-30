# Test Design: Router

**Source CRC:** crc-Router.md
**Source Spec:** main.md (UI1)

## Purpose

Test SPA router navigation and history integration.

## Test Cases

### TC-1: Register Route

**Purpose:** Verify routes can be registered

**Setup:** Router instance

**Input:** registerRoute("/", handler)

**Expected Result:**
- Route registered successfully
- Handler called when navigating to "/"

### TC-2: Navigate to Route

**Purpose:** Verify navigation updates URL and calls handler

**Setup:** Router with registered routes

**Input:** navigate("/new")

**Expected Result:**
- URL updated to "/new"
- Corresponding handler called
- Returns true

### TC-3: Navigate with Parameters

**Purpose:** Verify route parameters extracted correctly

**Setup:** Router with "/edit/:id" route

**Input:** navigate("/edit/123")

**Expected Result:**
- Handler called with params.id = "123"

### TC-4: Navigation Guard Blocks

**Purpose:** Verify navigation guard can prevent navigation

**Setup:** Router with guard returning false

**Input:** navigate("/new")

**Expected Result:**
- Navigation blocked
- URL unchanged
- Returns false

### TC-5: Navigation Guard Allows

**Purpose:** Verify navigation proceeds when guard returns true

**Setup:** Router with guard returning true

**Input:** navigate("/new")

**Expected Result:**
- Navigation proceeds
- Handler called

### TC-6: Browser Back Button

**Purpose:** Verify popstate handler works

**Setup:** Router with history entries

**Input:** Trigger popstate event

**Expected Result:**
- Correct handler called for current URL

### TC-7: Replace History

**Purpose:** Verify replace mode doesn't add history entry

**Setup:** Router instance

**Input:** navigate("/new", true)

**Expected Result:**
- URL updated
- History not extended (replaceState used)

### TC-8: Unknown Route

**Purpose:** Verify fallback for unmatched routes

**Setup:** Router with routes

**Input:** navigate("/unknown")

**Expected Result:**
- Redirects to "/" or shows 404
