# =========================
# Etapa 1: Build
# =========================
FROM maven:3.9.9-eclipse-temurin-17 AS builder

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src ./src

RUN mvn clean package -DskipTests

# =========================
# Etapa 2: Runtime
# =========================
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Crear usuario no root
RUN addgroup -S spring && adduser -S spring -G spring

# Copiar jar compilado
COPY --from=builder /app/target/*.jar app.jar

# Cambiar permisos
RUN chown -R spring:spring /app

USER spring

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]