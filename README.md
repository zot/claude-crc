# DEPRECATED

**This project has been deprecated in favor of [mini-spec](https://github.com/zot/mini-spec).**

Mini-spec provides the same 3-level architecture (specs → design → code) with dramatically less complexity:

| Feature        | claude-crc  | mini-spec  |
|----------------|-------------|------------|
| Skill file     | 500+ lines  | ~93 lines  |
| Agents         | 6+ required | 1 optional |
| Scripts        | Multiple    | None       |
| Learning curve | Hours       | Minutes    |

---

## Upgrading to mini-spec

### For Claude: Automated Upgrade Instructions

When a user asks you to upgrade a claude-crc project to mini-spec, follow these steps:

#### 1. Install mini-spec

Download and extract the latest mini-spec release:
```bash
# Get the latest release
curl -LO https://github.com/zot/mini-spec/releases/latest/download/mini-spec-0.9.2.zip
unzip mini-spec-0.9.2.zip -d .claude/
rm mini-spec-0.9.2.zip
```

This adds:
- `.claude/skills/mini-spec/` (SKILL.md, methodology.md, README.md)
- `.claude/agents/spec-agent.md`

#### 2. Remove claude-crc files

Delete the old framework files:
```bash
# Remove claude-crc agents (keep any custom agents)
rm -f .claude/agents/designer.md
rm -f .claude/agents/design-maintainer.md
rm -f .claude/agents/documenter.md
rm -f .claude/agents/gap-analyzer.md
rm -f .claude/agents/sequence-diagrammer.md
rm -f .claude/agents/test-designer.md
rm -f .claude/agents/release.md

# Remove claude-crc docs
rm -f .claude/doc/crc.md
rm -f .claude/doc/crc-post.html
rm -f .claude/doc/crc-post.md
rm -f .claude/doc/crc-summary.md
rm -f .claude/doc/crc-traceability-guide.md

# Remove claude-crc scripts
rm -f .claude/scripts/bundle.py
rm -f .claude/scripts/claude-crc-dist.py
rm -f .claude/scripts/init-crc-project.py
rm -f .claude/scripts/plantuml.py
rm -f .claude/scripts/README-CRC.md
rm -f .claude/scripts/trace-add-comments.py
rm -f .claude/scripts/trace-gap-analysis.py
rm -f .claude/scripts/trace-verify.py

# Remove claude-crc commands
rm -f .claude/commands/init-crc-project.md

# Remove claude-crc skills
rm -f .claude/skills/plantuml.md
rm -f .claude/skills/trace.md
rm -f .claude/skills/init-crc-project.md
```

#### 3. Convert design files

The design file structure is largely compatible. Key changes:

| claude-crc               | mini-spec               | Action                         |
|--------------------------|-------------------------|--------------------------------|
| `design/architecture.md` | `design/design.md`      | Remove (replaced by design.md) |
| `design/traceability.md` | `design/design.md`      | Remove (replaced by design.md) |
| `design/crc-*.md`        | `design/crc-*.md`       | Compatible, no change          |
| `design/seq-*.md`        | `design/seq-*.md`       | Compatible, no change          |
| `design/ui-*.md`         | `design/ui-*.md`        | Compatible, no change          |
| `design/test-*.md`       | `design/test-*.md`      | Compatible, no change          |
| (none)                   | `design/manifest-ui.md` | Create if using UI             |

**Create `design/design.md`** with this structure:
```markdown
# Design: [Project Name]

**Source Spec:** specs/main.md

## Intent

[Brief description of what this design implements]

## Artifacts

### CRC Cards
- [ ] crc-Example.md → `src/example.ts`

### Sequences
- [ ] seq-workflow.md → `src/workflow.ts`

### UI Specs
- [ ] ui-main.md → `src/components/Main.tsx`

### Test Designs
- [ ] test-Example.md → `tests/example.test.ts`

## Gaps

(Track any spec→design, design→code, or code→design gaps here)
```

Populate the Artifacts section by listing your existing design files and their corresponding code files. Check boxes for files that are already implemented.

#### 4. Update CLAUDE.md

Replace the claude-crc workflow instructions in `CLAUDE.md` with:

```markdown
# Project Instructions

## Design Workflow

Use the mini-spec skill for all design and implementation work.

**3-level architecture:**
- `specs/` - Human specs (WHAT & WHY)
- `design/` - Design docs (HOW - architecture)
- `src/` - Implementation (code)

**Commands:**
- "design this" → generates design docs only
- "implement this" → writes code, updates Artifacts checkboxes
- After code changes → unchecks Artifacts, asks about design updates

See `.claude/skills/mini-spec/SKILL.md` for the full methodology.
```

#### 5. Verify the upgrade

1. Run `/mini-spec` to verify the skill loads
2. Check that design files are readable
3. Test with "validate the design" to ensure consistency

### Key Methodology Differences

| Concept           | claude-crc                            | mini-spec                      |
|-------------------|---------------------------------------|--------------------------------|
| Central tracking  | `traceability.md` + `architecture.md` | `design.md` (Artifacts + Gaps) |
| Phase enforcement | Via agents                            | Via skill instructions         |
| Gap analysis      | Separate agent                        | Built into Gaps section        |
| Documentation     | Separate agent                        | Inline guidance                |
| Traceability      | Comments in code                      | Same (compatible)              |

### What Stays the Same

- 3-level architecture (specs → design → code)
- CRC card format (Knows, Does, Collaborators)
- Sequence diagram format
- UI spec format
- Test design format
- Traceability comments in code

---

## Original Documentation

See [README-OLD.md](README-OLD.md) for the original claude-crc documentation.

---

## License

MIT License
