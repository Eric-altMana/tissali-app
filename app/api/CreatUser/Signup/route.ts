import { GenerateToken } from "@/app/controllers/security/token";
import { auth, db } from "@/lib/firebaseConfig";
import { dbConnect } from "@/lib/mongoConfig";
import { ClientCollection, } from "@/Models/modelsConfig";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const formData = await req.json() // Ajoute cette ligne

        const data = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const uid = data.user.uid;

        await sendEmailVerification(data.user);

        // Stockage dans Firestore
        await setDoc(doc(db, "users", uid), {
            uid,
            nom: formData.nom,
            prenom: formData.prenom,
            tel: formData.tel,
            email: formData.email,
            createdAt: serverTimestamp()
        });

        await dbConnect();

        const clientRecord = new ClientCollection({
            uid,
            nom: formData.nom,
            prenom: formData.prenom,
            tel: formData.tel,
            email: formData.email
        });

        await clientRecord.save();

        // Récupère l'_id généré par MongoDB
        const {_id} = clientRecord;
        const res = await GenerateToken(_id);
        console.log("Token Généré :", res);


        return NextResponse.json({ message: "Ok, Client créé avec succès." });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur du serveur" });
    }
}