.PHONY: default install help start run stop logs

.DEFAULT_GOAL := help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

get-current-version: # Set the current package version in the environment variable
	$(eval APP_VERSION = $(shell node -p "require('./package.json').version"))

build: get-current-version ## Build docker image
	docker build \
		-t myapp_conf_validation \
		-t myapp_conf_validation:${APP_VERSION} \
		-t myapp_conf_validation:latest \
		.
create-config-file: ## Create the myenv.env file
	docker run --rm -it myapp_conf_validation:latest ash -ci 'node src create' > myenv.env

validate-config-file: ## Validate the myenv.env file
	docker run --rm -it --env-file=myenv.env myapp_conf_validation:latest
