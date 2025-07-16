import { GenerateToken } from "@/app/controllers/security/token";
import { auth, db } from "@/lib/firebaseConfig";
import { dbConnect } from "@/lib/mongoConfig";
import { VendeurCollection, ClientCollection } from "@/Models/modelsConfig";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {

        const data = await req.json()

        const connect = await dbConnect();
        if (connect !== "db connected") {
            return NextResponse.json(
                { message: "Erreur de connexion à la base de données." },
                { status: 500 }
            );
        }

        // Formatage de la localisation
        let localisationArray = [];
        if (Array.isArray(data.localisation)) {
            localisationArray = data.localisation;
        } else if (typeof data.localisation === "object" && data.localisation !== null) {
            localisationArray = [data.localisation];
        } else {
            return NextResponse.json(
                { message: "Le champ localisation doit être un objet ou un tableau d'objets." },
                { status: 400 }
            );
        }

        const vendeurExiste = await VendeurCollection.findOne({ email: data.email });

        if (vendeurExiste) {
            return NextResponse.json(
                { message: "Un vendeur avec cet email existe déjà." },
                { status: 409 }
            );
        }

        const clientExiste = await ClientCollection.findOne({ email: data.email });

        // Construction du nouveau vendeur
        const nouveauVendeur = new VendeurCollection({
            type: "vendeur",
            nom: data.nom,
            prenom: data.prenom,
            nomBoutique: data.nomBoutique,
            tel: data.tel,
            email: data.email,
            password: data.password,
            localisation: localisationArray,
            image: data.image,
            origine: clientExiste ? "client" : "inscription directe"
        });

        const vendeurEnregistre = await nouveauVendeur.save();
        const res = await GenerateToken(vendeurEnregistre._id);

        return NextResponse.json(
            { message: "Compte vendeur créé avec succès.", tokenStatus: res },
            { status: 201 }
        );

    } catch (error) {
        console.error("Erreur serveur :", error);
        return NextResponse.json({ message: "Erreur du serveur." }, { status: 500 });
    }
};
