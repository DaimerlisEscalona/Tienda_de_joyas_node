const {
  obtenerJoyas,
  obtenerJoyasPorFiltros,
  obtenerUnicaJoya,
} = require("../Services/consultas");

const consultas = {
  getJoyas: async (req, res) => {
    try {
      const queryStrings = req.query;
      const joyas = await obtenerJoyas(queryStrings);
      const HATEOAS = await prepararHATEOAS(joyas);
      res.json(HATEOAS);
    } catch (error) {
      res.status(500).send("No es posible obtener la información solicitada");
    }
  },

  getJoya: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await obtenerUnicaJoya(id);
      res.json(post);
    } catch (error) {
      res.status(500).send(`No se encontró el articulo:${req.params.id}`);
    }
  },

  getFiltros: async (req, res) => {
    try {
      const queryStrings = req.query;
      const joyas = await obtenerJoyasPorFiltros(queryStrings);
      res.json(joyas);
    } catch (e) {
      console.error(e);
      res.send(e.message);
    }
  },
};

const prepararHATEOAS = (joyas) => {

  const { SERVERHOST } = process.env
  let var_http = ""
  if (SERVERHOST === "localhost")
    var_http = `http://${process.env.SERVERHOST}:${process.env.PORT}/joyas/joya/`
  else
    var_http = `https://${process.env.SERVERHOST}/joyas/joya/`
  console.log(var_http)
  const results = joyas
    .map((m) => {
      return {
        name: m.nombre,
        href: `${var_http}${m.id}`,
      };
    })
    .slice(0, joyas.length);
  let count = 0;
  joyas.map((cantidadJoyas) => (count += cantidadJoyas.stock));
  const totalJoyas = joyas.length;
  const stockTotal = count;
  const HATEOAS = {
    totalJoyas,
    stockTotal,
    results,
  };
  return HATEOAS;
};

module.exports = consultas;
