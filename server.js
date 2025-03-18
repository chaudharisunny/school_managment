const express = require('express')
const app = express()
const port = 3000
const db=require('./config/db.js')
const routesIndex=require('./router/index')

app.use(express.json())
app.use('/',routesIndex)
app.get("/test-db", async (req, res) => {
    try {
      const result = await pool.query("SELECT NOW()");
      res.json({ message: "Database connected!", time: result.rows[0] });
    } catch (err) {
      console.error("Database connection error:", err);
      res.status(500).json({ error: "Database connection failed" });
    }
  });
app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 