# Web Audit Documentation

This document outlines the process for performing a web audit on this project.

## Broken Link Checking

Broken links are identified using the `linkinator` package. To run a scan and save the report, use the following command:

```bash
npm run test:links > linkinator.log 2>&1
```

This will scan the site and create a log file named `linkinator.log` in the root directory. This file is excluded from the Jekyll build.
