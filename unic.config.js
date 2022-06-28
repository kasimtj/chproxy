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
                      "type": "slack",
                      "token": "$[ENV:SLACK_TOKEN]",
                      "channel": "#statist-notify",
                    }
                  ]
                }
              ],
              "envs": {}
            },
          ],
        },
        "dev2": {
          "name": "clickhouse-proxy-server-golang",
          "type": "static",
          "environment": "dev",
          "namespace": "statist",
          "services": [
            {
              "name": "app",
              "resources": {
                "replicas": 1,
                "requests": {
                  "cpu": '50m',
                  "memory": '64Mi',
                },
                "limits": {
                  "cpu": '50m',
                  "memory": '64Mi',
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
                      "type": "slack",
                      "token": "$[ENV:SLACK_TOKEN]",
                      "channel": "#statist-notify",
                    }
                  ]
                }
              ],
              "envs": {}
            }
          ]
        }
      }
    }
  }
}