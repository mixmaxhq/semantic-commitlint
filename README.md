# Semantic Commitlint

📦🚀 + 📓 A continuous integration build tool to ensure all new commits meet your commit message format!

## Problem

* [📦🚀 semantic-release](https://github.com/semantic-release/semantic-release) depends on properly
  formatted commit messages
* [📓 commitlint](https://github.com/marionebl/commitlint) is awesome, but it doesn't know which
  commits occurred since your last release

## Solution

* [semantic-commitlint](https://github.com/adriancarriger/semantic-commitlint) fills the gap by
  providing a hook for `semantic-release` that asks `commitlint` to lint new commit messages that
  have not been included in a previous release

## Features

* Run in CI on all branches to ensure that only builds with valid commit messages pass
* Wraps [`semantic-release`](https://github.com/semantic-release/semantic-release) and
  [`commitlint`](https://github.com/marionebl/commitlint) for an easy install
* No config

## Install

```bash
npm install semantic-commitlint --save-dev
```

## Setup

Add the following to your `semantic-release` release block (e.g. in the `release` field of your
`package.json`)

```json
{
  "verifyRelease": ["semantic-commitlint"]
}
```

Setup [semantic-release authentication](https://github.com/semantic-release/semantic-release/blob/caribou/docs/usage/ci-configuration.md#ci-configuration) for CI

`semantic-commitlint` currently only supports `@commitlint/config-conventional` - please open a PR
if you need support for other configurations!

## Usage

Simply run `semantic-release` as normal as part of your CI build process

## Skip commits

If there are unreleased commits that shouldn't fail a build, then add them to the
`SEMANTIC_COMMITLINT_SKIP` environment variable as comma-separated GIT SHAs. This should be
uncommon, provided your development workflow lints the commits before they get added to the release
branch.

```jsonc
// This is the package.json of the package you're trying to publish.
// Just add the SEMANTIC_COMMITLINT_SKIP prefix to the semantic-release command!
{
  "scripts": {
    "semantic-release": "SEMANTIC_COMMITLINT_SKIP=a1be371 semantic-release"
  }
}
```

## External config

This project just ties together some functionality from two external projects. For all other config
options make sure to read through the docs.

* [📦🚀 semantic-release](https://github.com/semantic-release/semantic-release)
* [📓 commitlint](https://github.com/marionebl/commitlint)

## Issues

Not all features implemented in `semantic-release` and `commitlint` are currently available when
using `semantic-commtlint`. If you have a suggestion, please
[open an issue](https://github.com/mixmaxhq/semantic-commitlint/issues/new). Thanks!

## License

semantic-commitlint is licensed under the MIT Open Source license.
For more information, see the [LICENSE] file in this repository.

[LICENSE]: https://github.com/mixmaxhq/semantic-commitlint/blob/master/LICENSE
