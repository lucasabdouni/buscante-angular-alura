import { Component } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  listaLivros: any[] = [];
  campoBusca: string = ''

  constructor(private service: LivroService) { }

  buscarLivros() {
    this.service.buscar(this.campoBusca).subscribe({
      next:(retornoAPI) => console.log(retornoAPI),
      error:(error) => console.log(error)
    })
  }
}