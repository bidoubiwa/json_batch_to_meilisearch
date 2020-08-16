# Json(s) to Meilisearch


Push a single file or a batch of files directly to meilisearch


## Requirements

- A running meilisearch
- One or more json files

## Installation

First clone the project.
Then install and link the cli.

```
yarn install
```

### Adding the CLI

This will make `json2meili` global.
```
npm link
```

## Usage

If you added the CLI, from any folder you can now use the cli `json2meili` this way:

```bash
meili2json -p path/to/folder
```

If you did not add the CLI, from the project directory use the following:
```bash
yarn start -p path/to/folder
```


## Options

```bash
Usage: cli [options]

Indexes json files into meilisearch

Options:
  -p, --path <path>              Path to directory or to json file
  -u, --meili-index <uid>        Name of the index in which the json will be added (default: "my_index")
  -m, --meili-address <address>  MeiliSearch address to server (default: "http://localhost:7700")
  -k, --meili-api-key <key>      MeiliSearch address to server
  -K, --meili-primary-key <key>  The name of the unique field in each document
  -d, --delete-index             Delete index before adding the new files (default: false)
  -t, --track-updates            Track meilisearch updates (default: true)
  -V, --version                  output the version number
  -h, --help                     display help for command
```

## Examples

```
json2meili -p __tests__/assets/ -u books -d -k masterKey
```

- `p` is the path to the folder containing at least one json file. You can directly give the path to the json file if you only want to add one file but this is not mandatory.
- `u` is the name of the `uid`  when creating the index in which your documents will be added
- `k` is the api key for the meilisearch server


### Response
```
One file has been added to the following index in MeiliSearch: small_movies
Start update watch
-------------
0 / 1 have been processed
1 / 1 still enqueued
-------------
1 / 1 have been processed
0 / 1 still enqueued
-------------
No action left in the queue, final report:
failed to upload: 0
succeeded to upload: 1
```
