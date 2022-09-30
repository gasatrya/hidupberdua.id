module.exports = {
  layout: 'base',
  permalink: '/tags/{{ tag | slugify }}/',
  pagination: {
    data: 'collections',
    size: 1,
    alias: 'tag',
    filter: ['all', 'post', 'posts', 'tagList'],
    addAllPagesToCollections: true,
  },
  eleventyComputed: {
    title: 'Topik: {{ tag }}',
  },
}
