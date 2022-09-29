const pluginNavigation = require('@11ty/eleventy-navigation')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const markdownIt = require('markdown-it')
const filters = require('./utils/filters')

module.exports = function (eleventyConfig) {
  // Watch folder.
  eleventyConfig.addWatchTarget('./src/_assets')

  // Layouts alias.
  eleventyConfig.addLayoutAlias('base', 'base.njk')
  eleventyConfig.addLayoutAlias('post', 'post.njk')

  // Pass-through files.
  eleventyConfig.setServerPassthroughCopyBehavior('copy')
  eleventyConfig.addPassthroughCopy({ './src/_assets/public': 'public' })
  eleventyConfig.addPassthroughCopy({ './src/_assets/fonts': 'fonts' })
  eleventyConfig.addPassthroughCopy({ './src/_assets/css': 'css' })

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

  // Filters.
  Object.keys(filters).forEach((name) => {
    eleventyConfig.addFilter(name, filters[name])
  })

  // Tags list.
  function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ['all', 'nav', 'post', 'posts'].indexOf(tag) === -1
    )
  }
  eleventyConfig.addCollection('tagList', function (collection) {
    let tagSet = new Set()
    collection.getAll().forEach((item) => {
      ;(item.data.tags || []).forEach((tag) => tagSet.add(tag))
    })

    return filterTagList([...tagSet])
  })

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
