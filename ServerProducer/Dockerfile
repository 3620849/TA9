FROM openjdk:11-jdk
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=target/ServerProducer.jar
ADD ${JAR_FILE} ServerProducer.jar
ENTRYPOINT ["java","-jar","/ServerProducer.jar"]