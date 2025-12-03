# Hybrid Documentation System: Implementation Guide

**A lightweight, AI-friendly documentation system combining Manus context engineering with stack-based task management**

---

## Philosophy

This system solves two critical problems for AI-assisted development:

1. **Safety & Control** (from Manus): Prevent AI agents from making unsafe changes through spec-first planning, explicit approval gates, and objective verification
2. **Context Continuity** (Stack-based): Track work across interruptions, context switches, and session boundaries without manual overhead

**Core Principle**: "Trust but verify" the AI within strict boundaries, while maintaining clear task focus across interruptions.

---

## Theoretical Foundation

### Manus Context Engineering
Reference: [Manus - Context for AI Agents](https://www.manus.im/) (Anysphere team)

**Key Principles Applied**:
- Spec-first planning with minimal, targeted diffs
- Stable entrypoints (canonical documentation locations)
- Objective proof (build + test verification)
- Performance guardrails (hot-path protection)
- Allowed paths (explicit file change permissions)

### Stack-Based Task Management

**Key Principles**:
- Single current focus (NOW.md)
- Explicit interruption tracking (STACK.md)
- Lightweight context preservation
- Natural session continuity

### Our Hybrid Approach

We combined both approaches to get:
- **Manus safety** for code changes (spec approval, verification)
- **Stack tracking** for task interruptions (context preservation)
- **Lightweight docs** (reduced overhead, faster iteration)

---

## File Structure

```
project_root/
├─ NOW.md                          # Current task pointer (lightweight)
├─ STACK.md                        # Interrupted/paused tasks with context
├─ CLAUDE.md                       # AI agent working agreement (Manus-inspired)
│
├─ docs/
│  ├─ active/YYYY-MM-DD-<slug>/   # Current task only (enforce single folder)
│  │  ├─ context.md                # Lightweight spec (not heavyweight!)
│  │  ├─ todo.md                   # Simple checklist
│  │  └─ working-memory.md         # Session notes
│  │
│  ├─ stack/                       # Paused tasks (moved from active/)
│  │  └─ YYYY-MM-DD-<slug>/       # Same structure as active/
│  │
│  ├─ completed/YYYY-MM-DD/<cat>/ # Archived completed work
│  │
│  ├─ commands_docs/               # Canonical feature documentation
│  └─ tasks.md                     # Roadmap & sprint backlog
│
└─ .gitignore                      # Ignore generated files
```

---

## Core Files Explained

### 1. NOW.md (Root Level)
**Purpose**: Single source of truth for "what am I working on right now?"

**Contents**:
```markdown
# NOW: [Task Name]

**Priority**: P0/P1/P2
**Started**: YYYY-MM-DD
**Branch**: [git branch]
**Blocking**: [What this blocks, if any]

## The Problem
[1-2 sentence problem statement]

## Next Step
[Immediate next action]

## Quick Context
- Working in: [file/directory]
- Expected time: [estimate]
- Active folder: docs/active/YYYY-MM-DD-<slug>/

## Full Details
See: [link to detailed spec]
```

**Why**: Instant orientation for new sessions. AI checks this first.

### 2. STACK.md (Root Level)
**Purpose**: Track interrupted/paused tasks with return context

**Contents**:
```markdown
# Task Stack (Depth: N)

**Last Updated**: YYYY-MM-DD
**How to resume**: Read context.md and working-memory.md in task folder

---

## Level N [Currently Active in NOW.md]
**Task**: [Current task name]
**Folder**: docs/active/YYYY-MM-DD-<slug>/
**Started**: YYYY-MM-DD
**Status**: [Brief status]

### Next Steps
[What to do when resuming]

---

## Level N-1 [PAUSED]
**Task**: [Paused task name]
**Folder**: docs/active/YYYY-MM-DD-<slug>/ or docs/stack/
**Paused**: YYYY-MM-DD
**Return Point**: [Specific file:line or action]
**State**: [What was in progress]
**Blocked By**: [Current task name]

### Work Completed
- ✅ [Completed items]

### Next Steps (When Resuming)
1. [First action]
2. [Second action]

---

## Level 1 [PAUSED] - Blocked
**Task**: [Original task]
**Blocked By**: [Chain of dependencies]
[... same structure ...]
```

**Why**: Preserves full context for interrupted work. Prevents "what was I doing?" on resume.

### 3. CLAUDE.md (Root Level)
**Purpose**: AI agent working agreement (Manus-inspired)

**Structure**:
```markdown
# Project Name - Agent Guide v2.0

## Critical Rules
[Project-specific constraints - e.g., "This is a FLOP SOLVER", "NO ASSUMPTIONS"]

## Working Loop (Manus: Explore → Plan → Code → Verify)
1) Explore: Read-only analysis
2) Plan: Spec-first with approval
3) Code: Minimal diffs in allowed paths
4) Verify: Objective proof (build + test)

## Risk & Permissions
- Low (auto): read, build, test
- Medium (needs spec): edit code in allowed paths
- High (explicit approval): dependencies, refactors

## Allowed Paths
- Code: [specific directories]
- Tests: [test directories]
- Docs: CLAUDE.md, docs/**

## Performance Guardrails (Manus)
- No extra work in hot loops
- Avoid malloc/free in tight paths
- Guard debug logs with #ifdef

## Task Stack Management (Hybrid)
[Session continuity rules]
[Task state transitions]

## Spec Template
[Lightweight template - 6-8 fields max]

## Project Structure
[High-level map]
```

**Why**: Single file defining AI behavior boundaries. Read once per session.

### 4. docs/active/YYYY-MM-DD-<slug>/context.md
**Purpose**: Lightweight spec for current task

**Structure** (Simplified from Manus):
```markdown
# Spec: [Task Name]

**Objective**: [One sentence]

**Context**:
- [Link to PRD/tasks]
- [Current implementation notes]
- [Evidence of problem]

**Scope**:
- In: [What we're changing]
- Out: [What we're NOT changing]

**Files**:
- [file.c] (function names, line ranges)

**Proof**:
```bash
[Build command]
[Test command]
# Expected: [outcome]
```

**Risk**: Low/Medium/High
**Time**: [estimate]
```

**Why**: Quick orientation. NOT a heavyweight 13-field template. Fast to write, fast to read.

### 5. docs/active/YYYY-MM-DD-<slug>/todo.md
**Purpose**: Simple task checklist

```markdown
# TODO: [Task Name]

- [ ] Step 1
- [ ] Step 2
- [ ] Step 3
```

**Why**: Track progress. AI updates as it works.

### 6. docs/active/YYYY-MM-DD-<slug>/working-memory.md
**Purpose**: Session notes, decisions, findings

**Contents**: Free-form notes. Can include:
- Findings from investigation
- Decisions made and why
- Dead ends explored
- References to external resources

**Why**: Context for future sessions. Captures "why we did X".

---

## Implementation Process

### Phase 1: Create Core Files (15 minutes)

1. **Commit any pending work first**
   ```bash
   git status
   git add <files>
   git commit -m "..."
   ```

2. **Create NOW.md**
   - Identify your current task
   - Write 1-paragraph summary
   - List next immediate step

3. **Create STACK.md**
   - Audit your docs/active/ folders
   - Identify interrupted/paused work
   - Document as stack levels

4. **Create docs/stack/ directory**
   ```bash
   mkdir -p docs/stack
   ```

5. **Move paused work**
   ```bash
   mv docs/active/old-task-folder docs/stack/
   ```

   **Rule**: Only ONE active folder at a time (current task)

### Phase 2: Update CLAUDE.md (10 minutes)

Add this section after your commit template:

```markdown
## Task Stack Management (Hybrid System)

### Current Task Tracking
- **NOW.md** (root) - Points to current active task
- **STACK.md** (root) - Tracks interrupted/paused tasks by level
- **docs/active/** - Current task folder only (enforce single folder)
- **docs/stack/** - Paused task folders (interrupted but will resume)

### Task State Transitions

**Starting New Task**:
Create docs/active/YYYY-MM-DD-<slug>/ with context.md, todo.md, working-memory.md

**Task Interrupted**:
1. Update STACK.md with paused task details
2. Move folder to docs/stack/ (optional)
3. Update NOW.md to new task

**Resuming Task**:
1. Restore from STACK.md
2. Update NOW.md to resumed task
3. Move folder back to docs/active/ if needed

**Task Completed**:
1. Update docs/commands_docs/ if new features added
2. Remove from STACK.md if on stack
3. Move folder to docs/completed/YYYY-MM-DD/<category>/
4. Pop to next stack level or clear NOW.md

### Session Continuity
On conversation start:
1. Check NOW.md task and timestamp
2. Check STACK.md for context
3. If stale (>24h), ask: "Continue [task] or working on something else?"
```

### Phase 3: Create Lightweight Specs (5 minutes)

For your current active task:

1. **Create context.md** (simplified spec)
   - Use 6-8 field template (shown above)
   - NOT a heavyweight spec
   - Focus on: objective, scope, files, proof

2. **Create todo.md** (simple checklist)
   - 5-10 items max
   - Actionable steps

3. **Create working-memory.md** (if needed)
   - Free-form notes
   - Session findings

### Phase 4: Commit the System (2 minutes)

```bash
git add NOW.md STACK.md CLAUDE.md docs/stack/ docs/active/
git commit -m "Implement Hybrid Documentation System (Manus + Stack-based)

Why: Solve task interruption tracking and enforce single active task
How: Add NOW.md/STACK.md for current task + stack, organize folders
Proof: NOW.md points to current work, STACK.md tracks paused tasks
"
```

---

## Workflow: How to Use the System

### Starting Your Day

**AI checks (automatic)**:
1. Read NOW.md
2. Check timestamp (is it stale?)
3. If >24h old: "Continue [task] or working on something else?"
4. Read STACK.md for context

**You answer**: "Continue" or "Working on [new thing]"

### During Work

**AI behavior**:
- Updates todo.md as tasks complete
- Adds findings to working-memory.md
- Follows CLAUDE.md safety rules
- Asks approval for medium/high risk changes

**Your job**: Just code. AI handles docs.

### When Interrupted

**You say**: "I need to fix [X] first"

**AI does**:
1. Save current work state to STACK.md
2. Update NOW.md to new task
3. Create new docs/active/YYYY-MM-DD-fix-x/ folder
4. Move old folder to docs/stack/ (optional)

**You continue**: Working on the interruption

### When Resuming

**You say**: "Back to [previous task]"

**AI does**:
1. Archive interruption work to docs/completed/
2. Pop from STACK.md
3. Restore NOW.md to previous task
4. Show return point and next steps

**You continue**: Right where you left off

### When Completing

**Task done**:
1. AI updates docs/commands_docs/ (if new features)
2. Move folder to docs/completed/YYYY-MM-DD/<category>/
3. Remove from STACK.md
4. Pop to next level or clear NOW.md

---

## What This System Prevents

### Before (Common Problems)

❌ **Multiple "active" folders** violating single-task rule
❌ **Lost context** across interruptions
❌ **Manual "NEXT_SESSION" files** for handoff
❌ **13KB heavyweight specs** taking 30-60 min to write
❌ **Unclear current focus** - which folder is active?
❌ **No interruption tracking** - forgot what was paused
❌ **Unsafe AI changes** - no guardrails on hot paths

### After (With Hybrid System)

✅ **Single active folder** enforced by design
✅ **Automatic context** via NOW.md + STACK.md
✅ **Instant session handoff** - read NOW.md, start coding
✅ **Lightweight specs** - 5-10 min to write
✅ **Clear focus** - NOW.md is single source of truth
✅ **Explicit interruption handling** - STACK.md tracks all paused work
✅ **Safety preserved** - Manus guardrails in CLAUDE.md

---

## Customization for Your Project

### Adapt the Spec Template

Our template has 6 fields. Adjust for your needs:
- **Minimum**: Objective, Files, Proof (3 fields)
- **Standard**: + Context, Scope, Risk (6 fields)
- **Detailed**: + Performance notes, Rollback plan (8 fields)

**Rule**: Keep it under 1 page. If longer, you're planning too much.

### Project-Specific Rules in CLAUDE.md

Add your domain constraints:
```markdown
## Critical Rules
- [Your constraint 1]
- [Your constraint 2]
```

Examples from our project:
- "This is a FLOP SOLVER - always 3 rounds"
- "NO ASSUMPTIONS - always ask for explicit values"
- "Performance: no malloc in hot loops"

### Allowed Paths

Define where AI can make changes:
```markdown
## Allowed Paths
- Code: src/**/*.ts (except src/core/critical.ts)
- Tests: tests/**
- Docs: docs/**
- Anything else → include in spec for approval
```

### Risk Levels

Define what needs approval:
```markdown
## Risk & Permissions
- Low (auto): read, build, test, doc updates
- Medium (needs spec): edit code in allowed paths
- High (explicit approval): dependencies, database schemas, API changes
```

---

## Benefits Achieved

### For You (Developer)
- **No manual doc maintenance** - AI updates as it works
- **Instant session restore** - NOW.md + STACK.md = full context
- **Clear interruption handling** - Stack levels prevent forgotten work
- **Lightweight overhead** - Minutes, not hours on specs

### For AI (Agent)
- **Clear boundaries** - CLAUDE.md defines safe behavior
- **Instant orientation** - NOW.md shows current focus
- **Context preservation** - STACK.md provides history
- **Objective verification** - Proof commands validate work

### For the Project
- **Safety** - Manus guardrails prevent regressions
- **Continuity** - Stack system prevents lost work
- **Speed** - Lightweight docs = faster iteration
- **Quality** - Specs enforce thinking before coding

---

## Maintenance

### Daily (Automatic)
- AI updates todo.md as work progresses
- AI adds findings to working-memory.md
- AI updates NOW.md on task switches

### Weekly (5 minutes)
- Review STACK.md depth (should be ≤3 levels)
- Archive completed work to docs/completed/
- Update docs/tasks.md roadmap

### Monthly (15 minutes)
- Check CLAUDE.md hasn't grown too large (≤200 lines)
- Verify docs/active/ has only 1 folder
- Review docs/completed/ for patterns

---

## Troubleshooting

### "I have 3 active folders"
**Solution**:
1. Pick current task → stays in docs/active/
2. Move paused tasks → docs/stack/
3. Move completed tasks → docs/completed/
4. Update STACK.md with paused task context

### "NOW.md is stale"
**Solution**:
1. Decide: continue or switch?
2. If switch: archive old task, update NOW.md
3. If continue: update NOW.md timestamp and status

### "Stack depth is 5+"
**Problem**: Too much context switching

**Solution**:
1. Finish or explicitly abandon deep tasks
2. Archive abandoned tasks to docs/completed/abandoned/
3. Focus on top 2-3 levels only

### "Specs are getting too long again"
**Problem**: Reverting to heavyweight specs

**Solution**:
1. Review spec template (should be ≤1 page)
2. Move detailed notes to working-memory.md
3. Keep context.md focused on: what, where, proof

---

## Example: Real Implementation

This guide was created for the `suited_solver` project (CFR+ poker solver).

**Before**:
- 3 active folders (violated single-task rule)
- 13.8KB context.md specs
- Manual NEXT_SESSION_START_HERE.md.bak files
- Unclear current focus

**After (Hybrid System)**:
- NOW.md: Points to all-in threshold fix (P0 bug)
- STACK.md: 1 paused task (PioSolver comparison)
- docs/active/: 2 folders only
- docs/stack/: 1 completed task (pot-relative betting)
- Lightweight spec.md: <1KB

**Time to implement**: 22 minutes

**Commits**:
1. `c6c588a` - .gitignore update
2. `6061e08` - Hybrid system implementation
3. `382ab53` - CLAUDE.md workflow refinement

**Result**: Clear focus, preserved context, enforced single-task discipline.

---

## References

- **Manus Context Engineering**: https://www.manus.im/
  - Spec-first planning
  - Allowed paths
  - Objective verification
  - Performance guardrails

- **Agent-Driven Development**: Explore → Plan → Code → Verify loop

- **This Implementation**: suited_solver CFR+ project (private)
  - See: CLAUDE.md, NOW.md, STACK.md for working example

---

## Quick Start Checklist

- [ ] Read Manus article (understand context engineering)
- [ ] Create NOW.md (current task, 1 paragraph)
- [ ] Create STACK.md (audit active folders, document paused work)
- [ ] Create docs/stack/ directory
- [ ] Move paused tasks from docs/active/ to docs/stack/
- [ ] Update CLAUDE.md (add Task Stack Management section)
- [ ] Create lightweight context.md for current task
- [ ] Create todo.md checklist
- [ ] Commit the system
- [ ] Start working - AI handles the rest

**Time**: ~30 minutes to implement, lifetime of benefits.

---

**Last Updated**: 2025-11-23
**Version**: 1.0
**License**: Use freely, credit Manus for context engineering principles
