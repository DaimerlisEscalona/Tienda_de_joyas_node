const format = require("pg-format");
const pool = require("../DataBase/db");

const obtenerJoyas = async ({
  limits = 30,
  page = 1,
  order_by = "stock_ASC",
}) => {
  try {
    let offset = (page - 1) * limits;

    const [stock] = order_by.split("_");
    const consulta = format("SELECT * FROM inventario ORDER BY %s LIMIT %s OFFSET %s",
      stock,
      limits,
      offset
    );
    const { rows: joyas } = await pool.query(consulta);

    return joyas;
  } catch (error) {
    if (page <= 0) {
      res.status(400).send(error);
    } else {
      res.status(500).send(error);
    }
  }
};

const obtenerUnicaJoya = async (id) => {
  const consulta = "SELECT * FROM inventario WHERE id = $1";
  const values = [id];
  const { rowCount, rows } = await pool.query(consulta, values);

  if (rowCount === 0) {
    throw { code: 404, message: "No se consiguió ninguna joya con este id" };
  } else return rows;
};

const obtenerJoyasPorFiltros = async ({
  precio_max,
  precio_min,
  metal,
  categoria,
}) => {
  let filtros = [];
  const values = [];

  const agregarFiltro = (campo, comparador, valor) => {
    values.push(valor);
    const { length } = filtros;
    filtros.push(`${campo} ${comparador} $${length + 1}`);
  };

  if (precio_max) agregarFiltro("precio", "<=", precio_max);
  if (precio_min) agregarFiltro("precio", ">=", precio_min);
  if (metal) agregarFiltro("metal", "=", metal);
  if (categoria) agregarFiltro("categoria", "=", categoria);
  let consulta = "SELECT * FROM inventario";
  if (filtros.length > 0) {
    filtros = filtros.join(" AND ");
    consulta += ` WHERE ${filtros}`;
  }

  const { rows: joyas } = await pool.query(consulta, values);
  return joyas;
};

module.exports = { obtenerJoyas, obtenerJoyasPorFiltros, obtenerUnicaJoya };
