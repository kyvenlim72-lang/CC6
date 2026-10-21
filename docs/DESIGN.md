---
name: NTU Loop
description: A phone-first interactive demonstration of borrowing and returning reusable food containers.
status: draft
updated: 2026-10-21
sources:
  - ../README.md
colors:
  forest: '#143F32'
  lime: '#D6ED83'
  cream: '#F6F5EF'
  muted: '#65736B'
  white: '#FFFFFF'
  error: '#A52D2D'
typography:
  heading:
    fontFamily: 'system-ui, sans-serif'
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.15'
  body:
    fontFamily: 'system-ui, sans-serif'
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label:
    fontFamily: 'system-ui, sans-serif'
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
rounded:
  md: 16px
  lg: 24px
  full: 9999px
spacing:
  small: 8px
  medium: 16px
  large: 24px
  target: 48px
components:
  primary-action:
    background: '{colors.forest}'
    foreground: '{colors.white}'
    minHeight: '{spacing.target}'
    radius: '{rounded.md}'
  loan-card:
    background: '{colors.forest}'
    foreground: '{colors.white}'
    radius: '{rounded.lg}'
  station-card:
    background: '{colors.white}'
    foreground: '{colors.forest}'
    radius: '{rounded.lg}'
---

# NTU Loop — Visual Design

## Brand & Style

The user chose phones and delegated a style representing recyclables. Forest green, fresh lime and warm cream evoke reusable materials and circular movement. The product story is reuse: a durable food container goes around the loop rather than into a recycling bin.

Use a simple container illustration and loop motif to explain the service. Keep the current loan and next action more prominent than decoration. This direction is a draft for review.

## Colors

{colors.cream} is the page canvas; {colors.white} separates content cards. {colors.forest} carries headings, primary actions and the loan card. {colors.lime} highlights the loop and positive completion, with forest text. {colors.muted} supports secondary copy on cream or white. {colors.error} accompanies explanatory error text.

Target at least 4.5:1 for normal text and 3:1 for large text and meaningful UI boundaries. Never use lime as small text on cream, or rely on color alone for state.

## Typography

Use {typography.heading} for a brief screen title, {typography.body} for instructions, and {typography.label} for controls and status. System fonts keep the prototype self-contained. Let text wrap and grow with browser zoom; container IDs must remain readable.

## Layout & Spacing

Use a single phone-sized column with {spacing.medium} page gutters and {spacing.large} separation between sections. Keep a persistent bottom navigation and allow enough bottom padding that it cannot obscure content. Center the same readable column on larger screens.

## Elevation & Depth

Prefer tonal separation and restrained shadows. Avoid stacked floating panels. A selected station needs an explicit border or selection marker, not a subtle shadow change.

## Shapes

Cards use {rounded.lg}; buttons and inputs use {rounded.md}. Status pills may use {rounded.full}. All controls have at least {spacing.target} touch height.

## Components

| Component | Visual specification |
| --- | --- |
| Primary action | Forest fill with white label, generous full-width target; lime may be used on a forest parent with forest text. |
| Loan card | Forest card; container ID, textual loan status, container illustration and next action form one clear group. |
| Station card | White card; name, fictional/demo label and availability text; selected state has a visible marker. |
| Bottom navigation | Four labeled destinations; active destination uses forest emphasis and a visible indicator. |
| QR panel | Clear scan-frame illustration plus an explicit simulation label; manual entry remains visually discoverable. |
| Code input | Persistent label, readable typed value and adjacent error text; forest focus outline. |
| Progress steps | Numbered steps with text labels; distinguish current and completed steps beyond color. |
| Return receipt | Clear success heading, container and station details, and next-step cleaning explanation. |
| Process explainer | Numbered stages with simple illustrations or icons and short explanations. |
| Demo notice | Compact but readable text near the app identity or relevant simulated controls. |

The [interactive prototype](../index.html) provides visual references for Home, Return, Stations, How it works and completion. These two design contracts take precedence over conflicting mock details.

## Do's and Don'ts

- Show the no-container borrow action initially; while holding, show the container, elapsed time and return action.
- Use recycling-inspired color while describing reuse accurately.
- Keep status, errors and completion understandable without icons.
- Do not imply certified hygiene, measured carbon savings, real station availability or live account access.
- Do not invent return deadlines, reward amounts or non-return fees.
