.PHONY:
	all data.js movies.js

movies.js:
	browserify -r ./app/collections/moviesByShowtime.js:movies > static/movies.js

data.js:
	browserify -r ./movies.json:raw > static/data.js

all:
	browserify ./app/main.js > static/bundle.js
