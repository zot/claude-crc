# Test Design: LocalStorageContactRepository

**Source CRC:** crc-LocalStorageContactRepository.md
**Source Spec:** main.md (FR6: Data Persistence)

## Purpose

Test LocalStorage persistence operations for contacts.

## Test Cases

### TC-1: Save Contact

**Purpose:** Verify contact is serialized and saved to LocalStorage

**Setup:**
- Mock localStorage
- Repository instance

**Input:** Valid Contact object

**Expected Result:**
- localStorage.setItem() called with STORAGE_KEY
- Contact serialized to JSON string
- Dates serialized as ISO strings

### TC-2: Find All Contacts

**Purpose:** Verify all contacts retrieved and deserialized

**Setup:**
- Mock localStorage with serialized contacts
- Repository instance

**Input:** None

**Expected Result:**
- localStorage.getItem() called with STORAGE_KEY
- Returns Contact[] with Date objects (not strings)

### TC-3: Find All Empty Storage

**Purpose:** Verify empty array returned when storage is empty

**Setup:**
- Mock localStorage (returns null)
- Repository instance

**Input:** None

**Expected Result:**
- Returns empty array []

### TC-4: Find By ID Success

**Purpose:** Verify single contact retrieval by ID

**Setup:**
- Mock localStorage with multiple contacts
- Repository instance

**Input:** Existing contact ID

**Expected Result:**
- Returns Contact matching ID

### TC-5: Find By ID Not Found

**Purpose:** Verify null returned for non-existent ID

**Setup:**
- Mock localStorage with contacts
- Repository instance

**Input:** Non-existent contact ID

**Expected Result:**
- Returns null

### TC-6: Delete Contact

**Purpose:** Verify contact removed from storage

**Setup:**
- Mock localStorage with contacts
- Repository instance

**Input:** Existing contact ID

**Expected Result:**
- Contact removed from stored array
- localStorage.setItem() called with updated array

### TC-7: Clear All Contacts

**Purpose:** Verify all contacts removed

**Setup:**
- Mock localStorage with contacts
- Repository instance

**Input:** None

**Expected Result:**
- localStorage.removeItem() called with STORAGE_KEY
- Or setItem with empty array

### TC-8: Date Serialization/Deserialization

**Purpose:** Verify Date objects survive round-trip

**Setup:**
- Repository instance
- Contact with specific dates

**Input:** Save then retrieve contact

**Expected Result:**
- created and modified are Date objects
- Date values match original

### TC-9: Storage Quota Exceeded

**Purpose:** Verify graceful handling of quota error

**Setup:**
- Mock localStorage to throw QuotaExceededError

**Input:** Save contact

**Expected Result:**
- Throws descriptive error
- Does not corrupt existing data

### TC-10: Storage Access Denied

**Purpose:** Verify graceful handling of access error

**Setup:**
- Mock localStorage to throw SecurityError

**Input:** Any storage operation

**Expected Result:**
- Throws descriptive error

### TC-11: Corrupted Data Handling

**Purpose:** Verify recovery from malformed stored data

**Setup:**
- Mock localStorage with invalid JSON

**Input:** findAll()

**Expected Result:**
- Returns empty array (or throws with clear error)
- Does not crash application
