#
# Makefile for Express.js + Prisma Backend
#

.PHONY: clean setup run

run: setup
	node src/server.js

setup: clean
	npm install
	npx prisma generate
	npx prisma db push
	npx prisma db seed

clean:
	rm -rf *~ prisma/dev* .env

realclean: clean
	rm -rf node_modules package-lock.json 
