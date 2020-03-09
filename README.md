# 11ty-reading-time

Adding a reading-time filter to Eleventy.

First, let's add the [**reading-time**](http://npm.im/reading-time) module as a dev dependency using <kbd>npm i reading-time -D</kbd>.

Second, create the `reading_time` filter in the .eleventy.js config file:

```js
const readingTime = require("reading-time");

module.exports = eleventyConfig => {
  eleventyConfig.addFilter("reading_time", input => readingTime(input).text);

  return {
    // ...
  };
};
```

The `readingTime()` method returns an object which looks roughly like the following:

```json
{
  "text": "3 min read",
  "minutes": 2.24,
  "time": 134400,
  "words": 448
}
```

Since we only care about the reading time itself, we'll only return the `text` property, although if you wanted to do localization on the text, you could return the `minutes` property and add your own localized text.

The code is fairly similar whether you're using Liquid templates or Nunjucks templates, although the filter names are slightly different if you're stripping out HTML before passing the text to our custom `reading_time` filter.

For example, consider the following page, which uses Liquid engine and the ./src/_includes/layouts/page.liquid layout:

```liquid
---
title: Liquid example
layout: layouts/page.liquid
---

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pulvinar, ipsum et molestie molestie, sapien ligula accumsan lacus, ac fringilla neque mauris ac est. Cras sodales lorem a est consectetur iaculis. Proin dictum dictum tortor, a pulvinar justo scelerisque non. Proin in luctus dui. Morbi vestibulum lectus a blandit mattis. Etiam feugiat eros sed lacus commodo vestibulum. Fusce urna nisl, scelerisque vitae porta a, vehicula vitae nisl.</p>
<p>Pellentesque at quam enim. Vivamus vulputate porttitor ante ut ultrices. Phasellus non nibh vitae est condimentum laoreet. Donec pulvinar et nisl ut sollicitudin. Nam scelerisque ex eget libero euismod viverra vitae vel quam. Sed ullamcorper orci et finibus feugiat. Cras felis tortor, imperdiet ac magna vitae, blandit interdum lacus. Quisque sagittis mi facilisis justo tincidunt ornare. Fusce id justo vitae odio viverra ullamcorper eu in orci. Praesent quis rutrum velit, eu tincidunt lacus. Vivamus sollicitudin augue mi, sit amet blandit leo fringilla vitae. Sed imperdiet nunc eu varius imperdiet.</p>
<p>Cras dictum convallis libero vel fermentum. Vivamus ac vulputate massa, sed venenatis diam. Vestibulum vel turpis a felis fermentum gravida. Fusce fringilla congue fringilla. Nam porta, tortor sit amet dignissim scelerisque, libero ligula ultrices justo, sit amet dictum tellus enim in velit. Nulla commodo nisi felis, dictum porta quam facilisis ac. In ac justo mollis, sodales ligula a, elementum risus. Phasellus consectetur nisi in rutrum pellentesque. Nulla at placerat tellus. Etiam laoreet imperdiet ex et facilisis. Proin tempor neque nulla, vel pulvinar dolor semper sit amet. Cras ac porttitor massa, et aliquam mauris. In sit amet purus dapibus, vehicula augue non, volutpat augue.</p>
<p>Suspendisse volutpat lobortis nibh, ut consectetur dui accumsan vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer porta vitae mauris vitae molestie. Ut et nisi nibh. Praesent rutrum egestas congue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam vel bibendum est. Mauris posuere dictum augue. Curabitur sed nisl ac dui lacinia ullamcorper in in ante. In est nulla, dignissim ornare tellus quis, varius sollicitudin enim. Nunc nibh arcu, tristique ac nisi quis, molestie ullamcorper augue. Praesent purus lorem, faucibus eget efficitur quis, luctus id odio. Cras nec luctus eros. Duis a sem et enim ornare vestibulum vel at elit.</p>
<p>In arcu risus, gravida id purus ac, fringilla dictum odio. Morbi eget lobortis ante. Nunc et tellus laoreet nibh elementum maximus. Ut tempor ultricies dolor ut egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sodales fringilla urna nec placerat. Fusce bibendum magna sit amet purus malesuada, eu malesuada orci bibendum. Sed tincidunt lacus velit, vel dictum quam lacinia et. Curabitur sem eros, consectetur nec pharetra dapibus, interdum sed orci. Nullam ut sollicitudin metus, ac interdum nibh.</p>
```

And our ./src/_includes/layouts/page.liquid template looks like this:

```liquid
---
layout: layouts/base.liquid
---

<main>{{ content }}</main>
<footer>
  <p>{{ content | strip_html | reading_time }}</p>
</footer>
```

Note how we're displaying the page's content and then passing it to the Liquid `strip_html` filter, before passing it to our `reading_time` filter (which returns the `.text` property, as shown above).

If we were using Nunjucks, the usage would be very similar, except with Nunjucks filters, as seen in the following example:

```njk
---
layout: layouts/base.liquid
---

<main>{{ content | safe }}</main>
<footer>
  <p>{{ content | striptags | reading_time }}</p>
</footer>
```

The only difference here is that instead of using Liquid's `strip_html` filter, we're using Nunjucks `striptags` filter.

Whether you're using Liquid or Nunjucks templates, the output will be the same:

```html
<p>3 min read</p>
```
