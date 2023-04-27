install: #установка версий всех пакетов как в клонируемом проекте
	npm ci

publish: #проверка публикации проекта
	npm publish --dry-run

gendiff:
	node bin/gendiff.js
