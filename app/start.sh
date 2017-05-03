#!/bin/bash
if [[ -e $DOMAINS ]]; then
	cat $DOMAINS > domains.txt
else
	echo $DOMAINS > domains.txt
fi

/app/dehydrated/dehydrated --accept-terms -c $@