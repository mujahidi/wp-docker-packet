# WP DOCKER PACKET

### WordPress, WP-CLI, PHPMYADMIN with Docker Compose and BrowserSync

> Make WordPress development easy in a Docker container

## Features
- WordPress with PHPMYADMIN
- Easy dev environments with Docker Compose
- Live reload via BrowserSync
- WP-CLI

## Requirements
- GIT
- Node.js
- Yarn
- PHP
- Docker
- Docker Compose

## Getting Started
```bash
$ git clone git@github.com:mujahidi/wp-docker-packet.git project-name
$ yarn install
$ docker-compose up 
```

## Developing Locally
To work on the theme locally, open another window/tab in terminal and run:

```bash
$ yarn start
```

This will open a browser, watch all files and reload the browser when you press save.<br>
Add files to watch in [`scripts/webpack.config.js`](scripts/webpack.config.js#L15-L18)


## Changing ports

There are two ports involved, the port of the dockerized wordpress instance,
and the port the Browser Sync runs on. To change the port of the dockerized
wordpress instance go into [`docker-compose.yml`](docker-compose.yml#L26) and
modify `ports`.

```yml
# docker-compose.yml
 ...
  ports:
    - "9009:80" # only need to change `9009:80` --> localhost:9009
 ...
```

If you want to change the port you develop on (the default is 3000), then open [`scripts/webpack.config.js`](scripts/webpack.config.js#L20) and modify `BrowserSyncPlugin`'s `port` option. If you changed the wordpress port above, be sure to also change `proxy` accordingly. Don't forget the trailing slash.

```js
// scripts/webpack.config.js
...
new BrowserSyncPlugin({
    notify: false,
    host: 'localhost',
    port: 3000,
    logLevel: 'silent',
    files: [
        "./source/wp-content/themes/**/*.css",
        "./source/wp-content/themes/**/*.php",
        "./source/wp-content/themes/**/**/*.php",
        "./source/wp-content/themes/**/*.js",
    ],
    proxy: 'http://localhost:9009/',
}),
...
```

## WP-CLI
We need to leverage our wpcli container that we added to our stack in order to only run one-off commands. In other words, we don’t need my-wpcli to run as a service — only as a cli tool:

```bash
$ docker-compose run --rm wpcli
```

Any arguments we pass to docker-compose must appear before the container name. In our case, we are only passing `--rm` as an argument; this simply removes the container right after it finishes the `wp --info` command. If we did not do this, we would create an orphaned container. 

Anything that would come after the container name would override the “command” setting that we set above. In this case, the default is `--info`, but we can override it to something useful like this:

```bash
$ docker-compose run --rm wpcli post list
```

This is the same as running the following wp-cli command

```bash
$ wp post list
```

## PHPMYADMIN

Access PHPMYADMIN with the port `9119`. To change the port of the dockerized PHPMYADMIN instance go into [`docker-compose.yml`](docker-compose.yml#L48)
