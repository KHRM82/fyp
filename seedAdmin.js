const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("./models/backend/user"); // Adjust the path if necessary

dotenv.config(); // Load environment variables from .env file

async function createAdminUser() {
  try {
    // Admin credentials
    const username = "admin"; // Change this if needed
    const password = "farmer123"; // Update with a secure password

    // Check if admin user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("Admin user already exists. Skipping creation.");
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin user
    const adminUser = new User({
      username,
      password: hashedPassword,
      role: "admin",
    });

    // Save to the database
    await adminUser.save();
    console.log("Admin user created successfully!");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close(() => {
      console.log("MongoDB connection closed.");
    });
  }
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB. Seeding admin user...");
    return createAdminUser();
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with an error code
  });
