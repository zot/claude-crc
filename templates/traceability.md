# Traceability Map Template

**Purpose:** Bidirectional links between specs, design, and code

---

## Level 1 ↔ Level 2 (Specs to Design)

### specs/feature.md

**CRC Cards:**
- design/crc-ClassName1.md
- design/crc-ClassName2.md

**Sequence Diagrams:**
- design/seq-scenario.md

**UI Specs:**
- design/ui-ViewName.md

---

## Level 2 ↔ Level 3 (Design to Implementation)

### design/crc-ClassName1.md

**Source Code:**
- src/path/to/ClassName1.ext
  - [ ] `property1: Type`
  - [ ] `method1()`

**Test Code:**
- test/path/to/ClassName1.test.ext
  - [ ] Test for method1

---

### design/ui-ViewName.md

**Template:**
- public/templates/view-name.html

**Controller:**
- src/ui/ViewName.ext

---

## Verification Checklist

- [ ] All specs have design artifacts
- [ ] All CRC cards have implementations
- [ ] All designs have tests
- [ ] All tests passing
