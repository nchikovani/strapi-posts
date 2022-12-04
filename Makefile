#!make
include .env
export

env-prepare:
	copy .env.example .env


build:
	docker-compose -f docker-compose-dev.yaml build
start:
	docker-compose -f docker-compose-dev.yaml up -d
stop:
	docker-compose -f docker-compose-dev.yaml down


build-prod:
	docker-compose build
start-prod:
	docker-compose up -d
stop-prod:
	docker-compose down


clear:
	docker container prune
	docker image prune -a


create-dump:
	docker exec -t postgres pg_dumpall -c -U $(POSTGRES_USER) > postgres-dump.sql
restore-dump:
	docker exec -i postgres dropdb -U $(POSTGRES_USER) -f $(POSTGRES_DB)
	docker exec -i postgres createdb -U $(POSTGRES_USER) $(POSTGRES_DB)
	docker exec -i postgres /bin/bash -c "PGPASSWORD=$(POSTGRES_PASSWORD) psql --username $(POSTGRES_USER) $(POSTGRES_DB)" < ./postgres-dump.sql
