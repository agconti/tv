function makeIterator(array){
    let nextIndex = 0;

    const next = () => {
      const item = array[nextIndex % array.length]
      nextIndex++

      return item
    }

    return { next }
}

export const greyGifs = [
  '1OvYypecncSzu'
, '12Yh9gi5SS7ZPa'
, 'uC9CN9NiKHmQ8'
, 'uSHMDTUL7lKso'
, 'soDqW21ZbC1oc'
, 'WtQlH0mzg8dos'
, 'iYXvjREKcHE0U'
, 'FUkSp2IflZ01W'
, 'YGSpb7oIhENa'
, '9PD6etrOTUxby'
, '3o6ZsYGqIcdjRpZ2fe'
, 'QzpYnwlB4Xsze'
, '26ufcMjwXjpTHNG1i'
, 'xT8qAYxFUzxixwKLQY'
, '26gjjX9kKQB00IQuc'
, 'l46Cy4bGg0N0LVEJi'
, 'xT77XYVKeD6ITAEJK8'
, 'xTiTnhklD0UFhxqAFy'
, 'xT77XNlTId0WKcBXnG'
, 'l41lSxVZVzO1l4tDa'
, 'ToMjGpn2MqyMOpnZJGU'
, 'gRN7QxcEheT04'
, '1cJld9XimyMow'
, 'tArHAnoLT7YOs'
, '133RTEavd8cbvi'
, '13Nr1F3NwfRKCc'
, '3rgXBETfAu65Gw6jwA'
, 'l0Heq2dRAZklin4Qg'
, 'fenhS6cBBhvXi'
, 'l3V0c0YnIGh0loPi8'
, 'M1YMfbzkDZnuo'
, '10OE5iykeCDCRG'
, 'xT0GqeM9jUYKeDxzOM'
, 'g3WikCO1tCIdG'
, '7Woh5eyruUwGk'
, 'jEnHPoeK1iJxe'
, 'pZRzyiaHdrwGY'
, '4zXZOUnNZP30s'
, 'HUNGg3LjuRSp2'
, 'ciVm985NuWF8Y'
, 'rdqb4XTsaOAM'
, 'l205oIpyXxvZm'
, 'ni9FXpF2QvBaU'
, 'DYH7Sx4ckPh4s'
, 'ACRMOUmeQ2lEc'
]

const greyGifsIterator = makeIterator(greyGifs)

const getCDN = () => {
    const cdns = [5, 6, 7 ,8]
    return cdns[~~(Math.random() * cdns.length)]
}
export const greyGifFactory = () => {
  const gifId = greyGifsIterator.next()
  return `https://media${getCDN()}.giphy.com/media/${gifId}`
}
