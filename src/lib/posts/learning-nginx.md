---
title: "Learning Nginx"
tagline: "Using Nginx to deploy a HTTP server"
tags: ["nginx"]
publishedOn: 2026-01-28
---

# Learning Nginx

## What is Nginx

Nginx is a high-performance web server and reverse proxy server. It is known for
its speed, stability, rich feature set, simple configuration, and low resource
consumption.

Nginx is widely used throughout the web taking up around 30% - 40% of the market
share for web servers. It can be used for load balancing, configuring mTLS, as a
reverse proxy, caching and more. In this post I will go over what I have used it
for in my recent project, which is load balancing.

## Load Balancing

Load balancing is when you expose a single service that will funnel requests to
multiple of the same service in such a way to evenly distribute the load. This
is useful when you have multiple instances of a service running and want to
ensure that each instance is handling an equal amount of traffic, this is
incredibly useful for improving performance on multi-core systems.

## My Example

The project I have requires me to create an API that uses load balancing to
allow for more concurrent connections. For this I created a docker container and
spun up a kubernetes cluster, then in my manifest for the ingress I have used
this as the Nginx config. I have omitted the kubernetes information so we can
focus on the Nginx configuration.

```conf
# nginx.conf

events {
  # This sets the maximum number of connections that can be handled by a single worker process
  worker_connections 1024;
}

# Use stream for a TCP
# stream {}

# Start a HTTP server
http {
  # Include mime.types to define the content types for various file extensions
  include mime.types;

  upstream backend {
    # api-service is the name of the kubernetes service with my API in it, running on port 80
    server api-service:80;
  }

  # Declare a server to be exposed to the local device
  server {
    # Expose port 80 on your local machine
    listen 80;

    # All paths / and onwards (which is all paths)
    location / {
      # Redirect traffic to 'upstream backend' which is the API service
      proxy_pass http://backend;
      # Forward headers to the API request so the inner service can use them
      # '$' variables are placeholders for values that will be substituted at runtime by Nginx
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $host;
    }
  }
}
```

## Test Your Config

To test your config file for syntax error you can run this:

```sh
nginx -t -c /path/to/your/nginx.conf
```

## Start the Server

To run your config, which will start the server run this:

```sh
nginx -c /path/to/your/nginx.conf
```

## Reload the Server

To reload the server after making changed to the `.conf` file run this:

```sh
nginx -s reload
```

## Stop the Server

To stop the server you can run this:

```sh
nginx -s stop
```

## Graceful Shutdown the Server

A graceful shutdown allows for the existing requests to finish before shutting
down, to do this run:

```sh
nginx -s quit
```

---

## Resources

[Nginx Homepage](https://nginx.org)

[Nginx Statistics](https://w3techs.com/technologies/details/ws-nginx)
