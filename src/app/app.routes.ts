import { Routes } from '@angular/router';
import { ContatosCadastroComponent } from './components/contatos-cadastro/contatos-cadastro.component';
import { ContatosConsultaComponent } from './components/contatos-consulta/contatos-consulta.component';
import { ContatosEdicaoComponent } from './components/contatos-edicao/contatos-edicao.component';
import { SobreComponent } from './components/sobre/sobre.component';

export const routes: Routes = [

  {
    path: 'app/contatos-cadastro' ,
    component: ContatosCadastroComponent
  },

  {
    path: 'app/contatos-consulta' ,
    component: ContatosConsultaComponent
  },

  {
    path: 'app/contatos-edicao' ,
    component: ContatosEdicaoComponent
  },

  {
    path: 'app/sobre' ,
    component: SobreComponent
  },

  {
    path: 'app/contatos-edicao/:idContato' ,
    component: ContatosEdicaoComponent
  },

  {
  path: '', /* rota raiz do projeto */
  pathMatch: 'full',
  redirectTo: '/app/contatos-consulta'
  }

];
