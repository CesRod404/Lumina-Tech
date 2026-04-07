# Lumina Tech | Ecommerce Premium

Lumina Tech es una plataforma de comercio electrónico de tecnología de alta gama diseñada como proyecto final para el curso de Desarrollo Web en EBAC. El enfoque principal es la implementación de estructuras semánticas, estilos avanzados con SASS y manipulación dinámica del DOM con JavaScript puro.

## 🚀 Tecnologías Utilizadas

- **HTML5**: Uso de etiquetas semánticas para SEO y accesibilidad.
- **CSS3 (SASS)**: Preprocesador para una arquitectura de estilos modular y limpia.
- **Metodología BEM**: Nomenclatura estandarizada (`block__element--modifier`) para escalabilidad.
- **Vanilla JavaScript**: Lógica de interacción sin librerías externas.
- **Flexbox & CSS Grid**: Maquetación moderna y responsiva.

## ✨ Características Principales

1. **Diseño Responsivo**: Experiencia fluida desde smartphones hasta desktop.
2. **Sistema de Carrito**: 
   - Añadir y eliminar productos.
   - Contador dinámico en el header.
   - Cálculo automático de totales.
3. **Filtrado y Búsqueda**:
   - Búsqueda por palabras clave en tiempo real.
   - Filtro por categorías (Laptops, Audio, Accesorios).
4. **Simulación de Pago (Checkout)**:
   - Flujo de 3 pasos: Resumen de pedido -> Detalles de pago -> Éxito.
   - Validación de formularios simulada.
5. **Secciones Adicionales**:
   - Sección "Nosotros" con cuadrícula de diseño.
   - Suscripción a Newsletter con feedback visual.
   - Formulario de contacto integrado.

## 📁 Estructura del Proyecto

```text
/
├── assets/         # Imágenes de productos (PNG/JPG)
├── css/
│   └── styles.css  # CSS final compilado
├── js/
│   └── app.js      # Lógica de la aplicación
├── scss/           # Código fuente SASS
│   ├── _base.scss
│   ├── _components.scss
│   ├── _layout.scss
│   ├── _variables.scss
│   └── main.scss
└── index.html      # Estructura principal

