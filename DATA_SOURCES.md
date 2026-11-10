# Data sources

Every number in `results.json` comes from one of these public, keyless
endpoints, fetched live by `scripts/verify.mjs` at run time. No API keys,
no accounts, no cookies. Each claim card in the dashboard names the source
behind its figures, and `results.json` stamps every claim with the time
(and, where relevant, the block height) of its test.

## 1. NEAR JSON-RPC — mainnet

- **Endpoint:** `https://rpc.mainnet.near.org`
- **Used for:** current chain state — latest block and block time, chunk
  (shard) counts in live blocks, account/contract views.
- **Claims:** C2 (activity context), C3 (live throughput context),
  C7 (block time, shard count).

## 2. NEAR JSON-RPC — archival

- **Endpoint:** `https://archival-rpc.mainnet.near.org`
- **Why:** the public RPC prunes history; the archival endpoint answers
  old blocks. Block timestamps across long height ranges are how the
  uptime test (C7) samples ~10 days of chain history.
- **Claims:** C7 (historical block segments).

## 3. NearBlocks API

- **Endpoint:** `https://api.nearblocks.io/v1`
- **Used for:** indexed chain statistics that raw RPC does not aggregate —
  daily active accounts, daily transaction counts, average block time.
- **Claims:** C2 (daily active accounts — the MAU ceiling), C3 (full-day
  transaction counts → average TPS), C7 (average block time cross-check).

## 4. DefiLlama public API

- **Endpoint:** `https://api.llama.fi`
- **Used for:** independent aggregator figures for value claims — NEAR
  Intents cumulative volume/fees, NEAR chain TVL (current and
  historical), Rhea Finance volume and revenue.
- **Claims:** C1, C4, C5, C6, C8.
- **Caveat:** DefiLlama is an aggregator, not chain truth, and it
  **restates history** — past data points change as adapters are
  corrected. On 2026-11-10 this tool read NEAR TVL for 2026-09-22 as
  $214.4M in one run and $197.2M in a later run. Figures are therefore
  always reported as "the series as returned at run time", date-stamped
  in `results.json`. No verdict in this project flips on a restatement:
  C4 reads Inflated under both values.

## What is deliberately NOT used

- **Dune dashboards** (e.g. the NEAR Intents stats linked from the
  Intents explorer): the API needs a key, so figures sourced only from
  Dune cannot be independently re-run by a judge. Where a claim can only
  be checked there — the public/confidential split behind C5 — the
  verdict is **Unverifiable** and the card names the missing data instead
  of citing a number nobody can reproduce.
