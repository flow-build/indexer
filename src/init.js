#!/usr/bin/env node

const fse = require("fs-extra");
const path = require("path");
const current_path = path.resolve(__dirname);
const dest_path = path.parse(path.resolve(__dirname, "../../")).dir;

const src_dir = `${current_path}/db/migrations/`;
const dest_dir = `${dest_path}/db/migrations/`;

(async function main() {
  try {
    await fse.copy(src_dir, dest_dir, { overwrite: true });
    console.log("[INFO] Success!");
    process.exit(0);
  } catch (error) {
    console.log(`[ERROR] Something went wrong!`, error.message);
    process.exit(1);
  }
})();
