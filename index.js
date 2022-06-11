const express = require('express');
const app = express();
const { create } = require('express-handlebars'); // se crea la instancia

const { consulta, modificar } = require("./consultas"); 

app.listen(3000, console.log("Servidor corriendo en http://localhost:3000/"))

app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/assets", express.static(__dirname + "/public/assets/"));

/* app.use("/fontawesome", express.static(__dirname + "/node_modules/font-awesome")); */
//app.use(express.static(__dirname +"/assets"));

const hbs = create({
    partialDir : ["views/partials/"]
})

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");




app.get ("/", function (req, res) {
   // const verduras = Object.values(consulta());
   consulta().then(respuesta => {
      // console.log(respuesta);
       res.render("dashboard",{
           productos: respuesta,
           mensaje: "Bienvenido al mercado WEB, seleccione sus productos"
       });

   }).catch(error => {
       console.log(error);
       res.sendStatus(500);
   })

})

app.put("/productos/:id", (req,res) =>{
    let id = req.params.id;
    modificar(id).then(respuesta => {
        res.end()
    }).catch(error => {
        res.sendStatus(500);
    })
})