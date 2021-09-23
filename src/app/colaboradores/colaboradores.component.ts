import { HttpClient } from '@angular/common/http';
import { Component, Type, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormsModule } from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

export class Colaboradores{
  constructor(
    public IDCOLABORADOR: number,
    public NOMBRE: string,
    public APELLIDO: string,
    public DIRECCION: string,
    public EDAD: string,
    public PROFESION: string,
    public ESTADOCIVIL: string,
  ){
  }
}

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css']
})
export class ColaboradoresComponent implements OnInit {

  closeResult: string | undefined;
  colaboradores: Colaboradores[] | undefined;
  riesgo_msg: string | undefined;
  colaborador: Colaboradores | undefined;
  editForm: FormGroup | undefined;
  actual_id: number | undefined;
  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    // private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    // this.getColaborador()
  }

  getColaborador(){
    this.httpClient.get<any>('http://localhost:3000/colaboradores')
    .subscribe(
      response => {
        this.colaboradores = response;
      }
    );
  }

  nivelRiesgo(content : any, colaborador: Colaboradores){
    let edad = parseInt(colaborador.EDAD);
    if(!isNaN(edad)){
      if(edad >= 18 && edad <= 25) this.riesgo_msg = "FUERA DE PELIGRO";
      if(edad >= 26 && edad <= 50) this.riesgo_msg = "TENGA CUIDADO, TOME TODAS LAS MEDIDAS DE PREVENSION";
      if(edad >= 51) this.riesgo_msg = "POR FAVOR QUEDARSE EN CASA";
    } else {
      this.riesgo_msg = "La edad no es válida, editala y coloca un número válido";
    }
    this.modalService.open(content, {
      centered: true,
      size: 'lg'
    });    
  }

  open(content: any) {
    this.modalService.open(content, {
      size: 'lg',
      centered: true,
      ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Cerrado por: ${result}`;
    }, (reason) => {
      this.closeResult = `Cerrado por ${this.getDismissReason(reason)}`;
    });
  }
  
  openEdit(targetModal: any, colaborador: Colaboradores) {
    this.modalService.open(targetModal, {
     centered: true,
     backdropClass: 'light-blue-backdrop',
     size: 'lg'
   }
   );
   this.actual_id = colaborador.IDCOLABORADOR;
   
   /**
  //  this.actual_id = 2;
  // DETALLES DE OBJETO - PENDIENTE DE ARREGLO - NGXS ?
  //  document.querySelector('#e_name').setAttribute('value', colaborador.NOMBRE);
  // document.getElementById('e_name').setAttribute('value', colaborador.NOMBRE);
  // console.log(document.getElementById('e_name'));
  // document.getElementById('e_apellido')?.setAttribute('value', colaborador.APELLIDO);
  // document.getElementById('e_edad')?.setAttribute('value', colaborador.EDAD);
  // document.getElementById('e_direccion')?.setAttribute('value', colaborador.DIRECCION);
  // document.getElementById('e_profesion')?.setAttribute('value', colaborador.PROFESION);
// document.getElementById('e_estado_civil')?.setAttribute('value', colaborador.ESTADOCIVIL);
  */
 }

  openDelete(targetModal: any, colaborador: Colaboradores){
    this.modalService.open(targetModal, {
      centered: true,
      size: 'sm'
    });
    this.actual_id = colaborador.IDCOLABORADOR;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'Por clic fuera de la ventana flotante';
    } else {
      return `: ${reason}`;
    }
  }


  // Post / Create
  onSubmit(f: NgForm) {
    const url = 'http://localhost:3000/colaboradores/add';
    
    this.httpClient.post(url, f.value)
    .subscribe((result) => {
      this.getColaborador();
    });
    this.modalService.dismissAll();
  }

  // Put / Edit
  onSubmitPut(f: NgForm) {
    const url = 'http://localhost:3000/colaboradores/edit/' + this.actual_id;
    // console.log(url);
    this.httpClient.put(url, f.value)
    .subscribe((result) => {
    this.getColaborador();
    });
    this.modalService.dismissAll();
    this.actual_id = undefined;
  }

  // Delete
  onSubmitDelete(){
    const url = 'http://localhost:3000/colaboradores/delete/' + this.actual_id;
    this.httpClient.delete(url)
    .subscribe((result) => {
      this.getColaborador();
    });
    this.modalService.dismissAll();
    this.actual_id = undefined;
  }



}
