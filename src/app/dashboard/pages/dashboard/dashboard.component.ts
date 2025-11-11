import { AfterViewInit, Component, inject } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Pago, PagoData } from '../../interfaces/Pago/pago.interface';
import { PagoService } from '../../service/pago.service';
import { ConceptoService } from '../../service/concepto.service';
import { Concepto, ConceptoData } from '../../interfaces/concepto/concepto.interface';
import { ClientService } from '../../service/client.service';
import { User } from '../../../auth/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PagoAnio } from '../../interfaces/Pago/pagoAnio.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  public page: number = 1;       // página actual
  public pageSize: number = 5;
  public pago: Pago | undefined;
  public pagos: PagoData[] = [];
  public usuarios: User[] = [];
  private pagoService = inject(PagoService);
  private clientService = inject(ClientService);
  public filtroForm!: FormGroup; // 
  public totalPagosMes: number = 0; // 🆕 total dinámico del mes
  public years: number[] = [];
  private fb = inject(FormBuilder); // 🆕
public totalPagosAnual: number = 0;

  constructor() { }
  ngOnInit() {
    const now = new Date();
    const actual = now.getFullYear();
    const start = 2010;
    const end = actual + 3;
    this.years = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    // 🆕 Inicializamos el formulario con el mes y año actuales
    this.filtroForm = this.fb.group({
      month: [now.getMonth() + 1],
      year: [now.getFullYear()],
      yearAnual: [now.getFullYear()]
    });

    // 🆕 Escucha los cambios del formulario
    this.filtroForm.valueChanges.subscribe(() => this.cargarPagosPorMesAnio());
    this.filtroForm.get('yearAnual')?.valueChanges.subscribe(() => this.cargarPagosPorAnio());

    this.cargaPagos();
    this.cargaResidentes();
    this.cargarPagosPorMesAnio();
    this.cargarPagosPorAnio();

  }


  // 🆕 arrays para selects
  public meses: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  // 🆕 método nuevo que reemplaza cargaPagos()
  cargarPagosPorMesAnio() {
    const { month, year } = this.filtroForm.value;
    this.pagoService.getPagosPorMes(year, month).subscribe({
      next: (resp) => {
        
        this.totalPagosMes = resp.data.reduce((t, p) => t + parseFloat(p.amount || '0'), 0);
      },
      error: (err) => console.error('Error al cargar pagos:', err)
    });
  }

  cargaPagos() {
    this.pagoService.getPagos().subscribe({
      next: (resp) => {
        this.pagos = resp.data;
        this.pagos.sort((a, b) => b.id - a.id);
      },
      error: (err) => {
        console.error('Error al cargar roles:', err);
      }
    });
  }

  get totalPagos(): number {
    return this.pagos.reduce((total, pago) => {
      const valor = parseFloat(pago.amount) || 0;
      return total + valor;
    }, 0);
  }

  cargaResidentes() {
    this.clientService.getUsers().subscribe({
      next: (resp) => {
        this.usuarios = resp.data;
      },
      error: (err) => {
        console.error('Error al cargar roles:', err);
      }
    });
  }

  get totalResidentes(): number {
    return this.usuarios.length;
  }

cargarPagosPorAnio() {
  const year = this.filtroForm.get('yearAnual')?.value;

  this.pagoService.getPagosPorAnio(year).subscribe({
    next: (pagoAnio: PagoAnio) => {
      this.totalPagosAnual = pagoAnio.amount;
    },
    error: (err) => console.error('Error al cargar pagos anuales:', err)
  });
}


  // ngAfterViewInit(): void {
  //   // Gráfico de barras
  //   new Chart('barChart', {
  //     type: 'bar',
  //     data: {
  //       labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
  //       datasets: [{
  //         label: 'Usuarios nuevos',
  //         data: [12, 19, 3, 5, 2, 3, 7],
  //         backgroundColor: 'rgba(59,130,246,0.7)' // azul Tailwind
  //       }]
  //     }
  //   });

  //   // Histograma (lo tratamos como un bar chart con más valores)
  //   new Chart('histChart', {
  //     type: 'bar',
  //     data: {
  //       labels: Array.from({ length: 20 }, (_, i) => i + 1), // 1-20
  //       datasets: [{
  //         label: 'Distribución',
  //         data: [1, 4, 6, 10, 8, 12, 15, 8, 6, 4, 3, 5, 7, 9, 6, 4, 2, 1, 0, 0],
  //         backgroundColor: 'rgba(16,185,129,0.7)' // verde Tailwind
  //       }]
  //     }
  //   });

  //   // Gráfico de barras por días del mes
  //   new Chart('daysChart', {
  //     type: 'bar',
  //     data: {
  //       labels: Array.from({ length: 30 }, (_, i) => i + 1),
  //       datasets: [{
  //         label: 'Ventas',
  //         data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)),
  //         backgroundColor: 'rgba(249,115,22,0.7)' // naranja Tailwind
  //       }]
  //     }
  //   });
  // }
}
