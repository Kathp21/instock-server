const router = require('express').Router();
const inventoryController = require('../controllers/inventory-controller');


router
    .route('/')
    .get(inventoryController.index)
    .post(inventoryController.add)
    
// router
//     .delete('/:id', inventoryController.deleteInventoryItem);

router
    .route('/:id')
    .get(inventoryController.findOne)
    .put(inventoryController.UpdateOne)
    .delete(inventoryController.deleteInventoryItem)
    
module.exports = router;