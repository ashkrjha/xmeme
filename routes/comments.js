//Requiring all the necessary packages
var express = require('express');
var router = express.Router();
var db = require('../database');

/**
 * @swagger
 * components:
 *  schemas:
 *      comment:
 *          type: object
 *          required:
 *              - comment
 *          properties:
 *              id:
 *                  type: integer
 *                  description : This is equal to the meme id
 *              comment:
 *                  type: string
 *                  description: This is the comment on the meme
 *          example:
 *              comment: This is an example comment
 */

//Get Route to render the comments page for the selected meme
router.get("/:id/comments", (req, res) => {
    let id = req.params.id;     //Getting the meme id from the url
    let query = `SELECT * FROM comment WHERE id='${req.params.id}'`;    //Getting all the commenst of the specific meme id from the comment table
    db.query(query, (err, result) => {       //Executing the query and storing error in err and result in result
        if (err)                            //If error occurs, throw error
            throw err;
        res.render("comments", { result, id }); //Render the comments.ejs page and pass the result of the query and meme id as parameters
    })
});

//Post route to post a comment
router.post("/:id/:id/comments", (req, res) => {
    let id = req.params.id;         //Getting the id of the meme from the route
    let cmnt = req.body.comment;    //Getting the posted comment from the body
    let post = { id: id, cmnt: cmnt };  //Making a post object of id and cmnt to create a tuple in 
    let query = `INSERT INTO comment SET ?`;    //Inserting into the comments table
    db.query(query, post, (err, result) => {    //Executing the query and storing error in err and result in result
        if (err)                                //If error occurs, throw error
            throw err;
        res.redirect(`/${id}/comments`);        //Redirect to current meme comments page
    })
});

module.exports = router;    //Exporting all the defined routes