const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>NextWork Node DevOps Project</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 80px auto; padding: 20px; }
          .card { padding: 20px; border: 1px solid #ddd; border-radius: 10px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>NextWork Node.js DevOps Project</h1>
          <p>Application is running successfully.</p>
          <p>Runtime: Node.js + Express</p>
        </div>
      </body>
    </html>
  `);
});

app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
