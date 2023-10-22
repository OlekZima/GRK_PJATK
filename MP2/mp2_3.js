const ALPHA = 255
let r = 0;
let g = 0;
let b = 0;

let img;
let img_r;
let img_g;
let img_b;
let img_sum;

function preload() {
  img = loadImage("https://raw.githubusercontent.com/scikit-image/scikit-image/master/skimage/data/astronaut.png");
  img_r = createImage(256, 256);
  img_g = createImage(256, 256);
  img_b = createImage(256, 256);
  img_sum = createImage(256, 256);
}

function setup() {
  createCanvas(512,512);
  img.resize(256, 256);
  // image(img, 0, 0);
  loadPixels();
  img.loadPixels();
  img_r.loadPixels();
  img_g.loadPixels();
  img_b.loadPixels();
  let i = 256;
  let j = 0;
  for(x = 0; x < img.width; x++) {
    for(y = 0; y < img.height; y++) {
      pos = 4 * (y * img.width + x);
      r = img.pixels[pos];     // R
      g = img.pixels[pos + 1]; // G
      b = img.pixels[pos + 2]; // B
      a = img.pixels[pos + 3]; // A
      
      let index_r = (x + y * img_r.width) * 4;
      img_r.pixels[pos] = r;
      img_r.pixels[pos + 1] = 0;
      img_r.pixels[pos + 2] = 0;
      img_r.pixels[pos + 3] = ALPHA;
      
      let index_g = ((x + 256) + y * img_g.width) * 4;
      img_g.pixels[pos] = 0;
      img_g.pixels[pos + 1] = g;
      img_g.pixels[pos + 2] = 0;
      img_g.pixels[pos + 3] = ALPHA;
      
      let index_b = (x + (y + 256) * img_b.width) * 4;
      img_b.pixels[pos] = 0;
      img_b.pixels[pos + 1] = 0;
      img_b.pixels[pos + 2] = b;
      img_b.pixels[pos + 3] = ALPHA;
    }
  }
  
  img_r.updatePixels();
  img_g.updatePixels();
  img_b.updatePixels();
  
  img_sum.blend(img_r, 0, 0, 256, 256, 0, 0, 256, 256, ADD);
  img_sum.blend(img_g, 0, 0, 256, 256, 0, 0, 256, 256, ADD);
  img_sum.blend(img_b, 0, 0, 256, 256, 0, 0, 256, 256, ADD);
  
  image(img_r, 0, 0);
  image(img_g, 256, 0);
  image(img_b, 0, 256);
  image(img_sum, 256, 256);
  noLoop();
}

function draw() {
}
