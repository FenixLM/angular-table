export interface ProductInterface {
  nombre?: string;
  descripcion?: string;
  sku?: string;
  imagen?: string;
  etiquetas?: string[];
  precio?: number;
  stock?: number;

  // Propiedad para almacenar el archivo de imagen en la solicitud
  imageFile?: any;
}
