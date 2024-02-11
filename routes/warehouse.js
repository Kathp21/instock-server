const router = require('express').Router();
const warehouseController = require('../controllers/warehouse-controller');

router
    .route('/')
    .get(warehouseController.index)
    

router
    .route('/:id')
    .put(warehouseController.UpdateOne)

router
    .route('/:id/inventories')
    .get(warehouseController.getInventoriesByWarehouseId)


module.exports = router;