const a = 10;

let histogram = new Array(256);
histogram.fill(0);

function preload() {
  img = loadImage("https://raw.githubusercontent.com/scikit-image/scikit-image/master/skimage/data/astronaut.png");
}

function setup() {
  createCanvas(256, 256);
  img.filter('gray');
  
  loadPixels();
  img.loadPixels();
  for(let x = 0; x < img.width; x++) {
    for(let y = 0; y < img.height; y++) {
      let pos = 4 * (y * img.width + x);
      let r = img.pixels[pos];
      histogram[r]++;
    }
  }
  
  noLoop();
}

function draw() {
  background('white');
  stroke('black');
  
  let max_histogram_value = Math.max.apply(null, histogram);

  for (let x = 0; x < width; x++) {
    let line_height = histogram[x] / max_histogram_value * height * a;
    for ( let i = 0; i < 2; i++) {
      line(x, height, x, height - line_height);
    }
  }
}
