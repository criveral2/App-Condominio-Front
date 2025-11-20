import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PagoService } from '../../service/pago.service';
import { ClientService } from '../../service/client.service';
import { ConceptoService } from '../../service/concepto.service';
import { Pago, PagoData } from '../../interfaces/Pago/pago.interface';
import { PagoAnio } from '../../interfaces/Pago/pagoAnio.interface';
import { Concepto } from '../../interfaces/concepto/concepto.interface';
import { User } from '../../../auth/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  // ============================================================
  // 🧱 1️⃣ Propiedades de paginación y datos principales
  // ============================================================
  public page: number = 1;
  public pageSize: number = 5;

  public pago?: Pago;
  public pagos: PagoData[] = [];
  public usuarios: User[] = [];
  public conceptos?: Concepto;

  // ============================================================
  // 🧾 2️⃣ Formularios y controles reactivos
  // ============================================================
  public filtroForm!: FormGroup;
  public idConceptoControl = new FormControl<number | null>(null);
  public conceptoControl = new FormControl();

  // ============================================================
  // 💰 3️⃣ Totales
  // ============================================================
  public totalPagosMes: number = 0;
  public totalPagosAnual: number = 0; // (reservado para uso futuro)
  public totalPorConcepto: number = 0;

  // ============================================================
  // 📅 4️⃣ Fechas y listas auxiliares
  // ============================================================
  public years: number[] = [];
  public meses: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // ============================================================
  // 🧩 5️⃣ Inyección de dependencias
  // ============================================================
  private fb = inject(FormBuilder);
  private pagoService = inject(PagoService);
  private clientService = inject(ClientService);
  private conceptoService = inject(ConceptoService);

  // ============================================================
  // 🚀 Ciclo de vida
  // ============================================================
  ngOnInit() {
    this.cargarConceptos();
    this.inicializarAnios();
    this.inicializarFormulario();
    this.suscribirseAFiltros();
    this.suscribirseAConcepto();

    // Cargar datos iniciales
    this.cargaResidentes();
    this.cargarPagosPorMesAnio();
  }

  // ============================================================
  // 🧠 6️⃣ Inicialización de datos y suscripciones
  // ============================================================

  /** Cargar conceptos desde el servicio y seleccionar el primero por defecto */
  private cargarConceptos() {
    this.conceptoService.getConcepto().subscribe({
      next: (resp) => {
        this.conceptos = resp;

        // ✅ Si existen conceptos, seleccionar el primero automáticamente
        if (this.conceptos?.data?.length > 0) {
          const primerConcepto = this.conceptos.data[0];
          this.idConceptoControl.setValue(primerConcepto.id);

          // 🔹 También se recalcula el total de pagos para ese concepto actual
          const { month, year } = this.filtroForm.value;
          this.buscarPorConcepto(year, month, primerConcepto.id);
        }
      },
      error: (err) => console.error('Error al cargar conceptos:', err)
    });
  }


  /** Inicializa el rango de años (desde 2024 hasta actual +3) */
  private inicializarAnios() {
    const now = new Date();
    const actual = now.getFullYear();
    const start = 2025;
    const end = actual + 3;
    this.years = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  /** Inicializa el formulario reactivo de filtros (mes y año) */
  private inicializarFormulario() {
    const now = new Date();
    this.filtroForm = this.fb.group({
      month: [now.getMonth() + 1],
      year: [now.getFullYear()],
    });
  }

  /** Suscripción a cambios de mes o año */
  private suscribirseAFiltros() {
    this.filtroForm.valueChanges.subscribe(() => {
      this.cargarPagosPorMesAnio();
      // Si hay un concepto seleccionado, recalcular el total con el nuevo mes/año
      const idConcepto = this.idConceptoControl.value;
      if (idConcepto) {
        const { month, year } = this.filtroForm.value;
        this.buscarPorConcepto(year, month, idConcepto);
      } else {
        this.totalPorConcepto = 0;
      }

    });
  }

  /** Suscripción a la selección de un concepto */
  private suscribirseAConcepto() {
    this.idConceptoControl.valueChanges.subscribe((idConcepto) => {
      if (idConcepto) {
        const { month, year } = this.filtroForm.value;
        this.buscarPorConcepto(year, month, idConcepto);
      } else {
        // Limpia el total si se deselecciona
        this.totalPorConcepto = 0;
      }
    });
  }

  // ============================================================
  // 💼 7️⃣ Métodos de carga de datos
  // ============================================================

  /** Carga los pagos según el mes y año seleccionados */
  public cargarPagosPorMesAnio() {
    const { month, year } = this.filtroForm.value;

    this.pagoService.getPagosPorMes(year, month).subscribe({
      next: (resp) => {
        this.pagos = resp.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.totalPagosMes = this.pagos.reduce((t, p) => t + parseFloat(p.amount || '0'), 0);
      },
      error: (err) => console.error('Error al cargar pagos:', err)
    });
  }

  /** Carga la lista de usuarios (residentes) */
  public cargaResidentes() {
    this.clientService.getUsers().subscribe({
      next: (resp) => (this.usuarios = resp.data),
      error: (err) => console.error('Error al cargar residentes:', err)
    });
  }

  /** Busca el total de pagos por concepto, mes y año */
  public buscarPorConcepto(year: number, month: number, idConcepto: number) {
    this.pagoService.getPagosPorConcepto(idConcepto, year, month).subscribe({
      next: (resp) => {
        this.totalPorConcepto = resp.data?.totalAmount || 0;
      },
      error: (err) => console.error('Error al buscar por concepto:', err)
    });
  }

  // ============================================================
  // 📊 8️⃣ Getters auxiliares
  // ============================================================
  get totalResidentes(): number {
    return this.usuarios.length;
  }
}
