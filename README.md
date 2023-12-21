## Introduction

The goal of this app is the load and display a media file's EXIF information.

- React Web App
- Vite
- TypeScript

Load a file
- File dialog
- Drag n Drop

## Display EXIF data in user friendly way
Handle:
- Various file formats
- Handle differing levels of EXIF data, no EXIF data.
- Explore, profile performance vs file size if any
- Performance strategies.


## Getting Started
TODO: guide

1. Installation process
2. Software dependencies
3. Latest releases
4. API references

## Build and Test
TODO: Describe and show how to build code and run the tests.

## Contribute
TODO: Explain how other users and developers can contribute.

## Install dependencies
```
npm install
```

## Compile ts and build vite
```
npm run build
```

## Launch application
```
npm run dev
```


## Notes
- when I increase or decrease the browser window zoom, it influences the canvas loop. So if I zoom way out, the loop seems to work properly and goes through the image the appropriate amount. If I am at a regular size, it doesn't loop through corretly. 
- the canvas looping also is influence by the size of the normal image. 
- I think I need some way of paramterizing the loop so that i read the file first, determine the size, then adjust my loop as such :(


### TODO
- allow users to add multiple photos and store them
- allow users to download the generated images
- paramterizr the colors of ascii characters and background?

## Links
[sharp library](https://sharp.pixelplumbing.com/performance)
