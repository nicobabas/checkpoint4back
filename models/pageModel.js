import dbConnect from '../config/db-config.js';

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query(`SELECT * FROM page`, (err, results) => {   
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const getOneById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query(`SELECT * FROM page WHERE id = ?`, id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        })
    })
}

const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('DELETE FROM page WHERE id = ?', id, (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows);
        })
    })
}

const deleteByIdFromBook = (id) => {
  return new Promise((resolve, reject) => {
      dbConnect.query('DELETE FROM page WHERE book_id = ?', id, (err, result) => {
          if (err) reject(err);
          else resolve(result.affectedRows);
      })
  })
}

const createNew = (page) => {
    const { image, title, text, book_id } = page;
    return new Promise((resolve, reject) => {
        dbConnect.query('INSERT INTO weartype (image, title, text, book_id) VALUES (?, ?, ?, ?)',
            [image, title, text, book_id], (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            })
    })
}

const updatePage = (id, weartype) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('UPDATE weartype SET ? WHERE id = ?', [weartype, id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}

export default { getAll, getOneById, deleteById, deleteByIdFromBook, createNew, updatePage };