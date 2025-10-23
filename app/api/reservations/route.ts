import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Reservation from '../../../models/Reservation';

export async function GET() {
  try {
    await connectDB();
    const reservations = await Reservation.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ reservations });
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    return NextResponse.json({ error: 'Error al obtener reservas' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { nombre, fecha, tipoCorte, email } = body;

    if (!nombre || !fecha || !tipoCorte || !email) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    const nuevaReserva = new Reservation({
      nombre,
      fecha,
      tipoCorte,
      email
    });

    await nuevaReserva.save();
    return NextResponse.json({ reservation: nuevaReserva });
  } catch (error) {
    console.error('Error al crear reserva:', error);
    return NextResponse.json({ error: 'Error al crear reserva' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { id, nombre, fecha, tipoCorte } = body;

    if (!id || !nombre || !fecha || !tipoCorte) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { nombre, fecha, tipoCorte },
      { new: true }
    );

    if (!reservation) {
      return NextResponse.json({ error: 'Reserva no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ reservation });
  } catch (error) {
    console.error('Error al actualizar reserva:', error);
    return NextResponse.json({ error: 'Error al actualizar reserva' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    const reservation = await Reservation.findByIdAndDelete(id);

    if (!reservation) {
      return NextResponse.json({ error: 'Reserva no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Reserva eliminada' });
  } catch (error) {
    console.error('Error al eliminar reserva:', error);
    return NextResponse.json({ error: 'Error al eliminar reserva' }, { status: 500 });
  }
}
