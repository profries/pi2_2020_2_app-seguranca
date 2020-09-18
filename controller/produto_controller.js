const Produto = require('../model/produto')

exports.listar = (req, res) => { 
    Produto.find({},(err, produtos) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(produtos);
    });
}


exports.inserir = (req, res) => {
    let novoProduto = new Produto(req.body);        
    novoProduto.save((err, produto) => {
        if(err){
            res.send(err);
        }    
        res.status(201).json(produto);
        
    });
}

exports.atualizar = (req, res) => {
    let id = req.params.id;
    let produtoAtualizar = req.body;
    Produto.findOneAndUpdate({ _id: id }, produtoAtualizar, { new: true }, (err, produtoAtual) => {
        if(err){
            res.send(err);
        }
        res.json(produtoAtual);
    });
}

exports.deletar = (req, res) => {
    let id = req.params.id;
    Produto.findOneAndDelete({ _id: id }, (err, produtoAtual) => {
        if(err){
            res.send(err);
        }
        res.json(produtoAtual);
    });
}

exports.buscarPorId = (req, res) => {
    let id = req.params.id;
    Produto.findById(id, (err, produto) => {
        if(err)
            res.status(500).send(err);        
        res.json(produto);
    });    
}

exports.procurar = (req, res, next) => {
    if (req.query && req.query.nome){
        const paramNome = req.query.nome;
        Produto.find({nome: paramNome}, (err, produtos) => {
            if(err){
                res.status(500).send(err);
            }
            res.json(produtos);
        });
    }
}
