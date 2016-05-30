build: build_assets build_flats build_web

build_assets: install_npm_dependencies
	gulp build

clean:
	rm -rf ./assets/css/*
	rm -rf ./assets/js/*

install: install_npm_dependencies

install_npm_dependencies:
	npm install

.PHONY: install install_npm_dependencies
.SILENT:
