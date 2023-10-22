let stos = [];

let last_x = -1;
let last_y = -1;

function setup() {
  createCanvas(512, 512);
  background(255);
}

function mouseDragged() {  
  if (mouseButton != LEFT) {
    return;
  }
  
  if (last_x > 0) {
    line(last_x, last_y, mouseX, mouseY);
  }
  
  last_x = mouseX;
  last_y = mouseY;
}

function mouseReleased() {
  last_x = last_y = -1;
  if (mouseButton == RIGHT) {
    loadPixels();
    flood_fill(mouseX, mouseY);
    updatePixels();
  }
}

function set_pixel(x, y, c) {
  let idx = (y * 512 + x) * 4;
  pixels[idx] = c;
  pixels[idx + 1] = c;
  pixels[idx + 2] = c;
  pixels[idx + 3] = 255;
}
   
function get_pixel(x, y) {
  let idx = (y * 512 + x) * 4;
  return pixels[idx];
}
  
//właściwa funkcja do wypełniania
function flood_fill(x, y) {
  stos.push([mouseX, mouseY]);
  let cnt = 10000;
  while (stos.length > 0 && cnt > 0) {
    let [x, y] = stos.pop();
    
    if (0 > x > width && 0 > y > height) {
      continue;
    }
    
    let tmp_color = get_pixel(x, y);
    
    if (tmp_color != 255) {
      continue;
    }
    
    set_pixel(x, y, 200);
    
    stos.push([x, y - 1]);
    stos.push([x, y + 1]);
    stos.push([x - 1, y]);
    stos.push([x + 1, y]);
    cnt++;
  }
}
