function setup() {
  createCanvas(512, 512);
  background(255);
}

let x0 = -1;
let y0 = -1;
let x1 = -1;
let y1 = -1;

function mousePressed() {
  x0 = mouseX;
  y0 = mouseY;
}

function mouseDragged() {  
  x1 = mouseX;
  y1 = mouseY;  
  background(255);
  noStroke();
  fill('red');
  ellipse(x0 - 3, y0 - 3, 6);
  fill('green');  
  ellipse(x1 - 3, y1 - 3, 6);
}

function mouseReleased() {
  background(255);
  loadPixels();
  draw_line();
  compute_and_draw_Dxy();
  updatePixels();
}

function set_pixel(x, y, c) {
  let idx = (y * 512 + x) * 4;
  pixels[idx] = -c;
  pixels[idx + 1] = c;
  pixels[idx + 2] = 0;
  pixels[idx + 3] = 255;
}

function draw_line() {
  let dx = x1 - x0;
  let dy = y1 - y0;
  let a = dy / dx;
  let b = y0 - a * x0;
    
  for(let x = x0; x <= x1; x++) {
    let y = a * x + b;
    set_pixel(Math.floor(x), Math.floor(y), 0);
  }
}

function compute_and_draw_Dxy() {
  let dx = x1 - x0;
  let dy = y1 - y0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let Dxy = (dy / dx) * (x - x0) - (y - y0);
      let new_Dxy = Dxy * 2 * dx;
      set_pixel(x, y, new_Dxy);
    }
  }
}
