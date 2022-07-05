# weDAO Assets Info

![Check](https://github.com/we-dao/assets/workflows/Check/badge.svg)

# install

```javascript

// using npm
npm install @we-dao/assets

// or using yarn
yarn install @we-dao/assets

```

# how to use

```javascript
const assets = require("@we-dao/assets");

let usdAssets = assets.polygon.filter((a) => a.symbol.includes("USD"));
```

## Overview

weDAO token repository is a simplified, up-to-date collection of information about several thousands (!) of crypto tokens.

[weDAO](https://wedao.com) uses token logos from this source, alongside a number of other projects.

The repository contains token info from several blockchains.
For every token a logo and optional additional information is available (such data is not available on-chain).

Such a large collection can be maintained only through a community effort, so _feel free to add your token_.

## How to add token

Please note that **brand new tokens are not accepted**,
the projects have to be sound, with information available, and **non-minimal circulation**

add address `assets/<chain_id>/whitelist.json`

run script `scripts/update.js`

### Quick starter

#### Update

running `scripts/update.js <CHAIN_ID>` or just `yarn update <CHAIN_ID>` should update (only add) new assets

#### get logos

running `scripts/getLogo.js <CHAIN_ID>` or just `yarn getLogos <CHAIN_ID>` should add new logo a chain

## Nota Bene

use `0x00000000000000000000000000000000000000` ( zero address ) as reference for the native coin

## Image Requirements

- File location: must be placed in the folder `storage` folder.
- File extention：only support PNG file.
- File name：use CID as name without extention `bafkreif2jfndor3wvnwpv3gblm7d2d43ar2dzubqt6mvow4fth6acexaga`.
- Dimension: `256px by 256px` or `512px by 512px`.
- Background: preferably transparent (should fit dark mode as well; black logos need light border/background).
- File size: maximum 100KB. Tip: optimize image size using [sharp](https://www.npmjs.com/package/sharp).

## Supporters
- [GitBook](https://gitbook.com)
