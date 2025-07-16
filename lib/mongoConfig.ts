import mongoose from "mongoose"

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.db_url!, {
            dbName: "tissali-backend"
        })
        
        console.log("connexion mongodb reussi")

        return "db connected"
    } catch (error) {
        console.log(error)
    }
}