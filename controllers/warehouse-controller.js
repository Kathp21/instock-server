const knex = require('knex')(require('../knexfile'));

const index = async (_req, res) => {
    try {
        const data = await knex('warehouses');
        res.status(200).json(data);
    } catch(err) {
        res.status(400).send(`Error retrieving Warehouses: ${err}`)
    }
}

const UpdateOne = async(req, res) => {

    console.log("check for hitting")
   
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

module.exports = {
    index,
    UpdateOne
}