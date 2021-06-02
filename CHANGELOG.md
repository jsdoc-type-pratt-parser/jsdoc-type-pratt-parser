## [1.0.4](https://github.com/simonseyock/jsdoc-type-pratt-parser/compare/v1.0.3...v1.0.4) (2021-06-02)


### Bug Fixes

* confine extended Unicode escapes to 0x10FFFF ([937bcfb](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/937bcfb74e69f552da5880c7c79eddce48054038))
* support Unicode escape sequences for identifiers ([edb18a0](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/edb18a0cc3b4a4880e0d931b14fa4317f9e60e29))

## [1.0.3](https://github.com/simonseyock/jsdoc-type-pratt-parser/compare/v1.0.2...v1.0.3) (2021-06-01)


### Bug Fixes

* Precedence for key value pairs in objects ([ebde3ca](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/ebde3ca893cc06b09a2e2e9f5ddf59ab1252128d)), closes [#63](https://github.com/simonseyock/jsdoc-type-pratt-parser/issues/63)

## [1.0.2](https://github.com/simonseyock/jsdoc-type-pratt-parser/compare/v1.0.1...v1.0.2) (2021-05-31)


### Bug Fixes

* Make NumberResult terminal ([9dc78b5](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/9dc78b5b0b9268186e1d78d5b34f035f5af1a6a0))
* Name paths have properties not names on the right side. ([34c85a7](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/34c85a70eaa7cc5e9fbeac7bff2d0670e521aeb1))

## [1.0.1](https://github.com/simonseyock/jsdoc-type-pratt-parser/compare/v1.0.0...v1.0.1) (2021-05-31)


### Bug Fixes

* liberalize ID start and continue values as per Unicode (keeping hyphen as part of continue) ([67f0929](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/67f0929cfbcc6a808962e396743661ed4d37da03))

# 1.0.0 (2021-05-30)


### Bug Fixes

* tsconfig.json no lib ([6df24dc](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/6df24dc0e0d7eb8c642c1943731dff2b1a024389))
* **gh-pages:** set author ([a28b3dd](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/a28b3dd6d88e469abe2ea34920a0d98fa6f7b587))
* **gh-pages:** use actor ([74256b1](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/74256b1e9a309d5b64edbae999fbb2137d1b6f91))
* **gh-pages:** whitespace ([16e97c4](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/16e97c4eb6c7fd96b3d24104c695179eb7d07ab6))
* **github actions:** rename test workflow ([d70f819](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/d70f8191eef3d37da82084fa04999975cf99deb3))
* **pages:** fix deploy script ([1e04ebb](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/1e04ebba96e6e28938c0bb08597581978af7829a))
* **pages:** move deployment to release.yaml ([748c18a](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/748c18a09c3f3c1150f0387ef31a2bd49f70aee8))
* **readme:** performance text ([824bdad](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/824bdad1fa56488ce55bef5699bc106de6eb135b))
* **readme:** test badge pointing to correct workflow ([dacfe87](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/dacfe87ca7b6ce7f917313b2e12041032d8dbcd5))
* **readme:** use npm links to alpha channel ([cf13883](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/cf13883a1a29bda25c74dbb12def52a851321944))


### Features

* `function` is of type `JsdocTypeName` now. ([225c337](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/225c33762a6c9c7a47fe4b4b5ce1b357f20d98a1))
* add module grammar, add parallel grammar ([2fe4fd7](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/2fe4fd7417261b5f32171b8f8b80d64f74187151))
* add not nullable to base grammar ([7d0910f](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/7d0910f33c7ee9bfde82231a86d11e2ea2b11e25))
* Keys of `KEY_VALUE` are now static values and no ParseResults. ([c2bfa24](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/c2bfa24ebe0f6b18ba7784fdfa7b2a9decc04d2b))
* make types eslint friendly ([497cd59](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/497cd59f2b87c460a46c6c97b2ae496ca6a19b5f))
* meta brackets change ([4bbc137](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/4bbc137ed0ac057007d4e94664a7b35c6a13c2b6))
* meta position change ([f85ce88](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/f85ce8867e32b3bfb0ecbb9c26dbdece7210ebbb))
* meta quotes changed ([3faf6c1](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/3faf6c11e67ed1fcf4343c3e79d39805d6d5eb79))
* Parser exposes infixParse and accepts Lexer ([415b7c9](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/415b7c9333ab8dd60177ac94820022d829d0c5eb))
* path type change ([7601ce5](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/7601ce5bb2899e273cf686b2b37083328a8eadde))
* remove reservedWord meta ([d73d64d](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/d73d64d1040980a0c2cdaa625057d4a62f0d5651))
* removed submodules ([dc87398](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/dc87398c90b81f8d104111686333a49dfe682719))
* SpecialNamePathParslet switches to other grammar. Allow `module:` in typescript and closure. ([25edc18](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/25edc18f9f666e065666381fa7bbf1a57d3a7ced))
* use `KEY_VALUE` for typed record entries ([80fd550](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/80fd550ec95ba4ae1e1d08f908146d89d8fcc9ea))


### BREAKING CHANGES

* Names no longer have the meta property `reservedWord`
* `pathType` property uses `'instance'`, `'inner'` and `'property'` now
* `brackets` property uses `'square'` and `'angle'` now
* position property is lowercase. example: `'suffix'`
* For meta properties use 'single' and 'double' instead of '\'' and '"'
* All types are now prefixed with `JsdocType` and are made CamelCase
* `JSDOC_OBJECT_KEY_VALUE` is now `KEY_VALUE`.
* key `left` was removed from `KEY_VALUE` and is replaced by `value`. For the special record entries of `jsdoc` mode a new type `JSDOC_OBJECT_KEY_VALUE` was introduced.

# [1.0.0-alpha.24](https://github.com/simonseyock/jsdoc-type-pratt-parser/compare/v1.0.0-alpha.23...v1.0.0-alpha.24) (2021-05-29)


### Bug Fixes

* tsconfig.json no lib ([6df24dc](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/6df24dc0e0d7eb8c642c1943731dff2b1a024389))


### Features

* `function` is of type `JsdocTypeName` now. ([225c337](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/225c33762a6c9c7a47fe4b4b5ce1b357f20d98a1))
* add module grammar, add parallel grammar ([2fe4fd7](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/2fe4fd7417261b5f32171b8f8b80d64f74187151))
* add not nullable to base grammar ([7d0910f](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/7d0910f33c7ee9bfde82231a86d11e2ea2b11e25))
* Parser exposes infixParse and accepts Lexer ([415b7c9](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/415b7c9333ab8dd60177ac94820022d829d0c5eb))
* SpecialNamePathParslet switches to other grammar. Allow `module:` in typescript and closure. ([25edc18](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/25edc18f9f666e065666381fa7bbf1a57d3a7ced))

# [1.0.0-alpha.23](https://github.com/simonseyock/jsdoc-type-pratt-parser/compare/v1.0.0-alpha.22...v1.0.0-alpha.23) (2021-05-24)


### Features

* removed submodules ([dc87398](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/dc87398c90b81f8d104111686333a49dfe682719))

# [1.0.0-alpha.22](https://github.com/simonseyock/jsdoc-type-pratt-parser/compare/v1.0.0-alpha.21...v1.0.0-alpha.22) (2021-05-23)


### Features

* make types eslint friendly ([497cd59](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/497cd59f2b87c460a46c6c97b2ae496ca6a19b5f))
* meta brackets change ([4bbc137](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/4bbc137ed0ac057007d4e94664a7b35c6a13c2b6))
* meta position change ([f85ce88](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/f85ce8867e32b3bfb0ecbb9c26dbdece7210ebbb))
* meta quotes changed ([3faf6c1](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/3faf6c11e67ed1fcf4343c3e79d39805d6d5eb79))
* path type change ([7601ce5](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/7601ce5bb2899e273cf686b2b37083328a8eadde))
* remove reservedWord meta ([d73d64d](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/d73d64d1040980a0c2cdaa625057d4a62f0d5651))
* use `KEY_VALUE` for typed record entries ([80fd550](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/80fd550ec95ba4ae1e1d08f908146d89d8fcc9ea))


### BREAKING CHANGES

* Names no longer have the meta property `reservedWord`
* `pathType` property uses `'instance'`, `'inner'` and `'property'` now
* `brackets` property uses `'square'` and `'angle'` now
* position property is lowercase. example: `'suffix'`
* For meta properties use 'single' and 'double' instead of '\'' and '"'
* All types are now prefixed with `JsdocType` and are made CamelCase
* `JSDOC_OBJECT_KEY_VALUE` is now `KEY_VALUE`.

# [1.0.0-alpha.21](https://github.com/simonseyock/jsdoc-type-pratt-parser/compare/v1.0.0-alpha.20...v1.0.0-alpha.21) (2021-05-23)


### Features

* Keys of `KEY_VALUE` are now static values and no ParseResults. ([c2bfa24](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/c2bfa24ebe0f6b18ba7784fdfa7b2a9decc04d2b))


### BREAKING CHANGES

* key `left` was removed from `KEY_VALUE` and is replaced by `value`. For the special record entries of `jsdoc` mode a new type `JSDOC_OBJECT_KEY_VALUE` was introduced.

# [1.0.0-alpha.20](https://github.com/simonseyock/jsdoc-type-pratt-parser/compare/v1.0.0-alpha.19...v1.0.0-alpha.20) (2021-05-19)


### Bug Fixes

* **readme:** test badge pointing to correct workflow ([dacfe87](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/dacfe87ca7b6ce7f917313b2e12041032d8dbcd5))

# [1.0.0-alpha.19](https://github.com/simonseyock/jsdoc-type-pratt-parser/compare/v1.0.0-alpha.18...v1.0.0-alpha.19) (2021-05-19)


### Bug Fixes

* **readme:** use npm links to alpha channel ([cf13883](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/cf13883a1a29bda25c74dbb12def52a851321944))

# [1.0.0-alpha.18](https://github.com/simonseyock/jsdoc-type-pratt-parser/compare/v1.0.0-alpha.17...v1.0.0-alpha.18) (2021-05-19)


### Bug Fixes

* **gh-pages:** use actor ([74256b1](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/74256b1e9a309d5b64edbae999fbb2137d1b6f91))

# [1.0.0-alpha.17](https://github.com/simonseyock/jsdoc-type-pratt-parser/compare/v1.0.0-alpha.16...v1.0.0-alpha.17) (2021-05-19)


### Bug Fixes

* **gh-pages:** whitespace ([16e97c4](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/16e97c4eb6c7fd96b3d24104c695179eb7d07ab6))

# [1.0.0-alpha.16](https://github.com/simonseyock/jsdoc-type-pratt-parser/compare/v1.0.0-alpha.15...v1.0.0-alpha.16) (2021-05-19)


### Bug Fixes

* **gh-pages:** set author ([a28b3dd](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/a28b3dd6d88e469abe2ea34920a0d98fa6f7b587))
* **github actions:** rename test workflow ([d70f819](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/d70f8191eef3d37da82084fa04999975cf99deb3))

# [1.0.0-alpha.15](https://github.com/simonseyock/jsdoc-type-pratt-parser/compare/v1.0.0-alpha.14...v1.0.0-alpha.15) (2021-05-19)


### Bug Fixes

* **pages:** move deployment to release.yaml ([748c18a](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/748c18a09c3f3c1150f0387ef31a2bd49f70aee8))

# [1.0.0-alpha.14](https://github.com/simonseyock/jsdoc-type-pratt-parser/compare/v1.0.0-alpha.13...v1.0.0-alpha.14) (2021-05-19)


### Bug Fixes

* **pages:** fix deploy script ([1e04ebb](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/1e04ebba96e6e28938c0bb08597581978af7829a))

# [1.0.0-alpha.13](https://github.com/simonseyock/jsdoc-type-pratt-parser/compare/v1.0.0-alpha.12...v1.0.0-alpha.13) (2021-05-19)


### Bug Fixes

* **readme:** performance text ([824bdad](https://github.com/simonseyock/jsdoc-type-pratt-parser/commit/824bdad1fa56488ce55bef5699bc106de6eb135b))
