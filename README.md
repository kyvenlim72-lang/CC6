# CC6 — NTU Loop

## Interactive phone prototype

Open `index.html` in a browser, or run `python -m http.server 8766 --bind 127.0.0.1` in this repository and visit `http://127.0.0.1:8766` on the same computer. No dependencies or build step are needed.

Start without a container → choose a demo machine → simulate scanning its QR to borrow → view elapsed holding time → simulate a container QR scan and physical return → see the completed duration. Only one container can be held at a time. A same-tab reload preserves the active demo loan using session storage; there is no real account, camera or machine connection. The holding timer does not impose a minimum hold period; a separate 24-hour demo reward window determines points only.

This demo's machine-QR borrowing interaction follows the project owner's 21 October 2026 request; the original proposal below retains its NTU-card borrowing description. Locations and availability are illustrative. See [visual design](docs/DESIGN.md) and [experience design](docs/EXPERIENCE.md).

Run the state-transition checks with `node tests/loan-flow.cjs`.

## Project proposal: Week 8 Proposal (Don)

### Closing the Loop: A Centralised Reusable Food-Container System for NTU

This repository is for the proposed NTU Loop app and shared reusable takeaway-container system. The proposal below is adapted from **“Week 8 Proposal (Don)”** in the [CC0006 Google Doc](https://docs.google.com/document/d/1-zhvVRUCzXWMig_dfyEDUFvl_IuouyV_kmERu1Vigv8/edit). Conflicting operating details have been reconciled using the project owner's supplied **“Urgent accuracy fixes before the showcase”** image on 20 October 2026.

This describes a proposed system, not an implemented app, an approved NTU service, or demonstrated pilot results. The source's research references are retained below; they have not been independently revalidated for this README.

### Confirmed operating model

> “Tap your NTU card at a machine for a clean box, any stall fills it, drop it in any machine, staff wash it centrally. No deposit; you only pay if you never return it.”

Within the proposed NTU Loop network:

| Topic | Model used in this proposal |
| --- | --- |
| Collecting a container | Tap an NTU card at a machine to borrow a clean container. |
| Getting food | Take the container to a participating food stall to be filled. |
| Returning a container | Return it to any NTU Loop machine. |
| Washing | Staff wash and sanitise containers centrally, then replenish machines with clean stock. |
| Deposit and charges | No upfront deposit; a charge applies only for a container that is not returned. |
| Disposable packaging | Approximately S$0.30 surcharge for a disposable container. |

These details supersede the source draft's stall-based issuing, in-machine washing, S$5 deposit, S$0.10 daily deductions, and waived reusable-container service fee. The alternative suggestion to raise disposable-container charges to S$1 is not part of this model.

## 1. The Problem

Single-use takeaway food packaging creates waste after only a short period of use. The source proposal cites National Environment Agency material describing packaging as approximately one-third of Singapore's domestic waste. Preventing unnecessary packaging reduces demand for new materials before waste is generated.

This problem is relevant to NTU, where students and staff buy meals daily from canteens, food courts and hall dining facilities. Disposable takeaway containers are convenient for vendors and customers, but each transaction can add another container to the waste stream.

NTU's existing Bring Your Own Container (BYOC) efforts provide a starting point. The source proposal describes EarthLink NTU's 14 January–14 February 2026 campaign, which offered discounts of 10–30 cents at participating stalls, and its EcoCampus ambition for reusable-container systems in at least two canteens.

However, BYOC relies on students remembering to bring a container, carrying it throughout the day and washing it afterwards. The campaign's reward process also involved submitting photographic evidence. These additional steps make reuse less convenient than accepting disposable packaging.

The problem is therefore more than environmental awareness: students need an accessible, consistent system that fits their daily routines.

**Project question:** How can NTU preserve the convenience of takeaway meals while reducing dependence on single-use food containers?

The proposal focuses on takeaway meals at campus food outlets. A successful system must be convenient, hygienic, affordable to operate and practical for food vendors. It should complement personal BYOC habits.

## 2. The Proposed Solution

**NTU Loop** is a shared reusable-container network connecting campus food outlets, dispensing and return machines, a digital loan record and a central washing operation.

### Borrow, eat, return and reuse

1. **Borrow:** A student or staff member taps their NTU card at a machine to collect a clean, standardised reusable container. Its unique QR code identifies the container and links it to the loan.
2. **Fill:** The user takes the container to a participating stall, which serves the takeaway meal in it.
3. **Eat:** The user enjoys the meal without needing to bring a personal container from home.
4. **Return:** The user deposits the container at any NTU Loop machine. The system identifies it and records the return.
5. **Clean:** Staff collect returned containers in batches and wash, sanitise, dry and inspect them at a central facility.
6. **Recirculate:** Clean containers are transported back to the machines for another borrowing cycle.

Machines dispense and accept containers; washing takes place centrally. Users do not need to wash the containers themselves.

### Account records, returns and incentives

Borrowing is associated with an NTU account, with **no upfront deposit**. A non-return charge protects the shared stock when a container is not returned. The app should support loan records, return confirmation and reminders.

The image does not establish the return deadline, grace period, non-return charge amount or the point at which a loan is classified as non-returned. These remain implementation decisions; the draft's three-day deposit rule and daily deductions are not carried forward.

The original proposal also suggests sustainability points for verified returns, potentially supporting dining vouchers or campus recognition. These remain optional pilot features, with reward values and funding to be determined. The approximately **S$0.30 surcharge applies to disposable packaging**, not to borrowing a reusable container.

### Hygiene, container design and logistics

Containers must be manufactured for repeated food use. Central cleaning should include food-residue removal, washing, rinsing, sanitisation and drying, followed by inspection. Cracked, heavily scratched or otherwise unsuitable containers should be removed from circulation.

The source proposes halal and non-halal segregation. Required identification, collection, cleaning, storage and redistribution procedures should be agreed with the relevant campus and food-service stakeholders before operation. Segregation is a proposed operational requirement, not a claim of certification.

Tracking container identities can support reuse-cycle counts, loss monitoring and retirement decisions. Logistics should replenish machines according to demand and keep returned stock separate from clean stock.

The source cites Muuse's Our Tampines Hub pilot and the Eco Dabao programme as examples of borrow–return–clean–reuse services in Singapore. These provide precedents for the general approach; they do not establish that NTU Loop's proposed hardware or account integration already exists.

## 3. Systems Analysis

### Environmental impact

The main intended benefit is waste prevention: repeated use of a shared container can replace repeated purchases and disposal of single-use packaging.

Reusable containers also require more material initially and consume water, detergent and energy during cleaning. Collection and redistribution add transport impacts. Environmental benefit therefore depends on sufficient completed reuse cycles, high return rates, efficient washing and practical collection routes.

The source cites Hitt, Douglas and Keoleian (2023) as finding a global-warming break-even point of approximately four to six uses under their base-case assumptions, and Yadav et al. (2024) as finding lower global-warming impact after at least six uses in the system studied. These are study-specific findings, not a guaranteed break-even threshold for NTU Loop.

A container used once and lost may perform worse than a disposable alternative. Pilot evaluation should measure actual reuse cycles, losses, displacement of disposable containers, washing resources and transport needs. Locating machines along existing student routes can reduce extra journeys made solely to return containers.

### Economic impact

Initial costs include reusable containers, dispensing and return machines, digital integration and central washing arrangements. Operating costs include staff, collection, redistribution, utilities, detergent, maintenance and replacement stock.

Vendors may reduce disposable-packaging purchases, but changes to meal service and customer guidance can still affect queues and workload. These effects should be measured.

The no-deposit model removes an upfront payment barrier. A non-return charge can help protect stock, but its amount, collection process and fairness need to be established. It should not be treated as guaranteed operating revenue.

The approximately S$0.30 disposable surcharge creates a price signal favouring reuse. Its affordability, collection arrangements and effect on behaviour should be evaluated rather than assuming it will fund the system.

Economic success depends on utilisation and cost per completed cycle. Setup costs must be considered alongside washing, transport, labour and losses. The proposal does not promise financial savings; pilot evidence should determine the ongoing funding needed.

### Social impact

NTU Loop removes the need to own, remember, carry from home or wash a personal container. Returning it at a different location supports students moving between classes, libraries and halls.

Verified-return rewards could encourage participation, but convenience and reliable service remain essential. Hygiene concerns, worn containers, empty machines or long queues could discourage continued use.

Clear cleaning information, regular inspections and appropriate halal/non-halal handling are important for trust. Users should have practical reminders and a fair process for resolving return-record errors or exceptional circumstances before non-return charges are applied.

Account-linked loans also create privacy responsibilities. Collect only the information needed for borrowing, returns, any applicable charges and optional rewards. Evaluation reports should use aggregated data.

### Interconnected trade-offs

The three sustainability pillars depend on one another:

- Convenient returns improve circulation, which spreads financial and environmental costs over more uses.
- Cleaning protects hygiene but consumes water and energy; efficient processes must still meet hygiene requirements.
- Charges may discourage losses but can undermine participation if users perceive them as unfair.
- No-deposit participation reduces financial friction while increasing the importance of reliable loan records and return support.

Success requires balancing these effects across the whole system.

## 4. Implementation

### Baseline research and design

Measure takeaway transactions and disposable-container use at candidate canteens. Survey students about takeaway habits, BYOC barriers, preferred machine locations, acceptable return arrangements and hygiene concerns. Consult vendors about meal service and peak-period demand.

Agree the operating responsibilities, central washing process, segregation requirements, account integration and non-return policy before launch. Confirm the disposable surcharge and optional reward arrangements.

### Controlled pilot

Start at approximately two contrasting sites, such as an academic food court and a hall canteen. A proposed pilot of approximately three months would help distinguish sustained use from initial curiosity.

Install dispensing and return machines near food outlets and existing movement routes. Supply clean containers through the machines, establish central washing and inspection, and train operators and participating vendors.

The digital system should record container identity, borrower association, loan status, return confirmation and the agreed return deadline. Reminders and optional verified-return points can support participation. NTU card/account integration requires institutional approval and technical access.

An appointed operator should collect returned stock, clean it centrally and replenish machines. Equipment providers should maintain dispensing and return hardware. Demand data can later inform replenishment schedules.

### Evaluation

| Area | Proposed measures |
| --- | --- |
| Adoption and waste prevention | Share of takeaway orders using NTU Loop; single-use containers per 100 takeaway meals; estimated disposables displaced |
| Circulation | Return rate within the agreed period; average return time; completed reuse cycles; loss and damage rates |
| Resources | Washing water and electricity; collection and redistribution requirements |
| Cost | Full cost per completed reuse, including setup allocation, labour, cleaning, logistics, maintenance and replacement |
| Service | Machine downtime; clean-stock availability; queues; additional vendor service time |
| Trust and inclusion | User and vendor feedback; hygiene performance; segregation compliance; accessibility and charging concerns |

**Single-use containers consumed per 100 takeaway meals** is particularly useful: high borrowing numbers alone do not demonstrate that disposables were displaced, especially if existing BYOC users switch to the shared system.

### Risks, support and expansion

Prepare for machine failures, queues, incorrect returns, food residue, lost containers, clean-stock shortages and segregation errors. Provide backup collection arrangements and manual support, and collect feedback throughout the pilot.

If returns are poor, review machine locations, reminders and return arrangements. If queues develop, simplify interactions or adjust machine capacity. If washing or transport impacts are excessive, improve central processes and collection routes. Investigate persistent losses before changing the non-return policy.

Expand progressively to additional canteen and hall clusters only after acceptable hygiene, circulation, service, affordability and operating costs have been demonstrated. Numerical success thresholds should be agreed before the pilot; none are established by the supplied image.

The objective is to establish whether a convenient shared-container system can reduce single-use packaging while remaining environmentally beneficial, economically manageable and socially acceptable.

## References retained from the source proposal

The following bibliography is reproduced from “Week 8 Proposal (Don)” with formatting cleaned up. Consult the [source Google Doc](https://docs.google.com/document/d/1-zhvVRUCzXWMig_dfyEDUFvl_IuouyV_kmERu1Vigv8/edit) for its embedded source links.

- EarthLink NTU. (2026). *Bring Your Own Container Campaign.*
- EarthLink NTU. (n.d.). *EcoCampus.*
- Hitt, C., Douglas, J., & Keoleian, G. A. (2023). Parametric life cycle assessment modeling of reusable and single-use restaurant food container systems. *Resources, Conservation and Recycling, 190*, 106862.
- Income Insurance & WWF-Singapore. (2026, April 29). *Income Insurance and WWF-Singapore launch Eco Dabao, SG's first CBD return-and-reuse multi-location programme for takeaway food and drink containers.*
- Intellectual Property Office of Singapore. (2025). *Revolutionising reusables.*
- National Environment Agency. (n.d.). *Mandatory Packaging Reporting.*
- Singapore Food Agency. (n.d.). *Food Handler's Handbook.*
- Singapore Food Agency. (n.d.). *Safe use of plastic food packaging.*
- Yadav, P., Silvenius, F., Katajajuuri, J.-M., & Leinonen, I. (2024). Life cycle assessment of reusable plastic food packaging. *Journal of Cleaner Production, 448*, 141529.


## Demo points and machine availability

The prototype awards **10 points per confirmed return within 24 hours of borrowing**, including the exact deadline. These are illustrative demo settings, not an approved NTU policy. QR identification alone awards nothing. A late return closes the loan without adding or deducting points. Points accumulate across completed loans and survive same-tab reloads together with the loan and inventory.

Home shows the points balance and the number of online machines with at least one clean container. Borrowing reduces clean inventory; returning adds to stock awaiting central washing, not clean stock. Empty online machines accept returns but cannot dispense containers. Offline machines are excluded. All quantities are simulated; no live machine feed, redemption or backend is connected. Each demo machine starts with 30 containers: 20 clean and 10 awaiting washing. Hall cluster remains offline, so its stock cannot be borrowed. Counts change with transactions; they are not automatically reset to 20 on each borrow. Existing sessions receive the new starting inventory while retaining points and subtracting any active loan from its source machine. Session storage is tab-local, with in-memory fallback when unavailable.
