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
	docker exec -t postgres pg_dumpall -c -U admin > postgres-dump.sql
restore-dump:
    docker exec -i dropdb -U admin -f mytestdb
    docker exec -i postgres createdb -U admin mytestdb
	docker exec -i postgres /bin/bash -c "PGPASSWORD=root1 psql --username admin mytestdb" < ./postgres-dump.sql
