import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        publishYear: {
            type: Number,
            required: true
        }
    },
    {
        Timestamp: true
    }
)

export const book = mongoose.model('books',bookSchema) 