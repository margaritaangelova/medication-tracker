const express = require('express');
const app = express();

const mongoose = require('./db/mongoose');

const bodyParser = require('body-parser');

//load in the mongoose models:
const { Category, Medication } = require('./db/models');

// Load express middleware
app.use(bodyParser.json());

// // CORS HEADERS MIDDLEWARE
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     //we have to define all the methods here in order to use them later:
//     res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

//     res.header(
//         'Access-Control-Expose-Headers',
//         'x-access-token, x-refresh-token'
//     );

//     next();
// });

/* CATEGORY ROUTES */
// creating the root handles:


// app.get('/', (req,res) => {
//     res.send("Hello");
// })


app.get('/categories', (req, res) => {
    //return an array of all of the categories in the database

    //we want to find all of the categories, so we leave the condition {} empty:
    //after creating the mongoose.js file:
    Category.find({}).then((categories) => {
        res.send(categories);
    }).catch((e)=>{
        res.send(e);
    });
});

app.post('/categories', (req, res) => {
    //create a new category and return the new category document back to the user (which includes the id)
    //the category information fields will be passed with JSON request body

    let title = req.body.title;

    let newCategory = new Category({
        title
    });

    newCategory.save().then((categoryDoc) => {
        //the full category document is returned
        res.send(categoryDoc);
    });
});

app.patch('/categories/:id', (req, res) => {
    //for updating the specified category

    Category.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body   //$set is a MongoDB keyword
    }).then(() => {
        //there is no need to send back the whole document, only a message is enough
        res.send({ 'message': 'updated successfully' });
    });
});

app.delete('/categories/:id', (req, res) => {
    //for deleting the specified category
    Category.findOneAndRemove({
        _id: req.params.id,
        // _userId: req.user_id
    }).then((removedCategoryDoc) => {
        res.send(removedCategoryDoc);

        // // delete all the tasks that are in the deleted list
        // deleteTasksFromList(removedListDoc._id);
    })
});

// /* MEDICATION ROUTES */

app.get('/categories/:categoryId/medications', (req, res) => {
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


app.post('/categories/:categoryId/medications', (req, res) => {
    // We want to create a new medication in a category specified by categoryId


    let newMedication = new Medication({
        title: req.body.title,
        _categoryId: req.params.categoryId
    });
    newMedication.save().then((newMedDoc) => {
        res.send(newMedDoc);

    })
})

app.patch('/categories/:categoryId/medications/:medicationId', (req, res) => {
    // We want to update an existing medication (specified by medicationId)

    Medication.findOneAndUpdate({
        //giving the id of the category as well as the id of the medication
        _id: req.params.medicationId,
        _categoryId: req.params.categoryId
    }, {
        $set: req.body
    }
    ).then(() => {
        res.send({ message: 'Updated successfully.' })
    })

});


app.delete('/categories/:categoryId/medications/:medicationId', (req, res) => {

    Medication.findOneAndRemove({
        // categoryId and medicationId are from the url above
        _id: req.params.medicationId,
        _categoryId: req.params.categoryId
    }).then((removedMedDoc) => {
        res.send(removedMedDoc);
    })

});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})