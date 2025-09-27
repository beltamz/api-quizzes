import mongoose from 'mongoose';
import 'dotenv/config';
//Conecto mi aplicacion a la base de datos Mongo
const connectDB = async (): Promise<void>=>{
    try{
        //Valido que mi variable de entorno exista y sea de tipo string, y no undefined
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI no está definido en .env');
        }
        //Me conecto a MongoDB
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Conectado a MongoDB');

    }catch(error){
        console.error("Hubo un error de conexion", error);
        process.exit(1)
    }
}

export default connectDB;