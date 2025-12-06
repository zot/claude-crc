# Project Instructions

**Version:** 1.5.0

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
2. Use `designer` agent to create Level 2 specs (CRC cards, sequences, UI specs, architecture mapping, **and test designs**)
   - Designer agent MUST invoke test-designer sub-agent (automatic, mandatory step)
   - Verify test design files (`design/test-*.md`) are created before proceeding
3. Generate code following complete specification with traceability comments

**Design Entry Point:**
- `design/architecture.md` serves as the "main program" for the design
- Shows how design elements are organized into logical systems
- Start here to understand the overall architecture
- **Use for problem diagnosis and impact analysis** - quickly localize issues and assess change scope

**When to Read architecture.md:**
- **When working with design files, implementing features, or diagnosing issues, always read `design/architecture.md` first to understand the system structure and component relationships.**

**Traceability Comment Format:**
- Use simple filenames WITHOUT directory paths
- ✅ Correct: `CRC: crc-Person.md`, `Spec: main.md`, `Sequence: seq-create-user.md`
- ❌ Wrong: `CRC: design/crc-Person.md`, `Spec: specs/main.md`

**Finding Implementations:**
- To find where a design element is implemented, grep for its filename (e.g., `grep "seq-get-file.md"`)

**Test Implementation:**
- **Test designs are Level 2 artifacts**: Designer agent automatically generates test design specs (`design/test-*.md`) via the test-designer sub-agent
- **ALWAYS read test designs BEFORE writing test code**: Test designs specify what to test, test code implements those specifications
- **Test code MUST implement all scenarios from test designs**: Every test scenario in `design/test-*.md` must have corresponding test code
- **Traceability**: Test files reference test designs in comments: `// Test Design: test-ComponentName.md`
- Test files belong in top-level `tests/` directory (NOT nested under `src/`)
- When configuring build tools (Vite, Webpack, etc.), ensure test runner configurations are separate from application build configurations
- If build config sets a custom `root` directory, create a separate test configuration file to avoid test discovery issues
- Run `npm test` to verify test discovery works correctly before considering tests complete

**Test Design Workflow:**
1. Designer agent creates CRC cards and sequences (Level 2)
2. Designer agent invokes test-designer agent (automatic, mandatory)
3. Test-designer generates test design specs (`design/test-*.md`)
4. Read test designs to understand what needs testing
5. Implement tests following test design specifications
6. Reference test designs in test code comments

See `.claude/doc/crc.md` for complete documentation.

### 🔄 Bidirectional Traceability Principle

**When changes occur at any level, propagate updates through the documentation hierarchy:**

**Source Code Changes → Design Specs:**
- Modified implementation → Update CRC cards/sequences/UI specs if structure/behavior changed
- New classes/methods → Create corresponding CRC cards
- Changed interactions → Update sequence diagrams
- Template/view changes → Update UI specs

**Use the `design-maintainer` agent to automate this:**
```
When you've made code changes, invoke the design-maintainer agent to:
- Update CRC cards with new methods/fields
- Update sequence diagrams for changed workflows
- Add traceability comments to new code
- Check off traceability.md checkboxes
```

**Design Spec Changes → Architectural Specs:**
- Modified CRC cards/sequences → Update high-level specs if requirements/architecture affected
- New components → Document in feature specs and update `design/architecture.md`
- Changed workflows → Update architectural documentation
- System reorganization → Update `design/architecture.md` to reflect new system boundaries

**Key Rules:**
1. **Always update up**: When code/design changes, ripple changes upward through documentation
2. **Maintain abstraction**: Each level documents at its appropriate abstraction
3. **Keep consistency**: All three tiers must tell the same story at their respective levels
4. **Update traceability comments**: When docs change, update CRC/spec references in code comments

**Agent Workflow:**
- **Requirements → Design**: Use `designer` agent (Level 1 → Level 2)
- **Code → Design**: Use `design-maintainer` agent (Level 3 → Level 2)
- **Design → Documentation**: Use `documenter` agent (Level 2 → Docs)

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

---

## 🚀 Release Management

**Creating a New Release:**

To create a new release with the distributable installer:

1. **Update version** in this file (top of document)
2. **Regenerate distributable:**
   ```bash
   python3 .claude/scripts/bundle.py
   ```
3. **Commit changes:**
   ```bash
   git add -A
   git commit -m "Release v1.0.0"
   ```
4. **Create release with gh CLI:**
   ```bash
   gh release create v1.0.0 \
     .claude/scripts/claude-crc-dist.py \
     --title "CRC Modeling Framework v1.0.0" \
     --notes "Release notes here"
   ```

The distributable (`claude-crc-dist.py`) will be automatically attached to the GitHub release for users to download.
