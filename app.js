const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { swaggerOptions } = require('./config');
const logger = require('morgan');
const cors = require('cors');
const {
  routesApi: { contactsRoutes, authRoutes },
} = require('./routes');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/contacts', contactsRoutes);
app.use('/api/users', authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
