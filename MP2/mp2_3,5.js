const ALPHA = 255
let r = 0;
let g = 0;
let b = 0;

let img;
let img_h;
let img_s;
let img_v;

function preload() {
  img = loadImage("https://raw.githubusercontent.com/scikit-image/scikit-image/master/skimage/data/astronaut.png");
  img_h = createImage(256, 256);
  img_s = createImage(256, 256);
  img_v = createImage(256, 256);
  img_sum = createImage(256, 256);
}

function setup() {
  createCanvas(512,512);
  img.resize(256, 256);
  // image(img, 0, 0);
  loadPixels();
  img.loadPixels();
  img_h.loadPixels();
  img_s.loadPixels();
  img_v.loadPixels();

  for(x = 0; x < img.width; x++) {
    for(y = 0; y < img.height; y++) {
      pos = 4 * (y * img.width + x);
      r = img.pixels[pos] / 255;     // R
      g = img.pixels[pos + 1] / 255; // G
      b = img.pixels[pos + 2] / 255; // B
      a = img.pixels[pos + 3];       // A
      cmax = Math.max(r, g, b);
      cmin = Math.min(r, g, b);
      
      c = cmax - cmin;
      l = (cmax + cmin) / 2;
      
      let index_h = (x + y * img_h.width) * 4;
      img_h.pixels[pos]
      img_h.pixels[pos + 1]
      img_h.pixels[pos + 2]
      img_h.pixels[pos + 3]
      
      // s = c / (1 - Math.abs(2 * l - 1));
      // sx = (pos / 4) % 256;
      // sy = (pos / 4) / 256;
      // img_s.set(sx, sy, 255 * s)
      
      v = cmax;
      vx = (pos / 4) % 256;
      vy = (pos / 4) / 256;
      img_v.set(vx, vy, 255 * v);
    }
  }
  
  img_h.updatePixels();
  img_s.updatePixels();
  img_v.updatePixels();
  
  image(img_h, 0, 0);
  image(img_s, 256, 0);
  image(img_v, 0, 256);
  image(img, 256, 256);
  noLoop();
}

function draw() {
}
