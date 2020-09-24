const Usuario = require('../model/usuario')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.listar = (req, res) => { 
    Usuario.find({},(err, usuarios) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(usuarios);
    });
}


exports.inserir = (req, res) => {
    let novoUsuario = new Usuario(req.body);
    novoUsuario.senha = bcrypt.hashSync(req.body.senha,10);        
    novoUsuario.save((err, usuario) => {
        if(err){
            res.send(err);
        }    
        res.status(201).json(usuario);
        
    });
}

exports.atualizar = (req, res) => {
    let id = req.params.id;
    let usuarioAtualizar = req.body;
    Usuario.findOneAndUpdate({ _id: id }, usuarioAtualizar, { new: true }, (err, usuarioAtual) => {
        if(err){
            res.send(err);
        }
        res.json(usuarioAtual);
    });
}

exports.deletar = (req, res) => {
    let id = req.params.id;
    Usuario.findOneAndDelete({ _id: id }, (err, usuarioAtual) => {
        if(err){
            res.send(err);
        }
        res.json(usuarioAtual);
    });
}

exports.buscarPorId = (req, res) => {
    let id = req.params.id;
    Usuario.findById(id, (err, usuario) => {
        if(err)
            res.status(500).send(err);        
        res.json(usuario);
    });    
}

exports.buscarUsuario = (req, res, next) => {
    if (req.query && req.query.usuario){
        const paramUsuario = req.query.usuario;
        console.log(paramUsuario);
        Usuario.findOne({usuario: paramUsuario}, (err, usuario) => {
            if(err){
                res.status(500).send(err);
            }
            res.json(usuario);
        });
    }    
}

exports.validaUsuario = (req, res, next) => {
    if (req.body && req.body.usuario && req.body.senha){
        const username = req.body.usuario;
        const senha = req.body.senha
        Usuario.findOne({usuario: username}, (err, usuario) => {
            if(err){
                res.status(500).send(err);
            }
            const valido = bcrypt.compareSync(senha, usuario.senha);
            if(usuario && valido){
                const token = jwt.sign({
                    id: usuario.id
                }, 'Sen@cr5', {expiresIn: "1h"});
                res.status(201).send({"token":token});
            }
            else{
                res.status(401).send("Usuario ou senha invalidos");
            }
        });
    }
}

exports.validaToken = (req, res, next) => {
    const token = req.get("x-auth-token");
    if(!token) {
        res.status(401).send("Nao tem token de acesso");
    }
    else {
        jwt.verify(token,'Sen@cr5',(err,userId) =>{
            if(err){
                res.status(401).send(err);
            }
            else {
                console.log("Usuario autorizado: "+userId);
                next();
            }
        })
    }
}