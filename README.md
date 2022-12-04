###Запуск системы

Для запуска системы необходимо неличие следующего ПО:
- docker
- docker-compose
- make 

Команды для сборки и запуска системы:

```
make env-prepare
make start-prod
make restore-dump