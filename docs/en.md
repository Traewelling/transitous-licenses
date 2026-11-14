# Adding a License to Träwelling

Träwelling only shows trips whose transit data is published under a license that permits us to use it. For many
sources this information is missing, those trips are not shown by default. To make as many connections visible as
possible, we maintain license information both here and in the Transitous repository. This guide explains how to add
an entry and open a pull request (PR) using the GitHub web interface. No command line needed.

## Where does the license belong?

Licenses are stored per feed in the [Transitous](https://github.com/public-transport/transitous) project. **This repository (`transitous-licenses`) is a temporary workaround** for proprietary licenses that Transitous cannot yet handle natively.

- **Known open-source license (e.g. CC-BY-4.0, ODbL-1.0):** Add it directly to the feed definition in the [Transitous feeds directory](https://github.com/public-transport/transitous/tree/main/feeds) using the SPDX identifier. Do **not** use this repository for that.
- **Custom or proprietary license:** Use this repository as described below.

You can find SPDX identifiers at https://spdx.org/licenses/.

## Step 1: Find the correct filename

Open https://traewelling.de/debug/motis-sources and find the source you want to add a license for. Note the exact filename (e.g. `de_DELFI.gtfs.zip`).

## Step 2: Open `licenses.json` on GitHub

Navigate to [`licenses.json`](../licenses.json) in the repository and click the pencil icon ("Edit this file") in the top right corner.

## Step 3: Add the proprietary license

First, add a new entry in the `"proprietary_licenses"` section:

```json
{
  "identifier": "My Transit Agency License",
  "name": "My Transit Agency Open Data License",
  "attribution_text": null,
  "url": "https://link-to-license-description.example"
}
```

Then reference it in the `"sources"` section:

```json
{
  "file": "xx_My-Source.gtfs.zip",
  "spdx": null,
  "url": "https://link-to-data-source.example",
  "custom_license": "My Transit Agency License"
}
```

The value of `"custom_license"` must exactly match the `"identifier"` from `proprietary_licenses`.

### Which licenses are allowed?

A license must meet the following requirements:

- Must allow use, redistribution, and modification of the data
- Must not require royalties or usage fees
- Must not be specific to a product or technology
- Restrictions are allowed, but must be clearly stated (e.g. for non-commercial use only)

## Step 4: Create a pull request

1. Scroll down to "Commit changes" at the bottom of the edit page
2. Select "Create a new branch for this commit and start a pull request"
3. Give the branch a short name (e.g. `add-license-for-DELFI`)
4. Click "Propose changes"
5. On the next page, fill in the PR template:
   - **Country / Land**: e.g. Germany
   - **License / Lizenz**: name of the license
   - **Source / Quelle**: filename from Step 1
   - **Notes / Anmerkungen**: anything else relevant
6. Click "Create pull request"

Done! The PR will be reviewed and merged once approved.
