const format = require('pg-format');
const pool = require('../DataBase/db')

const obtenerJoyas = async ({ limits = 3, page = 1, order_by = "stock_ASC"}) => {

    let offset =  (page - 1) * limits;
    const [Stock] = order_by.split("_");
    const consulta = format ('SELECT * FROM inventario ORDER BY %s LIMIT %s OFFSET %s', limits, offset,Stock)
    const { rows: joyas } = await pool.query(consulta);
    return joyas
}

module.exports = { obtenerJoyas }
