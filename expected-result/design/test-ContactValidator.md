# Test Design: ContactValidator

**Source CRC:** crc-ContactValidator.md
**Source Spec:** main.md (FR2, FR4)

## Purpose

Test validation logic for all Contact fields.

## Test Cases

### TC-1: Valid Name

**Purpose:** Verify valid names pass validation

**Setup:** ContactValidator instance

**Input:** Names within 1-100 characters

**Expected Result:** isValid returns true, no errors

### TC-2: Empty Name

**Purpose:** Verify empty name fails validation

**Setup:** ContactValidator instance

**Input:** Empty string ""

**Expected Result:** isValid returns false, error "Name is required"

### TC-3: Name Too Long

**Purpose:** Verify name exceeding 100 characters fails

**Setup:** ContactValidator instance

**Input:** String with 101 characters

**Expected Result:** isValid returns false, error "Name must be 100 characters or less"

### TC-4: Valid Email

**Purpose:** Verify valid email formats pass

**Setup:** ContactValidator instance

**Input:** "user@example.com", "name.last@domain.org"

**Expected Result:** isValid returns true, no errors

### TC-5: Invalid Email Format

**Purpose:** Verify invalid email formats fail

**Setup:** ContactValidator instance

**Input:** "notanemail", "@nodomain", "no@.com"

**Expected Result:** isValid returns false, error "Invalid email format"

### TC-6: Empty Email (Optional)

**Purpose:** Verify empty email passes (optional field)

**Setup:** ContactValidator instance

**Input:** undefined or ""

**Expected Result:** isValid returns true, no errors

### TC-7: Valid Phone

**Purpose:** Verify valid phone numbers pass

**Setup:** ContactValidator instance

**Input:** "1234567890" (10 chars), "12345678901234567890" (20 chars)

**Expected Result:** isValid returns true, no errors

### TC-8: Phone Too Short

**Purpose:** Verify phone under 10 characters fails

**Setup:** ContactValidator instance

**Input:** "123456789" (9 chars)

**Expected Result:** isValid returns false, error "Phone must be 10-20 characters"

### TC-9: Phone Too Long

**Purpose:** Verify phone over 20 characters fails

**Setup:** ContactValidator instance

**Input:** "123456789012345678901" (21 chars)

**Expected Result:** isValid returns false, error "Phone must be 10-20 characters"

### TC-10: Empty Phone (Optional)

**Purpose:** Verify empty phone passes (optional field)

**Setup:** ContactValidator instance

**Input:** undefined or ""

**Expected Result:** isValid returns true, no errors

### TC-11: Valid Notes

**Purpose:** Verify notes within 500 characters pass

**Setup:** ContactValidator instance

**Input:** String with 500 characters

**Expected Result:** isValid returns true, no errors

### TC-12: Notes Too Long

**Purpose:** Verify notes over 500 characters fail

**Setup:** ContactValidator instance

**Input:** String with 501 characters

**Expected Result:** isValid returns false, error "Notes must be 500 characters or less"

### TC-13: validateContact All Valid

**Purpose:** Verify full contact validation with all valid fields

**Setup:** ContactValidator instance

**Input:** Contact with valid name, email, phone, notes

**Expected Result:** ValidationResult with isValid=true, no errors

### TC-14: validateContact Multiple Errors

**Purpose:** Verify all errors returned for multiple invalid fields

**Setup:** ContactValidator instance

**Input:** Contact with empty name and invalid email

**Expected Result:** ValidationResult with isValid=false, errors for both fields
