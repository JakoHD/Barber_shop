import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { email, password } = body;

    // Validaciones básicas
    if (!email || !password) {
      return NextResponse.json({
        error: 'Correo electrónico y contraseña son obligatorios.'
      }, {
        status: 400
      });
    }

    if (email.trim() === '' || password.trim() === '') {
      return NextResponse.json({
        error: 'Ningún campo puede contener solo espacios en blanco.'
      }, {
        status: 400
      });
    }

    // Buscar usuario por correo electrónico
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        error: 'Credenciales inválidas.'
      }, {
        status: 401
      });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({
        error: 'Credenciales inválidas.'
      }, {
        status: 401
      });
    }

    // Generar JWT
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    }, {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message || 'Error al iniciar sesión.'
    }, {
      status: 500
    });
  }
}
