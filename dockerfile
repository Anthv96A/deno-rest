FROM ubuntu:latest

RUN apt-get update 
RUN apt-get install
RUN apt-get -y install curl
RUN apt-get -y install unzip
RUN curl -fsSL https://deno.land/x/install/install.sh | sh

ENV DENO_INSTALL="/root/.deno"
ENV PATH="${DENO_INSTALL}/bin:${PATH}"

WORKDIR /usr/src/app
COPY . .

EXPOSE 3000
CMD [ "deno", "run", "--allow-net", "--importmap=import-map.json" ,"--unstable", "server.ts" ]