# SEO Implementation Plan

## Goal

Turn LeakLogic into a tighter commercial and informational cluster around:

- combustion leak tester
- combustion leak test kit
- head gasket tester
- head gasket test kit
- block tester
- block sniff tester
- test blown head gasket

## Constraint

The current site appears to sell one core tester kit, not a full multi-SKU range.

Because of that, this rollout avoids fake product/category pages for products that do not exist yet. That keeps the site trustworthy and avoids thin doorway-style URLs.

## Phase 1: Implement Now

- Strengthen the homepage as a broad trust and discovery page
- Launch a dedicated commercial hub at `/combustion-leak-tester/`
- Launch high-intent support pages:
  - `/guides/how-to-test-for-a-blown-head-gasket/`
  - `/guides/how-a-combustion-leak-tester-works/`
  - `/guides/combustion-leak-test-results-explained/`
  - `/manuals/`
  - `/about/`
  - `/delivery-returns/`
- Improve internal links from the homepage, product page, and blog index
- Add `WebSite` schema on the homepage and `BreadcrumbList` / `Article` / `ItemList` where appropriate
- Add the new URLs to the sitemap

## Phase 2: Add When Assets Exist

- Real product demo video
- Original workshop and fitment photos
- Real customer review module
- Fitment and adapter guide with exact dimensions
- A buyer-comparison page only if there are multiple real kits or variants to compare

## Phase 3: Expand Only With Real Catalogue Depth

Add these pages only when the matching products are actually sold:

- `/combustion-leak-test-fluid/`
- `/block-tester-filters/`
- `/adapters-bungs/`
- basic / advanced / filter tester product pages
- petrol / diesel fluid product pages

## Content Rules

- Keep one canonical URL per page
- Use clean, short titles and one clear H1
- Write for UK buyers and mechanics
- Mention misspellings only once in helper copy, never in titles
- Use practical buying and usage detail over keyword stuffing

## Next Manual Steps Outside Code

- Replace placeholder GA4 tags with a real measurement ID
- Set up Google Search Console and submit the refreshed sitemap
- Collect real reviews before adding `AggregateRating` to new pages
- Publish video demos and original use-case photos
- Start outreach to UK motoring blogs, mechanics, and YouTube channels
