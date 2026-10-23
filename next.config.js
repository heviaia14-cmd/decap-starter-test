/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // En producción, reemplazar por el dominio real de imágenes si se usa
    // un CDN externo. Mientras las fotos vivan en /public/images, esto no
    // hace falta.
    unoptimized: true,
  },
};

module.exports = nextConfig;
