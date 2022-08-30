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
* [disable](#disable)
* [sexpr](#sexpr)
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

<div
	data-control-id={{@controlId}}
	data-control-name={{@controlName}}
	data-foo
	{{on "click" (fn this.onFoo this.bar)}}
>
</div>

{{t
 "foo"
 linkInfo=(hash
   target="_blank"
   href=this.helpLink
   class="learn-more-link"
   data-control-name="learn_more"
 )
}}

{{#ember-engines$link-to-external
 "foo.bar"
 data-control-name="control-name"
 data-control-id="control-id"
 data-test-foo="true"
}}
	foo
{{/ember-engines$link-to-external}}

{{#ember-engines$link-to-external
 "foo.bar"
 foo
 data-control-name="control-name"
 data-control-id="control-id"
 data-test-foo="true"
}}
{{/ember-engines$link-to-external}}

{{#ember-engines$link-to-external
 "foo.bar"
 @foo
 data-control-name="control-name"
 data-control-id="control-id"
 data-test-foo="true"
}}
{{/ember-engines$link-to-external}}
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

<div
	data-foo
	{{on "click" (fn this.onFoo this.bar)}} {{ember-cli-pemberly-tracking$track-interaction @controlName controlTrackingId=@controlId}}
>
</div>

{{t
 "foo"
 linkInfo=(hash
   target="_blank"
   href=this.helpLink
   class="learn-more-link"
   control-name="learn_more"
 )
}}

<EmberEngines$LinkToExternal @route="foo.bar" data-test-foo="true" {{ember-cli-pemberly-tracking$track-interaction "control-name" controlTrackingId="control-id"}}>
	foo
</EmberEngines$LinkToExternal>

<EmberEngines$LinkToExternal @route="foo.bar" @model={{@foo}} data-test-foo="true" {{ember-cli-pemberly-tracking$track-interaction "control-name" controlTrackingId="control-id"}}>
</EmberEngines$LinkToExternal>

<EmberEngines$LinkToExternal @route="foo.bar" @model={{@foo}} data-test-foo="true" {{ember-cli-pemberly-tracking$track-interaction "control-name" controlTrackingId="control-id"}}>
</EmberEngines$LinkToExternal>
```
---
<a id="disable">**disable**</a>

**Input** (<small>[disable.input.hbs](transforms/data-control-name/__testfixtures__/disable.input.hbs)</small>):
```hbs

```

**Output** (<small>[disable.output.hbs](transforms/data-control-name/__testfixtures__/disable.output.hbs)</small>):
```hbs

```
---
<a id="sexpr">**sexpr**</a>

**Input** (<small>[sexpr.input.hbs](transforms/data-control-name/__testfixtures__/sexpr.input.hbs)</small>):
```hbs
<div
	class="foo"
	data-control-name={{if "foo" "foo" "bar"}}
	data-foo
>
</div>

<div
	class="foo"
	data-control-name={{concat @prefix "foo"}}
	data-foo
>
</div>

<div
	class="foo"
	data-control-name={{concat @prefix (if "foo" "foo" "bar")}}
	data-foo
>
</div>

<div
	class="foo"
	data-control-name={{global-helpers$lowercase @foo}}
	data-foo
>
</div>
```

**Output** (<small>[sexpr.output.hbs](transforms/data-control-name/__testfixtures__/sexpr.output.hbs)</small>):
```hbs
<div
	class="foo" data-foo {{ember-cli-pemberly-tracking$track-interaction (if "foo" "foo" "bar")}}
>
</div>

{{#let (concat @prefix "foo") as |controlName|}}
<div
	class="foo" data-foo {{ember-cli-pemberly-tracking$track-interaction controlName}}
>
</div>
{{/let}}

{{#let (concat @prefix (if "foo" "foo" "bar")) as |controlName|}}
<div
	class="foo" data-foo {{ember-cli-pemberly-tracking$track-interaction controlName}}
>
</div>
{{/let}}

{{#let (global-helpers$lowercase @foo) as |controlName|}}
<div
	class="foo" data-foo {{ember-cli-pemberly-tracking$track-interaction controlName}}
>
</div>
{{/let}}
```
<!--FIXTURES_CONTENT_END-->
