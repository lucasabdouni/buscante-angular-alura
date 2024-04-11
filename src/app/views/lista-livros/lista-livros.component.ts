import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  catchError,
  debounceTime,
  filter,
  map,
  switchMap,
  throwError,
} from 'rxjs';
import { Item, LivrosResultado } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 300;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  campoBusca = new FormControl();
  mensagemErro = '';
  livrosResultado!: LivrosResultado;

  constructor(private service: LivroService) {}

  // totalDeLivros$ = this.campoBusca.valueChanges.pipe(
  //   debounceTime(PAUSA),
  //   filter((valorDigitado) => valorDigitado.length >= 3),
  //   switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
  //   map((resultado) => (this.livrosResultado = resultado)),
  //   catchError((erro) => {
  //     console.log(erro);
  //     return of();
  //   })
  // );

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    map((resultado) => (this.livrosResultado = resultado)),
    map((resultado) => resultado.items ?? []),
    map((items) => this.LivrosResultadoParaLivro(items)),
    catchError((erro) => {
      // this.mensagemErro = 'Ops, ocorreu um error. Recarregue a aplicação';
      // return EMPTY;
      return throwError(
        () =>
          new Error(
            (this.mensagemErro =
              'Ops, ocorreu um error. Recarregue a aplicação')
          )
      );
    })
  );

  LivrosResultadoParaLivro(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => {
      return new LivroVolumeInfo(item);
    });
  }
}
