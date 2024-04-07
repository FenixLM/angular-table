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
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  formGroup!: FormGroup;
  selectedFileName: string | undefined;
  etiquetas: string[] = [];
  productId: string | undefined;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
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
      this.etiquetas = this.data.product.etiquetas || [];
      this.productId = this.data.product._id;
    }
  }

  formatForm() {
    this.formGroup = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      imagen: [''],
      etiquetas: [[]],
      precio: [0, [Validators.required]],
      stock: [0, [Validators.required]],
      imageFile: [],
    });
  }

  ngOnInit(): void {}

  guardarData() {
    console.log(this.formGroup.value);

    const formData = this.formDataService.convertToFormData(this.formGroup);

    this.productService.saveProduct(formData, this.productId).subscribe({
      next: (resp) => {
        this.matDialogRef.close(true);
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

  onInputBlur(event: any) {
    const inputValue = event.target.value;
    if ((inputValue || '').trim()) {
      this.etiquetas.push(inputValue.trim());
      this.actualizarValorEtiquetas();
      event.target.value = '';
    }
  }

  agregarEtiqueta(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.etiquetas.push(value.trim());
      this.actualizarValorEtiquetas();
    }

    if (input) {
      input.value = '';
    }
  }

  removerEtiqueta(etiqueta: string): void {
    const index = this.etiquetas.indexOf(etiqueta);
    if (index >= 0) {
      this.etiquetas.splice(index, 1);
      this.actualizarValorEtiquetas();
    }
  }

  actualizarValorEtiquetas(): void {
    console.log(this.etiquetas);

    this.formGroup.patchValue({ etiquetas: this.etiquetas });
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
