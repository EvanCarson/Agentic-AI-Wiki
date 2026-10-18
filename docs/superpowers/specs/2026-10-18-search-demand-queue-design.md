# Search-demand queue: write what people actually ask — design

Date: 2026-10-18 · Status: approved direction from the 2026-10-17 growth brainstorm
(memory `wiki-traffic-and-distribution`); this doc fixes the mechanics.

## Why

The site's supply problem is solved: the daily routine ships five items a day. Its
demand problem is not. Topics are picked from the routine's own gap list, not from what
readers search for. A 30-question dry run (2026-10-17) found that real questions were
mostly covered *partly* (9 answered, 17 partial, 4 gaps), so the biggest wins are
upgrading existing pages to answer the question people typed, not adding pages.

The owner's constraints:
- **Setup is one-off.** No recurring manual work and no hand-posting anywhere.
- **Search data comes from the owner's tools.** The chosen sources are Google Search
  Console and Bing Webmaster Tools.
- **Access uses a robot key.** A service account's key is stored as a GitHub Actions
  secret.

## Design

### 1. The harvester: `scripts/search-demand/harvest.mjs`

Plain Node with no dependencies. It writes `search-queue.json`.

**Sources.** Each source is optional, and the file records which ones ran.

| Source | Needs | What it gives |
|---|---|---|
| Google Search Console | env `GSC_SA_KEY` (service-account JSON), `GSC_SITE` (e.g. `sc-domain:menuagentic.com`) | queries × pages, last 28 days: impressions, clicks, CTR, position |
| Bing Webmaster | env `BING_API_KEY`, `BING_SITE` | query stats, last available period |
| Stack Exchange API | nothing (300 req/day anonymous) | recent, voted questions on agent topics (stackoverflow + ai.stackexchange) |
| Hacker News (Algolia) | nothing | Ask HN posts and discussions on agent topics |

Reddit is not used: it returns 403 to unauthenticated requests.

**Coverage check.** Every question or query is matched against the site's own
English pages: titles and ledes from the manifests and fragments, plus blog
titles. Each one gets a best-matching page and one of three statuses: `covered`,
`partial` or `gap`.

**Output lists:**
- `newQuestions`: `gap` and `partial` questions from any source, ranked by demand
  signal (impressions, votes or points, recency). Each carries its best match, so
  the routine can tell a real gap from a page that needs upgrading. This guards
  against cannibalisation.
- `weakPages` (search data only): pages ranking in positions 8–30 for queries with
  meaningful impressions. These are rebuild candidates, each with the queries it
  half-answers.
- `lowClickPages` (search data only): pages with many impressions and a CTR well
  under the site median. These need a title or lede rewrite.

Lists without search data come out empty, with a `reason` field.

### 2. Weekly job: `.github/workflows/search-demand.yml`

- **Schedule:** Monday 06:00 UTC, and also on manual dispatch.
- **Steps:** run the harvester with the secrets, then upload `search-queue.json` as
  the artifact `search-queue` (90-day retention).
- **No commits and no PRs.** A PR opened by the Actions token does not trigger the
  required `gates` check, so it would sit blocked. An artifact needs neither.
- **Missing secrets are not a failure.** The run just harvests the public sources.

### 3. Routine: step 2a in the daily batch prompt

At the start of each run, the routine does three things:
1. **Load the queue.**
   - First, download the latest `search-queue` artifact with `gh run download`.
   - If that fails, run the harvester locally (public sources only).
2. **Pick the work.**
   - One of the two new pages answers a `gap` question.
   - The rebuild slot prefers a `weakPages` or `lowClickPages` entry, then a `partial`
     question's best-match page.
   - Its own gap list still decides the rest.
3. **Report.** It names in its report which queue items it used.

**Question-page rule.** When a page answers a question:
- its lede's first sentence answers the question in at most 30 words;
- the question's wording appears in the page, so the search engine can match it.

### Out of scope

- Posting to any external site.
- Newsletters.
- Any change to page templates.

## The owner's one-off setup (plain language)

1. **Prove you own the site to Google.** In Google Search Console, add a *Domain*
   property for `menuagentic.com`, then paste the TXT record it shows you into your
   DNS.
2. **Create the robot key.**
   - In Google Cloud, create a service account and download its JSON key.
   - In Search Console, go to Settings → Users and add the service account's email
     with *Restricted* access.
3. **Store the key in GitHub.** Add these repository secrets:
   - `GSC_SA_KEY`: the JSON file's contents
   - `GSC_SITE`: `sc-domain:menuagentic.com`
4. **Optional: Bing.**
   - In Bing Webmaster Tools, choose *Import from Google Search Console*.
   - Then add the secrets `BING_API_KEY` (Settings → API access) and `BING_SITE`
     (`https://menuagentic.com/`).

Search data takes a few days to appear. Until then, the queue runs on Stack Exchange
and Hacker News alone.

## Testing

Unit tests in `scripts/__tests__/search-demand.test.mjs`, run by `npm test`:
- coverage scoring;
- ranking;
- the JSON shape;
- GSC row → weakPages / lowClickPages classification, on fixture rows.

No network in tests. Running the harvester once locally, against the public sources,
is the smoke test.
