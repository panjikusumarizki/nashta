const db = require('../configs/db');

const transaction = {
    addDataNilai: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO data_nilai (id_mhs, id_matkul, nilai, keterangan) 
                      VALUES ('${data.id_mhs}','${data.id_matkul}', '${data.nilai}', 
                      '${data.keterangan}')`, (err, result) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            });
        });
    },

    updateDataNilai: (data, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE data_nilai SET ? WHERE id = ?`, [data, id], (err, result) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            });
        });
    },

    deleteDataNilai: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM data_nilai WHERE id='${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            });
        });
    },

    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT 
                        mahasiswa.id AS id_mahasiswa,
                        mahasiswa.nama AS nama_mahasiswa,
                        mata_kuliah.nama_mata_kuliah,
                        nilai
                        FROM ((data_nilai INNER JOIN mahasiswa ON data_nilai.id_mhs = mahasiswa.id)
                        INNER JOIN mata_kuliah ON data_nilai.id_matkul = mata_kuliah.id)`, 
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    } else {
                        resolve(result);
                    }
                });
        });
    },

    getAverage: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT mahasiswa.nama, AVG(data_nilai.nilai) AS nilai_rata_rata
                      FROM data_nilai
                      JOIN mahasiswa
                      ON data_nilai.id_mhs = mahasiswa.id
                      GROUP BY mahasiswa.nama`,
                    (err, result) => {
                        if (err) {
                            reject(new Error(err));
                        } else {
                            resolve(result);
                        }
                    });
        });
    },

    getMhs: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM mahasiswa`, (err, result) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            });
        });
    },

    addExcel: (data) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO mahasiswa (id, nama, alamat) VALUES ?', [data], (err, result) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            });
        });
    },

    // updateExcel: (data, id) => {
    //     return new Promise((resolve, reject) => {
    //         db.query(`UPDATE mahasiswa SET ? WHERE id = ?`, [data, id], (err, result) => {
    //             if (err) {
    //                 reject(new Error(err));
    //             } else {
    //                 resolve(result);
    //             }
    //         });
    //     });
    // }
};

module.exports = transaction;