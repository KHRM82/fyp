const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diseaseSchema = new Schema(
  {
    diseaseName: { type: String, required: true },
    scientificName: { type: String, required: true },
    cropAffected: { type: String, required: true },
    symptoms: { type: String, required: true },
    diseaseCycle: { type: String, required: true },
    favorableConditions: { type: String, required: true },
    controlMeasures: { type: String, required: true },
    chemicalControl: { type: String, required: true },
    biologicalControl: { type: String, required: true },
    culturalControl: { type: String, required: true },
    preventiveMeasures: { type: String, required: true },
    photoPath: { type: String, required: false }, // Single image path
  },
  {
    timestamps: true,
  }
);

const Disease = mongoose.model("Disease", diseaseSchema);

module.exports = Disease;
