import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [ true, Validators.required],
    condiciones: [false, Validators.requiredTrue]
  });

  persona = {
    genero: 'F',
    notificaciones: true,
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
      // this.miFormulario.setValue(this.persona); // Agregando valores iniciales
      this.miFormulario.reset({
        ...this.persona,
        condiciones: false
      }); // Agregando valores iniciales


      // RXJS
      // Cambios en tiempo real
      // this.miFormulario.valueChanges.subscribe(form => {
      //   console.log(form);
      // });

      // this.miFormulario.get('condiciones')?.valueChanges.subscribe( newValue => {
      //   console.log(newValue);
      // });

      // this.miFormulario.valueChanges.subscribe(form => {
      //   delete form.condiciones;
      //   this.persona = form;
      // });

      this.miFormulario.valueChanges.subscribe(({ condiciones, ...restoDeArgumentos }) => {
        this.persona = restoDeArgumentos;
      });
  }

  guardar() {
    const formValue = { ...this.miFormulario.value };
    delete formValue.condiciones;

    // console.log(formValue);
    this.persona = formValue;
  }


}
