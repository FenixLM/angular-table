import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { AvisoComponent } from 'src/app/shared/components/aviso/aviso.component';
import { ProductService } from '../../services/product.service';
import { FormDataService } from 'src/app/shared/services/form-data.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  formGroup!: FormGroup;
  selectedFileName: string | undefined;

  constructor(
    private matDialog: MatDialog,
    public formBuilder: FormBuilder,
    private productService: ProductService,
    public matDialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formDataService: FormDataService
  ) {
    this.formatForm();
    console.log(this.data);

    if (data && data.product) {
      this.formGroup.patchValue(this.data.product);
      const imgpath = this.data.product.imagen;
      this.selectedFileName = imgpath ? imgpath.split('/').pop() : undefined;
    }
  }

  formatForm() {
    this.formGroup = this.formBuilder.group({
      _id: [],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      imagen: [''],
      etiquetas: ['', [Validators.required]],
      precio: [0, [Validators.required]],
      stock: [0, [Validators.required]],
      imageFile: [null],
    });
  }

  ngOnInit(): void {}

  guardarData() {
    const formData = this.formDataService.convertToFormData(this.formGroup);

    this.productService.saveProduct(formData).subscribe({
      next: (resp: any) => {
        this.matDialogRef.close();
        this.aviso('done', '¡Éxito!', 'Producto guardado con éxito');
      },
      error: (err: any) => {
        this.aviso(
          'error',
          '¡Error!',
          'Ocurrió un error al guardar el Producto'
        );
      },
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFileName = file ? file.name : undefined;
    if (file) {
      const imageFileControl = this.formGroup.get('imageFile');
      if (imageFileControl) {
        imageFileControl.setValue(file);
      }
    }
  }
  closeDialog() {
    this.matDialogRef.close();
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
