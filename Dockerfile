FROM docker-hosted.artifactory.tcsbank.ru/statist/clickhouse-proxy-server:stable-5b994f76a7052331080792033aa5ee0c02c2902b

CMD ["/bin/sh", "-c", "rm -rf /tmp/tmp*; /bin/app -config /chproxy-config/config.yml"]