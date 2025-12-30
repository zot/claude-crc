# CRC Modeling for AI-Assisted Development

**Stop losing features to "generous" inference—see how Claude interprets your specs before it writes code**

---

## The Problem

2-level spec-driven development suffers from the same problem as vibe coding—it just takes longer to bite you.

Claude "generously" infers features that aren't in your specs. You don't notice until you change a spec and Claude removes features you've come to rely on. **You need to see how Claude interprets your specs before it writes thousands of lines of code.**

## The Solution: 3-Level CRC Modeling

CRC (Class-Responsibility-Collaboration) Modeling adds a middle layer where you can verify Claude's interpretation in human-readable designs:

```
Level 1: Human Specs (WHAT & WHY)
    ↓
Level 2: Design Models (HOW - Architecture)
  ├─ Architecture Map: Global understanding of systems and structure
  ├─ CRC Cards: Classes, responsibilities, collaborators
  ├─ Sequence Diagrams: Object interactions over time
  └─ UI Specs: Layout structure, data bindings, events
    ↓
Level 3: Implementation (HOW - Code)
```

**Key Benefits:**

- ✅ **Stop losing features** - Catch "generous" inferences before they become code
- ✅ **Readable designs** - CRC cards show Claude's interpretation, not thousands of lines
- ✅ **Complete traceability** - Every line of code traces back to requirements
- ✅ **Bidirectional updates** - Change specs, design, or code and propagate safely
- ✅ **Cross-session stability** - Design patterns guide future AI decisions
- ✅ **Knowledge retention** - Documentation survives team transitions

---

## Quick Start

### Option 1: Use in Your Project

Install the CRC toolkit in your Claude Code project:

```bash
# Download the installer
curl -O https://github.com/zot/claude-crc/releases/latest/download/claude-crc-dist.py

# Run in your Claude Code project
python3 claude-crc-dist.py
```

The installer will:
- ✅ Verify you're in a Claude Code project
- ✅ Check for file conflicts before installing
- ✅ Install 20 framework files (agents, commands, skills, docs)
- ✅ Automatically run project initialization

Then start using it:
```
Ask Claude: "I want to make a contact app. Put specs in specs/"
Ask Claude: "generate designs and test designs"
Ask Claude: "generate code, tests, and docs"
```

### Option 2: Test the Methodology First

1. **Clone this repository**
2. **Open in Claude Code**
3. **Generate Level 2 designs**:
   ```
   Ask Claude: "Generate Level 2 specs for specs/main.md using designer agent"
   ```
4. **Review generated artifacts** in the `design/` directory
5. **Implement**
   ```
   Ask Claude: "implement the design"
   Ask Claude: "run the gap analyzer"
     -- this will generate traceability information
   Address any gap concerns you desire, like unimplemented tests.
   test the app, `npm run dev` should do it; if there are problems, tell Claude to fix them.
   ```
5. **Compare with `expected-result/`** to see what good designs look like

---

## What's Included

### 📚 Documentation (`.claude/doc/`)

- **`crc.md`** - Complete CRC modeling guide (850+ lines)
- **`crc-summary.md`** - Executive summary
- **`traceability-guide.md`** - Bidirectional traceability documentation

### 🤖 Agents (`.claude/agents/`)

- **`designer.md`** ⭐ - Core agent that generates CRC cards, sequences, UI specs
- **`sequence-diagrammer.md`** - Converts diagrams to PlantUML ASCII format
- **`test-designer.md`** - Generates test designs from CRC cards (auto-invoked by designer)
- **`gap-analyzer.md`** - Analyzes completeness and coverage
- **`documenter.md`** - Generates project documentation from specs and designs

### 🛠️ Tools (`.claude/skills/`, `.claude/scripts/`, `.claude/commands/`)

- **PlantUML skill** - Generates ASCII art sequence diagrams
- **init-crc-project command** - Sets up CRC in any project
- **Helper scripts** - Automation for common tasks

### 📄 Templates (`templates/`)

- CRC card template
- Sequence diagram template
- UI specification template
- Traceability map templates
- Manifest (global UI) template

### 📖 Example Specs (`specs/`)

- **`main.md`** - Complete contact manager specification
- **`coding-standards.md`** - Example coding guidelines

Use these to test the designer agent and learn the methodology.

---

## Workflow

### 1. Write Human Specs (Level 1)

Create specifications in `specs/*.md`:
- **WHAT**: Requirements, features, user stories
- **WHY**: Business goals, design rationale
- **Language-agnostic**: Focus on intent, not implementation

### 2. Generate Design Models (Level 2)

Use the designer agent:
```
Task(subagent_type="designer",
     prompt="Generate Level 2 specs for specs/feature.md")
```

This creates:
- `design/architecture.md` - **Entry point**: Systems map and global understanding
- `design/crc-*.md` - CRC cards for all classes
- `design/seq-*.md` - Sequence diagrams for all scenarios
- `design/ui-*.md` - UI layout specifications
- `design/traceability.md` - Links between specs, design, and code
- `design/gaps.md` - Gap analysis

### 3. Review and Refine

- Start with architecture map (does the system organization make sense?)
- Review generated CRC cards (do they match your intent?)
- Check sequence diagrams (correct interactions?)
- Validate UI specs (proper layout and behavior?)
- Address any gaps identified

### 4. Implement Code (Level 3)

Generate or write implementation following CRC cards:
- Each CRC card → One class/module
- Each responsibility → Methods/properties
- Add traceability comments linking code to CRC cards

### 5. Add Tests

Test designs are automatically generated by the designer agent in step 2.

Implement tests following the generated test designs in `design/test-*.md`.

---

## Key Concepts

### Architecture Map

Provides global understanding of the design:
- **Entry point**: Start here to understand the overall structure
- **Systems**: Groups related components into logical systems
- **Cross-cutting**: Identifies infrastructure and shared concerns
- **Diagnostics**: Quickly localize problems and assess change impact

### CRC Cards

Document classes with:
- **Knows**: Properties/data the class manages
- **Does**: Methods/behavior the class provides
- **Collaborators**: Other classes it works with

### Sequence Diagrams

Show object interactions over time:
- Happy path flows
- Alternative/error flows
- Timing and ordering constraints

### UI Specifications

Define user interface structure:
- HTML layout hierarchy
- CSS classes and styling
- Data bindings and events
- Navigation and state management

### Traceability

Maintain bidirectional links:
- **Forward**: Specs → Design → Code
- **Backward**: Code → Design → Specs
- **Verification**: Every requirement is implemented
- **Validation**: Every piece of code traces to requirements

---

## When to Use CRC Modeling

**✅ Great for:**
- New projects (establish architecture upfront)
- Complex features (design before coding)
- Team projects (shared understanding)
- AI-assisted development (verify AI interpretation)
- Long-term projects (maintain documentation)

**⚠️ Might be overkill for:**
- Simple scripts or utilities
- Prototypes and experiments
- Solo projects with stable requirements
- Well-understood problem domains

---

## Documentation

- **[Complete Guide](.claude/doc/crc.md)** - Everything you need to know
- **[Executive Summary](.claude/doc/crc-summary.md)** - Sell the process
- **[Traceability Guide](.claude/doc/traceability-guide.md)** - Maintain links
- **[Installation Guide](INSTALL.md)** - Use in your projects

---

## Testing the Toolkit

1. **Test designer agent**:
   ```
   Generate Level 2 specs for specs/main.md using designer agent
   ```

2. **Test sequence-diagrammer**:
   ```
   Task(subagent_type="sequence-diagrammer",
        prompt="Convert design/seq-*.md to PlantUML ASCII")
   ```

3. **Test test-designer**:
   ```
   # Test designer is automatically invoked by designer agent
   # Check for test designs in design/test-*.md
   ```

4. **Test gap-analyzer**:
   ```
   Task(subagent_type="gap-analyzer",
        prompt="Analyze gaps in design/")
   ```

---

## Project Structure

```
claude-crc/
├── README.md                    # This file
├── INSTALL.md                   # Installation guide
├── .claude/                     # CRC toolkit
│   ├── doc/                     # Documentation
│   ├── agents/                  # AI agents
│   ├── skills/                  # Skills
│   ├── scripts/                 # Helper scripts
│   └── commands/                # Slash commands
├── specs/                       # Example specs (contact manager)
├── templates/                   # Empty templates for new projects
└── expected-result/             # (Future) Example output
```

---

## Contributing

This toolkit is designed to be reusable across projects. To contribute:

1. Test with your own projects
2. Report issues or suggestions
3. Share improvements to agents, templates, or documentation
4. Submit examples of successful CRC modeling usage

---

## License

MIT License - Use freely in your projects

---

## Next Steps

1. **Learn**: Read `.claude/doc/crc-summary.md` for overview
2. **Test**: Generate Level 2 from `specs/main.md`
3. **Compare**: Review output against `expected-result/` (when available)
4. **Install**: Use in your own project (see INSTALL.md)
5. **Master**: Read complete guide in `.claude/doc/crc.md`

---

**Happy modeling! 🎯**
