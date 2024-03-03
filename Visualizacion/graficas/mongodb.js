import { MongoDB } from "../../models/respuesta";

export default async function handler(req, res) {
  try {
    const mongodb = new MongoDB();
    mongodb.connectDB(); 
    const Respuesta = mongodb.getModel(); 

    const answers = await Respuesta.find({}).exec(); 
    res.status(200).json(answers); 
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
