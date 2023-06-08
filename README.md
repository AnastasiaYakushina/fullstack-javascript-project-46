Вычислитель Отличий (Difference Calculator)

[![Actions Status](https://github.com/AnastasiaYakushina/fullstack-javascript-project-46/workflows/hexlet-check/badge.svg)](https://github.com/AnastasiaYakushina/fullstack-javascript-project-46/actions) [![fullstack-javascript-project-46](https://github.com/AnastasiaYakushina/fullstack-javascript-project-46/actions/workflows/fullstack-javascript-project-46.yml/badge.svg)](https://github.com/AnastasiaYakushina/fullstack-javascript-project-46/actions) <a href="https://codeclimate.com/github/AnastasiaYakushina/fullstack-javascript-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/0209126ae2847e7a7352/maintainability" /></a> <a href="https://codeclimate.com/github/AnastasiaYakushina/fullstack-javascript-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/0209126ae2847e7a7352/test_coverage" /></a>

В проекте применялись:
- разработка через тестирование (TDD)
- работа с библиотеками: commander, fs, path, lodash, js-yaml
- древовидные структуры данных и рекурсивные алгоритмы
- функции высшего порядка при полном отсутствии циклов

Программа сравнивает два файла в формате json или yaml.

Установка:
- gh repo clone AnastasiaYakushina/fullstack-javascript-project-46
- cd frontend-project-46/
- make install
- npm link

Исполнение:
- gendiff файл1 файл2

Результат сравнения может быть представлен тремя способами:

Дерево (по умолчанию):
[![asciicast](https://asciinema.org/a/590273.svg)](https://asciinema.org/a/590273)

Текcт (--format plain):
[![asciicast](https://asciinema.org/a/590278.svg)](https://asciinema.org/a/590278)

json (--format json):
[![asciicast](https://asciinema.org/a/590281.svg)](https://asciinema.org/a/590281)
