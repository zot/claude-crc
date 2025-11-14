# Test Design: ContactStorage

**Source Specs**: main.md (FR6: Data Persistence, EH2: Storage Errors, EH3: Data Corruption)
**CRC Cards**: crc-ContactStorage.md
**Sequences**: seq-create-contact.md, seq-edit-contact.md, seq-delete-contact.md, seq-load-contacts.md

## Overview

Test suite for ContactStorage covering LocalStorage persistence, caching, and error handling.

## Test Cases

### Test: Initialize storage from empty LocalStorage

**Purpose**: Verify that storage initializes correctly when no data exists in LocalStorage.

**Motivation**: First-time user scenario. Ensures clean startup.

**Input**:
- LocalStorage is empty (no "contacts" key)
- Call initialize()

**References**:
- CRC: crc-ContactStorage.md - "Does: initialize()"
- Sequence: seq-load-contacts.md

**Expected Results**:
- initialize() completes successfully
- contacts Map is empty
- No errors thrown

**References**:
- CRC: crc-ContactStorage.md - "Knows: contacts Map"
- Spec: main.md FR6 - "Load on application start"

---

### Test: Initialize storage from existing data

**Purpose**: Verify that storage loads existing contacts from LocalStorage on initialization.

**Motivation**: Returning user scenario. Ensures data persistence.

**Input**:
- LocalStorage contains valid contacts JSON at key "contacts"
- JSON represents 3 contacts
- Call initialize()

**References**:
- CRC: crc-ContactStorage.md - "Does: initialize()"
- Sequence: seq-load-contacts.md

**Expected Results**:
- initialize() completes successfully
- contacts Map contains 3 contacts
- Each contact correctly deserialized with all properties

**References**:
- CRC: crc-ContactStorage.md - "Knows: contacts Map"
- Spec: main.md FR6 - "No data loss on browser refresh"

---

### Test: Initialize storage with corrupted data

**Purpose**: Verify that storage handles corrupted LocalStorage data gracefully.

**Motivation**: Data corruption scenario. Prevents application crash.

**Input**:
- LocalStorage contains invalid JSON at key "contacts"
- Call initialize()

**References**:
- CRC: crc-ContactStorage.md - "Does: initialize()"
- CRC: crc-ContactStorage.md - "Does: handleStorageError()"

**Expected Results**:
- initialize() completes (does not throw unhandled error)
- contacts Map is empty or contains only valid contacts
- Error logged or reported to user
- User given option to reset data

**References**:
- Spec: main.md EH3 - "Validate data structure on load, handle missing or malformed data"

---

### Test: Save new contact

**Purpose**: Verify that a new contact is persisted to LocalStorage and added to cache.

**Motivation**: Core save functionality. Ensures data is not lost.

**Input**:
- ContactStorage initialized with empty contacts
- Contact object to save with id "uuid-123"

**References**:
- CRC: crc-ContactStorage.md - "Does: saveContact()"
- Sequence: seq-create-contact.md

**Expected Results**:
- Contact added to contacts Map with key "uuid-123"
- LocalStorage updated with serialized contacts array
- saveContact() resolves successfully

**References**:
- CRC: crc-ContactStorage.md - "Knows: contacts Map"
- Spec: main.md FR6 - "Persist immediately on save"

---

### Test: Update existing contact

**Purpose**: Verify that updating a contact updates both cache and LocalStorage.

**Motivation**: Core update functionality. Ensures changes are persisted.

**Input**:
- ContactStorage initialized with one contact (id "uuid-123", name "John")
- Updated contact (id "uuid-123", name "John Doe")

**References**:
- CRC: crc-ContactStorage.md - "Does: saveContact()"
- Sequence: seq-edit-contact.md

**Expected Results**:
- Contact in contacts Map updated with new data
- LocalStorage updated with serialized contacts array
- saveContact() resolves successfully
- Old contact data replaced (not duplicated)

**References**:
- CRC: crc-ContactStorage.md - "Knows: contacts Map"
- Spec: main.md NFR3 - "Atomic save operations (all-or-nothing)"

---

### Test: Get contact by ID

**Purpose**: Verify that a contact can be retrieved from cache by ID.

**Motivation**: Read operation for edit view. Ensures fast retrieval.

**Input**:
- ContactStorage initialized with 3 contacts
- Request contact with id "uuid-123"

**References**:
- CRC: crc-ContactStorage.md - "Does: getContact()"
- Sequence: seq-edit-contact.md

**Expected Results**:
- getContact() returns the correct contact
- Contact properties match stored data
- No LocalStorage read (uses cache)

**References**:
- CRC: crc-ContactStorage.md - "Knows: contacts Map (in-memory cache)"

---

### Test: Get non-existent contact

**Purpose**: Verify that attempting to get a contact that doesn't exist returns null.

**Motivation**: Handles invalid ID scenario gracefully.

**Input**:
- ContactStorage initialized with 3 contacts
- Request contact with id "invalid-uuid"

**References**:
- CRC: crc-ContactStorage.md - "Does: getContact()"

**Expected Results**:
- getContact() returns null
- No error thrown

**References**:
- CRC: crc-ContactStorage.md - "Does: getContact()"

---

### Test: Get all contacts

**Purpose**: Verify that all contacts can be retrieved as an array.

**Motivation**: List view data retrieval. Ensures complete data access.

**Input**:
- ContactStorage initialized with 5 contacts

**References**:
- CRC: crc-ContactStorage.md - "Does: getAllContacts()"
- Sequence: seq-load-contacts.md

**Expected Results**:
- getAllContacts() returns array of 5 contacts
- Array contains all contact objects
- Array is independent copy (not reference to internal Map)

**References**:
- CRC: crc-ContactStorage.md - "Knows: contacts Map"

---

### Test: Delete contact

**Purpose**: Verify that a contact is removed from cache and LocalStorage.

**Motivation**: Core delete functionality. Ensures data is removed.

**Input**:
- ContactStorage initialized with 3 contacts
- Delete contact with id "uuid-123"

**References**:
- CRC: crc-ContactStorage.md - "Does: deleteContact()"
- Sequence: seq-delete-contact.md

**Expected Results**:
- Contact removed from contacts Map
- LocalStorage updated (contact no longer in serialized array)
- deleteContact() resolves successfully
- Other contacts remain unaffected

**References**:
- CRC: crc-ContactStorage.md - "Knows: contacts Map"
- Spec: main.md FR5 - "Remove from storage on confirm"

---

### Test: Delete non-existent contact

**Purpose**: Verify that attempting to delete a contact that doesn't exist completes without error.

**Motivation**: Handles invalid ID scenario gracefully.

**Input**:
- ContactStorage initialized with 3 contacts
- Delete contact with id "invalid-uuid"

**References**:
- CRC: crc-ContactStorage.md - "Does: deleteContact()"

**Expected Results**:
- deleteContact() resolves successfully (idempotent operation)
- No error thrown
- Existing contacts unaffected

**References**:
- CRC: crc-ContactStorage.md - "Does: deleteContact()"

---

### Test: Handle storage quota exceeded

**Purpose**: Verify that storage quota errors are caught and reported.

**Motivation**: LocalStorage has size limits. Must handle gracefully.

**Input**:
- Mock LocalStorage.setItem() to throw QuotaExceededError
- Attempt to save contact

**References**:
- CRC: crc-ContactStorage.md - "Does: handleStorageError()"
- Spec: main.md EH2 - "Detect storage quota exceeded"

**Expected Results**:
- Error caught by handleStorageError()
- User-friendly error message displayed
- Error indicates quota issue and suggests solutions
- Application remains functional (no crash)

**References**:
- CRC: crc-ContactStorage.md - "Does: handleStorageError()"
- Spec: main.md EH2 - "Show user-friendly error messages, provide recovery options"

---

### Test: Handle storage access denied

**Purpose**: Verify that storage access errors are caught and reported.

**Motivation**: Privacy settings may block LocalStorage. Must handle gracefully.

**Input**:
- Mock LocalStorage.setItem() to throw SecurityError
- Attempt to save contact

**References**:
- CRC: crc-ContactStorage.md - "Does: handleStorageError()"
- Spec: main.md EH2 - "Detect storage access denied"

**Expected Results**:
- Error caught by handleStorageError()
- User-friendly error message displayed
- Error explains permissions issue
- Application remains functional (in-memory fallback)

**References**:
- CRC: crc-ContactStorage.md - "Does: handleStorageError()"
- Spec: main.md EH2 - "Show user-friendly error messages"

---

### Test: Atomic save operation

**Purpose**: Verify that save operations are all-or-nothing (atomic).

**Motivation**: Prevents partial saves that could corrupt data.

**Input**:
- ContactStorage with 2 existing contacts
- Attempt to save 3rd contact but simulate partial failure

**References**:
- CRC: crc-ContactStorage.md - "Does: saveContact()"
- Spec: main.md NFR3 - "Atomic save operations (all-or-nothing)"

**Expected Results**:
- If save fails, contacts Map reverts to previous state
- LocalStorage remains unchanged (or reverts)
- No partial data written
- Error thrown indicating save failed

**References**:
- Spec: main.md NFR3 - "Atomic save operations (all-or-nothing)"

---

## Coverage Summary

**Responsibilities Covered**:
- ✅ initialize() - 3 test cases (empty, with data, corrupted)
- ✅ saveContact() - 2 test cases (new, update)
- ✅ getContact() - 2 test cases (exists, not exists)
- ✅ getAllContacts() - 1 test case
- ✅ deleteContact() - 2 test cases (exists, not exists)
- ✅ handleStorageError() - 2 test cases (quota, access)
- ✅ Atomic operations - 1 test case

**Scenarios Covered**:
- ✅ Happy path: Create, read, update, delete
- ✅ Error path: Corrupted data
- ✅ Error path: Storage quota exceeded
- ✅ Error path: Storage access denied
- ✅ Edge cases: Non-existent IDs, empty storage
- ✅ Performance: In-memory cache usage

**Gaps**:
- None - all ContactStorage responsibilities have tests
