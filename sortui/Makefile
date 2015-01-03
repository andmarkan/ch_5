.PHONY:
	data.js movies.js router.js

movies.js:
	browserify -r ./app/collections/moviesByShowtime.js:movies > static/movies.js

data.js:
	browserify -r ./movies.json:raw > static/data.js

router.js:
	browserify -x jQuery -x Backbone -r ./app/routers/movies.js:router > static/router.js
