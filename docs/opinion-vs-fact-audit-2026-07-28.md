# Opinion-vs-Fact Audit — 2026-07-28

**Trigger:** The Today fact `entrepreneurship-schumpeter-growth` ("Capitalism Grows by
Destroying Itself") has a strong hook but its body is an economist's *theory*, not a
verifiable fact. Nib's promise is verified facts, not opinions/statements from subject-matter
experts. This audit finds every fact with the same failure mode.

## Method
- Scanned all 1692 exported facts for attribution/opinion language (argued, claimed, believed,
  suggested, proposed, theorized, "in his view," "according to," philosopher/economist, etc.) →
  210 keyword candidates, each read and judged.
- Full manual sweep of the `economics`, `business`, `psychology`, `human-behavior` categories to
  catch theory-stated-as-fact that uses **no** attribution word (this is how the Adam Smith and
  paradox-of-thrift items were caught — the keyword scan alone would miss them).

## The test
Strip the attribution. Is what remains **empirically verifiable**, or is it inherently a matter of
**opinion/interpretation/theory** that a reasonable person could dispute?
- FAIL: "Schumpeter argued capitalism advances by destroying itself" (a worldview).
- PASS: "Ancient Egyptians believed the heart did the thinking" (a documented belief — the fact is
  the belief itself, and it's labeled as one).

---

## Tier 1 — Remove or heavily rewrite (direct match to the Schumpeter problem)
An expert's theory/argument presented in the headline as settled fact; body is "Person X argued Y."

| ID | Headline | Note |
|---|---|---|
| `entrepreneurship-schumpeter-growth` | Capitalism Grows by Destroying Itself | The trigger. Schumpeter's "creative destruction" theory — "argued," "in his view." |
| `capitalism-private-ownership` | Your Dinner Depends on the Baker's Self-Interest, Not Kindness | Adam Smith's "invisible hand" argument — "he argued" — presented as how the economy factually works. |

## Tier 2 — Review (expert opinion / contested theory dressed as fact)
Each leans on an argument or a single interpretive study rather than a verifiable fact. Options:
rewrite to anchor on a verifiable event (who/when/what happened), reframe as a labeled theory, or remove.

| ID | Headline | Issue |
|---|---|---|
| `taxes-burden-can-shift` | A Napkin Sketch Reshaped Tax Policy | Laffer curve — explicitly "a powerful argument for tax cuts." Contested political-economic claim. |
| `recession-ripples-through-economy` | Everyone Saving Money Can Make a Recession Worse | "Paradox of thrift" — a macroeconomic theory stated flatly as fact. (No attribution keyword.) |
| `trade-comparative-advantage` | Even If You're Better at Everything, You Should Still Specialize | Ricardo's comparative-advantage model; prescriptive "should," stated as fact. |
| `gdp-final-goods-only` | GDP's Inventor Warned Us Not to Use It This Way | Substance is Kuznets's value-judgment/opinion about welfare. (Documented statement — most defensible of the tier.) |
| `scarcity-forces-choices` | Being Short on Money Can Tax Your Brain | "in this view" — one research program generalized; headline asserts as fact. |
| `emotions-change-thinking` | Without Emotion, You Can't Make Even Simple Decisions | Damasio's interpretation of a few brain-damage cases, universalized. |
| `turing-test-chinese-room` | A Man in a Room Can Fake Chinese He Doesn't Speak | Searle's philosophical argument. Weakest of the tier — described neutrally as a thought experiment. |

## Tier 3 — Legitimate, DO NOT strip in a cleanup
These reference people/opinions but the fact itself is verifiable, so a naive keyword purge would wrongly kill them.
- **Documented historical beliefs, labeled as beliefs:** `heart-symbol-ancient-beliefs` (Aristotle,
  explicitly "he had it backwards"), Egyptian embalming/afterlife beliefs, medieval beliefs, etc.
- **Genuine scientific debates, honestly framed:** `aerodynamics-pressure-lift`, `depth-perception`
  (moon illusion), `posture-dynamic-static` (power-posing *replication failure*), `triceratops-skull-story`.
- **Origin theories explicitly hedged ("may," "one theory"):** `handshakes-empty-hands`,
  `dollar-sign-money-design`, `check-mark-origin-uncertain`, `question-mark-uncertainty`.

---

## Guidance for the writing pipeline (prevent recurrence)
Add to the pass/fail gate: **a fact must state a verifiable fact, not an expert's opinion, argument,
model, or theory.** A named theory is only acceptable when the fact is about a *verifiable event*
(who proposed it, when, what happened as a result) or a *confirmed* result — not when the theory
itself is the payload. Economics/philosophy topics are the highest-risk categories.
