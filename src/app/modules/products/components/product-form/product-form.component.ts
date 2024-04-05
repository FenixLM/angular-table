import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AvisoComponent } from 'src/app/shared/components/aviso/aviso.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  formGroup!: FormGroup;
  constructor(
    private matDialog: MatDialog,
    public formBuilder: FormBuilder,
    private productService: ProductService,
    public matDialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formatForm();
    console.log(this.data);

    if (data && data.cliente) {
      this.formGroup.patchValue(this.data.producto);
    }
  }

  formatForm() {
    this.formGroup = this.formBuilder.group({
      id: [],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      etiquetas: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      stock: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }


  guardarData() {
    this.productService.saveProduct(this.formGroup.value).subscribe({
      next: (resp: any) => {
        this.matDialogRef.close();
        this.aviso('done', '¡Éxito!', 'Producto guardado con éxito');
      },
      error: (err: any) => {
        this.aviso('error', '¡Error!', 'Ocurrió un error al guardar el Producto');
      }
    });
  }

  aviso(iconFont: string, titulo?: string, mensaje?: string) {
    return this.matDialog.open(AvisoComponent, {
      id: 'avisoDialog',
      width: '450px',
      height: 'auto',
      panelClass: '',
      data: {
        iconFont,
        titulo,
        mensaje,
      },
    });
  }

}
