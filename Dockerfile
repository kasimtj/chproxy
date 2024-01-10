FROM docker-hosted.artifactory.tcsbank.ru/statist/clickhouse-proxy-server:stable-63a62bbe22fa7ad03831dc18cfffc39e0121c5f6

CMD ["/bin/sh", "-c", "rm -rf /tmp/tmp*; /bin/app -config /chproxy-config/config.yml"]