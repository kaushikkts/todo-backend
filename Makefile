install:
	docker compose build --no-cache

run:
	docker compose up --watch backend

clean-run:
	docker compose build --no-cache && docker compose up

