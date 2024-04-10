const mongoose = require("mongoose");

const homesSchema = new mongoose.Schema({
    image: {
        imagePrincipal: { type: String, required: true },
        image2: { type: String, required: true },
        image3: { type: String, required: true },
        image4: { type: String, required: true }
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    nQuartos: { type: Number, required: true },
    coberta: { type: String, required: true },
    negociation: { type: String, required: true },
    localization: { type: String, required: true },
    rua: { type: String, required: true },
    cep: { type: String, required: true }
});
 

module.exports = mongoose.model("Home", homesSchema);;
