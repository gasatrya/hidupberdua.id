const pluginNavigation = require('@11ty/eleventy-navigation')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const markdownIt = require('markdown-it')

module.exports = function (eleventConfig) {
  // Watch folder.
  eleventConfig.addWatchTarget('./src/_assets')

  // Layouts alias.
  eleventConfig.addLayoutAlias('base', 'base.njk')

  // Pass-through files.
  eleventConfig.setServerPassthroughCopyBehavior('copy')
  eleventConfig.addPassthroughCopy({ './src/_assets/public': 'public' })

  // Plugins.
  eleventConfig.addPlugin(pluginNavigation)
  eleventConfig.addPlugin(pluginRss)

  // Collection: posts.
  eleventConfig.addCollection('posts', function (collectionApi) {
    return collectionApi.getFilteredByGlob('src/posts/**/*.md')
  })

  // Markdown It.
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  })
  eleventConfig.setLibrary('md', markdownLibrary)

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
