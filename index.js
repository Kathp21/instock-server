const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const warehouseRoutes = require('./routes/warehouse');

app.use(cors())
app.use(express.json())

// all warehouses routes
app.use('/warehouse', warehouseRoutes);


const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
