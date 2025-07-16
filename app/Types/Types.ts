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

export type ProfilClientType = ClientType

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
    vendeurId?: string,
    titre?: string;
    description?: string;
    prix?: number;
    quantite?: number;
    type?: string;
    images?: string[];
    categorie?: string;
    dateAjout?: Date;
}

export type ListProduits = {
    listeProduits: ProduitType[],
    setListeProduits: React.Dispatch<React.SetStateAction<ProduitType[]>>
}



export type PanierType = {
    id?: string,
    idProduit: string,
    produitNom: string,
    typeProduit: string,
    prixInitial: number,
    qte: number,
    prixTotal: number,
    image?: string;
}


export type ProduitCommandeType = {
     _id: string;
  idProduit: string;
  produitNom: string;
  prixInitial: number;
  qte: number;
  prixTotal: number;
  image?: string;
  typeProduit?: string;
};

export type CommandeType = {
     _id: string;
  produits: ProduitCommandeType[];
  localisation: LocalisationType[];
  client: ClientType[];
  total?: number;
  dateAjout?: Date;
};
