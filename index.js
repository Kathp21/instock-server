const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const warehouseRoutes = require('./routes/warehouse')
const inventoryRoutes = require('./routes/inventory')

app.use(cors())
app.use(express.json())

// all warehouses routes
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/inventories', inventoryRoutes);


const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
