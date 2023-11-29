let imgA = 0;
let imgB = 0; 

function setup() {
  createCanvas(512, 512);
  background(255);  
  imgA = createImage(512, 512);
  imgB = createImage(512, 512);
  imgA.loadPixels();
  imgB.loadPixels();
  
  let d = pixelDensity();
  for(let i=0; i < 512 * 512 * 4 * d; i += 4) {
    imgA.pixels[i] = 240;
    imgA.pixels[i + 1] = 250;
    imgA.pixels[i + 2] = 240;
    imgA.pixels[i + 3] = 255;
    imgB.pixels[i] = 240;
    imgB.pixels[i + 1] = 240;
    imgB.pixels[i + 2] = 250;
    imgB.pixels[i + 3] = 255;
  }
  imgA.updatePixels();
  imgB.updatePixels();
}

function make_vector(x, y) {
  return [x, y, 1];
}

function draw_vector(img, vec) {
  // for (let x = vec[0]; x <)
  img.set(vec[0], vec[1], 0);
  img.updatePixels();
}

let translate_rotate_scale_matrix = multiply_matrices(multiply_matrices(make_translate(2, 2), make_rotate(25, 25), 3, 3, 3, 3), make_scale(2, 4), 3, 3, 3, 3);

let scale_translate_rotate_matrix = multiply_matrices(multiply_matrices(make_scale(2, 4), make_translate(4, 4), 3, 3, 3, 3), make_rotate(45, 45), 3, 3, 3, 3);
console.log(scale_translate_rotate_matrix)

function mouseDragged() {
  let vec = make_vector(mouseX, mouseY);
  
  let complicated_a_vec = multiply_matrices(translate_rotate_scale_matrix, vec, 3, 3, 3, 1);
  let compilcated_b_vec = multiply_matrices(scale_translate_rotate_matrix, vec, 3, 3, 3, 1);
  
  let scale_vec = multiply_matrices(make_scale(4, 4), vec, 3, 3, 3, 1);
  let translate_vec = multiply_matrices(make_translate(4, 4), vec, 3, 3, 3, 1);
  let rotate_vec = multiply_matrices(make_rotate(90, 90), vec, 3, 3, 3, 1);
  let shear_vec = multiply_matrices(make_shear(2, 2), vec, 3, 3, 3, 1);
  
  draw_vector(imgA, vec);
  draw_vector(imgA, complicated_a_vec);
  // draw_vector(imgB, scale_vec);
  draw_vector(imgB, compilcated_b_vec);
  // draw_vector(imgB, rotate_vec);
  // draw_vector(imgB, shear_vec);
}

function make_identity() {
  return [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ];
}

function make_translate(tx, ty) {
    return [
      1, 0, tx,
      0, 1, ty,
      0, 0, 1
  ];
}

function make_scale(sx, sy) {
    return [
      sx, 0, 0,
      0, sy, 0,
      0, 0, 1
  ];
}

function make_rotate(theta) {
  theta = theta / 180 * Math.PI;
  return [
    Math.cos(theta), -Math.sin(theta), 0,
    Math.sin(theta), Math.cos(theta), 0,
    0, 0, 1
  ];
}

function make_shear(Shx, Shy) {
    return [
      1, Shx, 0,
      Shy, 1, 0,
      0, 0, 1
  ];
}

function multiply_matrices(matrixA, matrixB, rowsA, colsA, rowsB, colsB) {
    if (colsA !== rowsB) {
        throw new Error("Liczba kolumn w pierwszej macierzy musi być równa liczbie wierszy w drugiej macierzy");
    }

    let result = new Array(rowsA * colsB).fill(0);

    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
            for (let k = 0; k < colsA; k++) {
                result[i * colsB + j] += matrixA[i * colsA + k] * matrixB[k * colsB + j];
            }
        }
    }

    return result;
}


function draw() {
  if (!keyIsDown(32)) {
    image(imgA, 0, 0);
    text('Image A', 10, 20);
  } else {
    image(imgB, 0, 0);
    text('Image B', 10, 20);
  }
} 

