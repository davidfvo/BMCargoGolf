export interface ItemProps {
  item: AttachItem;
  index: number;
}

export interface OptionTitleProps {
  [key: string]: string
}

export const OptionTitle: OptionTitleProps = {
  camera: 'Camara',
  library: 'Galería',
  document: 'Documentos',
  cancel: 'Cancelar',
}
export interface AttachItem {
  uri: string;
  name: string;
  library: string;
}