# Sistema de Reservas de Barbería

## 🚀 Configuración y Uso

### Prerrequisitos
- Node.js instalado
- MongoDB ejecutándose en tu sistema

### Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar MongoDB:**
   ```bash
   mongod
   ```

3. **Verificar conexión a MongoDB:**
   ```bash
   node scripts/test-mongodb.js
   ```

4. **Agregar datos de muestra (opcional):**
   ```bash
   node scripts/add-sample-data.js
   ```

5. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

### 🎯 Funcionalidades

#### Sistema de Autenticación
- **Login**: `/login` - Punto de entrada principal
- **Registro**: `/register` - Crear nueva cuenta
- **Protección de rutas**: Solo usuarios autenticados pueden acceder

#### Gestión de Reservas
- **Crear reserva**: Modal con formulario completo
- **Ver reservas**: Lista con todas las citas
- **Editar reserva**: Modificar datos existentes
- **Eliminar reserva**: Con confirmación
- **Persistencia**: Datos guardados en MongoDB

#### Perfil de Usuario
- **Editar perfil**: Nombre, email, teléfono, contraseña
- **Cerrar sesión**: Limpia datos y redirige al login

### 🗄️ Base de Datos

**MongoDB Collection: `reservations`**
```javascript
{
  _id: ObjectId,
  nombre: String,
  fecha: String,
  tipoCorte: String,
  email: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 🔧 API Endpoints

- `GET /api/reservations` - Obtener todas las reservas
- `POST /api/reservations` - Crear nueva reserva
- `PUT /api/reservations` - Actualizar reserva existente
- `DELETE /api/reservations?id={id}` - Eliminar reserva

### 🎨 Características de la UI

- **Diseño responsivo** con Tailwind CSS
- **Animaciones** con Framer Motion
- **Carrusel de imágenes** con react-slick
- **Iconos** de Lucide React
- **Tema oscuro** con acentos verdes

### 🐛 Solución de Problemas

1. **Error de conexión a MongoDB:**
   - Verifica que MongoDB esté ejecutándose
   - Ejecuta `mongod` en una terminal separada

2. **Login no funciona:**
   - Usa cualquier email válido
   - Contraseña mínimo 8 caracteres

3. **Reservas no se guardan:**
   - Verifica la conexión a MongoDB
   - Revisa la consola del navegador para errores

### 📝 Notas de Desarrollo

- **Login simulado**: Actualmente usa datos mock, fácil de conectar con API real
- **Base de datos**: MongoDB local, fácil de migrar a MongoDB Atlas
- **Autenticación**: localStorage, se puede mejorar con JWT
- **Validación**: Básica en frontend, se puede agregar más validaciones

¡El sistema está listo para usar! 🎉