import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';

const routes: Routes = [
  {path: 'colaboradores', component: ColaboradoresComponent},
  {path: '', component: ColaboradoresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
