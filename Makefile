include ./.env.dist
-include ./.env

install:
	yarn

run:
	node_modules/.bin/encore dev-server --hot --host ${DOMAIN} --port ${PORT}

start:
	node_modules/.bin/avris-daemonise start webserver node_modules/.bin/encore dev-server \\--hot \\--host ${DOMAIN} \\--port ${PORT}

stop:
	node_modules/.bin/avris-daemonise stop webserver

deploy:
	yarn install --prod
	node_modules/.bin/encore production
	cp .htaccess build/.
