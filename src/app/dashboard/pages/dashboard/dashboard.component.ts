import { AfterViewInit, Component } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    // Gráfico de barras
    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [{
          label: 'Usuarios nuevos',
          data: [12, 19, 3, 5, 2, 3, 7],
          backgroundColor: 'rgba(59,130,246,0.7)' // azul Tailwind
        }]
      }
    });

    // Histograma (lo tratamos como un bar chart con más valores)
    new Chart('histChart', {
      type: 'bar',
      data: {
        labels: Array.from({length: 20}, (_, i) => i + 1), // 1-20
        datasets: [{
          label: 'Distribución',
          data: [1, 4, 6, 10, 8, 12, 15, 8, 6, 4, 3, 5, 7, 9, 6, 4, 2, 1, 0, 0],
          backgroundColor: 'rgba(16,185,129,0.7)' // verde Tailwind
        }]
      }
    });

    // Gráfico de barras por días del mes
    new Chart('daysChart', {
      type: 'bar',
      data: {
        labels: Array.from({length: 30}, (_, i) => i + 1),
        datasets: [{
          label: 'Ventas',
          data: Array.from({length: 30}, () => Math.floor(Math.random() * 100)),
          backgroundColor: 'rgba(249,115,22,0.7)' // naranja Tailwind
        }]
      }
    });
  }
}
