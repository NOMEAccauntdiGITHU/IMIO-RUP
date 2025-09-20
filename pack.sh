#!/usr/bin/env bash
ts=$(date +%Y%m%d-%H%M%S)
printf "%s\n" app-*.zip .git/* "*/node_modules/*" .next/* dist/* coverage/* tmp/* .cache/* "*.log" "*/.DS_Store" ".env*" > zip-exclude.txt
zip -r "app-$ts.zip" . -x@zip-exclude.txt
