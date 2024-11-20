const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const connectDB = require("./middleware/backend/config/dbConfig");

const feedbackRouter = require("./routes/feedback");
const adminRoutes = require("./routes/backend/adminRoutes");
const cropRoutes = require("./routes/backend/cropRoutes");
const diseaseRoutes = require("./routes/backend/diseaseRoutes");

connectDB(); // Initialize database connection

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Method override middleware
app.use(methodOverride("_method")); // Ensure this is included

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session setup
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

// Flash messages
app.use(flash());

// Middleware to make flash messages available in views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Static routes for crop pages
app.get("/wheat", (req, res) => {
  res.render("wheat");
});

app.get("/maize", (req, res) => {
  res.render("maize");
});

app.get("/weather-forecast", (req, res) => {
  res.render("weather-forecast");
});

app.get("/sugarcane", (req, res) => {
  res.render("sugarcane");
});

app.get("/tools-equipments", (req, res) => {
  res.render("tools-equipments");
});

app.get("/market-information", (req, res) => {
  res.render("market-information");
});

app.get("/crop-management", (req, res) => {
  res.render("cropManagement");
});

app.get("/wheatDis", (req, res) => {
  res.render("wheatDis");
});

app.get("/maizeDis", (req, res) => {
  res.render("maizeDis");
});

app.get("/sugarcaneDis", (req, res) => {
  res.render("sugarcaneDis");
});

// Preserve feedback routes
app.use("/feedback", feedbackRouter);

// Disease Management Route
app.get("/disease-management", (req, res) => {
  res.render("diseaseManagement");
});

// Home route
app.get("/", (req, res) => {
  res.render("home");
});

// Admin routes
app.use(adminRoutes);
app.use(cropRoutes);
app.use(diseaseRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
