module.exports = {
  layout: 'post',
  eleventyComputed: {
    permalink: (data) => `${data.page.fileSlug}/`,
  },
}
