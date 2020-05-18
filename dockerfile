FROM ubuntu:latest
RUN apt-get update \
    && apt-get install \
    && apt-get -y install curl \
    && apt-get -y install unzip
RUN curl -fsSL https://deno.land/x/install/install.sh | sh
ENV PATH="/root/.deno/bin:${PATH}"

WORKDIR /usr/src/app
COPY ./src ./src
COPY import-map.json .
COPY server.ts .

EXPOSE 3000
CMD [ "deno", "run", "--allow-net", "--importmap=import-map.json" ,"--unstable", "server.ts" ]