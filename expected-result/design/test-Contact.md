# Test Design: Contact

**Source CRC:** crc-Contact.md
**Source Spec:** main.md (FR1: Contact Data Model)

## Purpose

Test the Contact data model structure and type constraints.

## Test Cases

### TC-1: Contact Structure

**Purpose:** Verify Contact has all required fields with correct types

**Setup:** None

**Input:** Create Contact object with all fields

**Expected Result:**
- id: string (UUID format)
- name: string
- email: string | undefined
- phone: string | undefined
- notes: string | undefined
- created: Date
- modified: Date

### TC-2: Required vs Optional Fields

**Purpose:** Verify optional fields can be undefined

**Setup:** None

**Input:** Create Contact with only required fields (id, name, created, modified)

**Expected Result:**
- email is undefined
- phone is undefined
- notes is undefined
- No type errors

### TC-3: Immutability

**Purpose:** Verify Contact is treated as immutable value object

**Setup:** Create a Contact

**Input:** Attempt to modify fields directly

**Expected Result:**
- TypeScript readonly modifiers prevent mutation (compile-time)
- Or runtime: modifications create new objects
