FROM openjdk:11-jdk
VOLUME /tmp
EXPOSE 8081
ARG JAR_FILE=target/ServerConsumer.jar
ADD ${JAR_FILE} ServerConsumer.jar
ENTRYPOINT ["java","-jar","/ServerConsumer.jar"]