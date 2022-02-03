import dbConnect from '../config/db-config.js';

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query(`SELECT * FROM book`, (err, results) => {   
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const getOneById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query(`SELECT b.id, b.name, b.image
        FROM book AS b
        LEFT JOIN page AS p ON b.id=p.book_id
        WHERE b.id=?
        GROUP BY b.id`, id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        })
    })
}

const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('DELETE FROM book WHERE id = ?', id, (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows);
        })
    })
}

const createNew = (weartype) => {
    const { name, image } = weartype;
    return new Promise((resolve, reject) => {
        dbConnect.query('INSERT INTO book (name, image) VALUES (?, ?)',
            [name, image], (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            })
    })
}

const updateBook= (id, book) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('UPDATE book SET ? WHERE id = ?', [book, id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}

export default { getAll, getOneById, deleteById, createNew, updateBook };