#!/usr/bin/env node
"use strict";
const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split(".");
const major = semver[0];

if (major < 10) {
  console.error("支持node10以上版本");
  process.exit(1);
}

const run = require("./create-form-builder.js");
run();
