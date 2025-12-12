import UserModel from "../models/User.js";
import bcrypt from 'bcrypt';
import { createToken } from '../utils/token.utils.js';

export const createUser = async (req, res) => {
    const { email, password, name, lastName } = req.body;

    if(!email || !password || !name || !lastName) {
        return res.status(400).json({ message: "Please fill in all the blanks" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
        email,
        password: hashedPassword,
        name,
        lastName
    });
        await newUser.save();
        res.status(201).json({ message: "User created successfully"});   
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    // Crear el token
    const token = createToken({
      id: user._id,
      name: user.name,
      email: user.email
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error during login", error: error.message });
  }
}

export const userLoggedIn = (req, res) => {
  res.json({
    message: "User authenticated successfully",
    user: req.user
  });
};

