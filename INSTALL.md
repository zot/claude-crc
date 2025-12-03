# Installing CRC Modeling in Your Project

## Prerequisites

- Claude Code CLI installed and configured
- Python 3 available
- Java (for PlantUML sequence diagrams)

---

## Quick Install

### 1. Create your project directory

```bash
mkdir my-project
cd my-project
mkdir .claude
```

### 2. Download the installer

```bash
curl -LO https://github.com/zot/claude-crc/releases/latest/download/claude-crc-dist.py
```

Or download directly: [claude-crc-dist.py](https://github.com/zot/claude-crc/releases/latest/download/claude-crc-dist.py)

### 3. Run the installer

```bash
python3 claude-crc-dist.py
```

This installs all CRC components into your `.claude/` directory.

### 4. Initialize CRC in your project

In Claude Code:

```
/init-crc-project
```

This creates `specs/` and `design/` directories and updates your `CLAUDE.md`.

---

## What's Next

1. **Write specs** in `specs/*.md` (human-readable requirements)
2. **Generate designs** using the designer agent:
   ```
   Generate Level 2 specs for specs/feature.md using designer agent
   ```
3. **Implement code** following CRC cards and sequences

See `.claude/doc/crc.md` for complete documentation.

---

## Troubleshooting

### "Command not found: /init-crc-project"

Restart Claude Code to reload commands.

### "PlantUML not working"

The PlantUML skill downloads automatically on first use. Ensure Java, Python 3, and internet access are available.

---

## Alternative Installation Methods

For advanced users who prefer to copy files manually.

### Copy from Repository

If you have the claude-crc repository cloned:

```bash
# Copy the entire .claude directory
cp -r ~/path/to/claude-crc/.claude ~/your-project/.claude

# Navigate to your project
cd ~/your-project

# Initialize
/init-crc-project
```

### Minimal Installation

Copy only essential files:

```bash
mkdir -p ~/your-project/.claude/{doc,agents,skills,scripts,commands}

# Core documentation
cp .claude/doc/crc.md ~/your-project/.claude/doc/
cp .claude/doc/crc-summary.md ~/your-project/.claude/doc/

# Required agent
cp .claude/agents/designer.md ~/your-project/.claude/agents/

# PlantUML support
cp .claude/skills/plantuml.md ~/your-project/.claude/skills/
cp .claude/scripts/plantuml.py ~/your-project/.claude/scripts/

# Initialization
cp .claude/skills/init-crc-project.md ~/your-project/.claude/skills/
cp .claude/scripts/init-crc-project.py ~/your-project/.claude/scripts/
cp .claude/commands/init-crc-project.md ~/your-project/.claude/commands/
```

---

## Getting Help

- **Quick start**: [README.md](README.md)
- **Complete guide**: `.claude/doc/crc.md`
- **Executive summary**: `.claude/doc/crc-summary.md`
