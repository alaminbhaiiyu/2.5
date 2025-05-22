/**
 * @author NTKhang
 * ! The source code is written by NTKhang...
 */

global.ReadableStream = require('web-streams-polyfill').ReadableStream;

const { spawn } = require("child_process");
const log = require("./logger/log.js");
const express = require('express');
const app = express();
const PORT = 8000;

function startProject() {
    const child = spawn("node", ["Goat.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", (code) => {
        if (code == 2) {
            log.info("Restarting Project...");
            startProject();
        }
    });
}

startProject();

// Express middleware (optional)
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('✅ Server is running on http://localhost:8000');
});

// Start Express server on port 8000
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
