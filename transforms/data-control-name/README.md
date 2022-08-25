# data-control-name


## Usage

```
npx ecpt-deprecated-tracking-codemod data-control-name path/of/files/ or/some**/*glob.hbs

# or

yarn global add ecpt-deprecated-tracking-codemod
ecpt-deprecated-tracking-codemod data-control-name path/of/files/ or/some**/*glob.hbs
```

## Local Usage
```
node ./bin/cli.js data-control-name path/of/files/ or/some**/*glob.hbs
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.hbs](transforms/data-control-name/__testfixtures__/basic.input.hbs)</small>):
```hbs
<LinkTo
	@route="index"
	@model={{relatedArticle.permalink}}
	class="reader-related-content__link"
	data-control-name="read_related"
	data-test-reader-related-content="true"
>
</LinkTo>

<LinkTo
	@route="index"
	@model={{relatedArticle.permalink}}
	class="reader-related-content__link"
	data-control-name="read_related"
	data-control-id="read_related-id"
	data-test-reader-related-content="true"
>
</LinkTo>

<AppAwareLink$AppAwareLink
	@href={{this.contentTrackedUrl}}
	target="_blank"
	data-control-name={{@controlName}}
>
</AppAwareLink$AppAwareLink>
```

**Output** (<small>[basic.output.hbs](transforms/data-control-name/__testfixtures__/basic.output.hbs)</small>):
```hbs
<LinkTo
	@route="index"
	@model={{relatedArticle.permalink}}
	class="reader-related-content__link" data-test-reader-related-content="true" {{ember-cli-pemberly-tracking$track-interaction "read_related"}}
>
</LinkTo>

<LinkTo
	@route="index"
	@model={{relatedArticle.permalink}}
	class="reader-related-content__link" data-test-reader-related-content="true" {{ember-cli-pemberly-tracking$track-interaction "read_related" controlTrackingId="read_related-id"}}
>
</LinkTo>

<AppAwareLink$AppAwareLink
	@href={{this.contentTrackedUrl}}
	target="_blank" {{ember-cli-pemberly-tracking$track-interaction @controlName}}
>
</AppAwareLink$AppAwareLink>
```
<!--FIXTURES_CONTENT_END-->