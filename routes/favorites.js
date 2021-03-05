//Requiring all the necessary packages
var express = require('express');
var router = express.Router();
var db = require('../database');

//Route to get the favorite memes
router.get("/favorite", (req, res) => {
    let query = `SELECT * FROM meme WHERE favorite=true`;   //Selecting memes which are favorite
    let favoritePage = true;    //If it's a favorite page or not
    let userMemes = false;      //If it's a userMemes page or not
    db.query(query, (err, result) => {        //Executing the query and storing error in err and result in result 
        if (err)                    //If error, throw the error
            throw err;
        res.render("index", { result, favoritePage, userMemes }); //Rendering the index page and passing parameters
    });
});

module.exports = router;    //Exporting all the defined routes