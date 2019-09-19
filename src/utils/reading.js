import Cookies from 'js-cookie'

const NovelReadingKey = 'novel-reading'
const ComicReadingKey = 'comic-reading'

/**
 * 小说阅读
 */
export function getNovelReading() {
  let reading = null
  try {
    reading = JSON.parse(Cookies.get(NovelReadingKey))
  } catch (error) {
    reading = {}
  }
  return reading
}

export function setNovelReading(obj) {
  return Cookies.set(
    NovelReadingKey,
    obj instanceof Object ? JSON.stringify(obj) : obj
  )
}

export function removeNovelReading() {
  return Cookies.remove(NovelReadingKey)
}

/**
 * 漫画阅读
 */
export function getComicReading() {
  let reading = null
  try {
    reading = JSON.parse(Cookies.get(ComicReadingKey))
  } catch (error) {
    reading = {}
  }
  return reading
}

export function setComicReading(obj) {
  return Cookies.set(
    ComicReadingKey,
    obj instanceof Object ? JSON.stringify(obj) : obj
  )
}

export function removeComicReading() {
  return Cookies.remove(ComicReadingKey)
}
