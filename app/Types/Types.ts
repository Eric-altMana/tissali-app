export type ClientType = {
    _id?: string,
    uid?: string,
    nom?: string,
    prenom?: string,
    password?: string
    tel?: string,
    email?: string,
    localisations?: LocalisationType[];
}

export type LocalisationType = {
    region: string;
    ville: string;
    quartier: string;
};

export type VendeurType = {
    _id?: string,
    nom?: string,
    prenom?: string,
    type?: string, // Ajout du type pour le vendeur
    nomBoutique?: string,
    tel?: string,
    email: string,
    password: string,
    localisation?: LocalisationType[], // Correction ici
    image?: File
}

export type ProduitType = {
    _id?: string;
    titre?: string;
    vendeurId?: string,
    produitNom?: string;
    description?: string;
    prixInitial?: number;
    prixTotal: number;
    quantite?: number;
    typeProduit?: string;
    images?: string;
    image?: string;
    categorie?: string;
    dateAjout?: Date;
}

export type ListProduits = {
    listeProduits: ProduitType[],
    setListeProduits: React.Dispatch<React.SetStateAction<ProduitType[]>>
}



export type PanierType = {
    id?: string,
    vendeurId?: string,
    idProduit: string,
    produitNom: string,
    typeProduit: string,
    prixInitial: number,
    qte: number,
    qteVendue?: number,
    qteRestante?: number,
    prixTotal: number,
    images?: string;
    image?: string,
    description?: string,
    dateAdd?: Date
}


/*export type ProduitCommandeType = {
  _id: string,
  vendeurId?: string,
  idProduit: string,
  produitNom: string,
  prixInitial: number,
  qte: number,
  prixTotal: number,
  image?: string,
  typeProduit?: string,
}; */

export type CommandeType = {
  _id?: string,
  vendeurId?: string,
  panier?: PanierType[],
  produits?: ProduitType[],
  localisation?: LocalisationType[],
  client?: ClientType[],
  total?: number,
  dateAjout?: Date
};

export type CategorieType = {
    labelCategorie: string,
    slug: string
}
