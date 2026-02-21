---
title: "Dockerfile Basics"
publishedOn: 2026-02-21
tagline: "Learn the basic usage and commands for Dockerfile"
tags: ["docker"]
---

# Dockerfile Basics

## What is Dockerfile

Dockerfile is a file used by [Docker](https://www.docker.com) to build your
project into an docker image. A dockerfile is represented on your system as just
`Dockerfile` although you can use the CLI to pass in any file.

`Dockerfile` is made up of keywords such as capital `FROM`, `WORKDIR`, `ENV`,
`EXPOSE`. that are used to instruct the Docker engine what to do. They are also
used to create _layers_ in the image that can be cached upon build to speed up
future builds.

## How Dockerfile Works

Each line in a `Dockerfile` is a command that is executed by the Docker engine.
The Docker engine will go through the file line by line and execute an action
that could change something within the image, expose something to the image host
or running a command within the image. Below I will go over the most common
commands and what they do.

## `.dockerignore`

`.dockerignore` is used to exclude files and directories from being included in
the image. It is useful for excluding files and directories that are not needed
in the image. This uses the same globbing syntax as `.gitignore`.

## Common Dockerfile Commands

### `FROM`

This is usually the first command in the file and will tell the engine what
image to use as the base for your image to be.

```dockerfile
FROM oven/bun:1

FROM python:3

FROM gradle:9-alpine
```

### `WORKDIR`

This command sets the working directory for any subsequent commands in the
`Dockerfile`. It is useful for setting up the directory structure for your
application instead of using the `FROM` images root directory.

You can use an absolute path to set the working directory or a relative path to
set the working directory relative to the current working directory.

```dockerfile
WORKDIR /usr/src/app
# currently in /usr/src/app

WORKDIR inner
# currently in /usr/src/app/inner
```

### `COPY`

This command copies files from the host machine into the image. It is useful for
copying files into the image that your application will use. you can specify one
or multiple src files but only one destination. `.dockerignore. is used to
exclude files and directories from being included in the image. It is useful for
excluding files and directories that are not needed in the image.

```dockerfile
# Copy all files from root of your project to current directory of the image
COPY . .

# Copy 2 files into the current directory of the image
COPY drizzle.config.ts tsconfig.json .

# Copy all api files into the app directory
COPY /src/api /usr/src/app
```

### `ENV`

This command sets an environment variable in the image. It is useful for setting
environment variables that your application will use. you can specify one or
multiple environment variables.

```dockerfile
ENV NODE_ENV=production
```

### `EXPOSE`

This command exposes a port on the container. It is useful for exposing ports
that your application will use. you can specify one or multiple ports.

```dockerfile
EXPOSE 3000
```

### `RUN`

This command runs a command in the container. It is useful for running commands
that are needed to build or test the image. you can specify one or multiple
commands.

```dockerfile
RUN bun install --frozen-lockfile

RUN bun test
```

### `USER`

Use this to switch the user that the container will run as. It is useful for
running the container as a non-root user.

```dockerfile
USER node
```

### `CMD`

This command is slightly different from the `RUN` command. It is used to specify
the default command that will be run when the container is started. You can
specify one or multiple commands. It uses an array syntax instead of just a
string. If you are going to use Kubernetes or something similar this command can
be switched out _after_ building the image too.

```dockerfile
CMD ["bun", "run", "index.ts"]

CMD ["python", "app.py"]
```

## Example Dockerfile: Bun API

```dockerfile
# Dockerfile
FROM oven/bun:1

WORKDIR /usr/src/app

COPY . .

RUN bun install --frozen-lockfile

ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "run", "index.ts"]
```

## Building an Image

To build an image you want to use the Docker CLI, specifically the `build`
command. You can then use the `-t` flag to specify the name of the image, and if
you pass `-t` multiple times you can have multiple tags. The last argument is
then the directory of where the `Dockerfile` is located, use `.` for the current
directory.

```sh
docker build -t my-app:v1.2.3 -t my-app:latest .
```

If you are connected to the docker hub registry you can use the `--push` flag to
automatically push your image (and tags) to the registry.

```sh
docker build -t bobbymannino/my-app:latest --push .
```

---

## Resources

[Dockerfile Reference](https://docs.docker.com/reference/dockerfile)

[Docker Hub](https://hub.docker.com)
