# tv
![tv](https://media.giphy.com/media/l4FGIUP7ctUBrk0W4/giphy.gif)

An example of the breath of the effects we can use on gifs using only client side processing power and a responsive masonry layout with just css.

Check out it out [here](https://agconti.github.io/tv/).

## Features
- Live postprocessing of gifs for a _artsy_ busted tv effect using webgl [shaders](https://github.com/agconti/tv/blob/master/src/tv/TVShader.js).
- Fully [responsive gif grid](https://github.com/agconti/tv/blob/master/src/grid/ml.css) using a [CSS multi-column layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Columns/Using_multi-column_layouts).
- Support lower load times on desktop using webps and dynamically changes to gifs for mobile support using [`srcSet`](https://github.com/agconti/tv/blob/0a046cf845ef6e601f7668e3fd9e4157907fa245/src/grid/GridItem.js#L26-L29) over browser sniffing.

## Setup

Clone the repository:
```
git clone git@github.com:agconti/tv.git
```

Install the projects dependencies:
```
npm i
```

Start the dev server
```
npm start
```
