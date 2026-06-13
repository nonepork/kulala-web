#!/usr/bin/env bash

set -eo pipefail

JSON_SCHEMAS=(
	"https://raw.githubusercontent.com/mistweaverco/kulala-fmt/main/config.schema.json"
	"kulala-fmt.schema.json"
	"https://raw.githubusercontent.com/mistweaverco/kulala-core/main/http-client.env.schema.json"
	"http-client.env.schema.json"
	"https://raw.githubusercontent.com/mistweaverco/kulala-core/main/http-client.private.env.schema.json"
	"http-client.private.env.schema.json"
)

for i in "${!JSON_SCHEMAS[@]}"; do
	if (( i % 2 == 0 )); then
		url="${JSON_SCHEMAS[i]}"
		output="${JSON_SCHEMAS[i+1]}"
		if ! curl -sSL --fail-with-body "$url" -o "./static/$output"; then
			echo "Failed to download schema from $url to ./static/$output"
			exit 1
		fi
	fi
done

bun install --frozen-lockfile

bun run build
