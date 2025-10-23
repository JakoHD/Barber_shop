import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  fecha: {
    type: String,
    required: true,
  },
  tipoCorte: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Reservation = mongoose.models.Reservation || mongoose.model('Reservation', ReservationSchema);

export default Reservation;
