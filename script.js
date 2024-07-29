// Selecting the input and button elements from the DOM
const fileInput = document.getElementById("fileUrl");
const downloadBtn = document.getElementById("downloadBtn");

// Event listener for the download button
downloadBtn.addEventListener("click", e => {
    e.preventDefault(); // Preventing the submission of a form if the button is part of one
    const url = fileInput.value; // Getting the URL from the input field
    if (url) {
        downloadBtn.innerText = "Downloading File...";
        downloadBtn.disabled = true; // Disable the button to prevent multiple clicks
        fetchFile(url); // Calling fetchFile function with the URL
    } else {
        console.error("No URL provided");
        alert("Please enter a URL in the input field.");
    }
});

// Function to fetch a file and initiate a download
function fetchFile(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.blob();
        })
        .then(file => {
            // Creating a temporary URL for the fetched file
            const tempUrl = URL.createObjectURL(file);
            const aTag = document.createElement("a");
            aTag.href = tempUrl;
            aTag.download = url.replace(/^.*[\\\/]/, ''); // Extracting the filename from the URL
            document.body.appendChild(aTag);
            aTag.click(); // Programmatically clicking the <a> tag to start download
            aTag.remove(); // Removing the <a> tag after triggering download
            URL.revokeObjectURL(tempUrl); // Freeing up memory by revoking the blob URL
            downloadBtn.innerText = "Download File";
            downloadBtn.disabled = false; // Re-enable the button
        })
        .catch(error => {
            console.error('Download failed:', error);
            alert(`Failed to download file. Error: ${error.message}`);
            downloadBtn.innerText = "Download File";
            downloadBtn.disabled = false; // Re-enable the button
        });
}
