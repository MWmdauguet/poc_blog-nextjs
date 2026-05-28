.PHONY: up start stop logs ssh db

COMPOSE=docker compose -f docker-compose.yml

start: up db

up:
	docker kill $$(docker ps -q) || true
	docker network create poc_blog || true
	${COMPOSE} build --force-rm
	${COMPOSE} up -d --remove-orphans

db:
	${COMPOSE} exec nextjs npx prisma generate
	${COMPOSE} exec nextjs npx prisma migrate reset --force
	${COMPOSE} exec nextjs npx prisma db seed

logs:
	${COMPOSE} logs -f

rm:
	make stop
	${COMPOSE} rm

stop:
	${COMPOSE} stop
	${COMPOSE} kill
