const { obtenerJoyas } = require("../Services/consultas");

const consultas = {

    getJoyas: async (req, res) => {
        const queryStrings = req.query
        const joyas = await obtenerJoyas(queryStrings)
        res.json(joyas)

        
    },

    getFiltros: async (req, res) => {

        
    },

}

module.exports = consultas;