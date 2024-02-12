const router = require('express').Router();
const warehouseController = require('../controllers/warehouse-controller');

router
    .route('/')
    .get(warehouseController.index)
    .post(warehouseController.add);

router
    .route('/:id')
    .delete( warehouseController.deleteWarehouse)
   
   
router
    .route('/:id')
    .get(warehouseController.getwarehousedetail)
    .put(warehouseController.UpdateOne)

router
    .route('/:id/inventories')
    .get(warehouseController.getInventoriesByWarehouseId)


module.exports = router;

