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