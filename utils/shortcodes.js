const Image = require('@11ty/eleventy-img')

module.exports = {
  socialImage: async (src) => {
    const metadata = await Image(`./src/_assets/img/${src}`, {
      widths: [750],
      format: ['jpeg'],
      outputDir: './dist/img/',
    })

    let data = metadata.jpeg[metadata.jpeg.length - 1]

    return data.url
  },
}
