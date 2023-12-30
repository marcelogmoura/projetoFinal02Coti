import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-contatos-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './contatos-cadastro.component.html',
  styleUrl: './contatos-cadastro.component.css'
})
export class ContatosCadastroComponent {

  msgSucesso : string = '';
  msgErro : string = '';

  constructor(
    private HttpClient: HttpClient
  ){}

  form = new FormGroup({

    nome: new FormControl('' , [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('' , [
      Validators.email
    ]),
    telefone: new FormControl('' , [
      Validators.required
    ]),
  });

  get f() {
    return this.form.controls;
  }

  submit(): void {

    this.msgSucesso = '';
    this.msgErro = '';

    this.HttpClient.post(
      environment.ApiContatos,
        this.form.value
        ).subscribe({
          next: (data : any) => {
            this.msgSucesso = `${data.nome}, gravado(a) na sua agenda.`;
            this.form.reset();
          },
          error: (e) => {
            this.msgErro = e.error.errors[0];
            this.form.reset();

          }
        });
  }

}
