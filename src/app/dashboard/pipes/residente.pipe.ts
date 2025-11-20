import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { ClientService } from '../service/client.service';
import { ApiResponse, User } from '../../auth/interfaces';
 // importa la interfaz genérica

@Pipe({
  name: 'userPipe',
  pure: false // permite refrescar cuando llegan datos asíncronos
})
export class UserPipe implements PipeTransform {

  private cache = new Map<number, string>();

  constructor(
    private clientService: ClientService,
    private cdRef: ChangeDetectorRef
  ) {}

  transform(value: number | string | null | undefined): string {
    if (!value) return '(sin usuario)';

    const id = Number(value);
    if (Number.isNaN(id)) return String(value);

    // Si ya tenemos el nombre en caché, lo devolvemos
    if (this.cache.has(id)) {
      return this.cache.get(id)!;
    }

    // Mostrar mientras carga
    this.cache.set(id, '(cargando...)');

    // Llamada al servicio
    this.clientService.getUserById(id).subscribe({
      next: (resp: ApiResponse<User>) => {
        const user = resp?.data;
        const nombreCompleto = user?.name || user?.usename || '(sin nombre)';

        this.cache.set(id, nombreCompleto);
        this.cdRef.markForCheck(); // forzar renderizado
      },
      error: () => {
        this.cache.set(id, '(error)');
        this.cdRef.markForCheck();
      }
    });

    return this.cache.get(id)!;
  }
}
