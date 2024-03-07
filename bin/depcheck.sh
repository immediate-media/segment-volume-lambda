#!/usr/bin/env bash

json=$(npx depcheck --skip-missing --json)
dependencies=$(echo $json | jq '.dependencies')
number_of_unused_dependencies=$(echo $dependencies | jq 'length')

if [ $number_of_unused_dependencies -gt 0 ]; then
  echo "Unused dependencies found:"
  echo $dependencies | jq -r '.[]'
  exit 1
fi
