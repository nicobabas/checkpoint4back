import express from 'express';
import Joi from 'joi';
import Page from '../models/pageModel.js';
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/images/");
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

const schemaPage = Joi.object({
    image: Joi.string().max(255),
    title: Joi.string().max(255),
    text: Joi.string().max(255),
});

router.get('/', async (req, res) => {
    try {
    const page = await Page.getAll();
    if (page) return res.status(200).json(page);
    } catch (error){
        res.status(500).send(error.message)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const page = await Page.getOneById(id);
        page ? res.json(page) : res.status(404).json({ message: 'Page not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result1 = Page.deleteByIdFromPage(id);
        const result2 = Page.deleteById(id);
        await Promise.all([result1, result2]);
        result1 && result2 ? res.json({message : `Page ${id} has been deleted!`}) : res.status(404).json({ message: 'Weartype not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/', upload.single("image"), async (req, res) => {
   const { title, text, book_id } = req.body;
    console.log('req',req.files)
    const image = `http://localhost:8000/images/${req.file.filename}`;
    try {
        const {error, value} = await schemaPage.validate({ image, title, text, book_id })
        const lastInsertId = await Page.createNew(value);
        if (lastInsertId) {
            const newPage = await Page.getOneById(lastInsertId) 
            res.json(newPage);
        } else res.status(422).json({ message: error.message });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.put('/:id', async (req, res) => {
    const page = req.body;
    try {
        const {error, value} = await schemaPage.validate(page)
        const pageUpdate = await Page.updateWeartype(req.params.id, value);
        if (pageUpdate) res.json(page);
        else res.status(422).json({ message: error.message });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// router.delete('/params/:id', async (req, res) => {
//     const brand_id = req.params.id;
//     try {
//         const weartypesDeleted = await Book.deleteBrandWeartypes(brand_id);
//         if (weartypesDeleted) res.json({message: "Weartypes have been successfully deleted from brand!"});
//         else res.status(422).json({ message: "Weartypes have not been deleted" });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
    
// })

// router.post('/params', async (req, res) => {
//     const {weartype_id, brand_id} = req.body;
//     try {
//         const addWeartype = await Book.addWeartypeToBrand(weartype_id, brand_id);
//         if (addWeartype) res.json({message:" Weartype has been successfully added to brand!"});
//         else res.status(422).json({ message: "Brand not updated" });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
    
// })
export default router;