//Requiring all the necessary packages
var express = require('express');
var router = express.Router();
var db = require('../database');

//Route to get the memes posted by a user
router.post("/user", (req, res) => {
    let query = `SELECT * FROM meme WHERE name='${req.body.user}'`;
    let favoritePage = false; //If it's a favorite page or not
    let userMemes = true; //If it's a userMemes page or not
    db.query(query, (err, result) => {   //Executing the query and storing error in err and result in result
        if (err)    //If error, throw error
            throw err;
        res.render("index", { result, favoritePage, userMemes }); //Rendering the index page and passing parameters
    });
});

module.exports = router;    //Exporting all the defined routes