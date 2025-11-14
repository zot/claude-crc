# Installing CRC Modeling in Your Project

This guide explains how to install the CRC modeling toolkit in your own project.

---

## Prerequisites

- Claude Code CLI installed and configured
- Git repository for your project (recommended)
- Basic understanding of CRC methodology (read [README.md](README.md) first)

---

## Installation Methods

### Method 1: Copy Everything (Recommended for Learning)

Copy the entire `.claude/` directory to start with full toolkit:

```bash
# From the claude-crc directory
cp -r .claude ~/your-project/.claude

# Navigate to your project
cd ~/your-project
```

**What you get:**
- All documentation
- All agents (designer, sequence-diagrammer, test-designer, gap-analyzer, documenter)
- All skills and scripts
- Slash commands

### Method 2: Minimal Installation

Copy only the essentials:

```bash
# Create directories
mkdir -p ~/your-project/.claude/{doc,agents,skills,scripts,commands}

# Copy core documentation
cp .claude/doc/crc.md ~/your-project/.claude/doc/
cp .claude/doc/crc-summary.md ~/your-project/.claude/doc/

# Copy required agent
cp .claude/agents/designer.md ~/your-project/.claude/agents/

# Copy PlantUML support
cp .claude/skills/plantuml.md ~/your-project/.claude/skills/
cp .claude/scripts/plantuml.py ~/your-project/.claude/scripts/

# Copy initialization command
cp .claude/skills/init-crc-project.md ~/your-project/.claude/skills/
cp .claude/scripts/init-crc-project.py ~/your-project/.claude/scripts/
cp .claude/commands/init-crc-project.md ~/your-project/.claude/commands/
```

**What you get:**
- Core documentation
- Designer agent (required for CRC generation)
- PlantUML support for sequence diagrams
- Initialization command

### Method 3: À La Carte

Choose exactly what you want:

**Required Components:**
- `.claude/agents/designer.md` - Generates CRC cards, sequences, UI specs
- `.claude/skills/plantuml.md` - PlantUML support
- `.claude/scripts/plantuml.py` - PlantUML wrapper script

**Recommended Components:**
- `.claude/doc/crc.md` - Complete methodology guide
- `.claude/doc/crc-summary.md` - Quick overview
- `.claude/skills/init-crc-project.md` - Initialization skill
- `.claude/scripts/init-crc-project.py` - Setup script
- `.claude/commands/init-crc-project.md` - Slash command

**Optional Components:**
- `.claude/agents/sequence-diagrammer.md` - Better PlantUML diagrams
- `.claude/agents/test-designer.md` - Test design generation
- `.claude/agents/gap-analyzer.md` - Coverage analysis
- `.claude/doc/traceability-guide.md` - Traceability documentation
- `.claude/shared/crc-install.md` - Installation snippets

---

## Initial Setup

### Step 1: Run Initialization Command

In Claude Code, from your project directory:

```
/init-crc-project
```

This command will:
1. Create `specs/` directory for Level 1 specifications
2. Create `design/` directory for Level 2 CRC artifacts
3. Check for required components (designer agent, PlantUML)
4. Update your `CLAUDE.md` with CRC workflow sections (if it exists)
5. Display next steps

### Step 2: Verify Installation

Check that directories were created:

```bash
ls -la specs/ design/
```

Verify agents are available:

```bash
ls -la .claude/agents/
```

### Step 3: Update Project Documentation

If you have a `CLAUDE.md` file, the init script will add CRC workflow sections. Review and customize as needed.

If you don't have `CLAUDE.md`, consider creating one with:
- Project overview
- Development workflow
- CRC modeling guidelines
- Reference to `.claude/doc/crc.md`

You can use `.claude/shared/crc-install.md` as a template for CLAUDE.md sections.

---

## Configuration

### PlantUML Setup

The PlantUML skill will automatically download PlantUML when first used. No manual setup required.

**Optional: Pre-download PlantUML**

```bash
# The skill will handle this, but if you want to pre-download:
python3 ./.claude/scripts/plantuml.py --help
```

### Customize Templates

Copy templates from `claude-crc/templates/` to your project:

```bash
# Optional: Add templates to your project for reference
mkdir ~/your-project/templates
cp ~/work/claude-crc/templates/*.md ~/your-project/templates/
```

### Agent Configuration

Agents are pre-configured and ready to use. No customization needed for basic usage.

**Advanced:** You can modify agents in `.claude/agents/` to:
- Add project-specific patterns
- Customize output formats
- Add additional checks or validations

---

## Usage

### Create Your First Spec

1. Create a specification file:
   ```bash
   # Create your first spec
   touch specs/feature-name.md
   ```

2. Write your requirements:
   - Describe WHAT the feature does
   - Explain WHY it's needed
   - Keep it language-agnostic
   - Focus on user needs and business goals

3. Generate Level 2 designs:
   ```
   Ask Claude: "Generate Level 2 specs for specs/feature-name.md using designer agent"
   ```

4. Review output in `design/` directory:
   - CRC cards: `design/crc-*.md`
   - Sequence diagrams: `design/seq-*.md`
   - UI specs: `design/ui-*.md` (if applicable)
   - Traceability: `design/traceability.md`

### Workflow Summary

```
1. Write specs (specs/*.md)
2. Generate designs (use designer agent)
3. Review and refine
4. Implement code (following CRC cards)
5. Add traceability comments
6. Write tests
7. Update docs as code evolves
```

---

## Troubleshooting

### "Command not found: /init-crc-project"

**Solution:** Ensure `.claude/commands/init-crc-project.md` exists and Claude Code has loaded it. Restart Claude Code if necessary.

### "Designer agent not found"

**Solution:** Verify `.claude/agents/designer.md` exists. Check file permissions.

### "PlantUML not working"

**Solution:**
1. Check `.claude/skills/plantuml.md` and `.claude/scripts/plantuml.py` exist
2. Ensure Python 3 is installed: `python3 --version`
3. The skill will download PlantUML on first use
4. Check internet connection for initial download

### "Design directory not created"

**Solution:**
1. Run `/init-crc-project` command
2. Or manually create: `mkdir -p specs design`

### Permission Issues

**Solution:**
Python scripts are invoked with `python3` and don't require execute permissions. If you encounter permission errors, ensure you have read access to the script files:
```bash
# Check script permissions
ls -l .claude/scripts/*.py
```

---

## Updating the Toolkit

### Get Latest Version

```bash
# Pull latest claude-crc repository
cd ~/work/claude-crc
git pull

# Copy updated files to your project
cp .claude/agents/designer.md ~/your-project/.claude/agents/
# Repeat for other components you want to update
```

### Preserve Customizations

If you've customized agents or scripts:
1. Back up your customizations
2. Review changes in updated files
3. Merge manually or re-apply customizations

---

## Uninstalling

### Remove CRC Toolkit

```bash
# Remove .claude directory
rm -rf .claude/

# Remove generated directories (⚠️ backs up first!)
mv specs/ specs.backup/
mv design/ design.backup/
```

### Clean CLAUDE.md

If the init script added sections to `CLAUDE.md`, manually remove or update those sections.

---

## Migration from Other Systems

### From Existing Documentation

If you have existing documentation:

1. **Organize into specs/**:
   - Move requirements docs to `specs/`
   - Convert to markdown if needed
   - Focus on WHAT and WHY, not HOW

2. **Generate designs**:
   - Use designer agent on each spec file
   - Review generated CRC cards
   - Refine as needed

3. **Add traceability**:
   - Link existing code to CRC cards
   - Add traceability comments
   - Update `design/traceability.md`

### From No Documentation

1. **Reverse engineer** (see `.claude/doc/crc.md` - Reverse Engineering section):
   - Read codebase
   - Extract classes and responsibilities
   - Create CRC cards from existing code
   - Document sequences from code flows

2. **Forward from there**:
   - Write specs based on code understanding
   - Use designer agent to generate clean designs
   - Compare with reverse-engineered CRC cards
   - Implement missing pieces

---

## Best Practices

### DO

✅ Start with simple specs
✅ Use designer agent to generate Level 2
✅ Review generated designs carefully
✅ Add traceability comments in code
✅ Update docs when code changes
✅ Use templates for consistency
✅ Run gap-analyzer periodically

### DON'T

❌ Skip Level 2 (specs → code directly)
❌ Write CRC cards manually (use designer agent)
❌ Forget to update traceability
❌ Let docs become stale
❌ Over-design simple features
❌ Ignore gaps identified by analyzer

---

## Getting Help

### Documentation

- **Quick start**: [README.md](README.md)
- **Complete guide**: `.claude/doc/crc.md`
- **Executive summary**: `.claude/doc/crc-summary.md`
- **Traceability**: `.claude/doc/traceability-guide.md`

### Examples

- **Contact manager specs**: `specs/main.md`, `specs/coding-standards.md`
- **Templates**: `templates/*.md`
- **Expected output**: `expected-result/` (when available)

### Testing

Test the toolkit with the included contact manager specs:
```
Generate Level 2 specs for specs/main.md using designer agent
```

---

## Next Steps

1. ✅ Complete installation
2. ✅ Run `/init-crc-project`
3. ✅ Read `.claude/doc/crc-summary.md`
4. ✅ Test with contact manager specs (optional)
5. ✅ Write your first spec in `specs/`
6. ✅ Generate designs with designer agent
7. ✅ Implement following CRC cards
8. ✅ Maintain traceability as you develop

**Welcome to CRC modeling! 🎯**
