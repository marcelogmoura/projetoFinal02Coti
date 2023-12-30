import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component , OnInit} from '@angular/core';
import { FormControl, FormGroup, FormsModule , ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-contatos-edicao',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contatos-edicao.component.html',
  styleUrl: './contatos-edicao.component.css'
})
export class ContatosEdicaoComponent implements OnInit{

  msgSucesso: string = '';
  msgErro: string = '';

  constructor(
    private HttpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ){}

  form = new FormGroup({
    idContato : new FormControl('' , []),
    nome: new FormControl('' , [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', Validators.email),
    telefone: new FormControl('', Validators.required)
  })

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
      const idContato = this.activatedRoute.snapshot.params['idContato'];

      this.HttpClient.get(environment.ApiContatos  + "/obterPorId/" +  idContato)
        .subscribe({
          next: (data : any) => {
            this.form.patchValue(data);
          },
          error: (e) => {
            console.log('Erro na solicitação HTTP' , e);

          }
      })
  }

  submit(): void {

    this.msgSucesso = '';
    this.msgErro = '';

    this.HttpClient.put(environment.ApiContatos , this.form.value)
      .subscribe({
        next: (data : any) => {
          this.msgSucesso = `'${data.nome}' , atualizado com sucesso.`;
          this.form.reset();
        },
        error: (e) => {
          this.msgErro = e.error.errors[0];
          console.log(e);
        }
      })

  }

}
