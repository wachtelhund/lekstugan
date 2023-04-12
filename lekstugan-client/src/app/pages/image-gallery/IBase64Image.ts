export interface IBase64Image {
  base64: string;
  width: number;
  height: number;
  type: ImageType;
  pending: boolean;
  id: number;
}

export enum ImageType {
  jpg = 'image/jpg',
  png = 'image/png',
}
