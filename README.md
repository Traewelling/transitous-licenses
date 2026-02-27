# Transitous Licenses Configuration

This project serves as a manual override for Träwelling's license detection system.
It provides a structured way to define proprietary licenses and associate them with specific GTFS sources, ensuring accurate license information for transit data.

## Contributing

Licenses allowed in `proprietary_licenses` must have a unique identifier and follow the defined schema.
Each license can include details such as name, URL, and additional notes.

A license should adhere to the following legal requirements:

- Must allow users to use, modify, and distribute the licensed work
- Must not require users to pay royalties or fees for using the licensed work
- Must not be specific to a product or technology
- May restrict the use of the licensed work in certain ways (e.g., non-commercial use only), but these restrictions must be clearly stated and not violate the above requirements
- May restrict sub-licensing, but this must be clearly stated and not violate the above requirements

**To add a new license or update existing ones, follow these steps:**

Edit the `licenses.json` file to include the new license information or update existing entries.

The filename for the sources must be the same as in https://traewelling.de/debug/motis-sources and the `spdx` field must match the SPDX identifier for the license if it is a known open-source license.

If the license is not a known open-source license, you can define a custom license in the `proprietary_licenses` section and reference it in the `sources` section using the `custom_license` field.

You have to provide a URL for the license, which can be a link to the license text or a webpage describing the license. This is important for users to understand the terms of the license.

To validate your changes, run the validator as described in the Usage section below.

idk test

Install dependencies:

```bash
npm install
```

## Usage

Run the validator:

```bash
npm run lint
npm run format
npm run validate
```

Or using npm test:

```bash
npm test
```

## What it validates

### JSON Schema Validation

- Validates the structure of `licenses.json` against `schema.json`
- Ensures all required fields are present
- Validates data types (strings, nulls, arrays, objects)
- Validates URI formats for URLs
- Ensures no additional properties beyond those defined in the schema

### Custom Validations

In addition to JSON Schema validation, the validator performs:

1. **License Identifier Uniqueness**: Checks that all license identifiers in `proprietary_licenses` are unique
2. **License Reference Integrity**: Verifies that all `custom_license` references in sources point to existing licenses in `proprietary_licenses`
3. **Source File Uniqueness**: Ensures no duplicate source files are defined
4. **License Assignment**: Warns if a source has neither `spdx` nor `custom_license` defined

## Development

Build TypeScript files:

```bash
npm run build
```

This will compile TypeScript files to the `dist/` directory.
