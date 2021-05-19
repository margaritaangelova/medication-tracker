const express = require('express');
const app = express();

const mongoose = require('./db/mongoose');

const bodyParser = require('body-parser');

//load in the mongoose models:
const { Category, Medication, User } = require('./db/models');


const jwt = require('jsonwebtoken');

/* MIDDLEWARE  */

// Load express middleware
app.use(bodyParser.json());

// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //we have to define all the methods here in order to use them later:
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

// check whether the request has a valid JWT access token
let authenticate = (req, res, next) => {
    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.user_id = decoded._id;
            next();
        }
    });
}

// Verify Refresh Token Middleware (which will be verifying the session)
let verifySession = (req, res, next) => {
    // grab the refresh token from the request header
    let refreshToken = req.header('x-refresh-token');

    // grab the _id from the request header
    let _id = req.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            // user couldn't be found
            return Promise.reject({
                'error': 'User not found. Make sure that the refresh token and user id are correct(valid)'
            });
        }


        // if the code reaches here - the user was found
        // therefore the refresh token exists in the database - but we still have to check if it has expired or not

        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                // check if the session has expired
                if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                    // refresh token has not expired
                    isSessionValid = true;
                }
            }
        });

        if (isSessionValid) {
            // the session is VALID - call next() to continue with processing this web request
            next();
        } else {
            // the session is not valid
            return Promise.reject({
                'error': 'Refresh token has expired or the session is invalid'
            })
        }

    }).catch((e) => {
        res.status(401).send(e);
    })
}

/* END MIDDLEWARE  */


/* CATEGORY ROUTES */
// creating the root handles:


// app.get('/', (req,res) => {
//     res.send("Hello");
// })


//we add "authenticate", because every user should be able to see only his categories
app.get('/categories', authenticate, (req, res) => {
    //return an array of all of the categories in the database

    //we want to find all of the categories, so we leave the condition {} empty:
    //after creating the mongoose.js file:
    Category.find({
        _userId: req.user_id
    }).then((categories) => {
        res.send(categories);
    }).catch((e)=>{
        res.send(e);
    });
});

app.post('/categories', authenticate, (req, res) => {
    //create a new category and return the new category document back to the user (which includes the id)
    //the category information fields will be passed with JSON request body

    let title = req.body.title;

    let newCategory = new Category({
        title,
        _userId: req.user_id
    });

    newCategory.save().then((categoryDoc) => {
        //the full category document is returned
        res.send(categoryDoc);
    });
});

app.patch('/categories/:id', authenticate, (req, res) => {
    //for updating the specified category

    Category.findOneAndUpdate({ _id: req.params.id, _userId: req.user_id }, {
        $set: req.body   //$set is a MongoDB keyword
    }).then(() => {
        //there is no need to send back the whole document, only a message is enough
        res.send({ 'message': 'updated successfully' });
    });
});

app.delete('/categories/:id', authenticate, (req, res) => {
    //for deleting the specified category
    Category.findOneAndRemove({
        _id: req.params.id,
        _userId: req.user_id
    }).then((removedCategoryDoc) => {
        res.send(removedCategoryDoc);

        // // delete all the medications that are in the deleted category
        deleteMedicationsFromCategory(removedCategoryDoc._id);
    })
});

// /* MEDICATION ROUTES */

app.get('/categories/:categoryId/medications', authenticate, (req, res) => {
    // We want to return all medications that belong to a specific category (specified by categoryId)
    Medication.find({
        _categoryId: req.params.categoryId
    }).then((medications) => {
        res.send(medications);
    })
});

app.get('/categories/:categoryId/medications/:medicationId', (req, res) => {
    // We want to return a medication (specified by categoryId)
    Medication.find({
        _id: req.params.medicationId,
        _categoryId: req.params.categoryId
    }).then((medication) => {
        if(medication){
            res.send(medication.length?medication[0]:medication);
        }
        res.send(null);
    })
});


app.post('/categories/:categoryId/medications', authenticate, (req, res) => {
    // We want to create a new medication in a category specified by categoryId

    Category.findOne({
        _id: req.params.categoryId,
        _userId: req.user_id
    }).then((category) => {
        if (category) {
            // category object with the specified conditions was found
            // therefore the currently authenticated user can create new medications
            return true;
        }

        // else - the category object is undefined
        return false;
    }).then((canCreateMedication) => {
        if (canCreateMedication) {
            let newMedication = new Medication({
                title: req.body.title,
                _categoryId: req.params.categoryId
            });
            newMedication.save().then((newMedicationDoc) => {
                res.send(newMedicationDoc);
            })
        } else {
            res.sendStatus(404);
        }
    })
})

app.patch('/categories/:categoryId/medications/:medicationId', authenticate, (req, res) => {
    // We want to update an existing medication (specified by medicationId)

    Category.findOne({
        _id: req.params.categoryId,
        _userId: req.user_id
    }).then((category) => {
        if (category) {
            // category object with the specified conditions was found
            // therefore the currently authenticated user can make updates to medications within this category
            return true;
        }

        // else - the category object is undefined
        return false;
    }).then((canUpdateMedications) => {
        if (canUpdateMedications) {
            // the currently authenticated user can update medications
            Medication.findOneAndUpdate({
                _id: req.params.medicationId,
                _categoryId: req.params.categoryId
            }, {
                    $set: req.body
                }
            ).then(() => {
                res.send({ message: 'Updated successfully.' })
            })
        } else {
            res.sendStatus(404);
        }
    })

});


app.delete('/categories/:categoryId/medications/:medicationId', authenticate, (req, res) => {

    Category.findOne({
        _id: req.params.categoryId,
        _userId: req.user_id
    }).then((category) => {
        if (category) {
            // category object with the specified conditions was found
            // therefore the currently authenticated user can make updates to medications within this category
            return true;
        }

        // else - the category object is undefined
        return false;
    }).then((canDeleteMedications) => {
        
        if (canDeleteMedications) {
            Medication.findOneAndRemove({
                // categoryId and medicationId are from the url above
                _id: req.params.medicationId,
                _categoryId: req.params.categoryId
            }).then((removedMedDoc) => {
                res.send(removedMedDoc);
            })
        } else {
            res.sendStatus(404);
        }
    });

});



/* USER ROUTES */

/**
 * POST /users
 * Purpose: Sign up
 */
 app.post('/users', (req, res) => {
    // User sign up

    let body = req.body;
    let newUser = new User(body);

    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        // Session created successfully - refreshToken returned.
        // now we geneate an access auth token for the user

        return newUser.generateAccessAuthToken().then((accessToken) => {
            // access auth token generated successfully, now we return an object containing the auth tokens
            return { accessToken, refreshToken }
        });
    }).then((authTokens) => {
        // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

/**
 * POST /users/login
 * Purpose: Login
 */
 app.post('/users/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user

            return user.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
})

/**
 * GET /users/me/access-token
 * Purpose: generates and returns an access token
 */
 app.get('/users/me/access-token', verifySession, (req, res) => {
    // we know that the user/caller is authenticated and we have the user_id and user object available to us
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    });
})


/* HELPER METHODS */
let deleteMedicationsFromCategory = (_categoryId) => {
    //deleteMany method from mongoose
    Medication.deleteMany({
        _categoryId
    }).then(() => {
        console.log("Medications from " + _categoryId + " were deleted!");
    })
}




app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})