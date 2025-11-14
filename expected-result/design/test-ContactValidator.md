# Test Design: ContactValidator

**Source Specs**: main.md (FR2: Create Contact - Validation, FR4: View/Edit Contact - Validation)
**CRC Cards**: crc-ContactValidator.md
**Sequences**: seq-create-contact.md, seq-edit-contact.md

## Overview

Test suite for ContactValidator covering field validation rules and error messages.

## Test Cases

### Test: Validate valid name

**Purpose**: Verify that names within the 1-100 character range pass validation.

**Motivation**: Core validation requirement. Ensures valid data is accepted.

**Input**:
- name: "John Doe" (8 characters)
- name: "A" (1 character, minimum)
- name: "a" * 100 (100 characters, maximum)

**References**:
- CRC: crc-ContactValidator.md - "Does: validateName()"
- Spec: main.md FR1 - "Name (required, 1-100 characters)"

**Expected Results**:
- validateName() returns ValidationResult with isValid === true
- errors Map is empty

**References**:
- CRC: crc-ContactValidator.md - "Does: validateName()"

---

### Test: Validate invalid name - too short

**Purpose**: Verify that empty names are rejected.

**Motivation**: Name is required field. Prevents data corruption.

**Input**:
- name: "" (empty string)

**References**:
- CRC: crc-ContactValidator.md - "Does: validateName()"
- Spec: main.md FR2 - "Name is required"

**Expected Results**:
- validateName() returns ValidationResult with isValid === false
- errors Map contains: "name" → "Name is required (1-100 characters)"

**References**:
- CRC: crc-ContactValidator.md - "Does: validateName()"
- Spec: main.md NFR2 - "Error messages shall be clear and actionable"

---

### Test: Validate invalid name - too long

**Purpose**: Verify that names exceeding 100 characters are rejected.

**Motivation**: Enforces field constraints. Prevents UI layout issues.

**Input**:
- name: "a" * 101 (101 characters)

**References**:
- CRC: crc-ContactValidator.md - "Does: validateName()"
- Spec: main.md FR1 - "Name (required, 1-100 characters)"

**Expected Results**:
- validateName() returns ValidationResult with isValid === false
- errors Map contains: "name" → "Name is required (1-100 characters)"

**References**:
- CRC: crc-ContactValidator.md - "Does: validateName()"

---

### Test: Validate valid email

**Purpose**: Verify that properly formatted email addresses pass validation.

**Motivation**: Ensures email field accepts standard email formats.

**Input**:
- email: "john@example.com"
- email: "user+tag@domain.co.uk"
- email: undefined (optional field)

**References**:
- CRC: crc-ContactValidator.md - "Does: validateEmail()"
- Spec: main.md FR1 - "Email address (optional, valid email format)"

**Expected Results**:
- validateEmail() returns ValidationResult with isValid === true
- errors Map is empty
- undefined email is considered valid (optional field)

**References**:
- CRC: crc-ContactValidator.md - "Does: validateEmail()"

---

### Test: Validate invalid email

**Purpose**: Verify that malformed email addresses are rejected.

**Motivation**: Prevents invalid email data. Ensures users can be contacted.

**Input**:
- email: "not-an-email"
- email: "missing-at-sign.com"
- email: "@no-local-part.com"

**References**:
- CRC: crc-ContactValidator.md - "Does: validateEmail()"
- Spec: main.md FR2 - "Email must be valid format if provided"

**Expected Results**:
- validateEmail() returns ValidationResult with isValid === false
- errors Map contains: "email" → "Invalid email format"

**References**:
- CRC: crc-ContactValidator.md - "Does: validateEmail()"

---

### Test: Validate valid phone

**Purpose**: Verify that phone numbers within 10-20 characters pass validation.

**Motivation**: Ensures phone field accepts various phone formats.

**Input**:
- phone: "555-1234" (8 characters, short but valid)
- phone: "1234567890" (10 characters, minimum)
- phone: "12345678901234567890" (20 characters, maximum)
- phone: undefined (optional field)

**References**:
- CRC: crc-ContactValidator.md - "Does: validatePhone()"
- Spec: main.md FR1 - "Phone number (optional, 10-20 characters)"

**Expected Results**:
- validatePhone() returns ValidationResult with isValid === true
- errors Map is empty
- undefined phone is considered valid (optional field)

**References**:
- CRC: crc-ContactValidator.md - "Does: validatePhone()"

---

### Test: Validate invalid phone - too short

**Purpose**: Verify that phone numbers shorter than 10 characters are rejected.

**Motivation**: Enforces field constraints. Ensures phone numbers are complete.

**Input**:
- phone: "123" (3 characters)

**References**:
- CRC: crc-ContactValidator.md - "Does: validatePhone()"
- Spec: main.md FR2 - "Phone must be valid format if provided"

**Expected Results**:
- validatePhone() returns ValidationResult with isValid === false
- errors Map contains: "phone" → "Phone must be 10-20 characters"

**References**:
- CRC: crc-ContactValidator.md - "Does: validatePhone()"

---

### Test: Validate invalid phone - too long

**Purpose**: Verify that phone numbers longer than 20 characters are rejected.

**Motivation**: Enforces field constraints. Prevents overly long inputs.

**Input**:
- phone: "123456789012345678901" (21 characters)

**References**:
- CRC: crc-ContactValidator.md - "Does: validatePhone()"
- Spec: main.md FR1 - "Phone number (optional, 10-20 characters)"

**Expected Results**:
- validatePhone() returns ValidationResult with isValid === false
- errors Map contains: "phone" → "Phone must be 10-20 characters"

**References**:
- CRC: crc-ContactValidator.md - "Does: validatePhone()"

---

### Test: Validate notes length

**Purpose**: Verify that notes field accepts up to 500 characters and rejects longer input.

**Motivation**: Enforces field constraints. Prevents excessive notes data.

**Input**:
- notes: "Valid notes" (12 characters)
- notes: "a" * 500 (500 characters, maximum)
- notes: "a" * 501 (501 characters, exceeds maximum)
- notes: undefined (optional field)

**References**:
- CRC: crc-ContactValidator.md - "Does: validateNotes()"
- Spec: main.md FR1 - "Additional notes (optional, up to 500 characters)"

**Expected Results**:
- Valid and undefined notes pass validation (isValid === true)
- Notes exceeding 500 characters fail validation (isValid === false)
- Error message: "Notes must be 500 characters or less"

**References**:
- CRC: crc-ContactValidator.md - "Does: validateNotes()"

---

### Test: Validate entire contact object

**Purpose**: Verify that validateContact() validates all fields and accumulates errors.

**Motivation**: Single entry point for complete contact validation. Used before save operations.

**Input**:
- Contact with multiple validation errors:
  - name: "" (empty)
  - email: "invalid-email"
  - phone: "12" (too short)
  - notes: "a" * 501 (too long)

**References**:
- CRC: crc-ContactValidator.md - "Does: validateContact()"
- Sequence: seq-create-contact.md (full validation before save)

**Expected Results**:
- validateContact() returns ValidationResult with isValid === false
- errors Map contains all field errors:
  - "name" → "Name is required (1-100 characters)"
  - "email" → "Invalid email format"
  - "phone" → "Phone must be 10-20 characters"
  - "notes" → "Notes must be 500 characters or less"

**References**:
- CRC: crc-ContactValidator.md - "Does: validateContact()"
- Spec: main.md EH1 - "Display field-level error messages"

---

### Test: Validate contact with all valid fields

**Purpose**: Verify that a contact with all valid fields passes validation.

**Motivation**: Ensures valid data is accepted and can be saved.

**Input**:
- Contact with all valid fields:
  - name: "John Doe"
  - email: "john@example.com"
  - phone: "555-1234-5678"
  - notes: "Test notes"

**References**:
- CRC: crc-ContactValidator.md - "Does: validateContact()"

**Expected Results**:
- validateContact() returns ValidationResult with isValid === true
- errors Map is empty

**References**:
- CRC: crc-ContactValidator.md - "Does: validateContact()"

---

## Coverage Summary

**Responsibilities Covered**:
- ✅ validateName() - 3 test cases (valid, too short, too long)
- ✅ validateEmail() - 2 test cases (valid, invalid)
- ✅ validatePhone() - 3 test cases (valid, too short, too long)
- ✅ validateNotes() - 1 test case (length validation)
- ✅ validateContact() - 2 test cases (all errors, all valid)

**Scenarios Covered**:
- ✅ Happy path: All fields valid
- ✅ Error path: Each field validation rule
- ✅ Error path: Multiple errors accumulated
- ✅ Edge cases: Boundary conditions (min/max lengths)
- ✅ Optional fields: undefined values handled

**Gaps**:
- None - all ContactValidator responsibilities have tests
