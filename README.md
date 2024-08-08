# Product reviews plugin

Add product reviews to your Medusa store

> Under development, use at your own risk!

## Features

- Show customer reviews
- Create customer review with either:
  - just a 1-5 rating
  - a 1-5 rating and a written review

---

## Prerequisites

- [Medusa backend](https://docs.medusajs.com/development/backend/install)

---

## How to Install

1\. Run the following command in the directory of the Medusa backend:

```bash
npm install @appateam/medusa-plugin-product-reviews
```

2 \. In `medusa-config.js` add the following at the end of the `plugins` array:

```js
const plugins = [
  // ...
  {
    resolve: `@appateam/medusa-plugin-product-reviews`,
    options: {
      enableUI: true
    }
  },
]
```
