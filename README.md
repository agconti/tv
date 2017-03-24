# tv
![tv]()
less of a slide show, more like a tv.

This is more of an art project then a serious perspective of what the giphy tv experince could be. The goal was to provide a an example of the breath of the effects we can use on gifs using only client side processing power and to explore what our site might look like if it was fully responsive.

## Features
- Live postprocessing of gifs for a _artsy_ busted tv effect using webgl [shaders](https://github.com/agconti/tv/blob/master/src/tv/TVShader.js).
- Fully responsive gif grid using a [CSS multi-column layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Columns/Using_multi-column_layouts) that supports tv and tv-less grids.
- Dynamically changes to gifs from webps for mobile using `srcSet` over browser sniffing
- A redone tv that only needs a list of gif ids
- Supporting react grid components.

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
