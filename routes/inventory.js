const router = require('express').Router();
const inventoryController = require('../controllers/inventory-controller');


router
    .route('/')
    .get(inventoryController.index)
    
router
.delete('/:id', inventoryController.deleteInventoryItem);

router
    .route('/:id')
    .get(inventoryController.findOne)
    
module.exports = router;