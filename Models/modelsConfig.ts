import { model, models, Schema } from "mongoose";

export const ClientSchema = new Schema<ClientTypes>({
    nom: { type: String, require: true },
    prenom: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    tel: { type: String, require: true, unique: true },
    uid: { type: String, require: true, unique: true },
    localisations: [
        {
            region: { type: String },
            ville: { type: String },
            quartier: { type: String }
        }
    ]
})

const LocalisationSchema = new Schema(
    {
        region: { type: String },
        ville: { type: String },
        quartier: { type: String }
    }
);

export const VendeurSchema = new Schema({
    nom: { type: String, required: false },
    prenom: { type: String, required: false },
    nomBoutique: { type: String, required: false },
    tel: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    localisation: [LocalisationSchema],
    image: { type: String },
    origine: { type: String, enum: ["client", "inscription directe"], default: "inscription directe" }
});


export const ProduitSchema = new Schema({
    titre: { type: String, required: true },
    description: { type: String },
    prix: { type: Number, required: true },
    quantite: { type: Number, required: true },
    type: { type: String },
    images: { type: [String], default: [] },
    categorie: { type: String },
    vendeurId: { type: Schema.Types.ObjectId, ref: 'Vendeurs', required: true },
    dateAjout: { type: Date, default: Date.now }
});

export const CommandeSchema = new Schema({
    produits: [
        {
            idProduit: { type: String, required: true },
            produitNom: { type: String, required: true },
            prixInitial: { type: Number, required: true },
            qte: { type: Number, required: true },
            prixTotal: { type: Number, required: true },
            image: String,
            typeProduit: String,
        }
    ],
    localisation: [LocalisationSchema],
    client: [{
        nom: { type: String, required: false },
        prenom: { type: String, required: false },
        tel: { type: String, required: false },
    }],
    total: Number,
    dateAjout: { type: Date, default: Date.now }
})

export const CommandeCollection = models.Commandes || model("Commandes", CommandeSchema);

export const VendeurCollection = models.Vendeurs || model("Vendeurs", VendeurSchema);

export const ClientCollection = models.Clients || model("Clients", ClientSchema);

export const ProduitCollection = models.Produits || model("Produits", ProduitSchema);