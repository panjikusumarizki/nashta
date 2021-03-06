const mhsModel = require('../models/models');
const readFile = require('read-excel-file/node');

const transaction = {
    addDataNilai: (req, res) => {
        try {
            const body = req.body;
            
            mhsModel.addDataNilai(body)
            .then((result) => {
                return res.json({
                    status: 'success',
                    data: body
                })
            })
            .catch((err) => {
                return res.status(404).json({ message: err.message});
            })
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },

    updateDataNilai: (req, res) => {
        try {
            const id = req.params.id;
            const body = req.body;

            if (!id) {
                return res.status(404).json({
                    status: 'error',
                    message: 'id not found'
                });
            } else {
                mhsModel.updateDataNilai(body, id)
                .then((result) => {
                    return res.json({
                        status: 'update success',
                        data: body
                    });
                })
                .catch((err) => {
                    return res.status(404).json({ message: err.message });
                })
            }
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },

    deleteDataNilai: (req, res) => {
        try {
            const id = req.params.id;

            mhsModel.deleteDataNilai(id)
            .then((result) => {
                if (result.affectedRows === 0) {
                    return res.status(404).json({ 
                        status: 'error',
                        message: 'Id not found'
                    });
                }
                return res.json({
                    status: 'success',
                    message: 'delete data success'
                });
            })
            .catch((err) => {
                return res.status(404).json({ message: err.message });
            })
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },

    getAll: (req, res) => {
        try {
            mhsModel.getAll()
            .then((result) => {
                return res.json({
                    status: 'success',
                    data: result
                });
            })
            .catch((err) => {
                return res.status(404).json({ message: err.message });
            })
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },

    getAverage: (req, res) => {
        try {
            mhsModel.getAverage()
            .then((result) => {
                return res.json({
                    status: 'success',
                    data: result
                });
            })
            .catch((err) => {
                return res.status(404).json({ message: err.message });
            })
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },

    addFromExcel: (req, res) => {
        try {
            if (req.file == undefined) {
                return res.status(400).json({ message: 'File not found' });
            }

            let path = 'src/uploads/' + req.file.filename;

            readFile(path).then((rows) => {
                rows.shift();

                mhsModel.addExcel(rows)
                .then(() => {
                    res.json({
                        status: 'success',
                        message: 'Upload success'
                    });
                })
                .catch((err) => {
                    return res.status(500).json({ message: 'import fail', error: err.message });
                })
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'cannot upload file' });
        }
    }
}

module.exports = transaction;