# === BUILD STAGE ===
# Use a Maven image with a JDK to build the application
FROM maven:3.9-eclipse-temurin-21 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project files (pom.xml, .mvn directory, mvnw script)
COPY .mvn .mvn
COPY mvnw pom.xml ./

# Download dependencies (Docker caches this layer if pom.xml doesn't change)
RUN mvn dependency:go-offline -B

# Copy the source code
COPY src ./src

# Build the application into a JAR file
RUN mvn clean package -DskipTests

# === RUN STAGE ===
# Use a minimal JRE image to run the application (no Maven/JDK needed)
FROM eclipse-temurin:21-jre-jammy

# Set the working directory in the final image
WORKDIR /app

# Copy the JAR file from the 'builder' stage to the run stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port the Spring Boot app runs on
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
