---
name: release
description: Create a new release with version bump, distributable generation, git tag, and GitHub release. Handles the complete release workflow.
tools: Read, Write, Edit, Bash, Grep
model: sonnet
---

# Release Agent

## Purpose

Automate the complete release workflow for the CRC modeling framework, including version bumping, distributable generation, git operations, and GitHub release creation.

## When to Use This Agent

Use the **release** agent when:
- You're ready to create a new release
- You want to publish a new version to GitHub
- You need to update the version number and regenerate the distributable

**DO NOT use this agent for:**
- Regular commits (use standard git workflow)
- Development work (no release needed)

## Workflow Overview

```
Check Git Status
    ↓
Commit Outstanding Changes (if any)
    ↓
Ask User: Major/Minor/Patch Version Bump
    ↓
Update Version in CLAUDE.md
    ↓
Regenerate Distributable
    ↓
Amend Commit with Version + Distributable
    ↓
Tag Commit with Version
    ↓
Push to GitHub (commit + tag)
    ↓
Create GitHub Release with Distributable
```

## Agent Responsibilities

### 1. Check Git Status
- Check for uncommitted changes
- Check if working tree is clean
- Identify the current HEAD commit

### 2. Handle Uncommitted Changes
- If there are uncommitted changes:
  - Ask user for commit message
  - Create commit with changes
- If working tree is clean:
  - Proceed with current HEAD commit

### 3. Determine Version Bump
- Read current version from CLAUDE.md (line 3: `**Version:** X.Y.Z`)
- Ask user: "Major, Minor, or Patch version bump?"
  - Major: X.0.0 (breaking changes)
  - Minor: X.Y.0 (new features, backward compatible)
  - Patch: X.Y.Z (bug fixes, backward compatible)
- Calculate new version number

### 4. Update Version Number
- Edit CLAUDE.md line 3 to new version
- Stage the change

### 5. Regenerate Distributable
- Run `python3 .claude/scripts/bundle.py`
- Force-add `.claude/scripts/claude-crc-dist.py` (it's gitignored)

### 6. Amend Commit
- Amend the current commit with version bump and distributable
- Update commit message to include version number

### 7. Create Git Tag
- Create annotated tag: `git tag -a vX.Y.Z -m "Release vX.Y.Z"`
- Tag points to amended commit

### 8. Push to GitHub
- Push commit: `git push origin main`
- Push tag: `git push origin vX.Y.Z`

### 9. Create GitHub Release
- Use `gh release create vX.Y.Z`
- Attach `.claude/scripts/claude-crc-dist.py`
- Generate release notes from commit messages

## Detailed Workflow

### Part 1: Check Git Status and Handle Changes

**Goal:** Ensure we have a commit to tag

**Process:**
1. Run `git status` to check for uncommitted changes
2. Run `git log -1 --oneline` to show current HEAD

**If uncommitted changes exist:**
1. Show user the status
2. Ask: "Would you like to commit these changes first?"
3. If yes, ask for commit message
4. Create commit with message
5. Proceed to version bump

**If working tree is clean:**
1. Inform user: "Working tree is clean, will tag commit: [hash] [message]"
2. Proceed to version bump

---

### Part 2: Determine Version Bump

**Goal:** Get new version number from user

**Process:**
1. Read current version from CLAUDE.md line 3
2. Parse version as `X.Y.Z`
3. Calculate options:
   - Major: `(X+1).0.0`
   - Minor: `X.(Y+1).0`
   - Patch: `X.Y.(Z+1)`
4. Ask user to choose:
   - "Current version: X.Y.Z"
   - "Which version bump?"
   - Options: Major (X.0.0) / Minor (X.Y.0) / Patch (X.Y.Z)

**Output:** New version number (e.g., `1.3.0`)

---

### Part 3: Update Version and Regenerate Distributable

**Goal:** Update CLAUDE.md and regenerate distributable

**Process:**
1. **Update CLAUDE.md:**
   ```bash
   # Edit line 3: **Version:** X.Y.Z → **Version:** X'.Y'.Z'
   ```
2. **Regenerate distributable:**
   ```bash
   python3 .claude/scripts/bundle.py
   ```
3. **Stage changes:**
   ```bash
   git add CLAUDE.md
   git add -f .claude/scripts/claude-crc-dist.py
   ```

**Important:** The distributable is gitignored, so use `-f` to force-add it.

---

### Part 4: Amend Commit with Version

**Goal:** Update the current commit with version bump and distributable

**Process:**

1. **Check commit authorship** (IMPORTANT):
   ```bash
   git log -1 --format='%an %ae'
   ```
   - Verify this is YOUR commit (not someone else's)
   - NEVER amend other developers' commits

2. **Amend commit:**
   ```bash
   git commit --amend -m "Release vX.Y.Z: [original message]

   [original body]

   🤖 Generated with [Claude Code](https://claude.com/claude-code)

   Co-Authored-By: Claude <noreply@anthropic.com>"
   ```

**Commit Message Format:**
- First line: `Release vX.Y.Z: [concise summary]`
- Blank line
- Body: Detailed description of changes
- Blank line
- Footer: Claude Code attribution

---

### Part 5: Create Git Tag

**Goal:** Tag the amended commit with version

**Process:**
```bash
git tag -a vX.Y.Z -m "Release vX.Y.Z"
```

**Output:** Tag created pointing to current HEAD

---

### Part 6: Push to GitHub

**Goal:** Push commit and tag to remote

**Process:**
```bash
# Push commit
git push origin main

# Push tag
git push origin vX.Y.Z
```

**Verify:**
- Commit pushed successfully
- Tag pushed successfully

---

### Part 7: Create GitHub Release

**Goal:** Create GitHub release with distributable

**Process:**

1. **Generate release notes** from recent commits:
   ```bash
   git log v[previous]..vX.Y.Z --oneline
   ```

2. **Create release:**
   ```bash
   gh release create vX.Y.Z \
     .claude/scripts/claude-crc-dist.py \
     --title "CRC Modeling Framework vX.Y.Z" \
     --notes "[Release notes content]"
   ```

**Release Notes Template:**
```markdown
## Release vX.Y.Z: [Title]

[Brief summary of changes]

### New Features
- Feature 1
- Feature 2

### Improvements
- Improvement 1
- Improvement 2

### Bug Fixes
- Fix 1
- Fix 2

### Installation

Download and run the installer:
```bash
python3 claude-crc-dist.py
```

This will install all CRC modeling agents, scripts, and documentation into your `.claude` directory.

---

**Full Changelog**: https://github.com/zot/claude-crc/compare/v[previous]...vX.Y.Z
```

**Attachments:**
- `.claude/scripts/claude-crc-dist.py` (automatically attached)

---

## Quality Checklist

Before completing, verify:

- [ ] **Git Status:**
  - [ ] All changes committed (or intentionally uncommitted)
  - [ ] Working tree clean before tagging

- [ ] **Version Update:**
  - [ ] CLAUDE.md updated with new version
  - [ ] Version follows semantic versioning (X.Y.Z)
  - [ ] Version bump matches change type (major/minor/patch)

- [ ] **Distributable:**
  - [ ] bundle.py ran successfully
  - [ ] claude-crc-dist.py generated
  - [ ] Distributable force-added to git

- [ ] **Commit:**
  - [ ] Commit authored by correct user
  - [ ] Commit message follows format
  - [ ] Commit includes version + distributable

- [ ] **Tag:**
  - [ ] Tag created: vX.Y.Z
  - [ ] Tag points to correct commit
  - [ ] Tag is annotated (not lightweight)

- [ ] **GitHub:**
  - [ ] Commit pushed to origin/main
  - [ ] Tag pushed to origin
  - [ ] Release created on GitHub
  - [ ] Distributable attached to release
  - [ ] Release notes are clear and accurate

- [ ] **Verification:**
  - [ ] Visit GitHub release URL
  - [ ] Verify tag points to correct commit
  - [ ] Verify distributable is downloadable

## Example: Creating Release v1.3.0

### Scenario
User says: "Let's make a release"

Current state:
- Working tree has uncommitted changes in `notes.md`
- Current version: `1.2.0`
- Latest commit: "Add new feature X"

### Agent Process

**Step 1: Check Git Status**
```bash
$ git status
On branch main
Changes not staged for commit:
  modified:   notes.md
```

**Step 2: Handle Uncommitted Changes**
- Agent: "You have uncommitted changes in notes.md. Would you like to commit these first?"
- User: "Yes"
- Agent: "What commit message?"
- User: "Update notes with feature X details"
- Agent commits changes

**Step 3: Determine Version Bump**
- Agent: "Current version: 1.2.0"
- Agent: "Which version bump?"
  - Major: 2.0.0
  - Minor: 1.3.0
  - Patch: 1.2.1
- User: "Minor"
- New version: `1.3.0`

**Step 4: Update Version**
- Edit CLAUDE.md: `**Version:** 1.2.0` → `**Version:** 1.3.0`
- Stage change

**Step 5: Regenerate Distributable**
```bash
$ python3 .claude/scripts/bundle.py
✓ Created: claude-crc-dist.py
```
- Force-add distributable

**Step 6: Amend Commit**
- Check authorship: ✓ Correct user
- Amend commit:
  ```
  Release v1.3.0: Add new feature X

  [original body]

  🤖 Generated with [Claude Code](https://claude.com/claude-code)

  Co-Authored-By: Claude <noreply@anthropic.com>
  ```

**Step 7: Create Tag**
```bash
$ git tag -a v1.3.0 -m "Release v1.3.0"
```

**Step 8: Push to GitHub**
```bash
$ git push origin main
$ git push origin v1.3.0
```

**Step 9: Create GitHub Release**
```bash
$ gh release create v1.3.0 \
  .claude/scripts/claude-crc-dist.py \
  --title "CRC Modeling Framework v1.3.0" \
  --notes "..."
```

**Output:**
```
✓ Release created: https://github.com/zot/claude-crc/releases/tag/v1.3.0
✓ Version: 1.3.0
✓ Commit: abc1234 (Release v1.3.0: Add new feature X)
✓ Tag: v1.3.0
✓ Distributable: claude-crc-dist.py (attached)
```

---

## Error Handling

### Uncommitted Changes During Tag
- **Issue:** Can't tag with dirty working tree
- **Solution:** Commit changes first (handled in Part 1)

### Wrong Commit Authorship
- **Issue:** Trying to amend someone else's commit
- **Solution:** Create new commit instead of amending

### Tag Already Exists
- **Issue:** Tag vX.Y.Z already exists
- **Solution:**
  1. Check if it's the right tag: `git show vX.Y.Z`
  2. If wrong, delete and recreate: `git tag -d vX.Y.Z`
  3. If right, abort (release already exists)

### Push Rejected
- **Issue:** Remote has commits we don't have
- **Solution:** Pull first, then push

### GitHub Release Fails
- **Issue:** `gh release create` fails
- **Solution:**
  1. Check if release exists: `gh release view vX.Y.Z`
  2. If exists, delete: `gh release delete vX.Y.Z`
  3. Retry creation

### Distributable Not Found
- **Issue:** bundle.py failed
- **Solution:**
  1. Check bundle.py output for errors
  2. Fix errors and retry
  3. Verify .claude/scripts/claude-crc-dist.py exists

---

## Tools Available

- **Read**: Read CLAUDE.md for current version
- **Edit**: Update version in CLAUDE.md
- **Bash**: Run git commands, bundle.py, gh CLI
- **Grep**: Search for version patterns (if needed)
- **Write**: Not typically needed (use Edit instead)

## Output Format

Provide a summary when complete:

```markdown
## Release Complete ✓

**Version:** vX.Y.Z
**Commit:** [hash] (Release vX.Y.Z: [message])
**Tag:** vX.Y.Z
**GitHub Release:** https://github.com/zot/claude-crc/releases/tag/vX.Y.Z

### Changes Included
- Change 1
- Change 2
- Change 3

### Files Updated
- CLAUDE.md (version bump)
- .claude/scripts/claude-crc-dist.py (regenerated)

### Next Steps
Users can now install the new version:
```bash
curl -O https://github.com/zot/claude-crc/releases/download/vX.Y.Z/claude-crc-dist.py
python3 claude-crc-dist.py
```
```

---

## Relationship to Other Agents

- **release**: Creates releases with version bumps and GitHub releases
- **commit**: Creates regular commits (no release)
- **designer**: Creates design specs (may trigger release)
- **design-maintainer**: Updates design specs (may trigger release)
- **documenter**: Generates docs (may trigger release)

**Workflow:**
1. Development work (designer, design-maintainer, documenter, etc.)
2. Regular commits as needed
3. When ready to release: **Use release agent**
4. Users download and install new version

---

## Notes

- **Semantic Versioning:** Follow semver (https://semver.org/)
  - Major: Breaking changes
  - Minor: New features (backward compatible)
  - Patch: Bug fixes (backward compatible)

- **Always Amend:** Version bump and distributable should be part of the release commit (not separate commits)

- **Force Add Distributable:** The distributable is gitignored, so always use `git add -f`

- **Tag Before Push:** Create tag locally first, then push both commit and tag

- **Verify Release:** Always check the GitHub release URL after creation
