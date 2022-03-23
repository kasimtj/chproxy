FROM docker-hosted.artifactory.tcsbank.ru/cicd-images/base-image-focal as builder

ARG SRC_DIR=/opt
ARG CHPROXY_NAME=chproxy
ENV CHPROXY_CONFIG=${SRC_DIR}/config.yml
ENV CHPROXY_CONFIG_TEMPLATE=${SRC_DIR}/config.yml.template

ARG CLICKHOUSE_USER
ARG CLICKHOUSE_PASSWORD
ARG CLICKHOUSE_PROJECT_OWNER_USER
ARG CLICKHOUSE_PROJECT_OWNER_PASSWORD
ARG CLICKHOUSE_NODES

RUN apt-get update -y && \
    apt-get install gettext-base -y && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR ${SRC_DIR}

COPY bin/chproxy-linux-amd64-v1.14.0.tar.gz chproxy-linux-amd64.tar.gz
RUN tar -zxf chproxy-linux-amd64.tar.gz && \
    rm -rf chproxy-linux-amd64.tar.gz

COPY config.yml.template ${CHPROXY_CONFIG_TEMPLATE}
RUN envsubst < ${CHPROXY_CONFIG_TEMPLATE} > ${CHPROXY_CONFIG}

FROM docker-hosted.artifactory.tcsbank.ru/cicd-images/base-image-focal

ENV SRC_DIR=/opt
ENV CHPROXY_NAME=chproxy

ENV CHPROXY_APP_NAME=${CHPROXY_NAME}
ENV CHPROXY_CONFIG=${SRC_DIR}/config.yml

WORKDIR ${SRC_DIR}

COPY --from=builder ${CHPROXY_CONFIG} ${CHPROXY_CONFIG}
COPY --from=builder ${SRC_DIR}/${CHPROXY_APP_NAME} ${SRC_DIR}/${CHPROXY_APP_NAME}

ENTRYPOINT exec ./${CHPROXY_APP_NAME} -config ${CHPROXY_CONFIG}