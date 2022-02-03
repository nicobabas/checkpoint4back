import express from 'express';
import Book from '../models/bookModel.js';
import Joi from 'joi';

const router = express.Router();

const schemaBook = Joi.object({
    name: Joi.string().max(255),
    image: Joi.string().max(255).required(),
});
router.get('/', async (req, res) => {
    try {
    const book = await Book.getAll();
    if (book) return res.status(200).json(book);
    } catch (error){
        res.status(500).send(error.message)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Book.getOneById(id);
        book ? res.json(book) : res.status(404).json({ message: 'Book not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const book = Book.deleteById(id);
        book ? res.json({message : `Book ${id} has been deleted!`}) : res.status(404).json({ message: 'Book not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/', async (req, res) => {
    const { name, image } = req.body;
    try {
        const {error, value} = await schemaBook.validate({ name, image })
        const lastInsertId = await Book.createNew(value);
        if (lastInsertId) {
            const newBook = await Book.getOneById(lastInsertId) 
            res.json(newBook);
        } else res.status(422).json({ message: error.message });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.put('/:id', async (req, res) => {
    const book = req.body;
    try {
        const {error, value} = await schemaBook.validate(book)
        const bookUpdate = await Book.updateWeartype(req.params.id, value);
        if (bookUpdate) res.json(book);
        else res.status(422).json({ message: error.message });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

export default router;