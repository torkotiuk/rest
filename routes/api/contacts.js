const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controllers');

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })
router.get('/', ctrl.getAll);

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });
router.get('/:contactId', ctrl.getById);

router.post('/', ctrl.add);

router.delete('/:contactId', ctrl.del);

router.patch('/:contactId', ctrl.update);

module.exports = router;
