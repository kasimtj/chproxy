module.exports = {
  "$schema": "https://schema-storage.s3-website.tinkoff.ru/unic/schema-v1.json",
  "spec": {
    "apps": {
      "clickhouse-proxy-server": {
        "prod2": {
          "name": "clickhouse-proxy-server-golang",
          "type": "prod",
          "namespace": "statist",
          "environment": "prod2",
          "clusters": ['m1-prod2', 'ds-prod2', 'ix-m2-prod2'],
          "services": [
            {
              "name": "app",
              "resources": {
                "replicas": 2,
                "requests": {
                  "cpu": '50m',
                  "memory": '128Mi',
                },
                "limits": {
                  "cpu": '50m',
                  "memory": '128Mi',
                },
              },
              "ports": {
                "external": 80,
                "internal": 8080
              },
              "probes": {
                "liveness": {
                  "path": '/metrics',
                  "port": 8080
                },
                "readiness": {
                  "path": '/metrics',
                  "port": 8080
                }
              },
              "extensions": [
                {
                  "kind": "metrics",
                  "path": "/metrics",
                  "port": 8080
                },
                {
                  "kind": "notification",
                  "agents": [
                    {
                      "type": "mattermost",
                      "webhookUrl": "$[ENV:MATTERMOST_WEBHOOK_URL]"
                    }
                  ]
                }
              ],
              "envs": {},
              "volumes": [
                {
                  "name": "chproxy-config",
                  "source": {
                    "secret": {
                      "secretName": "chproxy-config"
                    },
                  },
                  "mount": {
                    "mountPath": "/chproxy-config"
                  }
                },
              ],
            },
          ],
        }
      }
    }
  }
}
