# tracked-action

## Usage

```
npx ecpt-deprecated-tracking-codemod tracked-action path/of/files/ or/some**/*glob.hbs

# or

yarn global add ecpt-deprecated-tracking-codemod
ecpt-deprecated-tracking-codemod tracked-action path/of/files/ or/some**/*glob.hbs
```

## Local Usage

```
node ./bin/cli.js tracked-action path/of/files/ or/some**/*glob.hbs
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
<!--FIXTURES_TOC_END-->

## <!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.hbs](transforms/tracked-action/__testfixtures__/basic.input.hbs)</small>):
```hbs
<ArtdecoButton$ArtdecoButton
	@class="fr"
	data-test-foo={{@userType}}
	aria-label={{t "i18n_foo"}}
	@text={{t "i18n_foo"}}
	@click={{ember-cli-pemberly-tracking$tracked-action
		"foo"
		this.onModalDismiss
	}}
/>

<ArtdecoButton$ArtdecoButton
	@class="fr"
	data-test-foo={{@userType}}
	aria-label={{t "i18n_foo"}}
	@text={{t "i18n_foo"}}
	@click={{ember-cli-pemberly-tracking$tracked-action
		@controlName
		this.onModalDismiss
	}}
/>

<ArtdecoButton$ArtdecoButton
	@class="fr"
	data-test-foo={{@userType}}
	aria-label={{t "i18n_foo"}}
	@text={{t "i18n_foo"}}
	@click={{ember-cli-pemberly-tracking$tracked-action
		(concat "foo_" @userType)
		this.onModalDismiss
	}}
/>

<ArtdecoButton$ArtdecoButton
	@class="fr"
	data-test-foo={{@userType}}
	aria-label={{t "i18n_foo"}}
	@text={{t "i18n_foo"}}
	@onPrimary={{ember-cli-pemberly-tracking$tracked-action
		"foo"
		this.onModalDismiss
	}}
/>
```

**Output** (<small>[basic.output.hbs](transforms/tracked-action/__testfixtures__/basic.output.hbs)</small>):
```hbs
<ArtdecoButton$ArtdecoButton
	@class="fr"
	data-test-foo={{@userType}}
	aria-label={{t "i18n_foo"}}
	@text={{t "i18n_foo"}}
	@click={{this.onModalDismiss}} {{ember-cli-pemberly-tracking$track-interaction "foo"}}
/>

<ArtdecoButton$ArtdecoButton
	@class="fr"
	data-test-foo={{@userType}}
	aria-label={{t "i18n_foo"}}
	@text={{t "i18n_foo"}}
	@click={{this.onModalDismiss}} {{ember-cli-pemberly-tracking$track-interaction @controlName}}
/>

<ArtdecoButton$ArtdecoButton
	@class="fr"
	data-test-foo={{@userType}}
	aria-label={{t "i18n_foo"}}
	@text={{t "i18n_foo"}}
	@click={{ember-cli-pemberly-tracking$tracked-action
		(concat "foo_" @userType)
		this.onModalDismiss
	}}
/>

<ArtdecoButton$ArtdecoButton
	@class="fr"
	data-test-foo={{@userType}}
	aria-label={{t "i18n_foo"}}
	@text={{t "i18n_foo"}}
	@onPrimary={{ember-cli-pemberly-tracking$tracked-action
		"foo"
		this.onModalDismiss
	}}
/>
```
<!--FIXTURES_CONTENT_END-->
