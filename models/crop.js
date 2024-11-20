const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // Wheat, Maize, Sugarcane
  botanical_name: { type: String, required: true },
  family: { type: String, required: true },
  order: { type: String, required: true },
  class: { type: String, required: true },
  division: { type: String, required: true },
  chromosome_number: { type: Number, required: true },
  season: { type: String, required: true },
  plantingDate: { type: String },
  harvestDate: { type: String },
  bestPractices: { type: String, required: true },
  soilPreparation: { type: String },
  irrigation: { type: String },
  fertilizers: { type: String },
  pestControl: { type: String },
  commonDiseases: { type: String },
  diseaseSymptoms: { type: String },
  diseaseManagement: { type: String },
  climate_temperature: { type: String, required: true },
  marketValue: { type: String },
  storage: { type: String },
  usage: { type: String },
});

module.exports = mongoose.model("Crop", cropSchema);
