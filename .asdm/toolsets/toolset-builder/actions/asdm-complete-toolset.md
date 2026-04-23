# Instructions for asdm-complete-toolset action

## Purpose
This instruction guides the AI model to complete and finalize a toolset project. It validates all files exist, checks completeness and consistency, generates a comprehensive summary, and provides recommendations for next steps.

## Language Detection

Before generating any summaries or reports, you must detect and use the current environment's response language:

1. **Detect Response Language**: Analyze the environment settings to determine the primary language:
   - Check system/user language settings or environment configuration
   - Identify the primary language used in project documentation and comments
   - Determine the language preference based on workspace context

2. **Apply Language Consistency**: Ensure all generated summaries use the detected language:
   - Use the same language for all markdown files, comments, and documentation
   - Maintain language consistency across all generated files
   - Follow the detected language's writing conventions and formatting

3. **Supported Languages**:
   - English (en)
   - Chinese (zh)
   - Other languages as needed based on environment detection

**IMPORTANT**: The language detection is the FIRST step before any summary generation. All output must consistently use the detected language throughout the entire process.

## Context Injection

Before completing the toolset, the AI model should read all toolset files to validate completeness:

### Context Files to Read (Required)

1. **Toolset README.md** (Required)
   - Path: `.asdm/toolsets/<toolset-id>/README.md`
   - Purpose: Validate README completeness

2. **Action Files** (Required)
   - Path: `.asdm/toolsets/<toolset-id>/actions/*.md`
   - Purpose: Validate all actions exist and are complete

3. **Spec Files** (Required)
   - Path: `.asdm/toolsets/<toolset-id>/spec/*.md`
   - Purpose: Validate all specs exist

4. **INSTALL.md** (Required)
   - Path: `.asdm/toolsets/<toolset-id>/INSTALL.md`
   - Purpose: Validate installation guide exists

5. **ASDM Design Principles** (Reference)
   - Path: `ASDM_TOOLSET_DESIGN_PRINCIPLES.md`
   - Purpose: Validate compliance with ASDM principles

6. **Toolset Development Training** (Reference)
   - Path: `TOOLSET_DEV_TRAINING.md`
   - Purpose: Validate compliance with development guidelines

## Steps to Complete Toolset

### 1. Identify the Toolset

The action receives a toolset ID as input. If not provided, prompt the user to select a toolset:
- List existing toolsets in `.asdm/toolsets/`
- Display toolset IDs and names
- Ask user to select which toolset to complete

### 2. Validate Toolset Exists

Check if the toolset exists:
- Path: `.asdm/toolsets/<toolset-id>/README.md`
- If the README.md doesn't exist, inform the user that the toolset hasn't been initialized yet
- Suggest running `/asdm-init-toolset <toolset-id>` first

### 3. Load All Toolset Files

Read all toolset files to validate completeness:

**Required Files:**
- README.md
- INSTALL.md
- All action files in `actions/` directory
- All spec files in `spec/` directory

**Check:**
- List all files in `.asdm/toolsets/<toolset-id>/`
- List all files in `.asdm/toolsets/<toolset-id>/actions/`
- List all files in `.asdm/toolsets/<toolset-id>/spec/`

### 4. Validate README.md

Validate the README.md against the toolset-readme-spec.md:

**Required Sections:**
- [ ] Header metadata (toolset-id, toolset-name, version, updated-date, toolset-description)
- [ ] Overview section (2-3 paragraphs)
- [ ] Features section with common features and individual features
- [ ] Toolset Installation Process section
- [ ] Toolset Workflow section with command list
- [ ] Toolset Structure section with directory structure
- [ ] Toolset Workspace section with workspace structure
- [ ] Copyright & License section

**Validation Checks:**
- Metadata values match toolset information
- Overview is complete and user-focused
- Features have descriptions, inputs, outputs, use cases
- Workflow lists all commands from actions directory
- Structure includes all files that exist
- Workspace structure is defined
- No obvious placeholders remain

### 5. Validate Action Files

Validate each action file against the toolset-action-spec.md:

**Required Sections:**
- [ ] Title follows format "# Instructions for <action-name> action"
- [ ] Purpose section (2-3 sentences)
- [ ] Language Detection section (if action generates text)
- [ ] Context Injection section (if context is needed)
- [ ] Steps to <Action Name> section with numbered steps
- [ ] Execution Guidelines section
- [ ] Usage section
- [ ] Output Summary section

**Validation Checks:**
- Steps are clear and actionable
- File paths are specific and complete
- Language Detection section is included for text-generating actions
- Context is clearly specified
- Outputs are clearly described
- Usage is straightforward

### 6. Validate Spec Files

Validate each spec file against the toolset-spec-spec.md:

**Required Sections:**
- [ ] Title follows format "# <Spec Name> Specification" or "Template"
- [ ] Language Guidelines section
- [ ] Overview section
- [ ] Document Structure section with template
- [ ] Section Guidelines for major sections
- [ ] Usage Guidelines section
- [ ] Output Format section
- [ ] Best Practices section
- [ ] Related Documents section
- [ ] Checklist section

**Validation Checks:**
- Template is complete with placeholders
- Guidelines are clear and helpful
- Output format is specified
- Related documents are referenced
- Checklist is comprehensive

### 7. Validate INSTALL.md

Validate the INSTALL.md:

**Required Sections:**
- [ ] Title "<Toolset Name> Installation"
- [ ] Toolset ID field
- [ ] Overview section
- [ ] AI Guided Installation section with prompt
- [ ] Installation Steps section
  - [ ] Step 1: Create workspace directories
  - [ ] Step 2: Detect provider
  - [ ] Step 3: Create shortcuts commands
    - [ ] For Claude Code
    - [ ] For GitHub Copilot
    - [ ] For Tencent CodeBuddy
  - [ ] Step 4: Manual Usage for Other Providers
- [ ] Initializing <Toolset Name> section with action descriptions
- [ ] Available Commands section
- [ ] Toolset Structure section
- [ ] Spec Documents section
- [ ] Verification section
- [ ] Usage Examples section
- [ ] Usage section for supported and other providers
- [ ] Notes section
- [ ] Integration with Other Toolsets section
- [ ] Getting Help section
- [ ] License section

**Validation Checks:**
- All action commands are included
- Commands have proper descriptions and argument hints
- Installation commands use `cat` concatenation correctly
- Workspace setup is accurate
- Examples are provided
- Provider-specific sections are complete

### 8. Cross-Validation

Validate consistency across all files:

**Cross-Reference Checks:**
- [ ] README.md Features section matches action files
- [ ] README.md Workflow lists all commands from action filenames
- [ ] README.md Toolset Structure matches actual file structure
- [ ] INSTALL.md commands match action filenames
- [ ] INSTALL.md Available Commands match README.md Workflow
- [ ] All action files referenced in INSTALL.md exist
- [ ] All spec files referenced in README.md or action files exist
- [ ] Toolset ID is consistent across all files
- [ ] Toolset Name is consistent across all files

### 9. Check Against ASDM Principles

Validate compliance with ASDM design principles:

**ASDM Design Principles Checks:**
- [ ] Follows standard directory structure
- [ ] Actions have clear purpose and steps
- [ ] Context injection is properly implemented
- [ ] Language detection is included where needed
- [ ] Error handling is considered
- [ ] Output summaries are complete
- [ ] Supports multiple AI providers
- [ ] Documentation is comprehensive

### 10. Generate Completion Summary

Generate a comprehensive completion report:

```markdown
# Toolset Completion Report

## Toolset Information
- **Toolset ID**: <toolset-id>
- **Toolset Name**: <Toolset Name>
- **Version**: <version>
- **Description**: <toolset-description>

## Validation Summary

### File Existence
- [x] README.md exists
- [x] INSTALL.md exists
- [x] <n> action files exist
- [x] <n> spec files exist

### README.md Validation
- [x] Header metadata complete
- [x] Overview section complete
- [x] Features section complete (<n> features)
- [x] Toolset Installation Process section present
- [x] Toolset Workflow section complete
- [x] Toolset Structure section complete
- [x] Toolset Workspace section complete
- [x] Copyright & License section present

**Status**: ✅ PASSED / ⚠️ WARNINGS / ❌ FAILED

### Action Files Validation
- [x] All <n> action files exist
- [x] Purpose sections complete
- [x] Language Detection sections included (where applicable)
- [x] Context Injection sections present (where applicable)
- [x] Steps sections clear and actionable
- [x] Execution Guidelines complete
- [x] Usage sections complete
- [x] Output Summary sections complete

**Status**: ✅ PASSED / ⚠️ WARNINGS / ❌ FAILED

### Spec Files Validation
- [x] All <n> spec files exist
- [x] Language Guidelines sections complete
- [x] Overview sections complete
- [x] Document Structure sections with templates
- [x] Section Guidelines present for major sections
- [x] Usage Guidelines sections complete
- [x] Output Format sections specified
- [x] Best Practices sections included
- [x] Related Documents referenced
- [x] Checklist sections complete

**Status**: ✅ PASSED / ⚠️ WARNINGS / ❌ FAILED

### INSTALL.md Validation
- [x] All required sections present
- [x] AI Guided Installation prompt included
- [x] Installation steps complete for all providers
- [x] All <n> action commands included
- [x] Workspace setup accurate
- [x] Usage examples provided
- [x] Verification steps present

**Status**: ✅ PASSED / ⚠️ WARNINGS / ❌ FAILED

### Cross-Validation
- [x] Features match action files
- [x] Workflow lists all commands
- [x] Structure matches actual files
- [x] INSTALL.md commands match action filenames
- [x] Toolset ID consistent
- [x] Toolset Name consistent

**Status**: ✅ PASSED / ⚠️ WARNINGS / ❌ FAILED

### ASDM Principles Compliance
- [x] Standard directory structure
- [x] Clear action purposes and steps
- [x] Proper context injection
- [x] Language detection included
- [x] Error handling considered
- [x] Output summaries complete
- [x] Multiple provider support
- [x] Comprehensive documentation

**Status**: ✅ PASSED / ⚠️ WARNINGS / ❌ FAILED

## Overall Status

**✅ TOOLSET COMPLETE** / ⚠️ TOOLSET COMPLETE WITH WARNINGS / ❌ TOOLSET INCOMPLETE

## Toolset Structure

```
.asdm/toolsets/<toolset-id>/
├── README.md                    ✅
├── INSTALL.md                   ✅
├── actions/                     ✅
│   ├── <action-one>.md         ✅
│   ├── <action-two>.md         ✅
│   └── <action-three>.md       ✅
└── spec/                        ✅
    ├── <spec-one>.md           ✅
    ├── <spec-two>.md           ✅
    └── <spec-three>.md         ✅
```

## Next Steps

### Immediate Actions
1. **Review the completion report** - Check any warnings or failures
2. **Address any issues** - Fix any failed validations or warnings
3. **Test the installation** - Follow INSTALL.md to install the toolset

### Testing Recommendations
1. **Test installation** - Install the toolset in a test workspace
2. **Test each action** - Run each action to verify it works
3. **Test providers** - Test with at least one AI provider
4. **Get feedback** - Have other developers review the toolset

### Documentation Recommendations
1. **Complete README** - Ensure all placeholders are filled
2. **Add examples** - Add more usage examples if helpful
3. **Create tutorials** - Consider creating tutorials for common workflows
4. **Document edge cases** - Document any edge cases or special considerations

### Deployment Recommendations
1. **Version control** - Commit the toolset to version control
2. **Share with team** - Share the toolset with your team
3. **Create issues** - Create issues for any known problems or improvements
4. **Plan iterations** - Plan for future iterations and improvements

## Known Issues or Warnings
[List any warnings, issues, or areas for improvement identified during validation]

If no issues: *No known issues or warnings.*

## Recommendations

Based on the validation, here are recommendations:

### Strengths
- <Strength 1>
- <Strength 2>

### Areas for Improvement
- <Improvement 1>
- <Improvement 2>

### Future Considerations
- <Consideration 1>
- <Consideration 2>

## Conclusion

The <Toolset Name> toolset (ID: <toolset-id>) has been successfully created and validated. All required files are present and complete. The toolset is ready for testing and deployment.

**Overall Assessment**: ✅ READY FOR TESTING

---

*Generated by Toolset Builder on <current date>*
```

### 11. Save Completion Report

Save the completion report to:
- Path: `.asdm/toolsets/<toolset-id>/COMPLETION_REPORT.md`
- This report can be referenced later for validation results

## Execution Guidelines

### When to Use This Action

Use this action when:
- You have completed all toolset development steps
- You want to validate the toolset is complete
- You need a comprehensive summary of the toolset
- You're ready to test and deploy the toolset

### Completion Guidelines

When completing a toolset:

1. **Thorough Validation**: Check all files carefully
2. **Cross-Reference**: Ensure consistency across all files
3. **Follow ASDM Principles**: Align with ASDM design principles
4. **Be Honest**: Report all issues and warnings
5. **Provide Recommendations**: Give actionable recommendations

### Validation Criteria

A toolset is considered complete when:
- All required files exist (README.md, INSTALL.md, actions/, spec/)
- All required sections are present in each file
- Content is consistent across all files
- ASDM design principles are followed
- No critical failures exist

Warnings may be issued for:
- Minor inconsistencies
- Missing optional but recommended content
- Areas that could be improved

Failures indicate:
- Missing required files or sections
- Critical inconsistencies
- Violations of ASDM principles
- Content that prevents the toolset from functioning

## Usage

To use this instruction, the AI model should:
1. Detect the response language
2. Identify the toolset (prompt if not provided)
3. Validate the toolset exists and has been developed
4. Load all toolset files (README.md, INSTALL.md, actions/, spec/)
5. Validate README.md against toolset-readme-spec.md
6. Validate each action file against toolset-action-spec.md
7. Validate each spec file against toolset-spec-spec.md
8. Validate INSTALL.md
9. Perform cross-validation across all files
10. Check compliance with ASDM design principles
11. Generate a comprehensive completion report
12. Save the completion report to the toolset directory
13. Present next steps and recommendations

## Output Summary

After completing the toolset validation, the following will be generated:
- Completion report: `.asdm/toolsets/<toolset-id>/COMPLETION_REPORT.md`
- Validation results for each file and section
- Cross-validation results
- ASDM principles compliance check
- Overall completion status
- Next steps and recommendations

The completion report provides a comprehensive assessment of the toolset's readiness for testing and deployment.
