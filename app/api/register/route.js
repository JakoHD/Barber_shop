import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const {
      username,
      email,
      password,
      phone_number
    } = body;

    // Validaciones básicas
    if (!username || !email || !password || !phone_number) {
      return NextResponse.json({
        error: 'Todos los campos son obligatorios.'
      }, {
        status: 400
      });
    }

    if (password.length < 8) {
      return NextResponse.json({
        error: 'La contraseña debe tener al menos 8 caracteres.'
      }, {
        status: 400
      });
    }

    // Validar espacios en blanco
    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || phone_number.trim() === '') {
      return NextResponse.json({
        error: 'Ningún campo puede contener solo espacios en blanco.'
      }, {
        status: 400
      });
    }

    // Verificar si el usuario o correo ya existen
    const existingUser = await User.findOne({
      $or: [{
        username: username
      }, {
        email: email
      }]
    });
    if (existingUser) {
      return NextResponse.json({
        error: 'El nombre de usuario o correo electrónico ya está registrado.'
      }, {
        status: 400
      });
    }

    const user = await User.create(body);
    return NextResponse.json({
      success: true,
      data: user
    }, {
      status: 201
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message || 'Error al registrar el usuario.'
    }, {
      status: 400
    });
  }
}
