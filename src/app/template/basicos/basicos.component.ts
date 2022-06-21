import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  initForm = {
    producto: 'ABC 123',
    precio: 10,
    existencias: 10
  }

  constructor() { }

  ngOnInit(): void {
  }

  nombreValido(): boolean {
    return this.miFormulario?.form.controls['producto']?.invalid &&
           this.miFormulario?.form.controls['producto']?.touched;
  }

  precioValido(): boolean {
    return this.miFormulario?.form.controls['precio']?.value < 0 &&
           this.miFormulario?.form.controls['precio']?.touched;
  }

  // guardar(miFormulario: NgForm) {
  //   console.log('Submit hecho', miFormulario.value);
  // }

  guardar() {
    console.log(this.miFormulario.value);

    if (this.miFormulario?.form.controls['precio']?.value < 0) {
      console.log('No posteado');
      return;
    }

    console.log('Posteo correcto');

    // this.miFormulario.resetForm(); // limpia el formulario
    this.miFormulario.resetForm({
      // producto: 'Sin nombre',
      precio: 0,
      existencias: 0
    });
  }

}
