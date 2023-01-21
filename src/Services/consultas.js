const pool = require("pg")

 const obtenerJoyas = async ({ limits = 10}) =>{
     let consulta = "SELECT * FROM joyas LIMIT $1"
     const { rows: joyas } = await pool.query(consulta, [limits])
     return joyas
}

module.exports = { obtenerJoyas }