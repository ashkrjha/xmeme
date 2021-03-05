//Requiring all the necessary packages
var express = require('express');
var router = express.Router();
var db = require('../database');

//Route to get the page of 100 memes sorted by most likes
router.get("/sortbylikes", (req, res) => {
    let query = 'SELECT * FROM meme ORDER BY likes DESC LIMIT 100'; //Getting the most liked 100 memes
    let favoritePage = false;   //If it's a favorite page or not
    let userMemes = false;      //If it's a userMemes page or not
    db.query(query, (err, result) => {     //Executing the query and storing error in err and result in result
        if (err)                         //If error, throw error
            throw err;
        res.render("index", { result, favoritePage, userMemes }); //Rendering the index page and passing parameters
    });

});

//Route to get the page of 100 memes sorted by most dislikes
router.get("/sortbydislikes", (req, res) => {
    let query = 'SELECT * FROM meme ORDER BY dislikes DESC LIMIT 100'; //Getting the most disliked 100 memes
    let favoritePage = false;      //If it's a favorite page or not
    let userMemes = false;         //If it's a userMemes page or not
    db.query(query, (err, result) => {     //Executing the query and storing error in err and result in result
        if (err)                    //If error, throw error
            throw err;
        res.render("index", { result, favoritePage, userMemes }); //Rendering the index page and passing parameters
    });

});

//Route to post a like on the meme
router.post("/:id/likes", (req, res) => {
    let query = `UPDATE meme SET likes=likes+1 WHERE id=${req.params.id}`;  //Query to increase count of likes by 1
    db.query(query, (err, result) => {     //Executing the query and storing error in err and result in result
        if (err)                          //If error, throw error
            throw err;
        res.redirect("/");          //Redirecting to the root page;   
    });
});

router.post("/:id/dislikes", (req, res) => {
    let query = `UPDATE meme SET dislikes=dislikes+1 WHERE id=${req.params.id}`;
    db.query(query, (err, result) => {     //Executing the query and storing error in err and result in result
        if (err)                          //If error, throw error
            throw err;
        res.redirect("/");      //Redirecting to the root page;
    });
});

module.exports = router; //Exporting all the defined routes