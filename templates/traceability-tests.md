# Test Traceability Map Template

**Purpose:** Link specs → design → test designs → test code

---

## Level 1 → Level 2 → Test Designs

### specs/feature.md

**CRC Cards:**
- design/crc-ClassName.md

**Test Designs:**
- design/test-ClassName.md

---

## Level 2 → Test Designs → Test Code

### design/test-ClassName.md

**Source CRC:** design/crc-ClassName.md

**Test Implementation:**
- test/ClassName.test.ext
  - [ ] "Test: Create with valid data" → test implementation
  - [ ] "Test: Validate required fields" → test implementation

---

## Coverage Analysis

### CRC Responsibilities Coverage

**design/crc-ClassName.md:**
- [ ] All "Knows" properties tested
- [ ] All "Does" methods tested
- [ ] All collaborations integration-tested

---

## Verification Checklist

- [ ] All CRC cards have test designs
- [ ] All test designs have implementations
- [ ] All tests passing
- [ ] Coverage meets standards
