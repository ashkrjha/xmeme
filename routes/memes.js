//Requiring all the necessary packages
var express = require('express');
var router = express.Router();
var db = require('../database');

/**
 * @swagger
 * components:
 *  schemas:
 *      meme:
 *          type: object
 *          required:
 *            - name
 *            - url
 *            - caption
 *          properties:
 *              id:
 *                  type: integer
 *                  description : This is the auto-generated id of the meme
 *              name:
 *                  type: string
 *                  description: This is the name of the author of meme
 *              url:
 *                  type: string
 *                  description: This is the url of the meme image
 *              caption:
 *                  type: string
 *                  description: This is the caption of the memes
 *          example:
 *              name: Ashutosh
 *              url: https://picsum.photos/536/354
 *              caption: This is a meme caption
 */

/**
 * @swagger
 * tags:
 *  name: memes
 *  description: API to post, edit and delete memes.
 */

/**
 * @swagger
 * /memes:
 *  get:
 *      summary: Lists the 100 last posted memes
 *      tags: [memes]
 *      responses:
 *          200:
 *              description: The list of 100 last posted memes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/meme'
 */
router.get("/memes", (req, res) => {
    let query = 'SELECT id,name,url,caption FROM meme ORDER BY id DESC LIMIT 100';  //Getting the latest 100 memes id,name,url and caption
    db.query(query, (err, result) => {      //Executing the query and storing error in err and result in result
        if (err)                            //If error, throw error
            throw err;
        res.status(200).json(result);       //Sending the response as a JSON object
    })
});

/**
 * @swagger
 * /memes:
 *  post:
 *      summary: Post a new meme
 *      tags: [memes]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/meme'
 *      responses:
 *          201:
 *              description: Meme Posted Succesfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/meme'
 *          409:
 *              description: name, url and caption already exists  
 */
router.post("/memes", function (req, res) {
    //Getting the body variables
    let name = req.body.name;
    let url = req.body.url;
    let caption = req.body.caption;
    //Creating an object to insert into the tuple
    let post = { name: name, url: url, caption: caption };
    let query1 = `SELECT * FROM meme WHERE name='${name}' AND url='${url}' AND caption='${caption}'`;   //Query to check whether the meme with same name,url and caption exists
    db.query(query1, (err1, result1) => {     //Executing the query1 and storing error in err1 and result in result1
        if (err1)                              //If error, throw error
            throw err1;
        if (result1.length != 0)    //If meme found
            res.status(409);        //Return 409 status
        let query2 = 'INSERT INTO meme SET ?';  //Query to insert into the meme table
        db.query(query2, post, (err2, result2) => {  //Executing the query2 and storing error in err2 and result in result2
            if (err1)                                //If error, throw error
                throw err1;
            let query3 = 'SELECT id FROM meme ORDER by id DESC LIMIT 1';
            db.query(query3, (err3, result3) => {    //Executing the query3 and storing error in err3 and result in result3
                if (err3)                            //If error, throw error
                    throw err3;
                res.status(201).json(result3[0]);   //Return 201 status and id of the created meme
            });
        });
    });
});

/**
 * @swagger
 * /memes/{id}:
 *  get:
 *      summary: Get the meme by id
 *      tags: [memes]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: The meme id
 *      responses:
 *          200:
 *              description: The meme description by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/meme'
 *          404:
 *              description: The meme was not found
 *    
 */
router.get("/memes/:id", (req, res) => {
    let query = `SELECT id,name,url,caption FROM meme WHERE id = ${req.params.id}`;     //Selecting id,name,url,caption of the meme based on the id
    db.query(query, (err, result) => {       //Executing the query and storing error in err and result in result
        if (err)                             //If error, throw error
            throw err;
        if (result.length == 0) {   //If no meme with the particular id is found
            res.sendStatus(404);    //Sending 404 status of not found
        }
        res.status(200).json(result[0]);        //Returning the found meme as a JSON object
    })
});


/**
 * @swagger
 * /memes/{id}:
 *  patch:
 *      summary: Update the meme by the id
 *      tags: [memes]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: The meme id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/meme'
 *      responses:
 *          200:
 *              description: The meme was updatedS
 *          404:
 *              description: The meme was not found
 *          500:
 *              description: Some error happened
 */
router.patch("/memes/:id", (req, res) => {
    let query1 = `SELECT * FROM meme WHERE id=${req.params.id}`;    //Selecting the meme based on the id
    db.query(query1, (err1, result1) => {    //Executing the query1 and storing error in err1 and result in result1
        if (err1)                            //If error, throw error
            throw err1;
        if (result1.length == 0) {   //If no meme found with that particular id
            res.sendStatus(404);    //Sending 404 status of not found
        }
        let query2 = `UPDATE meme SET url='${req.body.url}', caption='${req.body.caption}' WHERE id=${req.params.id}`;  //Updating the meme based on the id given
        db.query(query2, (err2, result2) => {   //Executing the query2 and storing error in err2 and result in result2
            if (err2)               //If error, throw error
                throw err2;
            res.sendStatus(200);    //Returing 200 okay status
        });
    });
});

//Route to render the edit page for a meme
router.get("/:id/edit", (req, res) => {
    let query = `SELECT * FROM meme WHERE id = ${req.params.id}`;   //Selecting the tuple from meme table based on the id
    db.query(query, (err, result) => {  //Executing the query and storing error in err and result in result
        if (err)                         //If error, throw error
            throw err;
        res.render("edit", { result }); //Rendering the edit page and passing parameters
    });
});

//Route to edit a meme
router.post("/:id/edit", (req, res) => {
    let query = `UPDATE meme SET url='${req.body.url}', caption='${req.body.caption}' WHERE id=${req.params.id}`;   //Updating the meme with the given id
    db.query(query, (err, result) => {    //Executing the query and storing error in err and result in result
        if (err)                         //If error, throw error
            throw err;
        res.redirect("/");          //Redirecting to the root page
    });
});

//Route to delete a meme
router.post("/:id/delete", (req, res) => {
    let query1 = `SELECT * FROM meme WHERE id=${req.params.id}`;    //Query to check if there's a tuple with that particular id
    db.query(query1, (err1, result1) => {    //Executing the query1 and storing error in err1 and result in result1  
        if (err1)                            //If error, throw error
            throw err1;
        if (result1.length == 0) {      //If tuple with id not found
            res.sendStatus(404);        //Return 404 status
        }
        let query2 = `DELETE FROM meme WHERE id=${req.params.id}`;  //Deleting the tuple from table using the id
        db.query(query2, (err2, result2) => {    //Executing the query2 and storing error in err2 and result in result2
            if (err2)                            //If error, throw error
                throw err2;
            res.redirect("/")            //Redirecting to the root page
        });
    });
});

//Route to toggle favorite attribute of a meme
router.post("/:id/favorite", (req, res) => {
    let query = `UPDATE meme SET favorite = !favorite WHERE id = ${req.params.id}`; //Toggling the favorite attribute of the meme
    db.query(query, (err, result) => {       //Executing the query and storing error in err and result in result
        if (err)                          //If error, throw error
            throw err;
        res.redirect("/");          //Redirecting to the root page
    });
});

module.exports = router;    //Exporting all the defined routes