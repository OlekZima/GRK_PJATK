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
  updatePixels();
}

function set_pixel(x, y, c) {
  let idx = (y * 512 + x) * 4;
  pixels[idx] = c;
  pixels[idx + 1] = c;
  pixels[idx + 2] = c;
  pixels[idx + 3] = 255;
}

function draw_line() {
  let dx = x1 - x0 < 0 ? (x1 - x0) * (-1): x1 - x0;
  let dy = y1 - y0 < 0 ? (y1 - y0) * (-1): y1 - y0;
  
  let is_swap = false;
  if (dy >= dx) {
    tmp = x0;
    x0 = y0;
    y0 = tmp;
    
    tmp = x1;
    x1 = y1;
    y1 = tmp;
    
    tmp = dx;
    dx = dy;
    dy = tmp;
    is_swap = true;
  }
  
  const Dp = 2 * dy - dx;
  const Deq = 2 * dy;
  const Dinc = 2 * dy - 2 * dx;
  
  let D = Dp;
  let y = y0;
  
  let is_y0_less_than_y1 = y0 < y1 ? true: false;
  
  if (x0 < x1) {
    for (let x = x0; x <= x1; x++) {
      if (is_swap) {
        set_pixel(y, x, 0);
      } else {
        set_pixel(x, y, 0);
      }
      if (D < 0) {
        D += Deq;
      } else {
        D += Dinc;
        if (is_y0_less_than_y1) {
          y++;
        } else {
          y--;
        }
      }
    }
  } else {
    for (let x = x0; x != x1; x--) {
      if (is_swap) {
        set_pixel(y, x, 0);
      } else {
        set_pixel(x, y, 0);
      }
      if (D < 0) {
        D += Deq;
      } else {
        D += Dinc;
        if (is_y0_less_than_y1) {
          y++;
        } else {
          y--;
        }
      }
    }
  }
    
}