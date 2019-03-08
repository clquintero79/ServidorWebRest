var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var session = require('express-session');
var zonaPrivada = express.Router();

app.use(session({
    secret:'uiomdf',
    resave:true,
    saveUninitialized:true
}));
//Enviar datos a través de formularios
//Meter en la aplicación el parseador de url
app.use(bodyParser.urlencoded({extended:true}));


//Enviar datos a través de servicios web en json
app.use(bodyParser.json());

//Devolver todos los entradas
app.get("/",function(req,res){
  
    // //Para que devuelva un Json le damos stringify(entradas);
    // res.send(JSON.stringify(anuncios));
    MongoClient.connect('mongodb://masterdb:GabSant2@ds225375.mlab.com:25375/blogtec', 
    function(err, db) {
        console.log("Conectado al servidor")
                
        var collection = db.collection('entradas');
        collection.find({}).toArray(function (err, result) {
            res.status(200);
            res.json(result); 

            // Cerrar el cliente
            db.close();
        });
      
    });
});


//Devolver una entrada predeterminada
app.get("/entrada/:id",function(req,res){
    //recibimos el id  
    //Transformar en un objeto id de mongo
    var idEntrada = require('mongodb').ObjectID(req.params.id);
    MongoClient.connect('mongodb://masterdb:GabSant2@ds225375.mlab.com:25375/blogtec', 
    function(err, db) {
        console.log("Conectado al servidor")       
        var collection = db.collection('entradas');
        collection.find({_id:idEntrada}).toArray(function (err, result) {
            res.status(200);
            res.json(result); 
            // Cerrar el cliente
            db.close();
        });
      
    });
});

//Actualizar introduciendo comentarios
//No se puede ingresar un comentario si la entrada
//No existe
app.put("/entrada/:id",function(req,res){
    //recibimos el id  
    //Transformar en un objeto id de mongo
    console.log(req.body.comentarios);
    var idEntrada = require('mongodb').ObjectID(req.params.id);
    MongoClient.connect('mongodb://masterdb:GabSant2@ds225375.mlab.com:25375/blogtec', 
    function(err, db) {
        if (err) {
            res.status(500);
            //Esto es para crear un json de error
            res.json({
            mensaje:"Error en la base de datos",
             insertado:false
            });
        } else {
            console.log("Conectado al servidor")   
            var collection = db.collection('entradas');
            collection.update({_id:idEntrada}, {$addToSet:{"comentarios":req.body.comentarios}},function (err, result) {
                res.status(200);
                //res.json(result); 
                res.json(
                    { 
                        mensaje:"Modificado con exito"
                    });
                // Cerrar el cliente
                db.close();
        });
    }
      
    });
});


//Eliminar una entrada determinada
app.delete("/entrada/:id",function(req,res){
    //recibimos el id  
    //Transformar en un objeto id de mongo
    var idEntrada = require('mongodb').ObjectID(req.params.id);
    MongoClient.connect('mongodb://masterdb:GabSant2@ds225375.mlab.com:25375/blogtec', 
    function(err, db) {
        console.log("Conectado al servidor")        
        var collection = db.collection('entradas');
        collection.remove({_id:idEntrada},function (err, result) {
            if (err) {
                res.status(500);
                //Esto es para crear un json de error
                res.json({
                    mensaje:"Error  borrando en la base de datos",
                    insertado:false
                });
                
            } else {
                res.status(200);
            res.json(
                {
                    mensaje:"borrado con exito"
                }); 
            // Cerrar el cliente    
            }
            db.close();
        });
    });
});
app.post("/entrada",function(req,res){
    MongoClient.connect('mongodb://masterdb:GabSant2@ds225375.mlab.com:25375/blogtec',
                           function(err,db){
                               if (err) {
                                   res.status(500);
                                   //Esto es para crear un json de error
                                   res.json({
                                       mensaje:"Error en la base de datos",
                                       insertado:false
                                   });
                                   
                               } else {
                                   console.log('Conectado al servidor');
                                   var entrada = {
                                    autor:req.body.autor,
                                    fecha:req.body.fecha,
                                    tema:req.body.tema
                                    
                                };
                                   var collection = db.collection('entradas');
                                   collection.insert(entrada,function(err,result){
                                       if (err) {
                                           res.status(500);
                                           //Esto es para crear un json de error
                                           res.json({
                                               mensaje:"Error en la base de datos",
                                               insertado:false
                                           });
                                           
                                       } else {
                                           //Hay exito y se ha creado un nuevo recurso
                                           res.status(201);
                                           //Esto es para crear un json de error
                                           res.json({
                                              
                                               insertado:true
                                           });
                                           db.close();
                                           
                                       }
                                      
                                  });
                                   
                               }
                               

                           });    

   
})
//Registrar usuario
app.post("/registrar",function(req,res){
    MongoClient.connect('mongodb://masterdb:GabSant2@ds225375.mlab.com:25375/blogtec',
                           function(err,db){
                               if (err) {
                                   res.status(500);
                                   //Esto es para crear un json de error
                                   res.json({
                                       mensaje:"Error en la base de datos",
                                       insertado:false
                                   });
                                   
                               } else {
                                   console.log('Conectado al servidor');
                                   var usuario = {
                                    login:req.body.login,
                                    password:req.body.password
                                    
                                    
                                };
                                   var collection = db.collection('usuarios');
                                   collection.insert(usuario,function(err,result){
                                       if (err) {
                                           res.status(500);
                                           //Esto es para crear un json de error
                                           res.json({
                                               mensaje:"Error en la base de datos",
                                               insertado:false
                                           });
                                           
                                       } else {
                                           //Hay exito y se ha creado un nuevo recurso
                                           res.status(201);
                                           //Esto es para crear un json de error
                                           res.json({
                                              
                                               insertado:true
                                           });
                                           db.close();
                                           
                                       }
                                      
                                  });
                                   
                               }
                               

                           });    

   
})
//consultar usuario
app.get("/usuario/:login/:pass",function(req,res){
    //recibimos el id  
    //Transformar en un objeto id de mongo
    var loginIng = req.params.login;
    var passIng = req.params.pass;
    MongoClient.connect('mongodb://masterdb:GabSant2@ds225375.mlab.com:25375/blogtec', 
    function(err, db) {
        console.log("Conectado al servidor")       
        var collection = db.collection('usuarios');
        collection.find({login:loginIng}).toArray(function (err, result) {
            res.status(200);
            //res.json(result); 
            console.log(passIng);
            console.log(result[0].password);
            if (result[0].password == passIng) {
                console.log("usuario autenticado");
                res.json({
                    mensaje:"El usuario se encuentra autenticado en el sistema"

                });
                req.session.nombre = loginIng
                console.log(req.session.nombre);
            } else {
                res.json({
                    mensaje:"Password incorrecto"

                });
                console.log("credenciales inválidas")
                
            }

            // Cerrar el cliente
            db.close();
        });
      
    });
});

//Sesión de usuario
app.use('/perfil/',zonaPrivada);


app.get('/perfil/pag1',function(req,res){
        res.send('El ususario'+req.session.nombre+" tiene una sesión abierta");   
    
})

app.listen(8080,function(){
    console.log('Funcionando en el puerto 8080');

})