const { MongoClient } = require('mongodb');

async function testConnection() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/barberia';
  
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('✅ Conectado a MongoDB exitosamente');
    
    // Crear la base de datos y colección si no existen
    const db = client.db('barberia');
    const collection = db.collection('reservations');
    
    // Verificar si la colección existe
    const collections = await db.listCollections({ name: 'reservations' }).toArray();
    if (collections.length === 0) {
      await db.createCollection('reservations');
      console.log('✅ Colección "reservations" creada');
    } else {
      console.log('✅ Colección "reservations" ya existe');
    }
    
    await client.close();
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    console.log('💡 Asegúrate de que MongoDB esté ejecutándose en tu sistema');
    console.log('💡 Puedes iniciar MongoDB con: mongod');
  }
}

testConnection();
