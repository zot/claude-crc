# Test Design: ContactService

**Source CRC:** crc-ContactService.md
**Source Spec:** main.md (FR2-FR6), coding-standards.md

## Purpose

Test business logic for Contact CRUD operations.

## Test Cases

### TC-1: Create Contact Success

**Purpose:** Verify contact creation with valid data

**Setup:**
- Mock ContactValidator (returns valid)
- Mock IContactRepository

**Input:** Valid contact form data (name, email, phone, notes)

**Expected Result:**
- generateId() called
- created and modified timestamps set
- repository.save() called with Contact
- Returns created Contact

### TC-2: Create Contact Validation Failure

**Purpose:** Verify creation fails with invalid data

**Setup:**
- Mock ContactValidator (returns invalid with errors)
- Mock IContactRepository

**Input:** Invalid contact form data (empty name)

**Expected Result:**
- Throws validation error
- repository.save() NOT called

### TC-3: Update Contact Success

**Purpose:** Verify contact update with valid data

**Setup:**
- Mock ContactValidator (returns valid)
- Mock IContactRepository with existing contact

**Input:** Contact ID and updated form data

**Expected Result:**
- modified timestamp updated (created unchanged)
- repository.save() called
- Returns updated Contact

### TC-4: Update Contact Not Found

**Purpose:** Verify update fails for non-existent contact

**Setup:**
- Mock IContactRepository (returns null for findById)

**Input:** Non-existent contact ID

**Expected Result:**
- Throws "Contact not found" error
- repository.save() NOT called

### TC-5: Delete Contact Success

**Purpose:** Verify contact deletion

**Setup:**
- Mock IContactRepository with existing contact

**Input:** Existing contact ID

**Expected Result:**
- repository.delete() called with ID
- Returns void/success

### TC-6: Delete Contact Not Found

**Purpose:** Verify delete fails for non-existent contact

**Setup:**
- Mock IContactRepository (returns null for findById)

**Input:** Non-existent contact ID

**Expected Result:**
- Throws "Contact not found" error
- repository.delete() NOT called

### TC-7: Get Contact Success

**Purpose:** Verify single contact retrieval

**Setup:**
- Mock IContactRepository with existing contact

**Input:** Existing contact ID

**Expected Result:**
- repository.findById() called
- Returns Contact

### TC-8: Get Contact Not Found

**Purpose:** Verify get returns null for non-existent contact

**Setup:**
- Mock IContactRepository (returns null)

**Input:** Non-existent contact ID

**Expected Result:**
- Returns null

### TC-9: Get All Contacts

**Purpose:** Verify retrieval of all contacts sorted by name

**Setup:**
- Mock IContactRepository with multiple contacts

**Input:** None

**Expected Result:**
- repository.findAll() called
- Returns Contact[] sorted alphabetically by name

### TC-10: Get All Contacts Empty

**Purpose:** Verify empty array returned when no contacts

**Setup:**
- Mock IContactRepository (returns empty array)

**Input:** None

**Expected Result:**
- Returns empty array []

### TC-11: Generate ID Format

**Purpose:** Verify generated IDs are valid UUIDs

**Setup:** ContactService instance

**Input:** Call generateId() multiple times

**Expected Result:**
- Returns valid UUID v4 format strings
- All IDs are unique
