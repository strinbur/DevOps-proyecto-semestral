# =========================
# Etapa 1: Build
# =========================
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# =========================
# Etapa 2: Runtime (Seguro y Ligero)
# =========================
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Cumplimos con el requerimiento de Mínimo Privilegio
RUN addgroup -S despachos && adduser -S despachos -G despachos
COPY --from=builder /app/target/*.jar app.jar
RUN chown -R despachos:despachos /app
USER despachos
EXPOSE 8081
ENTRYPOINT ["java","-jar","app.jar"]