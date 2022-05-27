FROM openjdk:11
VOLUME /tmp
EXPOSE 5000
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
