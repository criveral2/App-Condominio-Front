import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { ConceptoService } from '../service/concepto.service';
import { Concepto } from '../interfaces/concepto/concepto.interface';

@Pipe({
    name: 'conceptoPipe',
    pure: false // permite que Angular refresque la vista cuando llega la data
})
export class ConceptoPipe implements PipeTransform {

    private cache = new Map<number, string>();

    constructor(
        private conceptoService: ConceptoService,
        private cdRef: ChangeDetectorRef
    ) { }

    transform(value: string | number | null | undefined): string {
        if (!value) return '(sin id)';

        const id = Number(value);
        if (Number.isNaN(id)) return String(value);

        // Si ya está en caché, devolverlo
        if (this.cache.has(id)) {
            return this.cache.get(id)!;
        }

        // Marcamos como "cargando" para evitar múltiples llamadas simultáneas
        this.cache.set(id, '(cargando...)');

        // Llamada al servicio
        this.conceptoService.getConceptoById(id).subscribe({
            next: (resp: Concepto) => {
                // Maneja tanto array como objeto
                const dataObj = Array.isArray(resp.data) ? resp.data[0] : (resp.data as any);
                const nombre = dataObj?.name ?? '(sin nombre)';

                this.cache.set(id, nombre);
                this.cdRef.markForCheck(); // fuerza renderizado
            },
            error: () => {
                this.cache.set(id, '(error)');
                this.cdRef.markForCheck();
            }
        });

        return this.cache.get(id)!;
    }
}
