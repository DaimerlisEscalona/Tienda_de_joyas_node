const express = require("express");
const cors = require('cors');
const indexRoutes = require('./Routes/indexRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoutes);

app.use('*', function (req, res) {

    res.send("Error. Intente nuevamente con una ruta correcta.");

});

// const PORT = process.env.portServer;

// app.listen(PORT, (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log(`server is running on port ${PORT}`);
// });

app.listen(3000, console.log("¡Servidor encendido de manera exitosa!"));

// app.listen(0, function(){
//     console.log("¡Servidor encendido de manera exitosa!", this.address().port)
// }) 