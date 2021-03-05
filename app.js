//Requiring all the required packages
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');
const app = express();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerApp = express();
const swaggerPort = 8080;

app.use(cors());
swaggerApp.use(cors());

//Using the middleware functions
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Defining the options for swagger
const options = {
    definition: {
        openapi: "3.0.0",   //Version of the OpenAPI
        info: {
            title: "XMEME By Ashutosh Kumar Jha",       //Title of the Swagger page
            version: "1.0.0",                           //Version of the product made
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",  //Description of the product
            license: {
                name: "MIT",                            //License of the [roduct]
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Ashutosh Kumar Jha",             //Name of the developer
                url: "https://ashkrjha.netlify.app",    //Url to contact the developer
                email: "ashutoshjha2204@gmail.com",     //Email to contact the developer
            },
        },
        servers: [
            {
                url: "http://localhost:8081",           //Url where Swagger will run
            },
        ],
    },
    apis: ["./routes/*.js"],        //Files to import the API from
};

const specs = swaggerJsdoc(options);    //Asking JsDocs to uss the options defined above

swaggerApp.use(
    "/swagger-ui/",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

//Setting the view engine for express as ejs by default
app.set('view engine', 'ejs');
//Setting the views directory in the current directory as the default location for views
app.set('views', path.join(__dirname, '/views'));
//Using the express middleware static to set the static files such as images, css, javascript
app.use(express.static(__dirname + '/public'));

//Imrporting the routes
var indexRoutes = require("./routes/index.js"),
    memesRoutes = require("./routes/memes.js"),
    commentRoutes = require("./routes/comments.js"),
    userMemesRoutes = require("./routes/userMemes.js"),
    favoriteRoutes = require("./routes/favorites.js"),
    likesDislikesRoutes = require("./routes/likesDislikes.js");

//Using or importing the routes
app.use("/", indexRoutes);
app.use("/", memesRoutes);
app.use("/", commentRoutes);
app.use("/", favoriteRoutes);
app.use("/", userMemesRoutes);
app.use("/", likesDislikesRoutes);

//Listening on the port 8080 for swagger
swaggerApp.listen(swaggerPort, () => console.log("Swagger up and running on port 8080"));

//Listening on the port 8081 for the application
app.listen(8081, () => {
    console.log("Connected to Port 8081");
});