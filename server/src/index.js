
const express = require('express');
const createRoutes = require('./routes');


const app = express()
const port = 3000

createRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
