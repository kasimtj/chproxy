FROM docker-proxy.artifactory.tcsbank.ru/contentsquareplatform/chproxy:v1.25.0

ENTRYPOINT ["/bin/sh", "-c", "rm -rf /tmp/tmp*; /chproxy -config /chproxy-config/config.yml"]