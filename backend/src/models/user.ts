import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  loginAttempts: number;
  lockUntil: Date | null
}
//Elementos de usuario
const UserSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: {
        type: Date,
        default: null
    }
})
const User = mongoose.model<IUser>("User", UserSchema);

export default User;