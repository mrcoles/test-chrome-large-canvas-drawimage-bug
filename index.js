const $ = id => document.getElementById(id);

// Main

const main = () => {
  let submitting = false;

  $("form").addEventListener(
    "submit",
    evt => {
      evt.preventDefault();
      if (submitting) {
        return;
      }
      submitting = true;

      $("headers").textContent = "...";
      $("indicator").style.display = "inline";
      window.setTimeout(() => {
        generate();
        $("indicator").style.display = "none";
        submitting = false;
      }, 10);
    },
    false
  );
};

const generate = () => {
  // create canvas
  const canvas = document.createElement("canvas");
  canvas.width = 2880;
  canvas.height = $("canvas-height").value || 20000;

  // generate an image that we will draw on the canvas
  const orangeCanvas = document.createElement("canvas");
  orangeCanvas.width = 1440;
  orangeCanvas.height = 700;
  const orangeCtx = orangeCanvas.getContext("2d");
  orangeCtx.fillStyle = "orange";
  orangeCtx.fillRect(0, 0, orangeCanvas.width, orangeCanvas.height);

  // draw image on the canvas
  canvas.getContext("2d").drawImage(orangeCanvas, 0, 0);

  // export to a blob -> URL -> render!
  _toBlob(canvas)
    .then(blob => URL.createObjectURL(blob))
    .then(url => {
      const headers = $("headers");
      headers.innerHTML = `<h3>canvas (${canvas.width} x ${
        canvas.height
      }px)</h3>`;

      const content = $("content");
      content.innerHTML = `<div class="col"><img style="max-width: 100%; outline: 1px solid #000" src="${url}" /></div>`;
    })
    .catch(err => console.error(err));
};

// Helpers

const _toBlob = (canvas, mimeType, quality) =>
  new Promise((resolve, reject) => {
    canvas.toBlob(blob => resolve(blob), mimeType, quality);
  });

// Run

main();
