const mongoose = require("mongoose");
const Crop = require("./models/crop"); // Ensure the path is correct

mongoose.connect("mongodb://localhost:27017/farm_management", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cropsData = [
  {
    name: "Wheat",
    type: "wheat",
    botanical_name: "Triticum aestivum",
    family: "Poaceae",
    order: "Poales",
    class: "Liliopsida",
    division: "Magnoliophyta",
    chromosome_number: 42,
    season: "Rabi (winter)",
    plantingDate: "October-November",
    harvestDate: "March-April",
    bestPractices:
      "Use certified seeds, follow crop rotation, timely irrigation",
    soilPreparation: "Plow to a fine tilth, apply organic manure",
    irrigation:
      "10 inches of rainfall annually, irrigation scheduling based on soil and environmental conditions",
    fertilizers: "Urea, DAP, Potash; Apply nitrogen in split doses",
    pestControl: "Regular monitoring, use bio-pesticides",
    commonDiseases: "Rust, Smut, Blight",
    diseaseSymptoms:
      "Yellowish-orange pustules on leaves (Rust), black powdery masses (Smut)",
    diseaseManagement: "Use disease-resistant varieties, apply fungicides",
    climate_temperature: "20-25°C",
    marketValue: "Track market trends",
    storage: "Store in a dry, cool place",
    usage: "Flour, Bread, Pasta, Bakery products",
  },
  {
    name: "Maize",
    type: "maize",
    botanical_name: "Zea mays",
    family: "Poaceae",
    order: "Poales",
    class: "Liliopsida",
    division: "Magnoliophyta",
    chromosome_number: 20,
    season: "Kharif (summer)",
    plantingDate: "June-July",
    harvestDate: "September-October",
    bestPractices: "Timely sowing, weed management, balanced fertilization",
    soilPreparation: "Deep plowing, apply organic manure",
    irrigation: "Adequate water supply during growth stages",
    fertilizers: "NPK, micro-nutrients; Split nitrogen applications",
    pestControl: "Use pest-resistant varieties, biological control",
    commonDiseases: "Blight, Rust, Smut",
    diseaseSymptoms: "Yellowing and blighting of leaves, fungal growth",
    diseaseManagement: "Apply fungicides, crop rotation",
    climate_temperature: "25-30°C",
    marketValue: "Monitor market prices",
    storage: "Cool, dry storage",
    usage: "Animal feed, Corn flour, Corn syrup",
  },
  {
    name: "Sugarcane",
    type: "sugarcane",
    botanical_name: "Saccharum officinarum",
    family: "Poaceae",
    order: "Poales",
    class: "Liliopsida",
    division: "Magnoliophyta",
    chromosome_number: 80,
    season: "Perennial",
    plantingDate: "February-March",
    harvestDate: "November-December",
    bestPractices: "Seed selection, weed management, irrigation scheduling",
    soilPreparation: "Deep tillage, apply compost",
    irrigation: "Regular irrigation, avoid water stress",
    fertilizers: "NPK, micronutrients; Timely application",
    pestControl: "Use resistant varieties, integrated pest management",
    commonDiseases: "Red rot, Smut, Wilt",
    diseaseSymptoms: "Red streaks in stem, black fungal growth",
    diseaseManagement: "Resistant varieties, fungicide application",
    climate_temperature: "30-35°C",
    marketValue: "Monitor sugar market trends",
    storage: "Cool storage, avoid moisture",
    usage: "Sugar production, Ethanol, Biofuel",
  },
  // Add more crops if needed
];

Crop.insertMany(cropsData)
  .then(() => {
    console.log("Data inserted successfully");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error inserting data: ", err);
    mongoose.connection.close();
  });
