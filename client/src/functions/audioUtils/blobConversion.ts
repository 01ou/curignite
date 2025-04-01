// Blob → Base64 String
export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert Blob to Base64"));
      }
    };
    reader.onerror = reject;
  });
};

// Base64 String → Blob
export const base64ToBlob = (base64: string, mimeType = "audio/webm"): Blob => {
  const byteString = atob(base64.split(",")[1]);
  const arrayBuffer = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    arrayBuffer[i] = byteString.charCodeAt(i);
  }
  return new Blob([arrayBuffer], { type: mimeType });
};

// Blob → Uint8Array（バイナリ文字列用）
export const blobToBinaryString = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onloadend = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const uint8Array = new Uint8Array(arrayBuffer);
      resolve(String.fromCharCode(...uint8Array));
    };
    reader.onerror = reject;
  });
};

// Binary String → Blob
export const binaryStringToBlob = (binaryString: string, mimeType = "audio/webm"): Blob => {
  const arrayBuffer = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    arrayBuffer[i] = binaryString.charCodeAt(i);
  }
  return new Blob([arrayBuffer], { type: mimeType });
};
