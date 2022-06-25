import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

// import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validators/validaciones';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  // miFormulario: FormGroup = this.fb.group({
  //   nombre: ['', [Validators.required, Validators.pattern(nombreApellidoPattern)]],
  //   // email: ['', [Validators.required, Validators.email]],
  //   email: ['', [Validators.required, Validators.pattern(emailPattern)]],
  //   username: ['', [Validators.required, noPuedeSerStrider]],
  // });

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    // email: ['', [Validators.required, Validators.email]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confPassword: ['', [Validators.required]],
  }, {
    validators: [
      this.validatorService.camposIguales('password', 'confPassword')
    ]
  });

  get emailErrorMSG(): string {
    const errors= this.miFormulario.get('email')?.errors

    if(errors?.['required']){
      return 'Correo electrónico obligatorio';
    }
    if(errors?.['pattern']){
      return 'Escribe un correo electrónico valido';
    }
    if(errors?.['emailTomado']){
      return 'Correo electrónico existente';
    }

    return ''
  }

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsService,
    private emailValidator: EmailValidatorService,
  ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Luis Angel',
      email: 'test1@test.com',
      username: 'luis.flores',
      password: '123456',
      confPassword: '123456',
    })
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid &&
           this.miFormulario.get(campo)?.touched;
  }

  emailRequired() {
    return this.miFormulario.get('email')?.touched &&
           this.miFormulario.get('email')?.errors?.['required'];
  }

  emailFormato() {
    return this.miFormulario.get('email')?.touched &&
           this.miFormulario.get('email')?.errors?.['pattern'];
  }

  emailTomado() {
    return this.miFormulario.get('email')?.touched &&
           this.miFormulario.get('email')?.errors?.['emailTomado'];
  }

  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
