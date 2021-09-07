const getElemDistance = (elem) => {
  const elementDimensions = elem && elem.getBoundingClientRect()
  const { width, height } = elementDimensions || []
  var left = 0
  var right = 0
  var top = 0
  var bottom = 0
  if (elem.offsetParent) {
    do {
      left += elem.offsetLeft
      top += elem.offsetTop
      elem = elem.offsetParent
    } while (elem)
  }

  right = left + width
  bottom = top + height

  left = left >= 0 ? left : 0
  right = right >= 0 ? right : 0
  top = top >= 0 ? top : 0
  bottom = bottom >= 0 ? bottom : 0
  return { left, right, top, bottom }
}

export default getElemDistance
