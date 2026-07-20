---
title: "Learning Kubernetes"
tagline: "Learning Kubernetes to deploy a HTTP server"
tags: ["kubernetes", "docker", "nginx"]
publishedOn: 2026-07-20
---

# Learning Kubernetes

I was handed a project that, in short, required me to create a HTTP API that
authorized users could access from anywhere. For this post I will not go over
the API itself. Instead, imagine that `api-img:latest` is a valid Docker image
that exposes an HTTP server on port _3000_.

## What is Kubernetes?

Kubernetes is an open-source container orchestration platform that automates the
deployment, scaling and management of containerized applications. It provides a
consistent way to run containers across one or more machines while handling
service discovery, restarts, rolling updates and load balancing.

Kubernetes is not a replacement for Docker. Docker builds and runs containers,
while Kubernetes coordinates where those containers run and how they
communicate.

## Kubernetes Resources

A Kubernetes cluster is configured using resources. For this API I need three of
them:

- A **Deployment** declares how the API containers should run and how many
  copies should exist.
- A **Service** gives those containers a stable internal address and distributes
  requests between them.
- An **Ingress** routes external HTTP traffic to the Service.

The request path looks like this:

```text
Client -> Ingress controller -> Service -> Pod
```

A **Pod** is the smallest unit Kubernetes deploys. A Pod can contain multiple
containers, but most application Pods contain one main container. Pods are
disposable, so clients should connect through a Service rather than directly to
a Pod IP address.

## Prerequisites

To follow along you need:

- A Kubernetes cluster, such as Docker Desktop, kind, Minikube or a managed
  cloud cluster.
- `kubectl` configured to communicate with that cluster.
- An Ingress controller. Creating an Ingress resource alone does not accept any
  traffic; a controller such as ingress-nginx must be installed in the cluster.
- The API image available to the cluster.

You can confirm that `kubectl` is connected with:

```sh
kubectl cluster-info
kubectl get nodes
```

A local image on your computer is not automatically available inside every
cluster. Depending on the local Kubernetes tool, you may need to load the image
into the cluster. For a remote cluster, tag and push the image to a container
registry that the cluster can access.

## Creating the Deployment

The Deployment manages the API Pods. If one crashes, Kubernetes creates a
replacement. It also lets me scale the API or roll out a new image without
manually replacing each container.

```yaml
# kubernetes.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: api-img:latest
          imagePullPolicy: Always
          ports:
            - name: http
              containerPort: 3000
          readinessProbe:
            tcpSocket:
              port: http
            initialDelaySeconds: 2
            periodSeconds: 5
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 512Mi
```

The `selector.matchLabels` value must match the labels in
`template.metadata.labels`. The Deployment uses that label to identify the Pods
it owns.

The readiness probe prevents a Pod from receiving requests until something is
listening on port _3000_. If the API has a health endpoint, an HTTP readiness
probe is even better because it can verify that the application itself is ready.

I used three replicas so multiple API requests can be processed at the same time
and one Pod can disappear without taking down the entire API.

## Creating the Service

Pod names and IP addresses change as Pods are replaced. A Service provides one
stable address for the group and selects the Pods with `app: api`.

Append this resource to `kubernetes.yaml`, separated by `---`:

```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  type: ClusterIP
  selector:
    app: api
  ports:
    - name: http
      port: 80
      targetPort: http
```

The Service accepts traffic on port _80_ and forwards it to the named `http`
port on each ready API Pod, which is port _3000_. `ClusterIP` keeps the Service
internal to the cluster. The Ingress will be the public entry point.

## Creating the Ingress

The Ingress defines how HTTP requests enter the cluster. This example expects an
NGINX Ingress controller and sends requests for `api.example.com` to the Service.

```yaml
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-ingress
spec:
  ingressClassName: nginx
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: api-service
                port:
                  name: http
```

The host must be changed to a domain I control. For a public deployment, its DNS
record should point to the external address assigned to the Ingress controller.
The exact setup differs between local clusters, virtual private servers and
managed Kubernetes providers.

This configuration only routes plain HTTP traffic. A public API should use HTTPS,
which requires a TLS certificate and a `tls` section in the Ingress. Authentication
still belongs in the API or an authentication-aware gateway; Kubernetes exposing
the API does not authorize callers by itself.

## Applying the Configuration

Kubernetes resources are declarative. Rather than giving Kubernetes a series of
steps, the YAML describes the state I want the cluster to maintain.

```sh
kubectl apply -f kubernetes.yaml
```

> Tip: Name your files something like _0001-first.yaml_, _0002-second.yaml_ and
> apply the directory with `.` to apply all yaml files in order at once.

I can then watch the Deployment become ready and inspect its resources:

```sh
kubectl rollout status deployment/api
kubectl get deployments,pods,services,ingresses
```

For a quick test that does not depend on DNS or an Ingress controller, I can
forward a local port directly to the Service:

```sh
kubectl port-forward service/api-service 8080:80
```

While that command is running, the API is available at
`http://localhost:8080`. Port forwarding is useful for development and debugging,
but it is not a production deployment method.

## Scaling the API

The number of Pods can be changed without rebuilding the image:

```sh
kubectl scale deployment/api --replicas=5
kubectl get pods -l app=api
```

The Service automatically discovers the new ready Pods through their labels and
starts distributing requests to them. For a production system, a Horizontal Pod
Autoscaler can adjust the replica count based on CPU, memory or custom metrics.

## Deploying an Update

I can update the Deployment to a new image tag with:

```sh
kubectl set image deployment/api api=api-img:v2
kubectl rollout status deployment/api
```

A Deployment performs a rolling update by gradually creating new Pods and
removing old ones. If the update fails, I can inspect its history or roll back:

```sh
kubectl rollout history deployment/api
kubectl rollout undo deployment/api
```

Although `latest` is convenient while learning, immutable version tags such as
`v2` or an image digest are safer in production. They make deployments
repeatable and make it clear which version is running.

## Troubleshooting

When the API is not reachable, I work through each resource in the request path:

```sh
kubectl get pods -l app=api
kubectl describe deployment api
kubectl logs deployment/api
kubectl get endpointslices -l kubernetes.io/service-name=api-service
kubectl describe ingress api-ingress
```

The most common issues are an image the cluster cannot pull, a Service selector
that does not match the Pod labels, an incorrect `targetPort`, a failing readiness
probe or a missing Ingress controller. Checking the Pods first and then moving
outward through the Service and Ingress makes the problem easier to isolate.

## What I Learned

The biggest shift for me was thinking in terms of desired state. I do not start
three containers and replace one when it crashes. I declare that three API Pods
should exist, and Kubernetes continually works to keep that statement true.

For this API, the Deployment keeps the containers running, the Service provides
a stable load-balanced destination and the Ingress exposes that destination to
HTTP clients. These resources are only the starting point, but together they
form a useful foundation for deploying a containerized API.

---

## Resources

[Docker Landing Page](https://www.docker.com)

[Kubernetes Landing Page](https://kubernetes.io)

[Kubernetes Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

[Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/)

[Kubernetes Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
