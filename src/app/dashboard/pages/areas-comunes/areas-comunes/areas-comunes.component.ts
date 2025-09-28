import { Component, inject } from '@angular/core';
import { AreaComunService } from '../../../service/area-comun.service';
import { AreaComunData } from '../../../interfaces/area-comun/area-comun.interface';

@Component({
  selector: 'app-areas-comunes',
  templateUrl: './areas-comunes.component.html',
  styleUrl: './areas-comunes.component.css'
})
export class AreasComunesComponent {

  private areaComunService = inject(AreaComunService);
   public areasComunes: AreaComunData[] = [];

  constructor() {
    this. cargaAreasComunes();
  }


  cargaAreasComunes(){
    this.areaComunService.getAreasComunes().subscribe({
        next: (resp) => {
          this.areasComunes = resp.data;
          this.areasComunes.sort((a, b) => b.id - a.id);
        },
        error: (err) => {
          console.error('Error al cargar roles:', err);
        }
    });
  }
  
}
