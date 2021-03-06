const express = require('express');
const mhsController = require('../controllers/controllers');
const upload = require('../middlewares/upload');

const router = express.Router();

router
 .post('/add', mhsController.addDataNilai)
 .put('/update/:id', mhsController.updateDataNilai)
 .delete('/delete/:id', mhsController.deleteDataNilai)
 .get('/get', mhsController.getAll)
 .get('/getAverage', mhsController.getAverage)
 .post('/addExcel', upload.single("file"), mhsController.addFromExcel)

module.exports = router;