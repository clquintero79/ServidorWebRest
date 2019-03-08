/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var request = require('request');

//Obtener todas las entradas de blog
// var configuracion = {
//     url:'http://localhost:8080/',
//     method:'GET'

// };
// request(configuracion,function(error,response,body){
//     console.log('Estos son los blog');
//     var entradas = JSON.parse(body);
//     for (let index = 0; index < entradas.length; index++) {
//         console.log(`-----------Este es el Blog:${index}--------`);
//         console.log(`Autor: ${entradas[index].autor}`);
//         console.log(`Fecha: ${entradas[index].fecha}`);
//         console.log(`Tema: ${entradas[index].tema}`);
//         console.log(`------------Comentarios-----------`);
        
//             for (const key in entradas[index].comentarios) {
//                 console.log(`Estos son los comentarios del Blog de: ${entradas[index].autor} `);
//                 console.log(`**${entradas[index].comentarios[key]}`);
//             }
        
        
//         console.log(`------------Fin-----------------------------------`);
//     }
// });

//Crear entrada
// var entrada = {
//     autor:'Miranda desde el cliente',
//     fecha:'2019-03-07',
//     tema:'Mongo db'
// }
// var configuracionCrear = {
//     url:'http://localhost:8080/entrada',
//     method:'POST',
//     json:true,
//     headers:{
//         "content-type":"application/json"
//      },
//     body:entrada
// };
// request(configuracionCrear, function (error, response, body) {
//     console.log("**********************************");
//     console.log("Blog Creado desde el cliente");
//     console.log("**********************************");
// });

//Borrar entrada

// var idBlogBorrar = "5c820cef378afe43092c48b5";

// var configuracionBorrar = {
//     url: "http://localhost:8080/entrada/"+idBlogBorrar,
//     method: "DELETE",
// }

// request(configuracionBorrar, function (error, response, body) {
//     console.log("----------------------------------");
//     console.log("Borrando el blog "+idBlogBorrar)
//     console.log("----------------------------------");
// })

// //Obtener una entrada por id
// var id = '5c820c4f378afe43092c48b4'
// var configuracionPorId = {
//     url:'http://localhost:8080/entrada/'+id,
//     method:'GET'

// };
// request(configuracionPorId,function(error,response,body){
//     console.log('Estos es la información del blog'+id);
//     var entrada = JSON.parse(body);
//     console.log(entrada[0].autor);
//         console.log(`-----------Este es el Blog:${entrada[0].autor}--------`);
//         console.log(`Fecha: ${entrada[0].autor}`);
//         console.log(`Tema: ${entrada[0].tema}`);
//         console.log(`------------Comentarios-----------`);
        
//             for (const key in entrada[0].comentarios) {
//                 console.log(`Estos son los comentarios del Blog de: ${entrada[0].autor} `);
//                 console.log(`**${entrada[0].comentarios[key]}`);
//             }
        
        
//         console.log(`------------Fin-----------------------------------`);
//     }
//    );
// Modificar una entrada por id, adicionándole comentarios
// Para agregar comentarios se necesita que  la entrada
// este alamacenada
var id = '5c5e314be0e40aae0534a6d8';

var entrada = {
    comentarios:"Esto es un comentario desde el cliente web "
}
var configuracionPUT = {
    url:'http://localhost:8080/entrada/'+id,
    method:'PUT',
    json:true,
    headers:{
        "content-type":"application/json"
    },
    body:entrada

};
request(configuracionPUT, function (error, response, body) {
    if (error) {
        console.log('Error ');
        
    } else {
        console.log("**********************************");
        console.log("Blog Modifcado ");
        console.log("**********************************");
        
    }
    
});
