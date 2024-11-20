const bcrypt = require("bcryptjs");

const storedHash =
  "$2a$10$qfkncm.4zOUhcuVOPTmKSOJvzqofsl7z4MI.oyz25o6hFtY7DhTHS"; // Replace with the new hashed password from the database
const plaintextPassword = "farmer123"; // Ensure this matches the plaintext password

bcrypt.compare(plaintextPassword, storedHash, (err, result) => {
  if (err) {
    console.error("Error comparing passwords:", err);
  } else {
    console.log("Password match result:", result); // Should print 'true'
  }
});
