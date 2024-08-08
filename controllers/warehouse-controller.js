const knex = require('knex')(require('../knex'));

const index = async (_req, res) => {
    try {
        const data = await knex('warehouses');
        res.status(200).json(data);
    } catch(err) {
        res.status(400).send(`Error retrieving Warehouses: ${err}`)
    }
};


const add = async (req, res) => {

    const {
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_email,
        contact_phone
    } = req.body;

    // Check if all required fields are provided
    if (!warehouse_name || !address || !city || !country || !contact_name || !contact_position || !contact_phone || !contact_email) {
        return res.status(400).json({
            message: "Please fill out all form details to submit new warehouse."
        });
    }

    try {
        const result = await knex("warehouses").insert({
            warehouse_name,
            address,
            city,
            country,
            contact_name,
            contact_position,
            contact_email,
            contact_phone
        })
        const newWarehouseId = result[0]
        const createNewWarehouse = await knex("warehouses").where({ id: newWarehouseId })

        res.status(201).json(createNewWarehouse);
    } catch (err) {
        console.error(`Error creating new warehouse: ${err}`);
        res.status(500).json({
            message: `Unable to create new warehouse: ${err}`
        })
    }
};


const deleteWarehouse = async (req, res) => {
    console.log("Deleting warehouse");
    const { id } = req.params
    try {
        const deletedCount = await knex('warehouses')
            .where('id', id)
            .del()

            if(deletedCount === 0) {
                return res.status(404).json({message: 'Warehouse not found'})
            }
        res.status(204).end()

    } catch (error) {
        console.error("Error deleting the warehouse: ", error);
        res.status(500).send("Server error");
    }
};



const UpdateOne = async(req, res) => {

   
   
    const { id, warehouse_name,address,city,country, contact_name, contact_position, contact_phone, contact_email } = req.body;

    try{
        const warehouseValue = await knex('warehouses')
            .where('warehouses.id', '=', req.params.id)
            .update({
                warehouse_name: warehouse_name,
                address: address,
                city: city,
                country: country,
                contact_name: contact_name,
                contact_position: contact_position,
                contact_phone: contact_phone,
                contact_email: contact_email,

            })
            if (warehouseValue.length === 0) {
                return res.status(404).json({
                    message: `warehouse with ID ${req.params.id} not found`
                })
            }
            const warehouseData = warehouseValue[0];
            res.json(warehouseData);

            
    } catch(error) {
        res.status(500).json({
            message: `Unable to retrieve inventory data for item with ID ${req.params.id}`, 
        })
    }
    
   
}

const getwarehousedetail= async (req, res )=>{
    try{
        const warehousedetail = await knex('warehouses')
            .where('warehouses.id', '=', req.params.id);
            if (warehousedetail.length === 0) {
                return res.status(404).json({
                    message: `Inventory with ID ${req.params.id} not found`
                })
            }
            const wareHousevalue = warehousedetail[0]
            res.json(wareHousevalue)
    } catch(error) {
        res.status(500).json({
            message: `Unable to retrieve inventory data for item with ID ${req.params.id}`, 
        })
    }

}

const getInventoriesByWarehouseId = async (req, res) => {
    try {
        const inventoriesFound = await knex('inventories')
            .select('*') 
            .where('warehouse_id', '=', req.params.id); 
        if (inventoriesFound.length === 0) {
            return res.status(404).json({
                message: `Inventories for Warehouse with ID ${req.params.id} not found`
            });
        }

        console.log("Inventories Found", inventoriesFound);
        return res.json(inventoriesFound);
    } catch (error) {
        console.error("Error retrieving inventories:", error); 
        res.status(500).json({
            message: `Unable to retrieve inventory data for Warehouse with ID ${req.params.id}`, 
        });
    }
}


module.exports = {
    index,
    add,
    UpdateOne,
    deleteWarehouse,
    getInventoriesByWarehouseId,
    getwarehousedetail
}



