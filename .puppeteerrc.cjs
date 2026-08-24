const { join } = require("path")

/** Chromium normally lands in ~/.cache/puppeteer, which Vercel does not carry
 *  between builds — every deploy would download it again. node_modules/.cache
 *  is part of the build cache, so it is fetched once and reused. */
module.exports = {
  cacheDirectory: join(__dirname, "node_modules", ".cache", "puppeteer"),
}
