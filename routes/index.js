//Requiring all the necessary packages
var express = require('express');
var router = express.Router();
var db = require('../database');

//Getting the route page to display the memes
router.get("/", (req, res) => {
    let query1 = 'SELECT * FROM meme ORDER BY id DESC LIMIT 100';   //Getting the latest 100 memes
    let favoritePage = false; //If it's a favorite page or not
    let userMemes = false; //If it's a userMemes page or not
    db.query(query1, (err, result) => {  //Executing the query and storing error in err and result in result
        if (err)                //If errror occurs, throw error
            throw err;
        res.render("index.ejs", { result, favoritePage, userMemes });    //Rendering the index page and passing the result of the query
    })
});

//Posting a meme when the form is filled
router.post("/", function (req, res) {
    //Getting the name, url and caption from the form
    let name = req.body.name;
    let url = req.body.url_img;
    let caption = req.body.caption;
    //Making an object to insert a tuple in the table
    let post = { name: name, url: url, caption: caption };
    //Query to insert a tuple into the meme table
    let query = 'INSERT INTO meme SET ?';
    //Executing the query
    db.query(query, post, (err, result) => {     //Executing the query and storing error in err and result in result
        if (err)        //If errror occurs, throw error
            throw err;
        res.redirect('/');    //Redirecting to the root page
    });
});

module.exports = router;    //Exporting all the defined routes