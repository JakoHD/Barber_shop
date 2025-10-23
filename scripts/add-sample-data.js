const { MongoClient } = require('mongodb');

async function addSampleData() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/barberia';
  
  try {
    const client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db('barberia');
    const collection = db.collection('reservations');
    
    // Verificar si ya hay datos
    const count = await collection.countDocuments();
    if (count > 0) {
      console.log('✅ Ya hay datos en la colección');
      await client.close();
      return;
    }
    
    // Agregar datos de muestra
    const sampleReservations = [
      {
        nombre: "Juan Pérez",
        fecha: "2024-01-15",
        tipoCorte: "Fade clásico",
        email: "juan@email.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "María García",
        fecha: "2024-01-16",
        tipoCorte: "Low fade",
        email: "maria@email.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Carlos López",
        fecha: "2024-01-17",
        tipoCorte: "High fade",
        email: "carlos@email.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    await collection.insertMany(sampleReservations);
    console.log('✅ Datos de muestra agregados exitosamente');
    
    await client.close();
  } catch (error) {
    console.error('❌ Error agregando datos:', error);
  }
}

addSampleData();
