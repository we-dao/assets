# weDAO Assets Info

![Check](https://github.com/we-dao/assets/workflows/Check/badge.svg)

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

running `scripts/update.js` should update (only add) new assets

#### Update

running `scripts/upgrade.js` should update all assets with new info

#### get images

running `scripts/getImages.js` should add new logo images

## Nota Bene

use `0x00000000000000000000000000000000000000` ( zero address ) as reference for the native coin
