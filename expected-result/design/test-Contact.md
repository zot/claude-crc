# Test Design: Contact

**Source Specs**: main.md (FR1: Contact Data Model)
**CRC Cards**: crc-Contact.md
**Sequences**: seq-create-contact.md, seq-edit-contact.md

## Overview

Test suite for Contact data model covering data structure, validation, and serialization.

## Test Cases

### Test: Create contact with all fields

**Purpose**: Verify that a contact can be created with all fields populated and all properties are correctly stored.

**Motivation**: This is the core data structure. Ensures all fields are properly represented and accessible.

**Input**:
- id: "uuid-123"
- name: "John Doe"
- email: "john@example.com"
- phone: "555-1234"
- notes: "Test notes"
- created: Date("2025-11-14T12:00:00Z")
- modified: Date("2025-11-14T12:00:00Z")

**References**:
- CRC: crc-Contact.md - "Knows: all properties"

**Expected Results**:
- Contact object created successfully
- All properties accessible via getters
- id === "uuid-123"
- name === "John Doe"
- email === "john@example.com"
- phone === "555-1234"
- notes === "Test notes"
- created timestamp matches input
- modified timestamp matches input

**References**:
- CRC: crc-Contact.md - "Knows: id, name, email, phone, notes, created, modified"

---

### Test: Create contact with only required fields

**Purpose**: Verify that a contact can be created with only the name field (all other fields optional).

**Motivation**: Spec states only name is required. Ensures optional fields can be omitted.

**Input**:
- id: "uuid-456"
- name: "Jane Smith"
- email: undefined
- phone: undefined
- notes: undefined
- created: Date("2025-11-14T12:00:00Z")
- modified: Date("2025-11-14T12:00:00Z")

**References**:
- CRC: crc-Contact.md - "Knows: name (required)"
- Spec: main.md FR1 - "Only name is required"

**Expected Results**:
- Contact object created successfully
- name === "Jane Smith"
- email === undefined
- phone === undefined
- notes === undefined
- id and timestamps are set

**References**:
- CRC: crc-Contact.md - "Knows: email?, phone?, notes? (optional)"

---

### Test: Validate contact data

**Purpose**: Verify that contact validation identifies invalid data.

**Motivation**: Prevents invalid data from being persisted. Critical for data integrity.

**Input**:
- Contact with invalid email: "not-an-email"
- Contact with name too long: "a" * 101
- Contact with empty name: ""

**References**:
- CRC: crc-Contact.md - "Does: validate()"

**Expected Results**:
- validate() returns ValidationResult with isValid === false
- errors Map contains appropriate error messages:
  - email: "Invalid email format"
  - name: "Name is required (1-100 characters)"

**References**:
- CRC: crc-Contact.md - "Does: validate()"
- CRC: crc-ContactValidator.md - validation rules

---

### Test: Serialize contact to JSON

**Purpose**: Verify that contact can be serialized to JSON string for storage.

**Motivation**: Required for LocalStorage persistence. Ensures all data survives serialization.

**Input**:
- Contact object with all fields populated

**References**:
- CRC: crc-Contact.md - "Does: toJSON()"

**Expected Results**:
- toJSON() returns valid JSON string
- JSON contains all contact properties
- Dates are serialized in ISO format
- JSON.parse() reconstructs equivalent object

**References**:
- CRC: crc-Contact.md - "Does: toJSON()"
- Spec: main.md FR6 - "Persist using LocalStorage"

---

### Test: Deserialize contact from JSON

**Purpose**: Verify that contact can be deserialized from JSON string.

**Motivation**: Required for loading from LocalStorage. Ensures data integrity on load.

**Input**:
- Valid JSON string representing a contact

**References**:
- CRC: crc-Contact.md - "Does: fromJSON()"

**Expected Results**:
- fromJSON() returns Contact object
- All properties correctly restored
- Dates converted back to Date objects
- Optional fields handled correctly (undefined vs null)

**References**:
- CRC: crc-Contact.md - "Does: fromJSON()"
- Spec: main.md FR6 - "Load on application start"

---

### Test: Deserialize invalid JSON

**Purpose**: Verify that attempting to deserialize invalid or malformed JSON throws appropriate error.

**Motivation**: Handles corrupted storage data gracefully.

**Input**:
- Invalid JSON string: "not valid json{"
- JSON missing required field: {"email": "test@test.com"}

**References**:
- CRC: crc-Contact.md - "Does: fromJSON()"

**Expected Results**:
- fromJSON() throws error with clear message
- Error indicates what's wrong (parse error vs validation error)

**References**:
- Spec: main.md EH3 - "Handle missing or malformed data"

---

## Coverage Summary

**Responsibilities Covered**:
- ✅ Knows: id, name, email, phone, notes, created, modified
- ✅ Does: validate()
- ✅ Does: toJSON()
- ✅ Does: fromJSON()

**Scenarios Covered**:
- ✅ Create with all fields
- ✅ Create with only required fields
- ✅ Validation (invalid data)
- ✅ Serialization (round-trip)
- ✅ Error handling (malformed JSON)

**Gaps**:
- None - all Contact responsibilities have tests
