import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Create a token for a user
const createToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}
// Login user
const loginUser = async (req, res) => {
   const { email, password } = req.body;

   try {
      // Check if the user exists
      const user = await userModel.findOne({ email });
      if (!user) {
         return res.status(400).json({ success: false, message: "Invalid email or password" });
      }

      // Compare passwords
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
         return res.status(400).json({ success: false, message: "Invalid email or password" });
      }

      // Create a token
      const token = createToken(user._id);
      return res.status(200).json({ success: true, token });

   } catch (error) {
      return res.status(500).json({ success: false, message: "Server error" });
   }
}

// Register user
const registerUser = async (req, res) => {
   const { name, password, email } = req.body;

   try {
      // Check if email and password are provided
      if (!email || !password) {
         return res.status(400).json({ success: false, message: "Email and password are required" });
      }

      // Check if the user already exists
      const exists = await userModel.findOne({ email });
      if (exists) {
         return res.status(400).json({ success: false, message: "User already exists" });
      }

      // Validate email format and strong password
      if (!validator.isEmail(email)) {
         return res.status(400).json({ success: false, message: "Please enter a valid email" });
      }
      if (password.length < 8) {
         return res.status(400).json({ success: false, message: "Please enter a strong password" });
      }

      // Hash the user password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = new userModel({
         name: name,
         email: email,
         password: hashedPassword
      });

      // Save the user to the database
      const user = await newUser.save();

      // Create a token
      const token = createToken(user._id);
      return res.status(201).json({ success: true, token });

   } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Server error" });
   }
}

export { loginUser, registerUser };
