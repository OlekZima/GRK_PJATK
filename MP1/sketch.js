function setup() {
  createCanvas(800, 600);
  noLoop();
}

function draw() {
  //noprotect
  background(0);
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      b_gradient = (x / width + y / height ) * 128;
      dx =  x -  width / 2;
      dy = y - height / 2;
      d = sqrt(dx * dx + dy * dy);
      
      r_val = d - 143;

      set(x, y, color(r_val, 255 - r_val, b_gradient));
      console.log(r_val);
    }
    updatePixels();
  }
}