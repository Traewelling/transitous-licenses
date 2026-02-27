import Ajv from "ajv";
import addFormats from "ajv-formats";
import identifiers from "spdx-license-ids/index.json";
import * as fs from "node:fs";
import * as path from "node:path";

const spdxIds = new Set<string>(identifiers);
spdxIds.add("OGL-ROU-1.0"); // Add OGL-ROU-1.0 to the set of valid SPDX identifiers

const allowedSpdxLicenses = new Set<string>([
  "MIT",
  "GPL-3.0-only",
  "ODbL-1.0",
  "CC-BY-4.0",
  "CC-BY-SA-4.0",
  "CC0-1.0",
  "CC-BY-1.0",
  "CC-BY-2.5",
  "CC-BY-3.0",
  "etalab-2.0",
  "NLOD-1.0",
  "OGL-UK-3.0",
  "ODC-By-1.0",
  "CC-BY-NC-4.0",
  "CC-BY-ND-4.0",
  "MIT",
  "OGL-ROU-1.0",
  "CC-BY-SA-3.0",
  "Unlicense",
  "IODL-2.0",
]);

async function validateLicenses(): Promise<void> {
  try {
    // Read schema.json
    const schemaPath = path.join(__dirname, "schema.json");
    const schemaContent = fs.readFileSync(schemaPath, "utf-8");
    const schema = JSON.parse(schemaContent);

    // Read licenses.json
    const licensesPath = path.join(__dirname, "licenses.json");
    const licensesContent = fs.readFileSync(licensesPath, "utf-8");
    const licenses = JSON.parse(licensesContent) as LicensesData;

    // Initialize Ajv with strict mode and draft 2020-12 support
    const ajv = new Ajv({
      strict: true,
      allErrors: true,
      verbose: true,
      validateSchema: false, // Disable meta-schema validation to avoid draft 2020-12 issues
    });

    // Add format validation (for URI format, etc.)
    addFormats(ajv);

    // Compile the schema
    const validate = ajv.compile(schema);

    // Validate the data
    const valid = validate(licenses);

    if (valid) {
      console.log(
        "✅ Validation successful! licenses.json is valid according to schema.json",
      );

      // Additional custom validations
      performCustomValidations(licenses);
    } else {
      console.error("❌ Validation failed! Errors:");
      if (validate.errors) {
        validate.errors.forEach((error, index) => {
          console.error(`\nError ${index + 1}:`);
          console.error(`  Path: ${error.instancePath || "(root)"}`);
          console.error(`  Message: ${error.message}`);
          if (error.params) {
            console.error(
              `  Details: ${JSON.stringify(error.params, null, 2)}`,
            );
          }
        });
      }
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Error during validation:", error);
    process.exit(1);
  }
}

type License = {
  identifier: string;
  name: string | null;
  url: string;
  attribution_test: string | null;
};

type Source = {
  file: string;
  spdx: string | null;
  custom_license: string | null;
};

type LicensesData = {
  proprietary_licenses: License[];
  sources: Source[];
};

/**
 * Performs additional custom validations beyond JSON Schema
 */
function performCustomValidations(data: LicensesData): void {
  console.log("\n🔍 Performing additional validations...\n");

  const errors: string[] = [];

  // Get all license identifiers from proprietary_licenses
  const licenseIdentifiers = new Set<string>(
    data.proprietary_licenses.map((license: License) => license.identifier),
  );

  // Check for duplicate license identifiers
  const seenIdentifiers = new Set<string>();
  data.proprietary_licenses.forEach((license: License, index: number) => {
    if (spdxIds.has(license.identifier)) {
      errors.push(
        `License identifier "${license.identifier}" at index ${index} is a known SPDX license. Consider using the "spdx" field in sources instead of defining it as a custom license.`,
      );
    }
    if (seenIdentifiers.has(license.identifier)) {
      errors.push(
        `Duplicate license identifier found: "${license.identifier}" at index ${index}`,
      );
    }
    seenIdentifiers.add(license.identifier);
  });

  // Validate that all custom_license references exist in proprietary_licenses
  data.sources.forEach((source: Source, index: number) => {
    if (
      source.custom_license &&
      !licenseIdentifiers.has(source.custom_license)
    ) {
      errors.push(
        `Source "${source.file}" (index ${index}) references unknown custom_license: "${source.custom_license}"`,
      );
    }

    if (source.spdx && !spdxIds.has(source.spdx)) {
      errors.push(
        `Source "${source.file}" (index ${index}) has invalid spdx license: "${source.spdx}". It is not a recognized SPDX identifier.`,
      );
    }

    if (source.spdx && !allowedSpdxLicenses.has(source.spdx)) {
      errors.push(
        `Source "${source.file}" (index ${index}) has invalid spdx license: "${source.spdx}". Allowed SPDX licenses are: ${Array.from(allowedSpdxLicenses).join(", ")}`,
      );
    }

    // Check that each source has either spdx or custom_license (or both)
    if (!source.spdx && !source.custom_license) {
      errors.push(
        `Source "${source.file}" (index ${index}) has neither spdx nor custom_license defined`,
      );
    }
  });

  // Check for duplicate source files
  const seenFiles = new Set<string>();
  data.sources.forEach((source: Source, index: number) => {
    if (seenFiles.has(source.file)) {
      errors.push(
        `Duplicate source file found: "${source.file}" at index ${index}`,
      );
    }
    seenFiles.add(source.file);
  });

  // Report results
  if (errors.length === 0) {
    console.log("✅ All custom validations passed!");
    console.log(`\nSummary:`);
    console.log(
      `  - ${data.proprietary_licenses.length} proprietary licenses defined`,
    );
    console.log(`  - ${data.sources.length} data sources registered`);
  } else {
    console.error("⚠️  Custom validation warnings/errors:\n");
    errors.forEach((error, index) => {
      console.error(`  ${index + 1}. ${error}`);
    });
    console.error(`\n${errors.length} issue(s) found`);
    process.exit(1);
  }
}

// Run validation
validateLicenses();
