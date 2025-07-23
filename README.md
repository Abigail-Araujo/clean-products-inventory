# TodoLimpio - Sistema de Inventario

Es una aplicación web para la gestión de inventario de TodoLimpio, pensada para negocios que necesitan controlar productos de limpieza, entradas, salidas y movimientos de manera sencilla y eficiente.

## Características

- Registro y verificación de usuarios por correo electrónico.
- Gestión de productos, categorías y presentaciones.
- Control de movimientos de inventario (entradas/salidas) con motivos.
- Visualización y filtrado de movimientos por tipo y búsqueda.
- Ordenamiento de productos por estado de stock (alto, medio, bajo) y otros campos.
- Actualización automática del estado de stock (alto, medio, bajo).
- Interfaz moderna y responsiva con Tailwind CSS, compatible con escritorio y tablet (no optimizada para teléfonos móviles).
- Envío de correos automáticos para verificación de cuenta.

## Tecnologías

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Nodemailer, bcrypt
- **Frontend:** HTML, CSS (Tailwind), JavaScript, Tom Select, Axios
- **Autenticación:** JWT
- **Correo:** Nodemailer + Gmail SMTP

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tuusuario/todolimpio-inventory.git
   cd todolimpio-inventory
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env`:

   ```
   MONGO_URI_TEST=tu_uri_mongodb
   ACCESS_TOKEN_SECRET=tu_secreto_jwt
   EMAIL_USER=tu_correo@gmail.com
   EMAIL_PASS=tu_contraseña_app
   PAGE_URL=http://localhost:3000
   ```

4. Inicia el servidor:

   ```bash
   npm run dev
   ```

```markdown
- Para desarrollo utiliza: `npm run dev`

- Para producción utiliza: `npm run start`

## Uso

- Accede a la aplicación en [http://localhost:3000](http://localhost:3000).
- Regístrate y verifica tu cuenta desde el correo recibido.
- Agrega productos y gestiona los movimientos de inventario.
- Filtra y busca movimientos por tipo y nombre de producto.
- Puedes ordenar los productos por estado de stock y otros criterios desde la vista de inventario.

## Estructura del proyecto
```

inventoryapp/
├── controllers/
│ ├── users.js
│ ├── products.js
│ ├── inventoryMovements.js
│ ├── movementReasons.js
│ ├── categories.js
│ └── presentations.js
├── models/
│ ├── user.js
│ ├── product.js
│ ├── inventoryMovement.js
│ └── movementReason.js
├── views/
│ ├── index/
│ ├── inventoryMovements/
│ ├── stock/
│ ├── signup/
│ ├── login/
│ ├── verify/
│ ├── styles/
│ └── components/
├── img/
├── middleware/
│ └── auth.js
├── utils/
│ └── utils.js
├── app.js
└── README.md

```

## Contribución

¿Quieres mejorar TodoLimpio?
Haz un fork, crea tu rama y envía un pull request.

## Licencia

MIT

---

**Contacto:**
Si tienes dudas o sugerencias, puedes escribir a [abiaraujo2004@gmail.com](mailto:abiaraujo2004@gmail.com)
```
