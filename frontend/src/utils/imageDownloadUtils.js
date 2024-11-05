import JSZip from "jszip";
import { saveAs } from "file-saver";

//?------------------------batch download -----------------------
export async function batchDownload(selectedRows, filteredImages) {
  if (selectedRows.length === 0) {
    console.error("No images selected for batch download.");
    return;
  }

  const zip = new JSZip();
  const folder = zip.folder("phenode_images");

  for (const imageId of selectedRows) {
    const image = filteredImages.find((img) => img._id === imageId);
    if (image && image.base64encoded) {
      const base64Content = image.base64encoded.includes(",")
        ? image.base64encoded.split(",")[1]
        : image.base64encoded;

      if (base64Content) {
        folder.file(image.filename || `${image._id}.jpg`, base64Content, {
          base64: true,
        });
      } else {
        console.error(
          `Invalid or empty base64 content for image ID: ${imageId}`
        );
      }
    } else {
      console.warn(
        `Skipping image ID ${imageId} as it does not have base64 data.`
      );
    }
  }

  try {
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "phenode_images.zip");
  } catch (error) {
    console.error("Error generating ZIP file:", error);
  }
}

//?------------------------single download -------------------
export function downloadImage(image) {
  if (image.base64encoded) {
    const link = document.createElement("a");
    link.href = `data:image/jpeg;base64,${image.base64encoded}`;
    link.download = image.filename || "downloaded_image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    console.error("Base64-encoded image data is missing.");
  }
}
