var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UsuarioSchema = new Schema({
    usuario: String,
    senha: String,
    email: String
}, {
    versionKey:false
});

module.exports = mongoose.model("Usuario", UsuarioSchema);