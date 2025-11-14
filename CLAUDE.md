# Project Instructions

## CRC Modeling Workflow

**DO NOT generate code directly from `specs/*.md` files!**

**Use a three-tier system:**
```
Level 1: Human specs (specs/*.md)
   ↓
Level 2: Design models (design/*.md) ← CREATE THESE FIRST
   ↓
Level 3: Implementation (source code)
```

**Workflow:**
1. Read human specs (`specs/*.md`) for design intent
2. Use `designer` agent to create Level 2 specs (CRC cards, sequences, UI specs)
3. Generate code following complete specification with traceability comments

**Traceability Comment Format:**
- Use simple filenames WITHOUT directory paths
- ✅ Correct: `CRC: crc-Person.md`, `Spec: main.md`, `Sequence: seq-create-user.md`
- ❌ Wrong: `CRC: design/crc-Person.md`, `Spec: specs/main.md`

**Test Implementation:**
- Test files belong in top-level `tests/` directory (NOT nested under `src/`)
- Test designs reference: `Test Design: test-ComponentName.md`
- When configuring build tools (Vite, Webpack, etc.), ensure test runner configurations are separate from application build configurations
- If build config sets a custom `root` directory, create a separate test configuration file to avoid test discovery issues
- Run `npm test` to verify test discovery works correctly before considering tests complete

See `.claude/doc/crc.md` for complete documentation.

### 🔄 Bidirectional Traceability Principle

**When changes occur at any level, propagate updates through the documentation hierarchy:**

**Source Code Changes → Design Specs:**
- Modified implementation → Update CRC cards/sequences/UI specs if structure/behavior changed
- New classes/methods → Create corresponding CRC cards
- Changed interactions → Update sequence diagrams
- Template/view changes → Update UI specs

**Design Spec Changes → Architectural Specs:**
- Modified CRC cards/sequences → Update high-level specs if requirements/architecture affected
- New components → Document in feature specs
- Changed workflows → Update architectural documentation

**Key Rules:**
1. **Always update up**: When code/design changes, ripple changes upward through documentation
2. **Maintain abstraction**: Each level documents at its appropriate abstraction
3. **Keep consistency**: All three tiers must tell the same story at their respective levels
4. **Update traceability comments**: When docs change, update CRC/spec references in code comments

### 📚 Documentation Generation

**After completing design or implementation work, offer to generate or update project documentation.**

Use the `documenter` agent to create:
- `docs/requirements.md` - Requirements documentation from specs
- `docs/design.md` - Design overview from CRC cards and sequences
- `docs/developer-guide.md` - Developer documentation with architecture and setup
- `docs/user-manual.md` - User manual with features and how-to guides
- `design/traceability-docs.md` - Documentation traceability map

**When to offer documentation generation:**
- After creating/updating Level 2 design specs
- After implementing Level 3 code
- When specs or design changes significantly
- When user explicitly requests it

**Example offer:**
"I've completed the [design/implementation]. Would you like me to generate/update the project documentation (requirements, design overview, developer guide, and user manual)?"
