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
* [foo](#foo)
<!--FIXTURES_TOC_END-->

## <!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.hbs](transforms/data-control-name/__testfixtures__/basic.input.hbs)</small>):
```hbs
<LinkTo
	@route="foo.index"
	@model={{some.link}}
	class="some-link__link"
	data-control-name="some-link-control-name"
	data-some-link="true"
>
</LinkTo>

<LinkTo
	@route="foo.index"
	@model={{some.link}}
	class="some-link__link"
	data-control-name="some-link-control-name"
	data-control-id="some-link-control-name-id"
	data-some-link="true"
>
</LinkTo>

<AppAwareLink$AppAwareLink
	@href={{this.contentTrackedUrl}}
	target="_blank"
	data-control-name={{@controlName}}
	data-control-id="foo-id"
>
</AppAwareLink$AppAwareLink>

<AppAwareLink$AppAwareLink
	@href={{this.contentTrackedUrl}}
	target="_blank"
	data-control-name={{@controlName}}
	data-control-id={{@controlId}}
>
</AppAwareLink$AppAwareLink>
```

**Output** (<small>[basic.output.hbs](transforms/data-control-name/__testfixtures__/basic.output.hbs)</small>):
```hbs
<LinkTo
	@route="foo.index"
	@model={{some.link}}
	class="some-link__link" data-some-link="true" {{ember-cli-pemberly-tracking$track-interaction "some-link-control-name"}}
>
</LinkTo>

<LinkTo
	@route="foo.index"
	@model={{some.link}}
	class="some-link__link" data-some-link="true" {{ember-cli-pemberly-tracking$track-interaction "some-link-control-name" controlTrackingId="some-link-control-name-id"}}
>
</LinkTo>

<AppAwareLink$AppAwareLink
	@href={{this.contentTrackedUrl}}
	target="_blank" {{ember-cli-pemberly-tracking$track-interaction @controlName controlTrackingId="foo-id"}}
>
</AppAwareLink$AppAwareLink>

<AppAwareLink$AppAwareLink
	@href={{this.contentTrackedUrl}}
	target="_blank" {{ember-cli-pemberly-tracking$track-interaction @controlName controlTrackingId=@controlId}}
>
</AppAwareLink$AppAwareLink>
```
---
<a id="foo">**foo**</a>

**Input** (<small>[foo.input.hbs](transforms/data-control-name/__testfixtures__/foo.input.hbs)</small>):
```hbs

```

**Output** (<small>[foo.output.hbs](transforms/data-control-name/__testfixtures__/foo.output.hbs)</small>):
```hbs

```
<!--FIXTURES_CONTENT_END-->
