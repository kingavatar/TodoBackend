// const swaggerJsDoc = require("swagger-jsdoc")
// const swaggerUi = require('swagger-ui-express')


// const options = {
//     swaggerDefinition: {
//         info: {
//             title: 'toDo API',
//             version: '1.0.0',
//             description: "Swagger documentation for toDo",
//         },
//         basePath: 'http://localhost:3000/'
//     },
//     apis: ['./routes/*.js']
// }

// const specs = swaggerJsDoc(options)


// module.exports = {swaggerUi,specs}

const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/page.js','./routes/auth.js','./routes/index.js','./routes/note.js','./routes/stats.js']
const doc = {
    info: {
        "version": "1.0.0",                // by default: "1.0.0"
        "title": "toDo Online Backend APIs",                  // by default: "REST API"
        "description": "These are the list of APIs for backend"             // by default: ""
    },
    tags: [                           // by default: empty Array
        {
            "name": "Hola",               // Tag name
            "description": "my hola"         // Tag description
        },
    ],
    securityDefinitions: { },         // by default: empty object
    definitions: { }    
}
swaggerAutogen(outputFile, endpointsFiles)