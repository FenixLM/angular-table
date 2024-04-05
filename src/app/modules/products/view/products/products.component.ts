import { Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from '../../interfaces/products.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: ProductInterface[] = [
    {
      nombre: "Smartphone Galaxy S20",
      descripcion: "El smartphone Galaxy S20 te ofrece un rendimiento excepcional con su pantalla AMOLED de alta resolución, cámara de 64MP y capacidad de grabación de video en 8K.",
      sku: "S20-001",
      imagen: "https://i.blogs.es/2845a3/inalambrica/650_1200.jpeg",
      etiquetas: ["Móvil", "Tecnología"],
      precio: 799.99,
      stock: 50
    },
    {
      nombre: "Cámara DSLR Nikon D850",
      descripcion: "La cámara DSLR Nikon D850 es ideal para fotógrafos profesionales. Con su sensor de alta resolución de 45.7MP y capacidad de grabación de video 4K, capturarás imágenes impresionantes.",
      sku: "D850-002",
      imagen: "https://i.blogs.es/2845a3/inalambrica/650_1200.jpeg",
      etiquetas: ["Fotografía", "Tecnología"],
      precio: 2499.99,
      stock: 20
    },
    {
      nombre: "Auriculares inalámbricos Sony WH-1000XM4",
      descripcion: "Disfruta de una experiencia auditiva excepcional con los auriculares inalámbricos Sony WH-1000XM4. Con cancelación de ruido activa, calidad de sonido premium y una batería de larga duración.",
      sku: "WH-1000XM4-003",
      imagen: "https://i.blogs.es/2845a3/inalambrica/650_1200.jpeg",
      etiquetas: ["Audio", "Tecnología"],
      precio: 349.99,
      stock: 30
    },
    {
      nombre: "Robot de cocina Moulinex Cuisine Companion",
      descripcion: "El robot de cocina Moulinex Cuisine Companion te ayuda a preparar una amplia variedad de platos de forma fácil y rápida. Con múltiples funciones y accesorios, cocinar nunca ha sido tan sencillo.",
      sku: "CuisineCompanion-004",
      imagen: "https://i.blogs.es/2845a3/inalambrica/650_1200.jpeg",
      etiquetas: ["Cocina", "Tecnología"],
      precio: 499.99,
      stock: 15
    },
    {
      nombre: "Smartwatch Apple Watch Series 6",
      descripcion: "El smartwatch Apple Watch Series 6 te mantiene conectado y saludable. Con funciones avanzadas de monitorización de la salud, seguimiento de actividad física y una pantalla siempre encendida.",
      sku: "Series6-005",
      imagen: "https://i.blogs.es/2845a3/inalambrica/650_1200.jpeg",
      etiquetas: ["Wearables", "Tecnología"],
      precio: 399.99,
      stock: 25
    },
    {
      nombre: "Portátil Dell XPS 13",
      descripcion: "El portátil Dell XPS 13 ofrece un rendimiento excepcional en un diseño compacto y elegante. Con pantalla InfinityEdge, procesador Intel Core de última generación y una batería de larga duración.",
      sku: "XPS13-006",
      imagen: "https://i.blogs.es/2845a3/inalambrica/650_1200.jpeg",
      etiquetas: ["Informática", "Tecnología"],
      precio: 1299.99,
      stock: 10
    },
    {
      nombre: "Televisor OLED LG CX",
      descripcion: "El televisor OLED LG CX ofrece una experiencia visual impresionante con colores vibrantes y negros profundos. Con tecnología de inteligencia artificial, Dolby Vision y sonido envolvente.",
      sku: "CX-007",
      imagen: "https://i.blogs.es/2845a3/inalambrica/650_1200.jpeg",
      etiquetas: ["Televisores", "Tecnología"],
      precio: 1999.99,
      stock: 8
    },
    {
      nombre: "Tableta gráfica Wacom Intuos Pro",
      descripcion: "La tableta gráfica Wacom Intuos Pro es perfecta para artistas digitales y diseñadores. Con niveles avanzados de sensibilidad a la presión y un lápiz ergonómico para una precisión excepcional.",
      sku: "IntuosPro-008",
      imagen: "https://i.blogs.es/2845a3/inalambrica/650_1200.jpeg",
      etiquetas: ["Diseño", "cocina"],
      precio: 399.99,
      stock: 12
    },
  ];
  loading = false;

  constructor() {

  }

  ngOnInit(): void {

  }
}
