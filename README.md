# The Bear Case, Run Live

**An adversarial audit of NEAR-ecosystem headline claims, re-tested live against chain data.**

NEAR's ecosystem markets itself with big numbers: *$37B in Intents volume.
46 million monthly users. 1 million TPS. $244M TVL.* Investors and builders
repeat these figures from recaps, reports and stat round-ups — almost nobody
re-checks them against the chain, and the sources behind them are rarely
reproducible.

This project does the re-checking. Eight bullish headline claims each get a
**falsification test** ("the bear test") run live against independent public
data — NEAR's own RPC, NearBlocks, DefiLlama — and a verdict derived from the
numbers by thresholds stated in code:

**Survives · Inflated · False · Unverifiable**

Verdicts follow the data. Three of the eight claims survive the bear test and
are reported as surviving — that is what makes the four that fail worth
believing.

- **Demo video (2 min):** [demo-video.mp4](demo-video.mp4) — dashboard walkthrough + a full `npm run verify` run against live data
- **Live dashboard:** https://revaaa28.github.io/near-bear-case/
- **Repository:** https://github.com/Revaaa28/near-bear-case
- **Built for:** NEAR HACKATHON — tracks: Investment Thesis (primary),
  AI Security & Defense, Open Innovation

## Try it (do X — see Y)

Requirements: Node.js ≥ 18 and an internet connection. **No dependencies,
no API keys, no accounts, nothing to install.**

1. **Clone and enter the repo**
   ```bash
   git clone https://github.com/Revaaa28/near-bear-case.git
   cd near-bear-case
   ```
   → *See:* `index.html`, `scripts/verify.mjs`, `results.json`, this README.

2. **Run the audit**
   ```bash
   npm run verify
   ```
   → *See:* `Running C1...` through `Running C8...`, then a JSON summary
   with the verdict tally (about 60–90 seconds; it queries live NEAR RPC,
   NearBlocks and DefiLlama endpoints). `results.json` and `results.js` in
   the repo root are rewritten with fresh numbers, timestamps and the block
   height each test ran at.

3. **Open the dashboard**
   ```bash
   python3 -m http.server 8000        # or: npx serve .
   ```
   then open http://localhost:8000 — or simply open `index.html` directly
   in a browser (it falls back to `results.js` when `results.json` can't be
   fetched over `file://`).
   → *See:* the verdict scoreboard and one card per claim: the headline
   claim and who made it → the bear test → the key figures → the verdict →
   expandable raw numbers and sources, exactly as recorded in
   `results.json`. Nothing on the page is hardcoded; the scoreboard is
   computed from `results.json` at render time.

4. **(Optional) Check a verdict yourself**
   Pick any figure on a card — e.g. C2's daily active accounts — and compare
   it against the same public endpoint named in `DATA_SOURCES.md`.
   → *See:* the same number, because the tool is just a reproducible wrapper
   around those endpoints.

## Latest results

Run of **2026-11-10T02:59Z** (NEAR mainnet block height 223,856,364).
Re-running `npm run verify` refreshes every figure; verdicts can move as
the chain does.

**Tally: 3 Survives · 3 Inflated · 1 False · 1 Unverifiable**

| # | Claim (claimant) | Verdict | What the data says |
|---|---|---|---|
| C1 | Intents crossed $37B+ all-time volume, 37M+ swaps (NEAR Protocol recap, 2026-11-03) | **Survives** | DefiLlama cumulative volume $37.006B = 100.0% of the claim. |
| C2 | NEAR has 46M monthly active users (ecosystem analysis, on May-2025 data) | **False** | Trailing-30d daily active accounts average 58,223. Even summing all 30 daily counts — double-counting everyone, a hard ceiling on unique MAU — gives 1,746,682. It also fails in its own window: over May 2025 the chain was ~7× busier (418,719/day average, peak 498,143), yet the same 31-day sum is 12,980,291 — still 3.54× short of 46M. The claim needs ~1.53M unique users *per day*; it is arithmetically impossible in both windows. |
| C3 | NEAR reached 1M TPS (Q4 2025 benchmark, relayed by Nansen) | **Inflated** | The benchmark ran on 70 shards with pre-generated load. Production mainnet has 10 shards and averaged 10.4 TPS over the latest full day (895,302 txns) — about five orders of magnitude below the headline. A lab result marketed as network capability. |
| C4 | NEAR TVL ≈ $244M (DataWallet, data as of 2026-09-22) | **Inflated** | DefiLlama read $197.2M on the claim's own date (−19% vs the headline) and $171.1M at run time. The level was genuinely reached later (peak $276.8M, 2026-10-12) and has since retraced −38.2%. |
| C5 | Confidential Intents holds $150M+ confidential TVL, $3B+ confidential volume (NEAR, 2026-10-13) | **Unverifiable** | *All* Intents TVL, public + confidential, all chains, totals $191.1M — the claim needs 79% of that to be confidential alone. No public source splits the two: DefiLlama reports only the combined total, the Intents explorer defers to key-gated Dune dashboards, and the flows are confidential by design. The missing data is named, not papered over. |
| C6 | Intents generated $52M+ cumulative fees, $8M+ to buybacks (Nansen Q3 2026) | **Survives** | DefiLlama cumulative fees $59.71M = 114.8% of the claim — the headline is conservative. (The $8M buyback leg has no independent public accounting; flagged on the card, not counted against the verdict.) |
| C7 | Mainnet runs 10 shards, 600ms blocks, 100% uptime (NEAR anniversary update, 2026-10-13) | **Survives** | Average block time 0.594s; a live block carries exactly 10 chunks = 10 shards; uptime sampled over 8 consecutive 200k-block segments (~10.7 days) with the worst segment at 0.59 s/block vs a 3 s/block stall threshold — no room for a multi-minute stall in the window. |
| C8 | Rhea Finance passed $16B cumulative volume and $1M revenue in 12 months (ecosystem analysis) | **Inflated** | Volume leg survives: $16.50B at Sep 2025 (103.1%). Revenue leg doesn't: protocol revenue (DefiLlama `dailyRevenue`, Oct 2024–Sep 2025) is $493,924 = 49.4% of the claim. The headline holds only if gross user fees ($2.47M) are relabelled as revenue. |

## Methodology

Every claim goes through the same four steps:

1. **Claim** — the headline figure, quoted as published, with claimant and
   source URL. Claims are chosen because they are specific enough to be
   falsifiable and widely repeated.
2. **Bear test** — the strongest reasonable check against the claim, defined
   *before* looking at the result: e.g. for a MAU claim, an arithmetic
   ceiling (the sum of daily active accounts bounds unique monthly users
   from above, no matter how generously you count); for a TPS claim,
   production throughput vs benchmark conditions; for a TVL claim, the
   aggregator's value *on the claim's own date*, not just today.
3. **Data** — fetched live at run time from public, keyless endpoints
   (see below). `results.json` records the raw numbers, the run timestamp
   and the block height for every claim.
4. **Verdict** — derived by threshold logic written next to each test in
   `scripts/verify.mjs`. Nothing is hardcoded: re-running on another day
   can change a verdict.

Verdict scale:

- **Survives** — the independent figures meet or beat the claim (the claim
  is accurate or conservative).
- **Inflated** — a real number sits underneath, but the headline overstates
  it: wrong as of its own date, a benchmark presented as production, or a
  definitional swap (gross fees relabelled as revenue).
- **False** — the claim is arithmetically impossible against its own
  loosest upper bound.
- **Unverifiable** — no public, keyless source can settle it. The card
  names exactly which data is missing. A test that fails to execute also
  degrades to Unverifiable with the failure named — never silently passed.

## How it works

```
near-bear-case/
├── index.html          # the dashboard: single static file, no build step
├── scripts/verify.mjs  # the entire audit tool (Node stdlib only)
├── results.json        # machine-readable output of the last verify run
├── results.js          # same data as a JS assignment (file:// fallback)
├── DATA_SOURCES.md     # every endpoint used, what it feeds, its caveats
└── package.json        # defines the single command: npm run verify
```

`scripts/verify.mjs` defines the 8 claims (text, claimant, source URL) next
to their test functions, fetches the live numbers, applies the thresholds
and writes `results.json`/`results.js`. The dashboard renders whatever
`results.json` contains.

## Technologies and sources

- **NEAR JSON-RPC (mainnet + archival)** — `rpc.mainnet.near.org`,
  `archival-rpc.mainnet.near.org`: block times, live block chunk/shard
  counts, historical block segments for the uptime sample. NEAR mainnet is
  the ground truth every claim is ultimately about.
- **NearBlocks API** — `api.nearblocks.io`: indexed statistics raw RPC
  doesn't aggregate (daily active accounts, daily transaction counts).
- **DefiLlama public API** — `api.llama.fi`: independent aggregator figures
  for Intents volume/fees, chain TVL history, Rhea volume/revenue.
- **Runtime:** Node.js ≥ 18 (global `fetch` only). Zero npm dependencies.
  No libraries, templates or boilerplate beyond the Node standard library.

Full endpoint list, per-claim mapping and caveats: [`DATA_SOURCES.md`](DATA_SOURCES.md).

## Honest limitations

- **C5 is Unverifiable by design** — Confidential Intents' flows are
  confidential and no public source splits them from public Intents. The
  tool says so and names the missing data instead of guessing.
- **Aggregators restate history.** DefiLlama revises past TVL as adapters
  are corrected: this tool read NEAR TVL for 2026-09-22 as $214.4M in one
  run and $197.2M in a later one. All figures are therefore reported as
  "the series as returned at run time", date-stamped in `results.json`.
  No current verdict flips on a restatement (C4 is Inflated under both
  readings).
- **"100% uptime" can only be sampled, never proven.** C7 samples ~10.7
  days of blocks; a shorter stall outside the window, or one shorter than
  the segment resolution, would not be caught. The card states the window.
- **Activity ≠ people.** C2 counts active *accounts* from NearBlocks;
  one person can hold many accounts and one account can be a bot. The test
  is deliberately generous to the claim (it uses an upper bound), so the
  False verdict does not depend on resolving that ambiguity.
- **Point-in-time.** Every number is as of its run timestamp. That is the
  product's premise — re-run it and the audit is live again — but a verdict
  quoted without its date is only half the story.

## Disclosure — second project (HACKATHON.md Q-015)

This is one of two independent projects submitted by the same person to
NEAR HACKATHON, as the rules allow. The other project is **Illia's AI
Tamagotchi** — a NEP-171 pet on NEAR testnet whose sub-account holds NEAR
and pays for its own NEAR AI inference (tracks: NFTs That Do Something,
Games). The two projects are independent: separate repositories, separate
codebases, no shared code. Each project's README names the other, per
Q-015.

## License

MIT — see [`LICENSE`](LICENSE).
