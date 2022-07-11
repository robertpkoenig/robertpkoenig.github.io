INTRODUCTION
======================
This is a music composition and visualization website.

TECHNOLOGIES
======================
This project uses vanilla JS, HTML, and CSS.

The only dependency is p5.js, a low-level API for driving HTML5 canvas and webGL. 


STRUCTURE
======================

```
musicbox
├── examples                    // serialized example songs
├── ...
├── sounds                      // MP3 files for each sound
├── controller                  // use P5 key listeners to handle key input
├── src                        
│   ├── controller              // manage user input, and various events
│   ├── model                   // containers for storing data
│   ├── view                    // use p5 to drive webGL
│   └── index.js                // application entry point, with p5 setup and central draw loop
├── styles                      // css
├── drum-controller.ino         // c++ code for the optional hardware controller
```