#!/bin/bash

read counter
for i in `seq 1 $counter` ; do
	(curl -X GET \
  http://127.0.0.1:3000/send \
  -H 'cache-control: no-cache' \
  -H 'postman-token: 6c8ab19c-c344-3cad-5d6f-fe54b664c4ac' &)
   echo "\n"
done
