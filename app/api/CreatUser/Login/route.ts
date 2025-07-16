// app/api/login/route.ts
import { NextResponse } from "next/server"
import { auth, db } from "@/lib/firebaseConfig"
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { ClientCollection } from "@/Models/modelsConfig"
import { GenerateToken } from "@/app/controllers/security/token"
import { dbConnect } from "@/lib/mongoConfig"

export const POST = async (req: Request) => {
    try {

        const connected = await dbConnect()
        if (!connected) {
            return NextResponse.json({
                success: false,
                message: "Erreur de connexion à la base de données"
            });
        }

        const body = await req.json();
        const data = await signInWithEmailAndPassword(auth, body.email, body.password);
        const user = data.user;

        if (!user.emailVerified) {
            await sendEmailVerification(user);
            return NextResponse.json({
                success: false,
                message: "Compte non vérifié, un email de vérification a été envoyé."
            });
        }

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return NextResponse.json({
                success: false,
                message: "Utilisateur non trouvé dans Firestore."
            });
        }

        const client = await ClientCollection.findOne({ uid: user.uid });
        console.log("Client trouvé :", client);
        if (!client) {
            return NextResponse.json({
                success: false,
                message: "Client non trouvé dans MongoDB."
            });
        }

        const token = await GenerateToken(client._id);

        const userData = docSnap.data();

        return NextResponse.json({
            success: true,
            token,
            client: {
                id: client._id, // MongoDB ID ici
                nom: client.nom,
                prenom: client.prenom,
                tel: client.tel,
                email: client.email
            },
            message: "Connexion réussie"
        });

    } catch (error: any) {
        console.error("Erreur serveur :", error);
        return NextResponse.json({
            success: false,
            message: "Erreur lors de la connexion"
        });
    }
};
