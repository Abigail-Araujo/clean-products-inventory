const usersRouters = require("express").Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { PAGE_URL } = require("../config");
//const { request } = require('../app');
const { token } = require("morgan");

usersRouters.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(409).json({ message: "Este correo ya está en uso" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { id: savedUser.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20m",
      }
    );

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: savedUser.email,
      subject: "Verificacion de usuario",
      html: `
        <div style="font-family: Arial, sans-serif; background: #f4f6fb; padding: 0; padding-bottom: 20px; margin: 0;">
        <div style="background: #1976d2; padding: 48px 0 16px 0; text-align: center;">
          <span style="display: inline-block; vertical-align: middle;">
            <img src="${PAGE_URL}/img/logo.png" alt="Logo TodoLimpio" style="height: 60px; margin-right: 16px; vertical-align: middle;">
          </span>
          <span style="display: inline-block; vertical-align: middle;">
            <h1 style="color: #fff; font-size: 2rem; margin: 0; display: inline-block; vertical-align: middle;">TodoLimpio</h1>
          </span>
        </div>
        <div style="background: #fff; max-width: 480px; margin: 32px auto; border-radius: 12px; box-shadow: 0 2px 8px #1976d233; padding: 32px 24px; text-align: center;">
            <h2 style="color: #1976d2; margin-bottom: 16px;">¡Bienvenido, ${name}!</h2>
            <p style="color: #333; font-size: 1.1rem; margin-bottom: 24px;">
            Gracias por registrarte en <b>TodoLimpio</b>. Para activar tu cuenta y comenzar a gestionar tu inventario, por favor verifica tu correo haciendo clic en el siguiente botón:
            </p>
            <a href="${PAGE_URL}/verify/${savedUser.id}/${token}" 
            style="display: inline-block; background: #1976d2; color: #fff; font-weight: bold; font-size: 1.1rem; padding: 14px 32px; border-radius: 32px; text-decoration: none; margin: 24px 0; box-shadow: 0 2px 8px #1976d233;">
            Verificar mi correo
            </a>
            <p style="color: #888; font-size: 0.95rem; margin-top: 32px;">
            Si no solicitaste esta cuenta, puedes ignorar este mensaje.
            </p>
        </div>
        <div style="text-align: center; color: #aaa; font-size: 0.9rem; margin-bottom: 16px;">
            &copy; 2025 TodoLimpio. Todos los derechos reservados.
        </div>
        </div>
        `,
    });

    return res
      .status(201)
      .json({ message: "Usuario creado. Por favor verifica tu correo." });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);

    return res.status(500).json({
      message: "Error interno del servidor al crear el usuario.",
      error: error.message,
    });
  }
});

usersRouters.patch("/:id/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const id = decodedToken.id;
    await User.findByIdAndUpdate(id, { verified: true });
    return res.status(200).json({
      message:
        "Usuario verificado correctamente. Redirigiendo a la pagina de login...",
    });
  } catch (error) {
    //Encontrar el mail y nombre del usuario
    const id = req.params.id;
    const user = await User.findById(id);
    const { email, name } = user;
    //Firmar el nuevo token
    const token = jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "20m",
    });

    //Enviar el email

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verificacion de usuario",
      html: `
        <div style="font-family: Arial, sans-serif; background: #f4f6fb; padding: 0; padding-bottom: 20px; margin: 0;">
        <div style="background: #1976d2; padding: 48px 0 16px 0; text-align: center;">
          <span style="display: inline-block; vertical-align: middle;">
            <img src="${PAGE_URL}/img/logo.png" alt="Logo TodoLimpio" style="height: 60px; margin-right: 16px; vertical-align: middle;">
          </span>
          <span style="display: inline-block; vertical-align: middle;">
            <h1 style="color: #fff; font-size: 2rem; margin: 0; display: inline-block; vertical-align: middle;">TodoLimpio</h1>
          </span>
        </div>
        <div style="background: #fff; max-width: 480px; margin: 32px auto; border-radius: 12px; box-shadow: 0 2px 8px #1976d233; padding: 32px 24px; text-align: center;">
            <h2 style="color: #1976d2; margin-bottom: 16px;">¡Bienvenido, ${name}!</h2>
            <p style="color: #333; font-size: 1.1rem; margin-bottom: 24px;">
            Gracias por registrarte en <b>TodoLimpio</b>. Para activar tu cuenta y comenzar a gestionar tu inventario, por favor verifica tu correo haciendo clic en el siguiente botón:
            </p>
            <a href="${PAGE_URL}/verify/${id}/${token}" 
            style="display: inline-block; background: #1976d2; color: #fff; font-weight: bold; font-size: 1.1rem; padding: 14px 32px; border-radius: 32px; text-decoration: none; margin: 24px 0; box-shadow: 0 2px 8px #1976d233;">
            Verificar mi correo
            </a>
            <p style="color: #888; font-size: 0.95rem; margin-top: 32px;">
            Si no solicitaste esta cuenta, puedes ignorar este mensaje.
            </p>
        </div>
        <div style="text-align: center; color: #aaa; font-size: 0.9rem; margin-bottom: 16px;">
            &copy; 2025 TodoLimpio. Todos los derechos reservados.
        </div>
        </div>
        `,
    });

    return res.status(400).json({
      error:
        "El link ha expirado, verifica tu correo nuevamente para obtener el nuevo link.",
    });
  }
});

module.exports = usersRouters;
