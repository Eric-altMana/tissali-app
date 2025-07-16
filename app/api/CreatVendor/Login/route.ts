import { GenerateToken, GetAuthToken } from "@/app/controllers/security/token"
import { auth } from "@/lib/firebaseConfig"
import { dbConnect } from "@/lib/mongoConfig"
import { VendeurCollection} from "@/Models/modelsConfig"
import { signInWithEmailAndPassword } from "firebase/auth"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { email, password} = body

        const connect = await dbConnect();
        if (connect !== "db connected") {
            return NextResponse.json({ message: "Une erreur s'est produite pendant la connexion à la base de donnée." });
        }

        const vendeur = await VendeurCollection.findOne({ email });

        if (vendeur) {

            const { _id } = vendeur;
            const res = await GenerateToken({ _id });
            console.log("Token généré :", res);
            return NextResponse.json({ message: "ok", vendeur});

        } else {
            return NextResponse.json({ message: "Email incorrect" });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Une erreur s'est produite lors de la connexion du vendeur" });
    }
}
