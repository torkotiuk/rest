const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'Contacts API information',
      contact: {
        name: 'Torkotiuk Andrii',
      },
    },
    servers: [
      {
        url: 'https://rest-api-contacts.herokuapp.com',
      },
    ],
  },
  apis: ['./routes/api/*.js'],
};

module.exports = swaggerOptions;
