FROM docker-proxy.artifactory.tcsbank.ru/contentsquareplatform/chproxy:v1.21.0

ENTRYPOINT ["/chproxy", "-config", "/chproxy-config/config.yml"]