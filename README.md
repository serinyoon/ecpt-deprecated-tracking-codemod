# ecpt-deprecated-tracking-codemod


A collection of codemods for ecpt-deprecated-tracking-codemod.

## Usage

To run a specific codemod from this project, you would run the following:

```
npx ecpt-deprecated-tracking-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.js

# or

yarn global add ecpt-deprecated-tracking-codemod
ecpt-deprecated-tracking-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Local Usage
```
node ./bin/cli.js <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Transforms

<!--TRANSFORMS_START-->
* [data-control-name](transforms/data-control-name/README.md)
* [tracked-action](transforms/tracked-action/README.md)
* [tracking](transforms/tracking/README.md)
<!--TRANSFORMS_END-->

## Contributing

### Installation

* clone the repo
* change into the repo directory
* `yarn`

### Running tests

* `yarn test`

### Update Documentation

* `yarn update-docs`