import express from "express";
import { book } from "../modals/Bookstore.js";

const router = express.Router();


//Create the Books

router.post('/', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: "Send all Required Fields: title, author, publishYear"
            })
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }

        const Book = await book.create(newBook);
        return response.status(200).send(Book)

    } catch (err) {
        console.log(err.message);
        response.status(500).send({ message: err.message })
    }
})

//get All Books

router.get('/', async (req, res) => {
    try {
        const Book = await book.find({})
        return res.status(200).json({
            length: Book.length,
            data: Book
        })
    } catch (err) {
        return res.status(500).send("Something Went...!")
    }
})

//get Single Book Based on ID

router.get('/:id', async (req, res) => {

    try {

        const { id } = req.params;
        const Book = await book.findById(id)
        return res.status(200).json(Book)

    } catch (err) {
        return res.status(500).send("Something Went Wrong!")
    }
})

//update the Books

router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send("Please fill the All reqquired Fields")
        }

        const { id } = req.params;

        const result = await book.findByIdAndUpdate(id, req.body)
        if (!result) {
            return res.status(404).send({ message: "Book not Found!" })
        }

        return res.status(200).send({ message: "Books Updated Successsfully" })

    } catch (err) {
        return res.status(500).send("Something Wen Wrong on Update!")
    }
})

//Delete the Books

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteBook = await book.findByIdAndDelete(id);

        if (!deleteBook) {
            return res.status(400).json({ message: "Books Not Foun!!!" })
        }

        return res.status(200).send({ message: "Book Deleted Successfully!" })

    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
})

export default router;