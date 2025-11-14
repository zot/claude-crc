# Test Design: ContactService

**Source Specs**: main.md (FR2, FR3, FR4, FR5)
**CRC Cards**: crc-ContactService.md
**Sequences**: seq-create-contact.md, seq-edit-contact.md, seq-delete-contact.md, seq-load-contacts.md

## Overview

Test suite for ContactService covering business logic, validation integration, and coordination with storage.

## Test Cases

### Test: Create contact with valid data

**Purpose**: Verify that creating a contact with valid data generates ID, sets timestamps, validates, and persists.

**Motivation**: Core create functionality. Integration of validation and storage.

**Input**:
- name: "John Doe"
- email: "john@example.com"
- phone: "555-1234"
- notes: "Test contact"

**References**:
- CRC: crc-ContactService.md - "Does: createContact()"
- Sequence: seq-create-contact.md

**Expected Results**:
- UUID generated for id
- created and modified timestamps set to current time
- Contact validated via ContactValidator
- Contact saved via ContactStorage
- createContact() returns new contact object
- Contact has all input fields plus id and timestamps

**References**:
- CRC: crc-ContactService.md - "Does: generateId()"
- Spec: main.md FR2 - "Generate unique ID automatically, set created and modified timestamps"

---

### Test: Create contact with validation error

**Purpose**: Verify that creating a contact with invalid data fails validation and is not saved.

**Motivation**: Prevents invalid data from being persisted.

**Input**:
- name: "" (empty, invalid)
- email: "john@example.com"

**References**:
- CRC: crc-ContactService.md - "Does: createContact()"
- Sequence: seq-create-contact.md (validation path)

**Expected Results**:
- ContactValidator returns validation errors
- createContact() throws error with validation messages
- No contact saved to storage
- ID not generated (validation fails first)

**References**:
- CRC: crc-ContactService.md collaborates with ContactValidator
- Spec: main.md FR2 - "Validation: Name is required"

---

### Test: Update contact with valid data

**Purpose**: Verify that updating a contact validates data, updates modified timestamp, and persists.

**Motivation**: Core update functionality. Ensures changes are saved correctly.

**Input**:
- Existing contact with id "uuid-123"
- Updated fields: name "John Smith", email "john.smith@example.com"

**References**:
- CRC: crc-ContactService.md - "Does: updateContact()"
- Sequence: seq-edit-contact.md

**Expected Results**:
- Contact retrieved from storage
- Updated fields merged with existing data
- modified timestamp updated to current time
- Contact validated via ContactValidator
- Contact saved via ContactStorage
- updateContact() returns updated contact

**References**:
- CRC: crc-ContactService.md - "Does: updateContact()"
- Spec: main.md FR4 - "Update modified timestamp on save"

---

### Test: Update non-existent contact

**Purpose**: Verify that attempting to update a contact that doesn't exist throws error.

**Motivation**: Handles invalid ID gracefully. Prevents creating unintended contacts.

**Input**:
- Contact id: "invalid-uuid"
- Updated fields: name "Test"

**References**:
- CRC: crc-ContactService.md - "Does: updateContact()"

**Expected Results**:
- Storage returns null for getContact()
- updateContact() throws error: "Contact not found"
- No new contact created

**References**:
- CRC: crc-ContactService.md collaborates with ContactStorage

---

### Test: Delete contact

**Purpose**: Verify that deleting a contact removes it from storage.

**Motivation**: Core delete functionality. Ensures data removal.

**Input**:
- Existing contact with id "uuid-123"

**References**:
- CRC: crc-ContactService.md - "Does: deleteContact()"
- Sequence: seq-delete-contact.md

**Expected Results**:
- ContactStorage.deleteContact() called with id
- deleteContact() completes successfully
- Subsequent getContact() returns null

**References**:
- CRC: crc-ContactService.md - "Does: deleteContact()"
- Spec: main.md FR5 - "Remove from storage on confirm"

---

### Test: Get contact by ID

**Purpose**: Verify that a contact can be retrieved by ID.

**Motivation**: Supports edit view. Ensures data access.

**Input**:
- Existing contact with id "uuid-123"

**References**:
- CRC: crc-ContactService.md - "Does: getContact()"
- Sequence: seq-edit-contact.md

**Expected Results**:
- getContact() returns contact object
- Contact data matches stored data

**References**:
- CRC: crc-ContactService.md - "Does: getContact()"

---

### Test: Get all contacts sorted by name

**Purpose**: Verify that getAllContacts() returns contacts sorted alphabetically by name.

**Motivation**: List view requires sorted data. Ensures consistent ordering.

**Input**:
- Storage contains 5 contacts with names: "Zebra", "Apple", "Mango", "Banana", "Cherry"

**References**:
- CRC: crc-ContactService.md - "Does: getAllContacts()"
- Sequence: seq-load-contacts.md

**Expected Results**:
- getAllContacts() returns array of 5 contacts
- Contacts sorted: "Apple", "Banana", "Cherry", "Mango", "Zebra"
- Sorting is case-insensitive

**References**:
- CRC: crc-ContactService.md - "Does: getAllContacts()"
- Spec: main.md FR3 - "Contacts sorted alphabetically by name"

---

### Test: Generate unique IDs

**Purpose**: Verify that generateId() produces unique UUIDs.

**Motivation**: Prevents ID collisions. Ensures data integrity.

**Input**:
- Call generateId() 1000 times

**References**:
- CRC: crc-ContactService.md - "Does: generateId()"

**Expected Results**:
- Each ID is unique (no duplicates in 1000 IDs)
- Each ID matches UUID format
- IDs are non-empty strings

**References**:
- CRC: crc-ContactService.md - "Does: generateId()"
- Spec: main.md FR1 - "ID: Unique identifier (auto-generated UUID)"

---

## Coverage Summary

**Responsibilities Covered**:
- ✅ createContact() - 2 test cases (valid, validation error)
- ✅ updateContact() - 2 test cases (valid, not found)
- ✅ deleteContact() - 1 test case
- ✅ getContact() - 1 test case
- ✅ getAllContacts() - 1 test case (with sorting)
- ✅ generateId() - 1 test case

**Scenarios Covered**:
- ✅ Happy path: Create, update, delete, get
- ✅ Error path: Validation errors
- ✅ Error path: Non-existent contact
- ✅ Business logic: ID generation, timestamp management, sorting
- ✅ Integration: Validation and storage coordination

**Gaps**:
- None - all ContactService responsibilities have tests
