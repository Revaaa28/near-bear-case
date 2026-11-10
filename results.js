window.BEAR_RESULTS = {
  "product": "The Bear Case, Run Live",
  "generatedAt": "2026-11-10T02:31:06.555Z",
  "generatedBy": "npm run verify (scripts/verify.mjs) — all numbers fetched live; verdicts derived by the thresholds in that file",
  "context": {
    "nearPriceUsd": 3.59,
    "rpcBlockHeight": 223853497,
    "rpcBlockTime": "2026-11-10T02:29:46.588590946Z"
  },
  "verdictScale": {
    "Survives": "The claim's numbers hold up against independent live data.",
    "Inflated": "A real kernel (benchmark, later peak, gross figure) is presented as more than the data supports.",
    "False": "The claim is contradicted by the data — in C2's case, arithmetically impossible.",
    "Unverifiable": "No independent public source can test the claim; exactly what is missing is stated on the card."
  },
  "tally": {
    "Survives": 3,
    "False": 1,
    "Inflated": 3,
    "Unverifiable": 1
  },
  "claims": [
    {
      "id": "C1",
      "claim": "NEAR Intents has crossed $37B+ in all-time volume with 37M+ swaps",
      "claimant": "NEAR Protocol monthly shipping recap, 2026-11-03",
      "sourceUrl": "https://bsc.news/news/near-intents-37-billion-total-volume",
      "test": "Rebuild cumulative settled Intents volume from an independent aggregator (DefiLlama) and compare against $37B; check the swap-count leg against the lifetime transaction count of the intents.near contract on NearBlocks.",
      "runAt": "2026-11-10T02:29:47.154Z",
      "numbers": {
        "claimedVolumeUsd": 37000000000,
        "defillamaCumulativeVolumeUsd": 37005533919,
        "volumeRatio": 1.0001,
        "defillamaVolume30dUsd": 3561518211,
        "defillamaVolumeLatestDayUsd": 87673580,
        "claimedSwaps": 37000000,
        "intentsNearTxnCountContext": 156789629
      },
      "figures": [
        {
          "label": "Claimed all-time volume",
          "display": "$37B+"
        },
        {
          "label": "DefiLlama rebuilt cumulative",
          "display": "$37.01B"
        },
        {
          "label": "Volume, trailing 30 days",
          "display": "$3.56B"
        }
      ],
      "verdict": "Survives",
      "justification": "Independent rebuild matches the headline: DefiLlama's cumulative NEAR Intents volume is $37,005,533,919 (100.0% of the claimed $37B). The gross number survives. Caveat the headline omits: no public source rebuilds the unique-user / round-trip split (the Intents explorer's stats live on Dune, which needs an API key), so \"volume = adoption\" remains unproven even though \"volume\" itself checks out. intents.near shows 156,789,629 lifetime transactions on NearBlocks — consistent with, but not a count of, the claimed 37M+ swaps.",
      "sourcesUsed": [
        "https://api.llama.fi/summary/dexs/near-intents",
        "https://api.nearblocks.io/v1/account/intents.near/txns/count"
      ]
    },
    {
      "id": "C2",
      "claim": "NEAR has 46 million monthly active users",
      "claimant": "Ecosystem analysis (Paragraph, on May-2025 data)",
      "sourceUrl": "https://paragraph.com/@nhuttam1997/analyzing-near-blockchain-from-competing-head-to-head-with-solana-to-strategic-repositioning-part-1",
      "test": "Bound the true MAU from above: sum NearBlocks' daily active-account counts over the trailing 30 days. A unique monthly count can never exceed that sum — if the sum is below 46M, the claim is arithmetically impossible.",
      "runAt": "2026-11-10T02:29:48.647Z",
      "numbers": {
        "claimedMonthlyActiveUsers": 46000000,
        "windowStart": "2026-10-11T00:00:00.000Z",
        "windowEnd": "2026-11-09T00:00:00.000Z",
        "avgDailyActiveAccounts": 58223,
        "sumDailyActiveAccounts30d": 1746682,
        "mauUpperBound": 1746682,
        "impliedDailyActivesNeeded": 1533333,
        "latestDayActiveAccounts": 77752,
        "latestDayTxns": 895302
      },
      "figures": [
        {
          "label": "Claimed MAU",
          "display": "46,000,000"
        },
        {
          "label": "Avg daily active accounts (30d)",
          "display": "58,223"
        },
        {
          "label": "Hard upper bound on MAU (Σ daily)",
          "display": "1,746,682"
        }
      ],
      "verdict": "False",
      "justification": "Even the loosest possible bound kills this claim: summing every daily active-account count for the last 30 days (double-counting anyone active on two days) gives 1,746,682 — a true unique MAU is smaller still. The claim needs ~1,533,333 unique users per day; the chain shows ~58,223. Off by more than 26× against its own ceiling. (The 46M figure traces to May-2025 ecosystem marketing that counted cumulative/meta-transaction metrics as \"users\"; on-chain actives never came close.)",
      "sourcesUsed": [
        "https://api.nearblocks.io/v1/charts"
      ]
    },
    {
      "id": "C3",
      "claim": "NEAR reached 1 million transactions per second",
      "claimant": "Q4 2025 NEAR benchmark, validated in Nansen's quarterly report",
      "sourceUrl": "https://www.crowdfundinsider.com/2026/03/268183-near-protocol-advancements-examined-in-report-from-blockchain-analytics-provider-nansen/",
      "test": "Compare the benchmark configuration (70 shards, pre-generated load) with production mainnet as it runs today: live TPS (NearBlocks), latest full-day average TPS (NearBlocks charts), and the shard count of a live block (RPC).",
      "runAt": "2026-11-10T02:29:49.829Z",
      "numbers": {
        "headlineTps": 1000000,
        "benchmarkShards": 70,
        "liveTpsNearBlocks": 1,
        "latestFullDayTxns": 895302,
        "latestFullDayAvgTps": 10.36,
        "productionShardsFromBlockChunks": 10,
        "productionToHeadlineRatio": 0.0000104,
        "rpcBlockHeight": 223853497
      },
      "figures": [
        {
          "label": "Headline TPS",
          "display": "1,000,000"
        },
        {
          "label": "Live mainnet TPS (NearBlocks)",
          "display": "1"
        },
        {
          "label": "Latest full-day average TPS",
          "display": "10.4"
        },
        {
          "label": "Production shards (live block)",
          "display": "10"
        }
      ],
      "verdict": "Inflated",
      "justification": "The 1M TPS figure is a documented benchmark on a 70-shard test configuration with pre-generated load — it survives as a lab result. As a network-capability headline it is inflated by ~96,504×: production mainnet runs 10 shards and sustains 1 TPS live (10.4 TPS averaged over the latest full day, 895,302 txns). Benchmark ≠ network.",
      "sourcesUsed": [
        "https://api.nearblocks.io/v1/stats",
        "https://api.nearblocks.io/v1/charts",
        "https://archival-rpc.mainnet.near.org (block by height)"
      ]
    },
    {
      "id": "C4",
      "claim": "NEAR TVL is roughly $244 million",
      "claimant": "DataWallet, 'NEAR Protocol Statistics & Trends for 2026' (data as of 2026-09-22)",
      "sourceUrl": "https://www.datawallet.com/crypto/near-protocol-statistics",
      "test": "Pull DefiLlama's own historical chain TVL for the claim's stated date and for today. A headline that overstates even its own cited source — and has since retraced — fails twice.",
      "runAt": "2026-11-10T02:29:54.683Z",
      "numbers": {
        "claimedTvlUsd": 244000000,
        "claimDate": "2026-09-22",
        "defillamaTvlAtClaimDateUsd": 197227814,
        "defillamaTvlAtClaimDateDate": "2026-09-22",
        "atDateRatio": 0.8083,
        "defillamaTvlTodayUsd": 170294975,
        "defillamaTvlTodayDate": "2026-11-10",
        "windowPeakUsd": 276755828,
        "windowPeakDate": "2026-10-12",
        "retraceFromPeakPct": -38.5
      },
      "figures": [
        {
          "label": "Claimed TVL (22 Sep 2026)",
          "display": "$244M"
        },
        {
          "label": "DefiLlama on that same date",
          "display": "$197.23M"
        },
        {
          "label": "DefiLlama TVL today",
          "display": "$170.29M"
        },
        {
          "label": "Window peak (2026-10-12)",
          "display": "$276.76M"
        }
      ],
      "verdict": "Inflated",
      "justification": "On the very date the article's data describes, its own cited source (DefiLlama) showed $197,227,814 — the headline overstates it by 19%. The level was genuinely reached later (peak $276,755,828 on 2026-10-12), so the claim is not fabricated — but it was published ahead of its evidence, and TVL has since retraced to $170,294,975. Quoted today without a date, it is false by $73.71M.",
      "sourcesUsed": [
        "https://api.llama.fi/v2/historicalChainTvl/Near"
      ]
    },
    {
      "id": "C5",
      "claim": "Confidential Intents holds $150M+ in confidential TVL with $3B+ in confidential volume",
      "claimant": "NEAR Business product site / NEAR anniversary update, 2026-10-13",
      "sourceUrl": "https://www.tronweekly.com/near-protocols-network-growth-puts-near-price-structure-in-focus/",
      "test": "Cross-check against the only independent aggregate that exists: DefiLlama's total Intents TVL (public + confidential, all chains). If no independent source can observe a confidential-only figure at all, the claim is structurally unverifiable.",
      "runAt": "2026-11-10T02:29:56.028Z",
      "numbers": {
        "claimedConfidentialTvlUsd": 150000000,
        "claimedConfidentialVolumeUsd": 3000000000,
        "intentsTotalTvlAllChainsUsd": 191077846,
        "intentsNearChainTvlUsd": 98752223.82547,
        "confidentialShareOfTotalRequired": 0.785,
        "defillamaExposesConfidentialSplit": false
      },
      "figures": [
        {
          "label": "Claimed confidential TVL alone",
          "display": "$150M+"
        },
        {
          "label": "ALL Intents TVL (public + confidential)",
          "display": "$191.08M"
        },
        {
          "label": "Share of total that must be confidential",
          "display": "79%"
        }
      ],
      "verdict": "Unverifiable",
      "justification": "Structurally unverifiable: the product's defining feature is that its flows are not publicly visible, and no independent aggregator separates confidential from public Intents TVL. The claim asks us to believe confidential TVL alone is ≥ $150M when ALL observable Intents TVL (public + confidential, every chain) totals $191,077,846 — i.e. 79% of everything would have to be confidential. Possible, but it rests entirely on the claimant's own say-so.",
      "missingData": "A public/confidential split of NEAR Intents TVL and volume. DefiLlama reports only the combined total; the Intents explorer defers to Dune dashboards that require an API key; the confidential flows are not visible on-chain by design.",
      "sourcesUsed": [
        "https://api.llama.fi/protocol/near-intents"
      ]
    },
    {
      "id": "C6",
      "claim": "NEAR Intents has generated $52M+ in cumulative fees, with $8M+ directed to NEAR buybacks",
      "claimant": "Nansen Q3 2026 report, relayed by CoinMarketCap, 2026-11-04",
      "sourceUrl": "http://coinmarketcap.com/cmc-ai/near-protocol/latest-updates/",
      "test": "Rebuild cumulative Intents fee revenue from DefiLlama's fees series and compare with $52M; assess whether the buyback leg has any independent public accounting (fees retained or reinvested are not buybacks).",
      "runAt": "2026-11-10T02:29:56.718Z",
      "numbers": {
        "claimedCumulativeFeesUsd": 52000000,
        "defillamaCumulativeFeesUsd": 59709518.980000004,
        "feesRatio": 1.1483,
        "defillamaFees30dUsd": 5578208,
        "claimedBuybacksUsd": 8000000,
        "buybackLegPubliclyAccounted": false
      },
      "figures": [
        {
          "label": "Claimed cumulative fees",
          "display": "$52M+"
        },
        {
          "label": "DefiLlama cumulative fees",
          "display": "$59.71M"
        },
        {
          "label": "Fees, trailing 30 days",
          "display": "$5.58M"
        }
      ],
      "verdict": "Survives",
      "justification": "The fees headline survives — and is even conservative: DefiLlama rebuilds cumulative NEAR Intents fees at $59,709,519, 15% ABOVE the claimed $52M. Reported separately because it does not follow from the fees number: the \"$8M+ directed to NEAR buybacks\" leg has no independent public accounting in any probed source (fees retained or reinvested are indistinguishable from buybacks without a disclosed buyback address), so that sub-claim stands unverified even though the headline figure holds.",
      "sourcesUsed": [
        "https://api.llama.fi/summary/fees/near-intents"
      ]
    },
    {
      "id": "C7",
      "claim": "NEAR mainnet runs 10 shards with 600ms blocks at 100% uptime",
      "claimant": "NEAR Protocol six-year mainnet anniversary update, 2026-10-13",
      "sourceUrl": "https://www.tronweekly.com/near-protocols-network-growth-puts-near-price-structure-in-focus/",
      "test": "Block time and shard count are directly observable (NearBlocks avg_block_time; chunk count of a live block via RPC). For '100% uptime', sample block production across ~1.6M consecutive blocks via archival RPC: any multi-minute stall would show up as a blown-out seconds-per-block segment.",
      "runAt": "2026-11-10T02:29:56.954Z",
      "numbers": {
        "claimedBlockTimeSec": 0.6,
        "nearBlocksAvgBlockTimeSec": 0.5882,
        "blockTimePasses": true,
        "claimedShards": 10,
        "shardsFromLiveBlockChunks": 10,
        "shardsPass": true,
        "uptimeSampleSegments": 8,
        "uptimeSampleWindowDays": 10.7,
        "worstSegmentSecPerBlock": 0.587,
        "stallThresholdSecPerBlock": 3,
        "uptimeSamplePasses": true,
        "rpcBlockHeight": 223853497
      },
      "figures": [
        {
          "label": "Claimed block time",
          "display": "600ms"
        },
        {
          "label": "Observed avg block time",
          "display": "0.588s"
        },
        {
          "label": "Shards (live block chunks)",
          "display": "10"
        },
        {
          "label": "Worst 200k-block segment",
          "display": "0.59s/block"
        }
      ],
      "verdict": "Survives",
      "justification": "This one survives the bear test. Block time: NearBlocks reports 0.588s average (claim: 0.600s). Shards: a live block carries exactly 10 chunks = 10 shards. Uptime: an absolute like \"100%\" can only be sampled, never proven — across 8 consecutive 200,000-block segments (~10.7 days, heights 222,253,497–223,853,497) the slowest segment averaged 0.59s/block, leaving no room for a multi-minute stall anywhere in the window.",
      "sourcesUsed": [
        "https://api.nearblocks.io/v1/stats",
        "https://archival-rpc.mainnet.near.org (blocks by height, sampled)"
      ]
    },
    {
      "id": "C8",
      "claim": "Rhea Finance surpassed $16B in cumulative volume and generated over $1M in revenue in 12 months",
      "claimant": "Paragraph ecosystem analysis (12 months leading to September 2025)",
      "sourceUrl": "https://paragraph.com/@nhuttam1997/analyzing-near-blockchain-from-competing-head-to-head-with-solana-to-strategic-repositioning-part-1",
      "test": "Rebuild from DefiLlama: cumulative DEX volume of Rhea Dex (the Ref Finance lineage) up to 2025-09-30, plus BOTH candidate meanings of 'revenue' for Oct 2024 – Sep 2025 — protocol revenue (the protocol's own take) and gross fees paid by users. A claim that only holds under the looser definition is inflated by relabelling.",
      "runAt": "2026-11-10T02:31:02.586Z",
      "numbers": {
        "claimedCumulativeVolumeUsd": 16000000000,
        "defillamaCumulativeVolumeAt2025_09_30Usd": 16497683150,
        "volumeRatioAtClaimDate": 1.0311,
        "defillamaCumulativeVolumeTodayUsd": 24010387080,
        "claimedRevenue12moUsd": 1000000,
        "defillamaRevenueOct2024ToSep2025Usd": 493924,
        "revenueRatio": 0.4939,
        "defillamaGrossFeesOct2024ToSep2025Usd": 2469640,
        "grossFeesRatioToClaim": 2.4696,
        "revenueCaptureRatePct": 0.003
      },
      "figures": [
        {
          "label": "Claimed cumulative volume",
          "display": "$16B+"
        },
        {
          "label": "DefiLlama cumulative at Sep 2025",
          "display": "$16.50B"
        },
        {
          "label": "Claimed revenue (12mo)",
          "display": "$1M+"
        },
        {
          "label": "Protocol revenue, same window",
          "display": "$493.9K"
        },
        {
          "label": "Gross user fees, same window",
          "display": "$2.47M"
        }
      ],
      "verdict": "Inflated",
      "justification": "Split verdict inside one claim. The volume leg survives outright: DefiLlama rebuilds cumulative Rhea (Ref lineage) volume at $16,497,683,150 by Sep 2025, 103.1% of the $16B claim. The revenue leg survives only by relabelling: \"$1M+ revenue\" is true of gross fees users paid ($2,469,640), but under DefiLlama's actual revenue metric — the protocol's own take — Rhea earned $493,924, just 49.4% of the claim. Calling gross fees \"revenue\" is the inflation.",
      "sourcesUsed": [
        "https://api.llama.fi/summary/dexs/ref-finance",
        "https://api.llama.fi/summary/fees/ref-finance?dataType=dailyRevenue",
        "https://api.llama.fi/summary/fees/ref-finance?dataType=dailyFees"
      ]
    }
  ]
};
