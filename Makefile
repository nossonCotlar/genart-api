CUR_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
PIP=venv/bin/pip
TAG:=$(shell git describe)
SERVICE=genart

include ../MakeInclude/Makefile.Service

venv/bin/python: 
	python2 -m venv venv
	venv/bin/pip install --upgrade pip

venv/requirements.txt: 
	venv/bin/pip install -r requirements.txt
	cp requirements.txt venv/requirements.txt

requirements: venv/requirements.txt

venv: venv/bin/python

container: SERVICE=${SERVICE} DOCKERFILE=Dockerfile make -f ../MakeInclude/Makefile.Service TAG=${TAG} container

testtage: 
	echo TAG=${TAG}