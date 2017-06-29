// app/models/test.model.js

'use strict';

const mongoose = require('mongoose');
const Counter = mongoose.model('Counter');

const TestSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    bloodTest: [{
        reportNo: Number,
        volume: Number, //ml
        collected: { type: Date, defualt: Date.now },
        tested: { type: Date, defualt: Date.now },
        redBloodCells: Number, //5 to 6 million cells/mcL
        whiteBloodCells: Number, //4500 - 10000 cells/mcl
        platelets: Number, //140000 - 450000 cells/mcl
        hemoglobin: Number, // 12-17 gm/dl
        hematocrit: Number, //35 -50 %
        plasmaGlugoseLevel: String, //Normal, PreDiabetes, Diabetes
        totalCholesterolLevel: String, //Desirable , borderlineHigh , High
        lDLCholesterolLevel: String, //Optimal, near Optimal, borderLine high, high, very high, 
        hDLCholesterolLevel: String // a major risk factor for heart disease <40 mg/dl,  The higher, the better 40 - 59, Consideed protective against heart disease >60
    }],
    urineTest: [{
        reportNo: Number,
        volume: Number, //ml
        collected: { type: Date, defualt: Date.now },
        tested: { type: Date, defualt: Date.now },
        color: String, //clear , Pale Straw Yellow, Honey, Orange, Blue, Green, Fizzy, Transparent yellow, Dark yellow, brown , pink
        clarity: String, //clarity or cloudy
        pH: Number, // 4.5 - 8
        specificGravity: Number, // 1.005 - 1.0025
        protein: Number, //<150mg
        glucose: Number, //<130mg
        ketones: Number,
        redBloodCells: Number, //<3RBCs
        whiteBloodcells: Number
    }],
    stoolTest: [{
        reportNo: Number,
        volume: Number, //gram
        collected: { type: Date, defualt: Date.now },
        tested: { type: Date, defualt: Date.now },
        additives: {
            sodiumMetaBiSulphite: Number,
            sodiumBenzoate: Number,
            monoSodiumGlutamate: Number // all 0-500
        },
        environmentalChemicals: {
            formaldehyde: Number,
            dieselExhaustfumes: Number,
            naturalGas: Number
        },
        pentachlorophenol: Number,
        phthalates: Number,
        redBloodCells: Number, //<3RBCs
        whiteBloodcells: Number
    }],
    sputumTest: [{
        reportNo: Number,
        volume: Number,
        collected: { type: Date, defualt: Date.now },
        tested: { type: Date, defualt: Date.now },
        race: String, // White , non-White, unKnown
        respiratorySymtoms: String, // yes, No, unKnown
        tuberculinSkinTestInduration: Number, //1-10 mm
        spontaneousSputumProduction: String, //yes,no, unKnown
        hivSerology: String, // positive, negotive
        redBloodCells: Number,
        whiteBloodCells: Number
    }],
    // mriScan: [{

    // }],
    // xTray: [{

    // }],
    echoCardiogramTest: [{
        reportNo: Number,
        tested: { type: Date, defualt: Date.now },
        aorta: Number,
        leftAtrium: Number,
        ivsd: Number,
        lvpwd: Number,
        lvdd: Number,
        lvsd: Number,
        lvdv: Number,
        lvsv: Number,
        delta: Number,
        eWave: Number,
        aWave: Number,
        eARatio: Number,
        edt: Number,
        ef: Number,
        bsa: Number,
        height: Number
    }],

    time: { type: Date, default: Date.now }
});

// TestSchema.pre('save', function(next) {
//     let doc = this;
//     Counter.findByIdAndUpdate({ _id: 'test' }, { $inc: { seq: 1 } }, function(error, counter) {
//         if (error)
//             return next(error);
//         doc.bloodTest[0].reportNo = "T-0" + counter.seq;
//         next();
//     });
// });

module.exports = mongoose.model('Test', TestSchema);