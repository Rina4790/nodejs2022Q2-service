run:
	docker run -d -p 4000:4000 --env-file .env --rm --name libC lib:env
stop:
	docker stop libC