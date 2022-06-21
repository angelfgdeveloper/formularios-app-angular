import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [],
})
export class BasicosComponent implements OnInit {
  // #1
  // miFormulario: FormGroup = new FormGroup({
  //   // 'nombre': new FormControl('RTX 4080ti')
  //   nombre     : new FormControl('RTX 4080ti'),
  //   precio     : new FormControl(1500),
  //   existencias: new FormControl(5),
  // });

  // # 2
  // miFormulario: FormGroup = this.fb.group({
  //   nombre: ['', [Validators.required, Validators.minLength(3)]], // Valor, validadores sincronos, validadores asincronos
  //   precio: [
  //     0, // Valor default
  //     [Validators.required, Validators.min(0)],
  //   ],
  //   existencias: [
  //     0, // Valor default
  //     [Validators.required, Validators.min(0)],
  //   ],
  // });

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]], // valores null
    precio: [, [Validators.required, Validators.min(0)]],
    existencias: [, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Tienen que estar todos los valores iniciales
    // this.miFormulario.setValue({
    //   nombre: 'RTX 4080ti',
    //   precio: 1600,
    //   existencias: 10
    // });

    // Acepta la entrada de formulario sin todos los datos obligatorios
    this.miFormulario.reset({
      nombre: 'RTX 4080ti',
      precio: 1600,
    });
  }

  campoValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );

    // return this.miFormulario.controls['nombre'].errors &&
    //        this.miFormulario.controls['nombre'].touched
  }

  guardar() {

    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched(); // Marca como tocados para que aparezcan los mensajes de los campos invalidados
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset(); // Limpia
  }
}
