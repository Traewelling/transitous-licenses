# Transitous Licenses Configuration

This project serves as a manual override for Träwelling's license detection system.
It provides a structured way to define proprietary licenses and associate them with specific GTFS sources, ensuring accurate license information for transit data.

## Setup

Install dependencies:

```bash
npm install
```

## Usage

Run the validator:

```bash
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
