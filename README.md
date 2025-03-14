# eCommerce con Next.js

Este es un proyecto de eCommerce desarrollado con Next.js. Permite a los usuarios explorar productos, agregarlos al carrito y realizar pagos.

## Tecnologías utilizadas

- **Next.js** - Framework de React para aplicaciones web
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework de estilos CSS
- **PostgreSQL** - Base de datos relacional
- **Express** - Para manejar la base de datos
- **NextAuth.js** - Autenticación de usuarios
- **React Query** - Manejo de estado asincrónico

## Características

- Listado y búsqueda de productos
- Gestión de carrito de compras
- Procesamiento de pagos con Mercado Pago
- Autenticación de usuarios
- Panel de administración para gestionar productos y pedidos

## Instalación y configuración

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/nombre-del-repo.git
   cd nombre-del-repo
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   - Copiar el archivo `.env.example` a `.env.local`
   - Agregar las credenciales necesarias (base de datos, API keys, etc.)

4. Ejecutar la base de datos (si se usa Docker):
   ```bash
   docker-compose up -d
   ```

5. Ejecutar la aplicación en desarrollo:
   ```bash
   npm run dev
   ```

6. Acceder en el navegador:
   ```
   http://localhost:3000
   ```

## Scripts disponibles

- `npm run dev` - Inicia la aplicación en modo desarrollo
- `npm run build` - Genera una versión optimizada para producción
- `npm run start` - Inicia la aplicación en producción
- `npm run lint` - Ejecuta el linter para verificar errores de código

## Contribución

Si deseas contribuir, por favor abre un **issue** o envía un **pull request**. ¡Toda ayuda es bienvenida!

## Licencia

Este proyecto está bajo la licencia MIT.

