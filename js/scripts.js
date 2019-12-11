/* SETTING THE CANVAS */
const editorPreview = document.getElementById('editor-preview');
const ctx = editorPreview.getContext('2d');

/* SETTING IMAGE IN CANVAS */
const uploadPhoto = document.getElementById('upload-photo');
const uploadingText = document.getElementById('uploading-text');

const photoToCanvas = e => {
    var reader = new FileReader();
    const image = new Image();
    //image.src = e;

    
    
    reader.readAsDataURL(e);

    reader.onload = () => {
        uploadingText.innerText = "Uploading photo...";
    
        image.src = reader.result;

        image.onload = () => {
            uploadingText.innerText = "";
            editorPreview.width = image.width;
            editorPreview.height = image.height;
            ctx.drawImage(image, 0, 0);
        }
    }
}

uploadPhoto.onchange = e => photoToCanvas(e.target.files[0]);

// RELOAD UPLOADED IMAGE BUTTON //
const reloadPhoto = document.getElementById('reload-photo');

reloadPhoto.onclick = () => photoToCanvas(uploadPhoto.files[0]);

/* FILTERS FOR THE IMAGE */
const yellowishButton = document.getElementById('yellowish');
const grayscaleButton = document.getElementById('grayscale');


const classicFrame = document.getElementById('classic-frame');

// Defining the functions for use the filters
yellowishButton.onclick = e => imageFilters(e);
grayscaleButton.onclick = e => imageFilters(e);

classicFrame.onclick = e => imageFilters(e);

const imageFilters = e => {
    const buttonId = e.target.id;
    //console.log(ctx.getImageData(0, 0, editorPreview.width, editorPreview.height));
    
    // Getting the data for modify the image //
    const imageData = ctx.getImageData(0, 0, editorPreview.width, editorPreview.height);
    const dataPixels = imageData.data;

    for(let i = 0; i < dataPixels.length; i+=4)
    {
        if(buttonId === "yellowish") 
        {
            dataPixels[i] = (dataPixels[i] + 228) / 2;
            dataPixels[i+1] = (dataPixels[i+1] + 201) / 2;
            dataPixels[i+2] = (dataPixels[i+2] + 145) / 2;
        }
        if(buttonId === "grayscale") 
        {
            dataPixels[i] = dataPixels[i];
            dataPixels[i+1] = dataPixels[i];
            dataPixels[i+2] = dataPixels[i];
        }
    }
    if(buttonId === "classicFrame") {
        ctx.fillStyle = "red";
        ctx.strokeRect(100, 100, 0 ,0);
    }
        
    ctx.putImageData(imageData, 0, 0);
}

/* REFERENCE IMAGES */
const photosContainer = document.getElementById('photos-container');

const getReferenceImages = () => {
    for(let i = 0; i < 3; i++) 
    { 
        var image = document.createElement("img");

        image.src = "./images/references/reference-" + i + ".jpg";
        photosContainer.appendChild(image);

        image.onclick = (e) => {
            photoToCanvas(e.target);
        }
    }
}

getReferenceImages();
