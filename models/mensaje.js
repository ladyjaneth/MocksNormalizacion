import mongoose from 'mongoose';
import { AuthorSchema } from './author.js';

const mensajesCollection = 'mensajes';

const MensajesSchema = new mongoose.Schema({
    author: {
        type: AuthorSchema,
        required: true
    },
    text: {type: String, required: true}
});

export const mensajes = mongoose.model(mensajesCollection, MensajesSchema);