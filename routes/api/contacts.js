const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controllers');

/**
 * @swagger
 * components:
 *  schemas:
 *    Contact:
 *      type: object
 *      required:
 *        - name
 *        - email
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the contact
 *        name:
 *          type: string
 *          description: The name of the contact
 *        email:
 *          type: string
 *          description: The email address of the contact
 *      example:
 *        id: whatareyoudoing,
 *        name: John Black,
 *        email: john@mail.com
 *
 */

/**
 * @swagger
 * /api/contacts:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.get('/', ctrl.getAll);
router.get('/:contactId', ctrl.getById);

router.post('/', ctrl.add);
router.patch('/:contactId', ctrl.update);
router.patch('/:contactId/favorite', ctrl.updateFavorite);
router.delete('/:contactId', ctrl.del);

module.exports = router;
