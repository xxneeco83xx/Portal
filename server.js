//server.js

/*Creamos la configuracion del servidor*/ 
var express = require('express');
var app = express();
var mongoose = require('mongoose');

/*Configuracion de la base de datos*/
var portNumber = '27017';
var dataBaseName = 'Test';

/*Creamos la conexion a la base de datos*/
mongoose.connect('mongodb://localhost:' + portNumber + '/' + dataBaseName);

app.configure(function() {
    app.use(express.static(__dirname + '/public')); //Ubicacion de los ficheros estaticos
    app.use(express.logger('dev')); //Mostrar logs de todos los request
    app.use(express.bodyParser()); //Recibir el HTML con POST
    app.use(express.methodOverride()); //PUT & DELETE
});

//MODELO DE BASE DE DATOS
/*var schemaBase = new mongoose.Schema({
    test: String
});

var Base = db.model('Base', schemaBase);
module.exports = Base; */

// Rutas de nuestro API
// GET de todos los TODOs
app.get('/api/todos', function(req, res) {  
    Todo.find(function(err, todos) {
        if(err) {
            res.send(err);
        }
        res.json(todos);
    });
});

// POST que crea un TODO y devuelve todos tras la creaci�n
app.post('/api/todos', function(req, res) {  
    Todo.create({
        text: req.body.text,
        done: false
    }, function(err, todo){
        if(err) {
            res.send(err);
        }

        Todo.find(function(err, todos) {
            if(err){
                res.send(err);
            }
            res.json(todos);
        });
    });
});

// DELETE un TODO especifico y devuelve todos tras borrarlo.
app.delete('/api/todos/:todo', function(req, res) {  
    Todo.remove({
        _id: req.params.todo
    }, function(err, todo) {
        if(err){
            res.send(err);
        }

        Todo.find(function(err, todos) {
            if(err){
                res.send(err);
            }
            res.json(todos);
        });

    })
});

// Carga una vista HTML simple donde ira nuestra Single App Page
// Angular Manejara el Frontend
app.get('*', function(req, res) {  
    res.sendfile('./public/index.html');                
});

// Escucha en el puerto 8080 y corre el server
app.listen(8080, function() {  
    console.log('App listening on port 8080');
});