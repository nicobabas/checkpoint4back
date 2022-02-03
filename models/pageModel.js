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
        dbConnect.query(`SELECT * FROM page WHERE book_id = ?`, id, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('DELETE FROM page WHERE page_id = ?', id, (err, result) => {
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

const createNew = (page, id) => {
    const { image, title, text } = page;
    return new Promise((resolve, reject) => {
        dbConnect.query('INSERT INTO page (image, title, text, book_id) VALUES (?, ?, ?, ?)',
            [image, title, text, id], (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            })
    })
}

const updatePage = (id, page) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('UPDATE page SET ? WHERE id = ?', [page, id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}

export default { getAll, getOneById, deleteById, deleteByIdFromBook, createNew, updatePage };