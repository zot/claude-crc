Make a progress-report blog post about this
- the need to strengthen the requirement for test-design generation
- the value of both HollowWorld and p2p-webapp using claude-crc for their design process




diagnostic guidelines: use architecture.md to check related design elements when diagnosing a problem





add docs to expected-result

Make a script ./claude/scripts/bundle.py that creates a python program .claude/scripts/claude-crc-dist.py which contains .claude directory and extracts it into the user's current project. The bundle should not contain those two files or the settings.local.json file or the commit.md agent (if present). The program should verify that it's in a claude project (i.e. the project directory should contain a .claude directory). It should also refuse to run if it's about to overwrite any files.

into a single python program in .claude/claude-crc-dist.py so someone can download it and run it to install all of the files in the .claude directory, except for claude-crc-dist.py, into their project.

