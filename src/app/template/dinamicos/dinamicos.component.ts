import { Component } from '@angular/core';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  nuevoJuego: string = '';

  persona: Persona = {
    nombre: 'Angel',
    favoritos: [
      { id: 1, nombre: 'Metal Gear' },
      { id: 2, nombre: 'DeathStranding' },
    ]
  }

  constructor() { }

  agregarJuego() {
    if (this.nuevoJuego.trim() === "") return;

    const nuevoJuegoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego.trim()
    }

    this.persona.favoritos.push({ ...nuevoJuegoFavorito }); // Evita mandar el paso por referencia
    this.nuevoJuego = '';


  }

  guardar() {
    console.log('Formulario posteado');
  }

  eliminar(index: number) {
    this.persona.favoritos.splice(index, 1);
  }

}
