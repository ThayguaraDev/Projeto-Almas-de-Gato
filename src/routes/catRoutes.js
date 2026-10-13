const express = require('express');
const catController = require('../controllers/catController');

const router = express.Router();

router.get('/', catController.listCats);
router.get('/:id', catController.getCat);
router.post('/', catController.createCat);

module.exports = router;
