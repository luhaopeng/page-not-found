# page-not-found

[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)
[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/luhaopeng/page-not-found/blob/master/LICENSE)

A collection of components for 404 pages. **No dependencies**.

## Quick Start

1. Include `pnf.min.js` in your page.

```html
<script src="pnf.min.js"></script>
```

2. Choose your container.

```html
<div class="pnf-container"></div>
```

3. Initialize with `PnF`.
```javascript
PnF.fragment('.pnf-container')
```

## API

### .fragment(selector, options)

[Demo](https://luhaopeng.github.io/page-not-found/example/fragment.html)

#### options

Option | Type | Default | Description
-------|:----:|:-------:|---
`homeUrl` | `string` | `null` | Url to homepage.
`homeLabel` | `string` | `'Home'` | Label text for link button.
`maxRotate` | `number` | `120` | Fragment rotation. Will rotate between `-maxRotate / 2` to `maxRotate / 2`.
`layers` | `[layer]` | _miscellaneous_ | Layer objects array. See below.

#### layer

Option | Type | Default | Description
-------|:----:|:-------:|---
`offset` | `number` | _miscellaneous_ | The intensity of layer translation. A negative `offset` produces reverse translation.
`fragments` | `[string]` \| `number` | _miscellaneous_ | Fragment strings array or fragment count.
`color` | `color string` | _miscellaneous_ | Background colors for fragments.

## Styling

Generated HTML markup is displayed below. You may style it any way you'd like.

```html
<div class="fragment-container">
  <div class="fragment-layer-1">
    <div class="fragment"></div>
    <div class="fragment"></div>
  </div>
  <div class="fragment-layer-2">
    <div class="fragment"></div>
    <div class="fragment"></div>
  </div>
  <div class="fragment-layer-3">
    <div class="fragment"></div>
    <div class="fragment"></div>
  </div>
</div>
```

Style sample:

```css
body {
  margin: 0;
}
.fragment-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
.fragment-container div[class*="fragment-layer-"] {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.1s;
}
.fragment-container .fragment-home {
  color: #fff;
  border-radius: 4px;
  border: none;
  outline: 0;
  box-shadow: 0px 0px 16px 0px rgba(24, 144, 255, 0.3);
  background-color: rgba(24, 144, 255, 0.6);
  padding: 12px 20px;
  font-size: 20px;
  cursor: pointer;
  margin: 50vh auto 0;
  display: block;
  width: max-content;
  text-decoration: none;
  position: relative;
  transition: linear 0.2s;
}
.fragment-container .fragment-home:hover {
  box-shadow: 0px 0px 16px 0px rgba(24, 144, 255, 0.7);
  background-color: rgba(24, 144, 255, 0.95);
}
.fragment-container .fragment-layer-1 .fragment {
  text-align: center;
  line-height: 1.5;
  padding: 5px 10px;
  font-size: 18px;
  color: #fff;
}
.fragment-container .fragment-layer-2 .fragment {
  width: 20px;
  height: 20px;
}
.fragment-container .fragment-layer-3 .fragment {
  width: 10px;
  height: 10px;
}
```

## TODO

- [ ] Locate text layer fragments from left to right. Currently it's totally random.

## LICENSE

1. Under the MIT License. See the [LICENSE](https://github.com/luhaopeng/page-not-found/blob/master/LICENSE) file for details.
2. Under the Anti 996 License. See the [Anti 996 LICENSE](https://github.com/luhaopeng/page-not-found/blob/master/LICENSE.NPL) file for details.
