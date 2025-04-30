#
# Makefile, CSC309 Final Exam, Winter 2025
#

.PHONY: clean zip realclean setup

DIRNAME := $(notdir $(CURDIR))
ZIPFILE := final-2025s-$(DIRNAME).zip

setup:
	cd backend && $(MAKE) setup
	cd frontend && npm install

clean:
	-cd backend && npm run clean
	-cd frontend && npm run clean

realclean: clean
	rm -rf *.out ../$(ZIPFILE)

# creates a zip file in the parent directory
zip: realclean
	zip -r ../$(ZIPFILE) .
