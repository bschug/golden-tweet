FROM openjdk:11
VOLUME /tmp
EXPOSE 8888
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
