.PHONY: all build push
DATE_YMDHIS := $(shell date +%Y%m%d%H%M%S)
DATE_YMD := $(shell date +%Y%m%d)
image = ags131/dehydrated
tags := $(DATE_YMD) $(DATE_YMDHIS)

all: build

build:
	docker build -t $(image) .

tag:
	for tag in $(tags); do \
		docker tag $(image):latest $(image):$$tag; \
	done

push: build tag
	docker push $(image)

