const resources = {
  "replicas": 2,
  "requests": {
    "cpu": '50m',
    "memory": '1024Mi',
  },
  "limits": {
    "cpu": '50m',
    "memory": '1024Mi',
  },
}

const ports = {
  "external": 80,
  "internal": 8080
}

const probes = {
  "liveness": {
    "path": '/metrics',
    "port": 8080
  },
  "readiness": {
    "path": '/metrics',
    "port": 8080
  }
}

const extensions = [
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
]

const volumes = [
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
]

const testConfig = {
  "name": "clickhouse-proxy-server-golang-dev",
  "type": "static",
  "namespace": "statist",
  "environment": 'yandex-dev',
  "services": [
    {
      "name": "app",
      "resources": resources,
      "ports": ports,
      "probes": probes,
      "extensions": extensions,
      "envs": {},
      "volumes": volumes,
    },
  ],
}

const prodConfig = {
  "name": "clickhouse-proxy-server-golang",
  "type": "prod",
  "namespace": "statist",
  "environment": "prod2",
  "clusters": ['m1-prod2', 'ds-prod2', 'ix-m2-prod2'],
  "services": [
    {
      "name": "app",
      "resources": resources,
      "ports": ports,
      "probes": probes,
      "extensions": extensions,
      "envs": {},
      "volumes": volumes,
    },
  ],
}

module.exports = {
  "$schema": "https://schema-storage.s3-website.tinkoff.ru/unic/schema-v1.json",
  "spec": {
    "apps": {
      "clickhouse-proxy-server": {
        "prod2": prodConfig,
        "dev": testConfig,
      }
    }
  }
}
