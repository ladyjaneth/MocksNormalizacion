import { options } from './options/mysqlconn.js'
import knex from 'knex'
import fs from 'fs'

export default class Contenedor {
    async save(producto){
        let idretornados;
        try {
            idretornados = await knex('productos').insert(producto);
        } catch (error) {
            idretornados= 0;
            console.log('Error al agregar el producto al archivo' + error);
        }        
        return idretornados;
    }

    async update(producto){
        let productoActualizado;
        try{
            console.log(producto);
                                     //el campo por el que busco en la base de datos //el valor por el que voy a buscar
        productoActualizado = await knex('productos').where('id',producto.id).update(producto);
        console.log(productoActualizado);
     
        }catch(error){
            console.log('Error al actualizar el producto el archivo' + error);
        }
        
    }



    async getById(id){// obtener por id
        let producto = null;
        try {
         producto = await knex('productos').select('*').where('id',id);              
         console.log(producto);
            
        } catch (error) {
            console.log(`Error al buscar producto por id ${id}`);
        }

        return producto;
    }

    async getAll(){ //obtener todos
        let arrayProductos = [];
        try{ //bd y se coloca el nombre de la tabla 
            arrayProductos = await knex('productos').select('*');
         }catch(error){
            console.log(`Error al leer el archivo ${this.nombreArchivo} ${error}`);
        }

        return arrayProductos;
    }

    async deleteById(id){
        
        let numeroFilas;
        try {
           //lo que me conecta a la bd - nombre de la tabla 
            numeroFilas = await knex('productos').where('id',id).del()
        } catch (error) {
            console.log(`Error al eliminar el producto del archivo por el id ${id} ${error}`);
        }
        return numeroFilas >0;
    }

    async deleteAll(){
        try {
          await knex('productos').del()

        } catch (error) {
            console.log('Error al eliminar los productos');
        }
    }

}

//module.exports = Contenedor; exportar la Clase Contenedor