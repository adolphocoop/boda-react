# Landing de boda · React + Vite + Tailwind

## Requisitos
Node.js 18 o superior.

## Uso
```bash
npm install
npm run dev      # servidor local (http://localhost:5173)
npm run build    # genera la carpeta dist/ lista para publicar
npm run preview  # prueba local del build
```

## Personalizar
- `src/data.js`: nombres, fecha, historia, eventos y galería.
- Fotos: copia tus imágenes en `public/fotos/` y agrega `foto: "/fotos/1.jpg"` a cada elemento de `tiles`.
- Colores: variables CSS al inicio de `src/index.css`.
