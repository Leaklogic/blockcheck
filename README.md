# Block-Check Blue

The original LeakLogic static website, configured for `https://hedz-blockcheck.vercel.app`.
Branding, company details, contact email, product information and marketplace links
remain unchanged. Only absolute website URLs are changed in the generated output.

## Build

Run `npm run build` with Node.js installed. No dependencies are required.
The `dist` directory contains the public website, including manuals and images.
Maintenance files, the old hosting configuration and the separate OAuth relay
are excluded.

## Deploy on Vercel

1. Import this repository into Vercel and select the **Other** framework preset.
2. Use project name `hedz-blockcheck` and confirm that `hedz-blockcheck.vercel.app` is available.
3. Keep the build command `npm run build` and output directory `dist`, as configured
   in `vercel.json`, then deploy.

If Vercel assigns a different production domain, set the Vercel environment variable
`SITE_URL` to that origin (for example `https://blockcheck-blue.vercel.app`) and
redeploy. Do not add `www` to a Vercel subdomain.

`vercel.json` preserves legacy path redirects and the safety-sheet indexing header.
The original `CNAME` and `_redirects` files are retained as historical source files
and are not published.

## Printed QR code

The permanent address encoded in the print artwork is:
`https://hedz-blockcheck.vercel.app/qr`

It currently redirects to the homepage. The SVG and high-resolution PNG are in
`assets/qr/`. Use the SVG for print where possible, retain the white border, and
test a printed sample before a full print run.

To change where scans go, edit only the `Location` value on the `/qr` route in
`vercel.json` and deploy to the existing `hedz-blockcheck` Vercel project. The new
destination can be any full `https://` website URL, including a purchased domain.
Do not regenerate the QR code when changing its destination.

The redirect uses temporary status 307 and `Cache-Control: no-store`, so scanners
receive the current destination on each visit. Keep the Vercel project and its
`hedz-blockcheck.vercel.app` address active, including after moving the website
to another domain. Renaming or deleting that address would break printed codes.
