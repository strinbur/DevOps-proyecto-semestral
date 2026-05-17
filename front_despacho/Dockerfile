# =========================
# Etapa 1: Build
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# =========================
# Etapa 2: Producción
# =========================
FROM nginx:stable-alpine

# Eliminar archivos default de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar build generado
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración de proxy reverso de Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]