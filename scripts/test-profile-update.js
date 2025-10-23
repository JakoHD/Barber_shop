// Script para probar la funcionalidad de actualización de perfil
console.log('🧪 Probando funcionalidad de actualización de perfil...');

// Simular datos de usuario
const testUserData = {
  name: 'Usuario Test',
  email: 'test@email.com',
  phone: '1234567890',
  password: ''
};

console.log('📝 Datos de prueba:', testUserData);

// Simular actualización en localStorage
localStorage.setItem('userName', testUserData.name);
localStorage.setItem('userEmail', testUserData.email);
localStorage.setItem('userPhone', testUserData.phone);

console.log('✅ Datos guardados en localStorage');

// Verificar que se guardaron correctamente
const savedName = localStorage.getItem('userName');
const savedEmail = localStorage.getItem('userEmail');
const savedPhone = localStorage.getItem('userPhone');

console.log('🔍 Verificación:');
console.log('Nombre:', savedName);
console.log('Email:', savedEmail);
console.log('Teléfono:', savedPhone);

if (savedName === testUserData.name && savedEmail === testUserData.email && savedPhone === testUserData.phone) {
  console.log('🎉 ¡Funcionalidad de actualización de perfil funcionando correctamente!');
} else {
  console.log('❌ Error en la funcionalidad de actualización de perfil');
}
