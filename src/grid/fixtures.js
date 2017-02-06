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
  'http://i.giphy.com/1OvYypecncSzu.mp4'
, 'http://i.giphy.com/YGSpb7oIhENa.mp4'
, 'https://media.giphy.com/media/p86I8qRhEc132/giphy.mp4'
, 'http://i.giphy.com/9PD6etrOTUxby.mp4'
, 'http://i.giphy.com/3o6ZsYGqIcdjRpZ2fe.mp4'
, 'http://i.giphy.com/QzpYnwlB4Xsze.mp4'
, 'http://i.giphy.com/26ufcMjwXjpTHNG1i.mp4'
, 'http://i.giphy.com/M1IYu31SWTzmU.mp4'
, 'http://i.giphy.com/xT8qAYxFUzxixwKLQY.mp4'
, 'http://i.giphy.com/26gjjX9kKQB00IQuc.mp4'
, 'http://i.giphy.com/l46Cy4bGg0N0LVEJi.mp4'
, 'http://i.giphy.com/xT77XYVKeD6ITAEJK8.mp4'
, 'http://i.giphy.com/xTiTnhklD0UFhxqAFy.mp4'
, 'http://i.giphy.com/xT77XNlTId0WKcBXnG.mp4'
, 'http://i.giphy.com/l41lSxVZVzO1l4tDa.mp4'
, 'http://i.giphy.com/ToMjGpn2MqyMOpnZJGU.mp4'
, 'http://i.giphy.com/gRN7QxcEheT04.mp4'
, 'http://i.giphy.com/o02p0pTVbPl1S.mp4'
]
const greyGifsIterator = makeIterator(greyGifs)

export const greyGifFactory = () => greyGifsIterator.next()
