pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const url = 'TUGAS_AKMEN.pdf';
const pdfViewer = document.getElementById('pdfViewer');

function renderPage(pdf, pageNumber) {
  pdf.getPage(pageNumber).then(function(page) {
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    page.render(renderContext).promise.then(function () {
      pdfViewer.appendChild(canvas);
    });
  });
}

pdfjsLib.getDocument(url).promise.then(function(pdf) {
  for (let page = 1; page <= pdf.numPages; page++) {
    renderPage(pdf, page);
  }
});
