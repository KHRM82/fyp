const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cropSchema = new Schema(
  {
    cropName: { type: String, required: true },
    scientificName: { type: String, required: true },
    variety: { type: String, required: true },
    description: { type: String, required: true },
    plantingDate: { type: String, required: true },
    season: { type: String, required: true },
    plantingDepth: { type: String, required: true },
    spacing: { type: String, required: true },
    seedRate: { type: String, required: true },
    growthStage: { type: String, required: true },
    height: { type: String, required: true },
    LAI: { type: String, required: true },
    germinationRate: { type: String, required: true },
    temperatureMax: { type: String, required: true },
    temperatureMin: { type: String, required: true },
    rainfall: { type: String, required: true },
    sunlight: { type: String, required: true },
    soilType: { type: String, required: true },
    soilPH: { type: String, required: true },
    humidity: { type: String, required: true },
    irrigationSchedule: { type: String, required: true },
    fertilizerType: { type: String, required: true },
    fertilizerApplicationRate: { type: String, required: true },
    waterSource: { type: String, required: true },
    pestTypes: { type: String, required: true },
    diseaseTypes: { type: String, required: true },
    controlMeasures: { type: String, required: true },
    harvestDate: { type: String, required: true },
    yield: { type: String, required: true },
    qualityParameters: { type: String, required: true },
    storageConditions: { type: String, required: true },
    location: { type: String, required: true },
    elevation: { type: String, required: true },
    marketPrice: { type: String, required: true },
    costOfProduction: { type: String, required: true },
    profitMargin: { type: String, required: true },
    subsidies: { type: String, required: true },
    carbonFootprint: { type: String, required: true },
    waterUsage: { type: String, required: true },
    pesticideUsage: { type: String, required: true },
    previousYields: { type: String, required: true },
    previousIssues: { type: String, required: true },
    laborHours: { type: String, required: true },
    numberOfWorkers: { type: String, required: true },
    laborCosts: { type: String, required: true },
    technologyUse: { type: String, required: true },
    detailedQualityParameters: { type: String, required: true },
    comments: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Crop = mongoose.model("Crop", cropSchema);

module.exports = Crop;
