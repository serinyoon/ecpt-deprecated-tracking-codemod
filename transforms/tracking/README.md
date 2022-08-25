# tracking


## Usage

```
npx ecpt-deprecated-tracking-codemod tracking path/of/files/ or/some**/*glob.hbs

# or

yarn global add ecpt-deprecated-tracking-codemod
ecpt-deprecated-tracking-codemod tracking path/of/files/ or/some**/*glob.hbs
```

## Local Usage
```
node ./bin/cli.js tracking path/of/files/ or/some**/*glob.hbs
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.hbs](transforms/tracking/__testfixtures__/basic.input.hbs)</small>):
```hbs
<ArtdecoButton$ArtdecoButton
  {{fn
		this.onFoo
    (ember-cli-pemberly-tracking$tracking
  		control-name="foo"
		)
  }}
/>

<ArtdecoButton$ArtdecoButton
  {{ember-cli-pemberly-tracking$tracking
    control-name="foo"
  }}
/>
```

**Output** (<small>[basic.output.hbs](transforms/tracking/__testfixtures__/basic.output.hbs)</small>):
```hbs
<ArtdecoButton$ArtdecoButton
  {{fn
		this.onFoo
    (ember-cli-pemberly-tracking$track-interaction
  		"foo"
  		
		)
  }}
/>

<ArtdecoButton$ArtdecoButton
  {{ember-cli-pemberly-tracking$track-interaction
    "foo"
    
  }}
/>
```
<!--FIXTURES_CONTENT_END-->