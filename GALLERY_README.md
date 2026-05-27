Galería de imágenes

Cómo usar

1. Crea carpetas dentro de `public/images/gallery/` por categoría, por ejemplo:
   - `public/images/gallery/Rap/`
   - `public/images/gallery/Carretes/`
   - `public/images/gallery/Artistas/`
   - `public/images/gallery/Marcial/`
   - `public/images/gallery/Amigos/`

2. Sube tus imágenes dentro de la carpeta correspondiente. Formatos soportados: `jpg`, `jpeg`, `png`, `webp`, `gif`, `avif`. También se listan archivos `mp4` si quieres mostrar videos.

3. Nombres de archivo: la galería extrae captions del nombre de archivo (quita prefijos numéricos si quieres captions limpias). Ejemplo: `2024-08-01_SenPro_en_tocata.jpg` → caption: `SenPro en tocata`.

4. La galería detecta automáticamente las carpetas y las muestra como filtros. No es necesario reiniciar el servidor para añadir imágenes en entorno de producción si usas despliegue que lea `public/`.

5. Si quieres que una imagen esté en "Todas" y en una categoría adicional, puedes duplicar el archivo en la otra carpeta.

Si quieres, puedo ordenar las imágenes por fecha de fichero o añadir captions personalizadas en un fichero `public/images/gallery/metadata.json`.
