const pluginNavigation = require('@11ty/eleventy-navigation')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const markdownIt = require('markdown-it')

module.exports = function (eleventyConfig) {
  // Watch folder.
  eleventyConfig.addWatchTarget('./src/_assets')

  // Layouts alias.
  eleventyConfig.addLayoutAlias('base', 'base.njk')

  // Pass-through files.
  eleventyConfig.setServerPassthroughCopyBehavior('copy')
  eleventyConfig.addPassthroughCopy({ './src/_assets/public': 'public' })
  eleventyConfig.addPassthroughCopy({ './src/_assets/fonts': 'fonts' })

  // Plugins.
  eleventyConfig.addPlugin(pluginNavigation)
  eleventyConfig.addPlugin(pluginRss)

  // Collection: posts.
  eleventyConfig.addCollection('posts', function (collectionApi) {
    return collectionApi.getFilteredByGlob('src/posts/**/*.md')
  })

  // Markdown It.
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  })
  eleventyConfig.setLibrary('md', markdownLibrary)

  // Eleventy config.
  return {
    templateFormats: ['md', 'njk'],
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      layouts: '_layouts',
      data: '_data',
    },
  }
}
