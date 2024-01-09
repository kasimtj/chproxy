FROM docker-hosted.artifactory.tcsbank.ru/statist/clickhouse-proxy-server:stable-e5f9bc8ac24728efe622e7edad04d30c9786f8c1

CMD ["/bin/sh", "-c", "rm -rf /tmp/tmp*; /bin/app -config /chproxy-config/config.yml"]