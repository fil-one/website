# Landing Page Framework — Fil One

## Purpose

The landing page sits at the intersection of the conversion path and the learning system. A click tells us someone was curious. The landing page tells us whether they understood, trusted, and cared enough to take another step.

Every landing page should answer four questions for the visitor:

1. Is this the problem I care about?
2. Does this solution clearly address it?
3. Do I trust this enough to keep going?
4. What is the next action I should take?

---

## Core Principle

**Continue the exact thought from the email or ad.**

If the email talks about restoring older datasets, the landing page should immediately talk about restoring older datasets. Do not send people to a generic homepage and expect them to figure it out.

---

## What Needs To Be On The Page

### 1. Problem-Based Hero
The top of the page should clearly restate the problem from the email or ad.

> *"Can you get back to the exact dataset state from six months ago?"*

**Purpose:** Confirms they landed in the right place and keeps the message consistent.

---

### 2. Clear Solution Statement
Immediately explain how Fil One helps with that problem.

**Purpose:** Connects the pain to the product quickly.

---

### 3. Primary CTA
There should be one obvious next step near the top.

Examples:
- Talk through your use case
- Request early access
- Start setup
- View technical details

**Purpose:** Lets high-intent visitors act immediately.

---

### 4. Problem Explanation
Explain the pain in plain language.

**Purpose:** Shows we understand their world and validates the problem.

---

### 5. Current Workarounds / Why They Break
Show what teams do today and why those approaches fall short.

Examples:
- Keeping everything in hot storage gets expensive
- Backups are hard to search or restore selectively
- Manual snapshots are fragile
- Deleting data removes future optionality

**Purpose:** Makes the problem feel real, not theoretical.

---

### 6. How Fil One Helps
Explain the solution in simple blocks.

Examples:
- S3-compatible workflow
- Versioned object storage
- Retention / Object Lock support
- Verifiable long-term retrievability
- Transparent pricing
- Portability / reduced lock-in

**Purpose:** Makes the solution understandable without overwhelming.

---

### 7. Relevant Use Cases
Show specific situations where this matters.

Examples:
- Recreating historical datasets
- Retaining training data
- Reducing cloud storage costs
- Meeting retention requirements
- Avoiding egress / lock-in issues

**Purpose:** Helps visitors self-identify with a use case.

---

### 8. Proof Points / Credibility
Show why they should believe us.

Possible proof points:
- Product screenshots
- Architecture diagram
- S3 compatibility
- Object versioning
- Object Lock / retention
- Filecoin-backed infrastructure
- Security / compliance notes
- Pricing logic
- Case studies / logos, if available

**Purpose:** Builds trust and reduces skepticism.

---

### 9. Secondary Depth Paths
Give people ways to learn more without forcing a call.

Examples:
- View technical details
- See pricing assumptions
- Read related explainer
- See architecture
- Compare to current cloud storage

**Purpose:** Captures interest from people who are not ready to talk yet.

---

### 10. Final CTA
Repeat the next step at the bottom.

**Purpose:** After they understand the problem, solution, and proof, make the next action obvious.

---

## Recommended Page Structure

```
Hero
  Problem headline + short solution statement + primary CTA

Problem
  Why this issue matters

Current Approach
  What teams do today and why it breaks

Solution
  How Fil One solves it

Use Cases
  Where this matters

Proof
  Why they should trust us

Next Step
  Talk / request access / view technical details / pricing
```

---

## CTA Strategy

Do not rely on only one CTA like "Book a demo." Different visitors have different intent levels.

**Primary CTA:**
- Talk through your use case
- Request early access

**Secondary CTAs:**
- View technical details
- See pricing assumptions
- Read the use case
- See architecture

### Why this matters
The CTA they choose tells us what kind of interest they have:

| CTA clicked | Signal |
|---|---|
| Technical details | Technical curiosity |
| Pricing | Commercial curiosity |
| Request access | Stronger product intent |
| Book a call | Strongest sales intent |

---

## Should Signup Be At The Top?

Yes, but only if the product is ready for self-serve signup. If not, use "Request early access" or "Talk through your use case" instead.

**Good top-of-page layout:**
- Left: Problem headline, short explanation, CTA
- Right: Product screenshot, workflow diagram, credibility proof, or compact signup / request-access form

Do not put a long form at the top unless the offer is very clear and low-friction.

---

## Outbound Landing Page vs Paid Ad Landing Page

### Cold Outbound Landing Page
Visitor clicked from a specific email. They already saw a specific problem statement.

Best approach:
- Continue the exact problem from the email
- Keep it focused on one hypothesis
- Prioritize credibility and relevance
- Offer low-friction next steps
- Track what they click next

**Goal:** Turn curiosity into clearer signal — a reply, call, or access request.

### Paid Ad Landing Page
Visitor may know less about us and may have lower context.

Best approach:
- Make the promise very clear immediately
- Match the ad copy exactly
- Be more direct and conversion-focused
- Reduce distractions
- Use stronger above-the-fold CTA
- Test variants aggressively

**Goal:** Convert attention into signups, leads, or qualified actions as efficiently as possible.

### Key Difference

> Outbound pages are better for **learning**: "Did this specific problem hypothesis resonate with this specific audience?"
>
> Paid pages are better for **scalable conversion testing**: "Can we turn paid attention into signups or leads at an acceptable cost?"

---

## What We Need To Track

Track every meaningful action:

| Event | Why |
|---|---|
| Page visit by hypothesis | Volume and source quality |
| Scroll depth | Engagement level |
| CTA clicks | Intent signal |
| Technical details clicks | Technical curiosity |
| Pricing clicks | Commercial curiosity |
| Use case clicks | Problem fit |
| Blog / resource clicks | Research mode |
| Request access submissions | Product intent |
| Booked calls | Sales intent |
| Replies after page visit | Outbound signal |

---

## What Good Looks Like

A good landing page should make the visitor think:

- "Yes, this is the problem from the email."
- "They understand the issue."
- "The solution makes sense."
- "This seems credible."
- "I know what to do next."

For us, a good landing page should answer: **"Was this just a curious click, or is there real buyer interest here?"**

---

## Reusable Template Requirement

Create a reusable landing page template where we can swap in:

- Hypothesis / problem headline
- Problem explanation
- Use cases
- Proof points
- CTA
- Related technical / pricing / resource links
- Ability to track meaningful actions

This lets us create one page per outbound hypothesis without redesigning from scratch every time.

---

---

# Barcelona Landing Page Analysis — v1 (original)

> ⚠️ This is the original analysis. See **v2** below for the current state after revisions.

**Page URL:** `/filone-barcelona` (now `/lp/barcelona`)
**Type:** Paid ad / city-targeted landing page
**Audience:** Creative, AI, and SaaS teams across Southern Europe

---

## Criterion-by-Criterion Assessment

### 1. Problem-Based Hero
**Status: ⚠️ Partial**

The hero headline is "Hyperscaler speed. Budget-tier bills." — this is a value proposition, not a problem statement. It leads with the outcome rather than the pain.

A visitor coming from a cold ad or outbound email may not immediately recognise their problem in this framing. "Budget-tier bills" implies cost is the issue, but the specific pain (e.g. "you're paying €650/month for 10 TB of object storage in Madrid") is not stated.

The badge "For creative, AI, and SaaS teams across Southern Europe" is a good audience qualifier but not a problem statement.

**What's missing:** A specific, felt pain before the promise. E.g. *"Your AWS bill in Madrid is 14× higher than it needs to be."*

---

### 2. Clear Solution Statement
**Status: ✅ Present**

The hero subheadline does this reasonably well: *"Give your customers the sharp, fast experience they expect from AWS, served on European fiber, at a fraction of the invoice. S3-compatible and in your stack in minutes."*

It connects speed + cost + compatibility in one sentence. Works for a warm or paid traffic context.

**Improvement:** Could be tighter and more specific to the Barcelona/Southern Europe context — e.g. latency numbers, a concrete price point, or a competitor benchmark.

---

### 3. Primary CTA
**Status: ✅ Present**

"Try 30 days for free" and "Talk to an expert" appear in the hero and are repeated at the bottom. The primary CTA is clear.

**Concern:** If the product is not fully self-serve, "Try 30 days for free" may create friction or disappointment when the visitor hits a signup wall. "Talk to an expert" is good as a secondary. Consider whether "Request early access" or "Start setup" would be more accurate for current product maturity.

---

### 4. Problem Explanation
**Status: ❌ Missing**

There is no dedicated section that explains *why* high egress fees or hyperscaler pricing in Southern Europe is a real, painful problem. The page goes straight from hero → positioning chart → pricing comparison.

Visitors who are curious but not already convinced need to understand *why this matters* before they trust the comparison data.

**What's missing:** A short paragraph or section that names the pain — e.g. "Most S3-compatible storage options either charge aggressively for egress or force you to use a European data centre that adds 40ms of latency. For teams in Barcelona or Madrid, neither option is good enough."

---

### 5. Current Workarounds / Why They Break
**Status: ❌ Missing**

The pricing table shows that AWS costs €693/month for a 10 TB team. But it does not explain *why teams end up with AWS anyway*, or why switching feels risky, or what the switching cost is.

There is no section that names the workarounds teams use today (staying on AWS because they trust the SLA, using Wasabi but losing performance, tolerating high bills because migration feels too expensive) and explains why those fall short.

**What's missing:** Even a short "Why teams are stuck" block would dramatically increase relevance for a cold visitor who is currently paying for AWS and hasn't yet looked for alternatives.

---

### 6. How Fil One Helps
**Status: ✅ Present**

The Features section covers S3 compatibility, zero egress, European latency, eleven nines durability, Object Lock, and predictable performance. Clear and well-structured with the UseCasesSection card style.

**Improvement:** The section heading "The S3 you expected." is good. The cards are clear. Consider adding a one-liner under the section heading that explicitly bridges from the pricing pain to the solution: *"All the features of enterprise object storage, at a fraction of the invoice."*

---

### 7. Relevant Use Cases
**Status: ✅ Strong**

The Workloads section is the strongest part of the page. Four specific use cases (Creative & media, AI & ML, SaaS, Backup & archive) with quantified comparisons (load times, monthly bills, savings multipliers). The progress-bar layout makes the cost difference immediately legible.

**Improvement:** Consider adding a short qualifier at the top of each card that names the role or team type, not just the use case category — e.g. "For editors, colorists, and VFX studios" — to help visitors self-identify faster.

---

### 8. Proof Points / Credibility
**Status: ⚠️ Partial**

What's present:
- Scatter chart positioning (visual proof of cost/performance position)
- Pricing comparison table (competitive transparency)
- Features list (capability proof)
- Integration pills (ecosystem compatibility)

What's missing:
- Product screenshots (none — the features section has no visuals)
- Architecture diagram
- Security or compliance notes
- Filecoin-backed infrastructure explanation
- Customer logos or case studies
- SLA or uptime numbers beyond "eleven nines"

The page is heavy on comparative data but light on trust-building content for a visitor who has never heard of Fil One before. The scatter chart is compelling for someone analytically minded, but a first-time visitor may need to see the product or hear from a customer first.

---

### 9. Secondary Depth Paths
**Status: ⚠️ Minimal**

Currently present:
- "View documentation →" in the Integrations section (good)
- "Talk to an expert" as a secondary CTA

Missing:
- Link to pricing assumptions or methodology
- Link to architecture or technical documentation
- Link to a relevant blog post or use case write-up
- "Compare to AWS" or "See how we're different" path
- Any tracking differentiation between CTA types

A visitor who is technically curious but not ready to sign up has very few places to go. The documentation link is the only depth path, and it leads off-site.

---

### 10. Final CTA
**Status: ✅ Present**

The bottom CTA banner ("Ship your next project on FilOne") with "Try 30 days for free" and "Talk to an expert" is well-executed — dark background, clear hierarchy, good visual weight.

**Improvement:** Add a third low-friction option here, e.g. "View technical details →" or "See pricing assumptions →" for visitors who have read the whole page but still aren't ready to sign up or call.

---

## Overall Gaps Summary

| # | Criterion | Status | Priority |
|---|---|---|---|
| 1 | Problem-based hero | ⚠️ Partial | High |
| 2 | Clear solution statement | ✅ Present | — |
| 3 | Primary CTA | ✅ Present | Low |
| 4 | Problem explanation | ❌ Missing | High |
| 5 | Current workarounds / why they break | ❌ Missing | High |
| 6 | How Fil One helps | ✅ Present | — |
| 7 | Relevant use cases | ✅ Strong | — |
| 8 | Proof points / credibility | ⚠️ Partial | Medium |
| 9 | Secondary depth paths | ⚠️ Minimal | Medium |
| 10 | Final CTA | ✅ Present | Low |

---

## Priority Recommendations

### High priority

**1. Rewrite the hero headline as a problem statement**
Move from value proposition to felt pain.
Current: *"Hyperscaler speed. Budget-tier bills."*
Direction: *"You're paying AWS prices for a Madrid data centre. There's a better option."*

**2. Add a Problem section after the hero**
A short (3–5 line) block that names the pain before the scatter chart. Example:
> "Most teams in Southern Europe are paying hyperscaler prices for object storage — not because AWS or Google Cloud is the right choice, but because there was no credible European alternative. Until now."

**3. Add a "Why teams stay stuck" block**
Name the workarounds and why they fail. Even 3 bullet points would improve page relevance for a cold visitor significantly.

### Medium priority

**4. Add at least one product screenshot**
The Features section has no visual evidence the product exists. One screenshot of the dashboard or bucket view would significantly increase credibility.

**5. Add secondary depth paths**
At minimum: a "See pricing assumptions" link near the pricing table, and a "View architecture" or "Read technical details" link near the Features section. These clicks will tell you whether visitors have commercial or technical curiosity.

**6. Add a brief trust statement**
A single sentence near the top about Filecoin infrastructure backing, e.g. *"Built on Filecoin — independently verifiable storage with a cryptographic audit trail."* This is a strong differentiator that currently appears nowhere on the page.

### Low priority

**7. Differentiate the two CTAs at the bottom**
Instead of two similar CTAs ("Try free" + "Talk to expert"), consider a three-option structure:
- Primary: Try 30 days for free
- Secondary: Talk to an expert
- Tertiary: View technical details →

This gives you signal on three different intent levels from the same CTA block.

---

## Suitability Assessment

| Context | Fit | Notes |
|---|---|---|
| Paid search (generic S3 keywords) | ✅ Good | Value prop is clear, CTA is actionable |
| Paid search (Barcelona/Madrid localised) | ✅ Good | Localisation and pricing table are strong |
| Cold outbound (cost-focused hypothesis) | ⚠️ Partial | Missing problem explanation and workarounds section |
| Cold outbound (performance-focused hypothesis) | ⚠️ Partial | Chart is compelling but problem isn't named first |
| Retargeting (visited fil.one before) | ✅ Good | Comparative data rewards prior context |

The page is well-suited for **paid traffic** where visitors arrive with some context. For **cold outbound**, it needs a problem-first reframe and the "why teams are stuck" block before it will consistently convert curiosity into signal.

---

---

# Barcelona Landing Page Analysis — v2 (current: `/lp/barcelona`)

**Last reviewed:** April 2026
**Changes since v1:** Problem section added, workarounds section added, hero headline kept as value prop (appropriate for paid ad context), LandingNavbar/LandingFooter implemented, path updated to `/lp/barcelona`.

---

## Criterion-by-Criterion Assessment

### 1. Problem-Based Hero
**Status: ⚠️ Acceptable for context**

The headline "Hyperscaler speed. Budget-tier bills." remains a value proposition, not a problem statement. Per the framework, for a **paid ad page** this is intentional — the promise should be very clear immediately. For a **cold outbound** variant, this headline should be swapped to something problem-first per the framework.

The audience badge ("For creative, AI, and SaaS teams across Southern Europe") qualifies who this is for. The subheadline now explicitly names the European context and the invoice problem. The problem explanation section directly below does the heavy lifting the hero doesn't.

**Verdict:** Appropriate for paid ad. Would need a problem-first swap for any cold outbound use.

---

### 2. Clear Solution Statement
**Status: ✅ Present**

The subheadline now reads: *"FilOne is S3-compatible object storage built for European teams — hyperscaler-grade performance, on European fiber, without the hyperscaler invoice."* Clean, specific, bridges the pain to the product.

---

### 3. Primary CTA
**Status: ✅ Present**

"Try 30 days for free" + "Talk to an expert" appear in the hero and are repeated in the bottom CTA banner. The two options cover different intent levels (product intent vs. sales intent). The bottom CTA now uses the dark navy treatment from the homepage's final CTA, giving it strong visual weight.

**Remaining concern:** Only two CTA options exist. The framework recommends a third low-friction option (e.g. "View technical details →") to capture visitors who have read the whole page but aren't ready to sign up or call. This is still missing.

---

### 4. Problem Explanation
**Status: ✅ Present — addressed in v2**

A dedicated merged section ("The problem") now sits between the hero and the positioning chart. It names the pain clearly: *"Most S3-compatible storage options are priced for global enterprises — not for a studio in Barcelona, an AI team in Madrid, or a SaaS company in Milan. Every alternative has a real catch."*

This is followed immediately by the three workaround cards, making the section self-contained and scannable.

---

### 5. Current Workarounds / Why They Break
**Status: ✅ Present — addressed in v2**

Three cards cover the main workarounds:
- **Hyperscalers** — reliable but egress fees compound silently
- **Budget alternatives** — cheaper but no EU-native infrastructure, performance and compliance suffer
- **Doing nothing** — inertia is the most expensive option

Each card leads with the key insight (catch line) as the headline, with supporting body text and a grey footer summary. The visual structure makes each card's takeaway scannable without reading the full body.

---

### 6. How Fil One Helps
**Status: ✅ Present**

The Features section uses the same card style as the homepage (UseCasesSection), with 6 clear capability cards. The heading "The S3 you expected." with the blue partial highlight is strong.

**Remaining gap:** The features section still has no visual evidence of the product. No screenshots. A visitor who has never seen FilOne has no image of what they're signing up for. This is the most actionable remaining credibility gap.

---

### 7. Relevant Use Cases
**Status: ✅ Strong**

The Workloads section remains the strongest part of the page. Four specific use cases with progress-bar comparisons, quantified savings, and clear savings badges. The pill tags (Creative and media, AI and ML, SaaS, Backup) help visitors self-identify.

---

### 8. Proof Points / Credibility
**Status: ⚠️ Partial — unchanged**

Present:
- Scatter chart (cost/performance positioning)
- Pricing comparison table (competitive transparency with colour-coded egress fees)
- Features list
- Integration pills + docs link

Still missing:
- Product screenshots
- Filecoin-backed infrastructure explanation (the durability differentiator is mentioned but not explained)
- Architecture diagram
- Security or compliance notes
- Customer logos or case studies

The pricing table now colour-codes egress fees (red for expensive, green for zero), which significantly improves how the cost comparison reads. The scatter chart has been updated to match the reference implementation closely.

**Highest-impact remaining gap:** A single product screenshot — even just the dashboard or bucket view — would substantially reduce first-time visitor skepticism.

---

### 9. Secondary Depth Paths
**Status: ⚠️ Minimal — slightly improved**

Present:
- "View documentation →" in the Integrations section
- LandingFooter includes Documentation, Contact sales, Support links

Still missing:
- "See pricing assumptions" link near the pricing table
- "View architecture" or "Read technical details" link near Features
- Any link to a relevant blog post or use case explainer
- Differentiated CTA tracking (all CTAs lead to the same place)

The footer improvement (Documentation, Contact sales, Support vs. full site nav) is the right call for a landing page. But depth paths from within the page body are still sparse.

---

### 10. Final CTA
**Status: ✅ Strong — improved in v2**

The bottom CTA banner now uses the dark navy gradient from the homepage's CtaSection — same `btn-primary-dark` and `btn-secondary-dark` button styles, white heading, 60% opacity subtext. The visual treatment gives it strong presence.

**Remaining gap:** Still only two CTAs. A third low-friction option ("View technical details →") would improve signal capture for visitors in research mode.

---

## Updated Gaps Summary

| # | Criterion | v1 Status | v2 Status | Remaining priority |
|---|---|---|---|---|
| 1 | Problem-based hero | ⚠️ Partial | ⚠️ Acceptable (paid ad) | Low — swap for outbound variant |
| 2 | Clear solution statement | ✅ | ✅ | — |
| 3 | Primary CTA | ✅ | ✅ | Low — add third option |
| 4 | Problem explanation | ❌ Missing | ✅ Present | — |
| 5 | Current workarounds | ❌ Missing | ✅ Present | — |
| 6 | How Fil One helps | ✅ | ✅ | — |
| 7 | Relevant use cases | ✅ Strong | ✅ Strong | — |
| 8 | Proof points / credibility | ⚠️ Partial | ⚠️ Partial | Medium |
| 9 | Secondary depth paths | ⚠️ Minimal | ⚠️ Minimal | Medium |
| 10 | Final CTA | ✅ | ✅ Strong | Low |

---

## Remaining Recommendations

### Medium priority

**1. Add one product screenshot**
A single image of the FilOne dashboard would address the single biggest credibility gap. Visitors who have never heard of FilOne need visual evidence the product exists before they sign up.

**2. Add a Filecoin trust statement**
The eleven-nines durability claim is mentioned in Features but the Filecoin infrastructure backing is never explained. One sentence — *"Built on Filecoin — independently verifiable storage with a cryptographic audit trail."* — would be a meaningful differentiator that no hyperscaler can match.

**3. Add secondary depth paths from within the page**
At minimum: a "See pricing assumptions →" link near the pricing table, and a "View architecture →" link near Features. These clicks tell you whether visitors have commercial or technical curiosity.

### Low priority

**4. Add a third CTA at the bottom**
Add "View technical details →" alongside "Try 30 days for free" and "Talk to an expert" in the final CTA banner. Gives research-mode visitors a path without forcing a commitment.

**5. Create a problem-first variant for outbound use**
The current page works for paid traffic. For cold outbound email campaigns, swap the hero headline to a problem-first statement that continues the exact thought from the email. The infrastructure (problem section, workarounds, features, workloads) is now in place — only the hero needs to change per hypothesis.

---

## Suitability Assessment (updated)

| Context | Fit | Notes |
|---|---|---|
| Paid search (generic S3 keywords) | ✅ Good | Value prop clear, CTA actionable |
| Paid search (Barcelona/Madrid localised) | ✅ Good | Localisation, pricing table, workarounds all strong |
| Cold outbound (cost-focused hypothesis) | ✅ Good | Problem + workarounds now present; hero headline still needs a swap |
| Cold outbound (performance-focused hypothesis) | ⚠️ Partial | Chart is compelling; hero needs a performance-first variant |
| Retargeting (visited fil.one before) | ✅ Good | Comparative data rewards prior context |
