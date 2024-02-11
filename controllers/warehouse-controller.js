const knex = require('knex')(require('../knexfile'));

const index = async (_req, res) => {
    try {
        console.log("Iam inside")
        const data = await knex('warehouses');
        res.status(200).json(data);
    } catch(err) {
        res.status(400).send(`Error retrieving Warehouses: ${err}`)
    }
}


const deleteWarehouse = async (req, res) => {
    console.log("Deleting warehouse");
    const warehouseId = req.params.id;
    try {
        await knex.transaction(async trx => {
            const rowsAffected = await trx("inventories").where("warehouse_id", warehouseId).del();
            console.log("RowsAffected",rowsAffected)

            if (rowsAffected === 0) {
                console.error("Id doesnt exist ")
            return res.status(404).send();
            } else{
                console.log("Successfully deleted")
            return  res.status(204).send()
            }
        });

    } catch (error) {
        console.error("Error deleting the warehouse: ", error);
        res.status(500).send("Server error");
    }
};


module.exports = { index, deleteWarehouse }