const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controllers');

router.get('/', ctrl.getAll);
router.get('/:contactId', ctrl.getById);

router.post('/', ctrl.add);
router.patch('/:contactId', ctrl.update);
router.delete('/:contactId', ctrl.del);

module.exports = router;
