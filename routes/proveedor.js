var express = require('express');
var mongoose = require('mongoose');

var Proveedor = require('../models/proveedor.js');

var app = express();

app.get('/', (req,res,next) => {
    Proveedor.find({}).exec((err, proveedores)=>{
        // En proveedores se cargan los datos del  proveedor encontrado
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error de acceso a la bdd',
                errores: err
            })
        }
        res.status(200).json(proveedores);
        // res.status(200).json({
        //     ok: true,
        //     proveedores: proveedores
        // })
    });
});

app.post('/', (req,res)=>{
    var body = req.body;
    var proveedor = new Proveedor({
        nombre: body.nombre,
        cif: body.cif,
        domicilio: body.domicilio,
        cp: body.cp,
        localidad: body.localidad,
        provincia: body.provincia,
        telefono: body.telefono,
        email: body.email,
        contacto: body.contacto,
    });

    proveedor.save((err, proveedorGuardado)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje: 'Error al crear el proveedor',
                errores: err
            })
        }
        res.status(200).json({
            ok:true,
            mensaje: proveedorGuardado
        })
    });

});

app.put('/:id', function(req, res, next){

    Proveedor.findByIdAndUpdate(req.params.id, req.body, function(err,datos){
        if (err) return next (err);
        res.status(201).json({
            ok:'true',
            mensaje:'Proveedor actualizado'
        });
    });

});

app.delete('/:id', function(req,res,error){
    Proveedor.findByIdAndRemove(req.params.id,function(err, datos){
        //Podemos dejar o quitar el campo "proveedor" o "datos" ya que no es necesario.
        //Se lo pondremos si queremos devolver información sobre la entidad
        if (err) return next (err);
        var mensaje = "El proveedor " + datos.nombre + " ha sido eliminado";
        res.status(201).json({
            ok:'true',
            // mensaje:'Proveedor eliminado'
            mensaje: mensaje
        });
    });
});

module.exports = app;