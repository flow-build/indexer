#!/usr/bin/env node
const { existsSync } = require("fs");
const { copy } = require("fs-extra");
const path = require("path");
const current_path = path.resolve(__dirname);
const dest_path = path.parse(path.resolve(__dirname, "../../../")).dir;

const src_dir = path.resolve(current_path, "../db/migrations/");
const dest_dir = `${dest_path}/db/migrations/`;

(async function main() {
  try {
    if (!existsSync(dest_dir)) {
      console.log("migrations folder not found");
    } else {
      console.log(`moving migrations to ${dest_dir}`);
      await copy(src_dir, dest_dir, { overwrite: true });
      console.log("[INFO] Success!");
      process.exit(0);
    }
  } catch (error) {
    console.log(`[ERROR] Something went wrong!`, error.message);
    process.exit(1);
  }
})();
