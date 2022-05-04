FROM openjdk:11.0.11-jdk
COPY owls-starter/target/app.jar /
RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' > /etc/timezone
EXPOSE 8080
ENTRYPOINT [ "java" ,\
"-Xms1536m",\
"-Xmx1536m",\
"-XX:+HeapDumpOnOutOfMemoryError",\
"-Djava.security.egd=file:/dev/./urandom",\
"-jar",\
"/app.jar"]
