// index.js
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const previewImage = document.getElementById('previewImage');
const chooseFile = document.getElementById('chooseFile');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const resizeButton = document.getElementById('resizeButton');
const imageInput = document.getElementById('imageInput');
const downloadLink = document.getElementById('downloadLink');

let originalImage = null;

function displayPreviewImage(imageData) {
    previewImage.src = imageData;
    downloadLink.href = imageData;
    previewImage.style.display = 'block';
    chooseFile.style.display = 'none';
}

function displayChooseFile() {
    previewImage.src = '';
    previewImage.style.display = 'none';
    chooseFile.style.display = 'flex';
}

function resizeImage() {
    const width = parseInt(widthInput.value, 10);
    const height = parseInt(heightInput.value, 10);

    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        alert('Invalid width or height. Please enter positive integer values.');
        return;
    }

    if (!originalImage) {
        alert('Please select an image first.');
        return;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(originalImage, 0, 0, width, height);

    const resizedImageData = canvas.toDataURL('image/jpeg', 0.8);
    displayPreviewImage(resizedImageData);
}

function createImageInput() {
    const imageInput = document.createElement('input');
    imageInput.type = 'file';
    imageInput.id = 'imageInput';
    imageInput.accept = 'image/*';
    imageInput.style.display = 'none';
    document.body.appendChild(imageInput);
    return imageInput;
}

function handleImageSelection(event) {
    const file = event.target.files[0];

    if (!file) {
        displayChooseFile();
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const image = new Image();
        image.onload = function () {
            originalImage = image;
            displayPreviewImage(event.target.result);
        };
        image.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

resizeButton.addEventListener('click', resizeImage);
chooseFile.addEventListener('click', function () {
    const imageInput = document.getElementById('imageInput') || createImageInput();
    imageInput.click();
});
document.addEventListener('change', handleImageSelection);