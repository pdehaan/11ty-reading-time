const readingTime = require("reading-time");

module.exports = eleventyConfig => {
  eleventyConfig.addFilter("reading_time", input => readingTime(input).text);

  return {
    dir: {
      input: "src",
      output: "www"
    }
  };
};
