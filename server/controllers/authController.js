const User = require("../models/User");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const { validateRegistration, validateLogin } = require("../utils/validators");

const SALT_ROUNDS = 12

const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role}, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.register = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    const errors = validateRegistration(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Пользователь с таким email уже существует",
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create(full_name, email, hashedPassword);

    const token = generateToken(user.id, user.role);

    return res.status(201).json({
      success: true,
      message: "Пользователь успешно зарегистрирован",
      data: {
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          created_at: user.created_at,
        },
        token,
      },
    });
  } catch (error) {
    console.error("ошибка при регистрации", error);
    return res.status(500).json({
      success: false,
      message: "ошибка сервера",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validateLogin(req.body);
    if (errors.length) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Неверный email или пароль",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Неверный email или пароль",
      });
    }
    const token = generateToken(user.id, user.role);

    return res.status(200).json({
      success: true,
      message: "Вход выполнен успешно",
      data: {
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
          created_at: user.created_at,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Ошибка при входе:", error);
    return res.status(500).json({
      success: false,
      message: "Внутренняя ошибка сервера",
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Пользователь не найден",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
          created_at: user.created_at,
        },
      },
    });
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    return res.status(500).json({
      success: false,
      message: "Внутренняя ошибка сервера",
    });
  }
};
