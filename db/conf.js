import mongoose from "mongoose";

export default async function CRUD(){
    try{
        const URL = 'mongodb://localhost:27017/mensajes'
        let ruta =  await mongoose.connect(URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        console.log('Base de datos conectada Mongo')

    }catch(exception){
        console.log('conexión db: ', exception);
    }
}