---
name: NTU Loop
status: draft
updated: 2026-10-21
sources:
  - ../README.md
  - DESIGN.md
---

# NTU Loop — Experience Design

## Foundation

Phone-first browser prototype for showcase visitors. Visitors start without a container, simulate scanning a machine QR to borrow one, see elapsed holding time, and return it. Possession has exactly two states: no active loan, or one active loan awaiting return. [DESIGN.md](DESIGN.md) owns visual identity; native HTML controls supply baseline semantics. No third-party UI system is required.

The [proposal](../README.md) owns the operating model. This prototype has no real authentication, camera scanning, machine connection or backend. Station availability and the QR result are demonstrative. It must not be presented as an approved or operating NTU service.

## Information Architecture

| Surface | Entry | Purpose and reference |
| --- | --- | --- |
| Home | Initial load; bottom navigation | Empty state with borrow action, or active loan with holding timer and return action |
| Borrow / Return | Home action; adaptive bottom navigation | When empty, scan a machine QR to borrow. When holding, identify the container and confirm physical deposit. |
| Stations | Bottom navigation | Understand fictional machine availability; select a return destination |
| How it works | Bottom navigation | Explain machine borrowing, stall filling, machine return, central staff washing and reuse |
| Completion | Successful demo return | Confirm the simulated loan is closed and explain what happens to the container next |

All surfaces are represented in the [interactive prototype](../index.html). Completion is a state of the return journey rather than an additional navigation tab.

## Voice and Tone

Use clear, friendly instructions: “Return your container,” “Try a demo scan,” “Enter container code” and “Return complete.” Put “demo” near claims of scanning, station availability and success. Explain that there is no upfront deposit and a charge applies only for non-return; its amount and timing remain undecided.

Use “staff wash containers centrally.” Never imply the machine washes the box. Keep points and their 24-hour qualification window explicitly labeled as demo rules. Do not claim quantified environmental achievements.

## Component Patterns

| Component | Behavioral rules |
| --- | --- |
| Primary action | One leading action per step. Advance only when that step's input is valid. |
| Loan card | Start empty. A simulated machine scan assigns `LOOP-0248` and a start timestamp. Show elapsed holding time; block additional loans until return confirmation. |
| Station card | Expose fictional availability as text. Selecting an available station feeds the return flow; unavailable stations cannot accept a return. |
| Bottom navigation | Four destinations: Home, Borrow/Return, Stations, How it works. Announce the current destination and preserve the active demo loan. |
| QR panel | When empty, simulate scanning the machine QR to issue `LOOP-0248`. When holding, simulate identification of the container for return. Never request camera permission or claim to scan a real code. |
| Code input | Accept the demo container ID after trimming whitespace and normalizing case. Invalid or empty input stays in place with a specific correction. |
| Progress steps | Explain station selection, identification and deposit confirmation. Identification alone never closes the loan. |
| Return receipt | Show container ID and selected station. Freeze the completed holding duration; the completed loan cannot be returned again. A new machine scan is required to borrow again. |
| Process explainer | Explain all circulation stages and separate machine functions from staff cleaning. |
| Demo notice | Make simulation visible without blocking exploration; no dismissal is necessary. |

## State Patterns

| Surface or state | Expected behavior |
| --- | --- |
| Home: cold open | Begin without a container; do not require sign-in. Restore an active loan on same-tab reload. |
| Home: returned | Show no active loan and a way to borrow through a machine QR scan. |
| Return: no station | Guide selection before identification can advance. |
| Return: invalid code | Show an inline error and the demo code; preserve the selected station. |
| Return: identified | Ask for explicit confirmation that the container has been deposited. |
| Return: deposit unconfirmed | Keep completion unavailable or explain the missing confirmation. |
| Return: already returned | Show receipt or borrow action; do not create another completed return. |
| Stations | Label data as demo. Unavailable entries provide a reason and available alternatives. |
| How it works | Static explanatory content; no account or network-dependent loading state. |
| Completion | Announce successful simulated return, show no active loan, explain central cleaning. |
| Focus | Visible focus on every control; reading order matches interaction order. |
| Offline / permission denied | No network or camera call is needed after the page is loaded; camera permission is never requested. |

The active loan and its start timestamp use sessionStorage for same-tab reloads. When storage is unavailable, use memory only. This is a tab-local demonstration, not cross-device account enforcement. The timer updates each second from the timestamp; it is elapsed time, separate from the explicitly labeled 24-hour demo reward window; it is not a fee countdown or mandatory waiting period. Return confirmation clears the active loan and freezes the duration in the receipt. No borrow action may replace an existing active loan.

## Interaction Primitives

Tap or keyboard-activate visible controls; no drag, gesture-only or hover-only actions. Allow correction before completion. Require an explicit deposit confirmation to distinguish identifying a container from physically returning it. Another borrowing cycle requires a new machine QR simulation after the prior return is complete. No reset can bypass an outstanding return.

## Accessibility Floor

Use at least {spacing.target} targets and readable {typography.body} text. Provide semantic buttons, labels for fields and a text alternative for meaningful illustrations. Associate errors with the code input; announce errors and completion through an appropriate live region. Move focus to the new screen heading or step when navigation replaces content. Keyboard focus must remain visible.

Allow zoom and wrapping without clipping controls. Use reduced-motion preferences for optional transitions. Color never communicates loan status or selection alone. Contrast requirements are in DESIGN.md.

## Key Flows

### Complete a return — Maya, a showcase visitor

1. Maya opens Home without a borrowed container, chooses Borrow, selects an available machine and simulates scanning its QR. She sees one active container and a running holding timer.
2. She chooses Return and selects an available fictional machine.
3. She tries the simulated QR scan or enters `LOOP-0248`.
4. The screen identifies the container and asks her to confirm depositing it.
5. She explicitly confirms the demo deposit.
6. **Climax:** the return receipt closes her demo loan and explains that staff collect the box for central washing.
7. She sees the completed holding duration and can start another machine scan to borrow again.

Failure path: an invalid code preserves her station selection and shows how to correct it. A QR simulation never records a return by itself.

### Find a place to return — Amir, between activities

1. Amir opens Stations from the navigation.
2. He reads the demo labels and compares availability.
3. He selects an available station and proceeds into Return.
4. **Climax:** the chosen station is carried into the return flow without repeating the selection.

Failure path: an unavailable station explains why it cannot accept returns and leaves available alternatives accessible.

### Understand the loop — Li, curious about cleaning

1. Li opens How it works.
2. She follows borrowing at a machine, filling at a stall and returning at any machine.
3. She reaches central collection, staff washing and redistribution.
4. **Climax:** she understands where the box is cleaned and why returning it supports repeated use.

## Responsive & Platform

Preserve a single-column phone layout on narrow screens and center it on larger displays. Support portrait and landscape without locking orientation. Bottom navigation respects safe-area insets and never covers the last action.

## Coverage and Open Decisions

Mechanical coverage check: every IA surface has a journey, state treatment and prototype reference; component names match both contracts; token references resolve to DESIGN.md. All requested visitor interactions are covered. This is a draft, not an opt-in reviewer validation report.

Production decisions remain open: machine verification, account access, loss disputes, actual locations, deadline/grace period, non-return amount, privacy and hygiene operations. They do not block a clearly labeled demonstration.


## Demo points and machine availability

The prototype awards **10 points per confirmed return within 24 hours of borrowing**, including the exact deadline. These are illustrative demo settings, not an approved NTU policy. QR identification alone awards nothing. A late return closes the loan without adding or deducting points. Points accumulate across completed loans and survive same-tab reloads together with the loan and inventory.

Home shows the points balance and the number of online machines with at least one clean container. Borrowing reduces clean inventory; returning adds to stock awaiting central washing, not clean stock. Empty online machines accept returns but cannot dispense containers. Offline machines are excluded. All quantities are simulated; no live machine feed, redemption or backend is connected. Each demo machine starts with 30 containers: 20 clean and 10 awaiting washing. Hall cluster remains offline, so its stock cannot be borrowed. Counts change with transactions; they are not automatically reset to 20 on each borrow. Existing sessions receive the new starting inventory while retaining points and subtracting any active loan from its source machine. Session storage is tab-local, with in-memory fallback when unavailable.
