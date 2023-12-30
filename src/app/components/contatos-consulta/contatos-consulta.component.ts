import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-contatos-consulta',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './contatos-consulta.component.html',
  styleUrl: './contatos-consulta.component.css'
})
export class ContatosConsultaComponent implements OnInit {

  contatos: any[] = [];

  constructor(
    private HttpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.HttpClient.get
      (environment.ApiContatos)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.contatos = data as any[];
        },
        error: (e) => {
          console.log(e);
        }
      })
  }

  delete(idContato: string) : void {
    if(confirm('Confima exclusão?')){
      this.HttpClient.delete(environment.ApiContatos + "/" + idContato)

        .subscribe({
          next:(data: any) => {
            alert(` '${data.nome}' excluído com sucesso.`);
            this.ngOnInit();
          },
          error: (e) => {
            alert('Erro ao excluir.');
          }
        })
    }

  }

}
