const knex = require('knex')(require('../knexfile'));

const index = async (req, res) => {
    try {
        const data = await knex('inventories')
            .join('warehouses', 'inventories.warehouse_id', '=', 'warehouses.id') 
            .select('inventories.*', 'warehouses.warehouse_name as warehouse_name'); 

        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving Inventories: ${err}`);
    }
}


//Get a Single Inventory 
const findOne = async (req, res) => {
    try{
        const inventoriesFound = await knex('inventories')
            .join('warehouses', 'inventories.warehouse_id', '=', 'warehouses.id') 
            .select('inventories.*', 'warehouses.warehouse_name as warehouse_name')
            .where('inventories.id', '=', req.params.id);
            if (inventoriesFound.length === 0) {
                return res.status(404).json({
                    message: `Inventory with ID ${req.params.id} not found`
                })
            }
            const inventoryData = inventoriesFound[0]
            res.json(inventoryData)
    } catch(error) {
        res.status(500).json({
            message: `Unable to retrieve inventory data for item with ID ${req.params.id}`, 
        })
    }
}

//update a single inventory
const UpdateOne = async(req, res) => {
   
    const { id, itemName,description,category,status, warehouseName } = req.body;

    try{
        const inventoriesValue = await knex('inventories')
            .join('warehouses', 'inventories.warehouse_id', '=', 'warehouses.id') 
            .select('inventories.*', 'warehouses.warehouse_name as warehouse_name')
            .where('inventories.id', '=', req.params.id)
            .update({
                item_name: itemName,
                warehouse_name: warehouseName,
                description: description,
                category: category,
                status: status,
            })


            if (inventoriesValue.length === 0) {
                return res.status(404).json({
                    message: `Inventory with ID ${req.params.id} not found`
                })
            }
            const inventoryData = inventoriesValue[0];
            res.json(inventoryData);

            
    } catch(error) {
        res.status(500).json({
            message: `Unable to retrieve inventory data for item with ID ${req.params.id}`, 
        })
    }
    
   
}

const deleteInventoryItem = async (req, res) => {
    const { id } = req.params; 
    
    try {
        const deletedCount = await knex('inventories') 
            .where({ id })
            .del();
        
        if (deletedCount === 0) {
            
            return res.status(404).end();
        }

        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

module.exports = { 
    index,
    findOne,
    UpdateOne,
    deleteInventoryItem, 
 }