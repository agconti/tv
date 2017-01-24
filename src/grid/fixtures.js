const greyGifs = [
  'http://i.giphy.com/gDrprcBFAztu0.mp4'
, 'http://i.giphy.com/26BRxLmNGpvn4MCGs.mp4'
, 'http://i.giphy.com/26xBEQ78XlyBxiiVa.mp4'
, 'http://i.giphy.com/jwQ4AY6R8yav6.mp4'
, 'http://i.giphy.com/rBHZE4tDZCBTq.mp4'
, 'http://i.giphy.com/14gdhSw3huQasM.mp4'
, 'http://i.giphy.com/1OvYypecncSzu.mp4'
, 'http://i.giphy.com/l2SpLYT8Af7b1qx9K.gif'
, 'http://i.giphy.com/DTAT9htFqTsVW.mp4'
, 'http://i.giphy.com/10zPalrWbZ8ToA.mp4'
, 'http://i.giphy.com/k28n1OPefBEeQ.mp4'
]

export const tvGifs = [
  'video-1.mp4'
, 'video-2.mp4'
, 'video-3.mp4'
]

export const greyGifFactory = () => greyGifs[Math.floor(Math.random() * greyGifs.length)]
