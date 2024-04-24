const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const scraper = require('./scraper');
const pagination = require('./pagination');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Define routes
app.get('/posts', pagination.getPosts);

// Initialize Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Twitter Scraper API',
      version: '1.0.0',
      description: 'API for scraping Twitter posts',
    },
  },
  apis: ['./pagination.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});