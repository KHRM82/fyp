const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/backend/user"); // Adjust the path if necessary

dotenv.config(); // Load environment variables from .env file

async function createAdminUser() {
  try {
    const username = "admin"; // Desired admin username
    const password = "farmer123"; // Ensure this is the correct plaintext password

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("Admin user already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Generated hashed password: ${hashedPassword}`);

    const adminUser = new User({
      username: username,
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    mongoose.connection.close();
  }
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    createAdminUser();
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
