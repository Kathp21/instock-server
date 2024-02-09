const router = require('express').Router();
const inventoryController = require('../controllers/inventory-controller');


router
    .route('/')
    .get(inventoryController.index)

router
    .route('/:id')
    .get(inventoryController.findOne)


module.exports = router;