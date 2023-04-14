/**
 * Image helper.
 */
export class ImageHelper {
  /**
   * Converts an image to base64.
   *
   * @param {File} file - File.
   * @return {Promise<string>} Promise.
   */
  static async imageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  /**
  * Compresses an image to a given width and quality.
  *
  * @param {string} src The image source
  * @param {number} maxWidth The maximum width of the image
  * @param {number} quality Quality of the image,
  * between 0 and 1. Default is 0.8
  * @return {Promise<string>} A promise with the compressed image
  */
  static compressImage(
      src: string,
      maxWidth: number,
      quality = 0.8
  ): Promise<{ compressedBase64: string; width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const newWidth = Math.min(img.width, maxWidth);
        const newHeight = newWidth / aspectRatio;

        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext('2d');
        if (ctx === null) {
          reject(Error('Failed to get canvas 2d context'));
          return;
        }
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        const compressedImage = canvas.toDataURL('image/jpeg', quality);
        resolve({compressedBase64: compressedImage,
          width: newWidth,
          height: newHeight,
        });
      };
      img.onerror = (error) => reject(error);
    });
  }
}
