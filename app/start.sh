#!/bin/bash
if [[ -e $DOMAINS ]]; then
	cat $DOMAINS > domains.txt
else
	echo $DOMAINS | sed 's/;\W*/\n/g' > domains.txt
fi

/app/dehydrated/dehydrated --accept-terms -c $@