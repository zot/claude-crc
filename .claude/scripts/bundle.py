#!/usr/bin/env python3
"""
Bundle .claude directory into a distributable Python script.

This script creates claude-crc-dist.py which contains the .claude directory
contents and can extract them into a user's Claude Code project.
"""

import os
import base64
import json
from pathlib import Path
from typing import Dict, List

# Files to exclude from the bundle
EXCLUDE_FILES = {
    '.claude/scripts/bundle.py',
    '.claude/scripts/claude-crc-dist.py',
    '.claude/settings.local.json',
    '.claude/agents/commit.md',
    '.claude/agents/release.md',
}

def should_exclude(file_path: str) -> bool:
    """Check if a file should be excluded from the bundle."""
    return (file_path in EXCLUDE_FILES) or file_path.endswith("~")

def collect_files(base_dir: Path) -> Dict[str, bytes]:
    """Collect all files from .claude directory, excluding specified files."""
    files = {}
    claude_dir = base_dir / '.claude'

    if not claude_dir.exists():
        raise FileNotFoundError(f".claude directory not found at {claude_dir}")

    for root, dirs, filenames in os.walk(claude_dir):
        # Skip __pycache__ and other cache directories
        dirs[:] = [d for d in dirs if d not in {'__pycache__', '.git', '.DS_Store'}]

        for filename in filenames:
            if filename.startswith('.') and filename != '.gitignore':
                continue

            full_path = Path(root) / filename
            relative_path = full_path.relative_to(base_dir)
            relative_str = str(relative_path)

            if should_exclude(relative_str):
                print(f"Excluding: {relative_str}")
                continue

            try:
                with open(full_path, 'rb') as f:
                    files[relative_str] = f.read()
                print(f"Including: {relative_str}")
            except Exception as e:
                print(f"Warning: Could not read {relative_str}: {e}")

    return files

def create_distributable(files: Dict[str, bytes], output_path: Path) -> None:
    """Create the distributable Python script with embedded files."""

    # Encode all files as base64
    encoded_files = {}
    for path, content in files.items():
        encoded_files[path] = base64.b64encode(content).decode('ascii')

    # Create the distributable script
    script_content = f'''#!/usr/bin/env python3
"""
CRC Modeling Framework Installer for Claude Code

This script installs the CRC (Class-Responsibility-Collaborator) modeling
framework into your Claude Code project.

Usage:
    python claude-crc-dist.py

Requirements:
    - Must be run in a directory containing a .claude directory
    - Will not overwrite existing files
"""

import os
import sys
import base64
import json
import subprocess
from pathlib import Path

# Embedded files (base64 encoded)
EMBEDDED_FILES = {json.dumps(encoded_files, indent=2)}

def check_claude_project():
    """Verify we're in a Claude Code project."""
    if not Path('.claude').exists():
        print("ERROR: Not a Claude Code project!")
        print("This directory must contain a .claude directory.")
        print("Please run this script from your Claude Code project root.")
        return False
    return True

def check_overwrites(files):
    """Check if any files would be overwritten."""
    conflicts = []
    for file_path in files.keys():
        if Path(file_path).exists():
            conflicts.append(file_path)
    return conflicts

def extract_files(files):
    """Extract embedded files to the current directory."""
    created_files = []
    created_dirs = set()

    for file_path, encoded_content in files.items():
        # Decode content
        content = base64.b64decode(encoded_content)

        # Create parent directories if needed
        parent_dir = Path(file_path).parent
        if parent_dir != Path('.') and parent_dir not in created_dirs:
            parent_dir.mkdir(parents=True, exist_ok=True)
            created_dirs.add(parent_dir)

        # Write file
        with open(file_path, 'wb') as f:
            f.write(content)
        created_files.append(file_path)

    return created_files, created_dirs

def main():
    """Main installation function."""
    print("=" * 60)
    print("CRC Modeling Framework Installer for Claude Code")
    print("=" * 60)
    print()

    # Check we're in a Claude project
    if not check_claude_project():
        sys.exit(1)

    # Check for conflicts
    conflicts = check_overwrites(EMBEDDED_FILES)
    if conflicts:
        print("ERROR: The following files already exist and would be overwritten:")
        print()
        for conflict in sorted(conflicts):
            print(f"  - {{conflict}}")
        print()
        print("Please remove or rename these files before running the installer.")
        sys.exit(1)

    # Extract files
    print(f"Installing {{len(EMBEDDED_FILES)}} files...")
    print()

    try:
        created_files, created_dirs = extract_files(EMBEDDED_FILES)

        print("✓ Installation complete!")
        print()
        print(f"Created {{len(created_dirs)}} directories")
        print(f"Created {{len(created_files)}} files:")
        print()
        for file_path in sorted(created_files):
            print(f"  ✓ {{file_path}}")
        print()

        # Run init-crc-project.py to initialize the project
        init_script = Path('.claude/scripts/init-crc-project.py')
        if init_script.exists():
            print("=" * 60)
            print("Running project initialization...")
            print("=" * 60)
            print()
            try:
                result = subprocess.run(
                    [sys.executable, str(init_script)],
                    check=True,
                    text=True,
                    capture_output=False
                )
                print()
                print("=" * 60)
                print("✓ CRC Framework installation and initialization complete!")
                print("=" * 60)
                print()
                print("Documentation:")
                print("  - .claude/doc/crc.md - Main CRC methodology documentation")
                print()
                print("Slash Commands:")
                print("  /init-crc-project - Re-run project initialization if needed")
                print()
            except subprocess.CalledProcessError as e:
                print()
                print(f"WARNING: Initialization script failed: {{e}}")
                print("You can manually run: python .claude/scripts/init-crc-project.py")
                print()
        else:
            print("WARNING: init-crc-project.py not found, skipping initialization")
            print()

    except Exception as e:
        print(f"ERROR: Installation failed: {{e}}")
        sys.exit(1)

if __name__ == '__main__':
    main()
'''

    # Write the distributable script
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(script_content)

    # Make it executable
    os.chmod(output_path, 0o755)

def main():
    """Main bundler function."""
    print("CRC Framework Bundler")
    print("=" * 60)
    print()

    # Determine paths
    script_dir = Path(__file__).parent
    project_root = script_dir.parent.parent
    output_path = script_dir / 'claude-crc-dist.py'

    print(f"Project root: {project_root}")
    print(f"Output: {output_path}")
    print()

    # Collect files
    print("Collecting files from .claude directory...")
    print()
    files = collect_files(project_root)
    print()
    print(f"Collected {len(files)} files ({sum(len(c) for c in files.values())} bytes)")
    print()

    # Create distributable
    print("Creating distributable script...")
    create_distributable(files, output_path)
    print()
    print(f"✓ Created: {output_path}")
    print(f"  Size: {output_path.stat().st_size} bytes")
    print()
    print("Done! You can now distribute claude-crc-dist.py to users.")
    print()
    print("Users can install it by running:")
    print(f"  python {output_path.name}")
    print()

if __name__ == '__main__':
    main()
