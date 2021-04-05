const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require('swagger-ui-express')


const options = {
    swaggerDefinition: {
        info: {
            title: 'toDo API',
            version: '1.0.0',
            description: "Swagger documentation for toDo",
        },
        basePath: 'http://localhost:3000/'
    },
    apis: ['./routes/*.js']
}

const specs = swaggerJsDoc(options)


module.exports = {swaggerUi,specs}
