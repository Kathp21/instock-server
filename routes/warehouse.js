const router = require('express').Router();
const warehouseController = require('../controllers/warehouse-controller');

router
    .route('/')
    .get(warehouseController.index);
router
    .route('/:id')
    .delete( warehouseController.deleteWarehouse)
   
   
router
    .route('/:id')
    .put(warehouseController.UpdateOne)


module.exports = router;

