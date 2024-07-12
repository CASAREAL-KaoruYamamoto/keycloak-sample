# build application
FROM maven:3-eclipse-temurin-21 AS build
COPY . /home/workspace
WORKDIR /home/workspace
RUN mvn package

# runtime
FROM eclipse-temurin:21 AS runtime
COPY --from=build /home/workspace/target/*.jar /opt/todo-service.jar
CMD ["java", "-jar", "/opt/todo-service.jar"]
