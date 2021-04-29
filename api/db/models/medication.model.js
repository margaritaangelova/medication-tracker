const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        //so that the white space on both ends of the string is trimmed:
        trim: true
    },
    //so that we will be able to tell which list this task belongs to:
    _categoryId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    frequency: {
        type: String,
        default: 'Every day',
    },
    timesADay: {
        type: Number,
        default: 1,
    },
    intakeTime: {
        type: Number,
        default: 8,
    },
    completed: {
        type: Boolean,
        default: false
    }
    

})

//creating the model:
const Medication = mongoose.model('Medication', MedicationSchema);

module.exports = { Medication }