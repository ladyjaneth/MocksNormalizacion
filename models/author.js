import mongoose from "mongoose";
const authorCollection = 'authors';

export const AuthorSchema = new mongoose.Schema({
    id:{type:String, required:true, max:100},
    nombre:{type:String, required:true, max:100},
    apellido:{type:String, required:true, max:100},
    edad:{type:Number, required:true, max:100},
    alias:{type:String, required:true, max:100},
    avatar:{type:String, required:true, max:100}

})
export const authors = mongoose.model(authorCollection, AuthorSchema);