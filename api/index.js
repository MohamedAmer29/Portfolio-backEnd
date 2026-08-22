// Vercel serverless entry point.
// Explicitly require "pg" so Vercel's bundler (nft) traces and includes it
// in the function bundle. Without this, TypeORM fails at runtime with
// DriverPackageNotInstalledError: Postgres package has not been found installed.
require('pg');

const { default: handler } = require('../dist/main');

module.exports = handler;
