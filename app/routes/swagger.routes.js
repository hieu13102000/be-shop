const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');
const path = require('path');
const routesPath = path.join(__dirname, '../swagger');

const routeFiles = fs.readdirSync(routesPath);
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Dinh Hieu Express API with Swagger",
            version: "0.1.0",
            description:
                "BE-SHOP is a backend application written in Node.js, MySQL, Sequelize, storing videos and images on Firebase and documented with Swagger. It helps to manage online products through simple APIs and was developed by programmer Vu Dinh Hieu",
            contact: {
                name: "VU DINH HIEU ",
                url: "https://web-shop-son.vercel.app/",
                email: "tm13102000@gmail.com",
            },
        },
        servers: [
            {
                url: "https://be-shop-yx0l.onrender.com",
                description: "Production server"
            },
            {
                url: "http://localhost:8080",
                description: "Local development server"
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: routeFiles.map(routeFile => path.join(routesPath, routeFile)),
};

const customCss = `
  .opblock-description-wrapper .markdown h4:nth-child(1) {
    display: none;
  }
`;

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
