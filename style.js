const urlInput = document.querySelector("input");
const downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", async () => {
    try {
        const response = await fetch(urlInput.value);
        const contentType = response.headers.get("content-type");
        
        const contentDisposition = response.headers.get("content-disposition");
        const filenameMatch = contentDisposition && contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        const filename = filenameMatch && decodeURIComponent(filenameMatch[1]);
        
        if (contentType.includes("application/pdf")) {
            // Handling PDF download
            const fileBlob = await response.blob();
            downloadBlob(fileBlob, filename || "download.pdf");
        } else if (contentType.includes("image/")) {
            // Handling image download
            const fileBlob = await response.blob();
            downloadBlob(fileBlob, filename || "image.jpg");
        } else {
            // Handling other file types
            const fileBlob = await response.blob();
            downloadBlob(fileBlob, filename || "download");
        }
    } catch (error) {
        alert("Unable to download the provided URL. ");
    }
});

function downloadBlob(blob, filename) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}
