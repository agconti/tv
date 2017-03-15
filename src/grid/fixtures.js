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
  'https://media3.giphy.com/media/1OvYypecncSzu/200.webp'
, 'https://media.giphy.com/media/12Yh9gi5SS7ZPa/200.webp'
, 'https://media.giphy.com/media/uC9CN9NiKHmQ8/200.webp'
, 'https://media.giphy.com/media/uSHMDTUL7lKso/200.webp'
, 'https://media.giphy.com/media/soDqW21ZbC1oc/200.webp'
, 'https://media.giphy.com/media/WtQlH0mzg8dos/200.webp'
, 'https://media.giphy.com/media/iYXvjREKcHE0U/200.webp'
, 'https://media.giphy.com/media/FUkSp2IflZ01W/200.webp'
, 'https://media2.giphy.com/media/YGSpb7oIhENa/200.webp'
, 'https://media.giphy.com/media/9PD6etrOTUxby/200.webp'
, 'https://media1.giphy.com/media/3o6ZsYGqIcdjRpZ2fe/200.webp'
, 'https://media2.giphy.com/media/QzpYnwlB4Xsze/200.webp'
, 'https://media3.giphy.com/media/26ufcMjwXjpTHNG1i/200.webp'
, 'https://media2.giphy.com/media/M1IYu31SWTzmU/200.webp'
, 'https://media3.giphy.com/media/xT8qAYxFUzxixwKLQY/200.webp'
, 'https://media3.giphy.com/media/26gjjX9kKQB00IQuc/200.webp'
, 'https://media2.giphy.com/media/l46Cy4bGg0N0LVEJi/200.webp'
, 'https://media1.giphy.com/media/xT77XYVKeD6ITAEJK8/200.webp'
, 'https://media2.giphy.com/media/xTiTnhklD0UFhxqAFy/200.webp'
, 'https://media3.giphy.com/media/xT77XNlTId0WKcBXnG/200.webp'
, 'https://media3.giphy.com/media/l41lSxVZVzO1l4tDa/200.webp'
, 'https://media3.giphy.com/media/ToMjGpn2MqyMOpnZJGU/200.webp'
, 'https://media.giphy.com/media/gRN7QxcEheT04/200.webp'
, 'https://media.giphy.com/media/o02p0pTVbPl1S/200.webp'
]
const greyGifsIterator = makeIterator(greyGifs)

export const greyGifFactory = () => greyGifsIterator.next()
