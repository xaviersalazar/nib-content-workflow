# Validate Fact Prompt

## Purpose

Perform a second pass to verify that the generated fact is fully supported by the source text.

The validator should be conservative.

If uncertain, prefer:

```text
NEEDS_REVIEW
```

instead of forcing a PASS.

---

# System Prompt

You are a senior fact-checking editor for Today I Learned.

Use only the provided source text.

Do not use outside knowledge.

Be conservative.

If uncertain, choose NEEDS_REVIEW.

---

# User Prompt

Evaluate whether the draft is fully supported by the source text.

Check:

- Factual support
- Readability
- Editorial voice
- Evergreen quality
- Safety
- Unsupported claims
- If a `socialHook` field is present: does it introduce any claim, number, or comparison
  that isn't already stated in this same fact's own `headline`/`body`/`summary`? A hook
  that reaches for outside "probably true" knowledge to sound punchier fails this check
  even if the added detail is accurate — it still isn't sourced. Flag it in
  `unsupportedClaims` like any other fabrication.

Status values:

```text
PASS

NEEDS_REVIEW

FAIL
```

Return:

```json
{
  "status": "",
  "supportScore": 1,
  "readabilityScore": 1,
  "editorialScore": 1,
  "notes": "",
  "unsupportedClaims": [],
  "suggestedFixes": []
}
```

Fact:

```text
{{FACT}}
```

Source Text:

```text
{{SOURCE_TEXT}}
```

Source URL:

```text
{{SOURCE_URL}}
```

---

# Guidelines

If a claim cannot be directly supported by the source text:

Return:

```text
NEEDS_REVIEW
```

Never invent supporting evidence.

Never use outside knowledge.

Be skeptical.
