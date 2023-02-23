# CHProxy

## Description
This repo contains build and deploy configuration for installation of [chproxy](https://www.chproxy.org/).

It contains of:
- K8S Secret with Chproxy YAML configuration file
- Dockerfile with custom entrypoint and configuration based on original Chproxy image

## How it works?

Configuration, build and deploy happen in CI. 
First, we build and push Docker image to Artifactory.
Optionaly we create Secret, substitute ENV variables in it and publish to K8S.
Finally, we deploy new image with new configuration on K8S.

## How to change configuration?

Just edit `secret.template.yml` and add env variables if needed in Devplatform and `.gitlab-ci.yml` :)