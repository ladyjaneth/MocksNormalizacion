import mongoose from "mongoose";

const authorCollection = 'authors';

const AuthorSchema = new mongoose.model({
    id:{type:String, required:true, max:100, unique: true},
    nombre:{type:String, required:true, max:100},
    apellido:{type:String, required:true, max:100},
    edad:{type:Number, required:true, max:100},
    alias:{type:String, required:true, max:100},
    avatar:{type:String, required:true, max:100}

})
export const authors = mongoose.model(authorCollection, AuthorSchema);