import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  mesas = [
    { numero: 1, estado: 'libre' },
    { numero: 2, estado: 'libre' },
    { numero: 3, estado: 'libre' },
    { numero: 4, estado: 'libre' },
    { numero: 5, estado: 'libre' },
    { numero: 6, estado: 'libre' }
  ];

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.actualizarEstadosMesas();
  }

  actualizarEstadosMesas() {
    // Verificar qué mesas están ocupadas
    const mesasOcupadas = localStorage.getItem('mesas_ocupadas');
    if (mesasOcupadas) {
      const ocupadas = JSON.parse(mesasOcupadas);
      this.mesas = this.mesas.map(mesa => ({
        ...mesa,
        estado: ocupadas.includes(mesa.numero) ? 'ocupada' : 'libre'
      }));
    }
  }

  seleccionarMesa(mesa: any) {
    if (mesa.estado === 'ocupada') {
      this.notificationService.show(
        `🔴 Mesa ${mesa.numero} está ocupada`,
        'warning',
        2500
      );
      return;
    }

    localStorage.setItem('mesa', mesa.numero.toString());
    
    this.notificationService.show(
      `🪑 Mesa ${mesa.numero} seleccionada`,
      'success',
      2000
    );
    
    setTimeout(() => {
      this.router.navigate(['/menu']);
    }, 500);
  }

  // NUEVO: Botón para liberar mesa manualmente
  liberarMesa(mesa: any) {
    const mesasOcupadas = localStorage.getItem('mesas_ocupadas');
    if (mesasOcupadas) {
      let ocupadas = JSON.parse(mesasOcupadas);
      ocupadas = ocupadas.filter((num: number) => num !== mesa.numero);
      localStorage.setItem('mesas_ocupadas', JSON.stringify(ocupadas));
      
      // Actualizar el estado local
      this.actualizarEstadosMesas();
      
      this.notificationService.show(
        `✅ Mesa ${mesa.numero} liberada - ¡Ahora está disponible!`,
        'success',
        3000
      );
    }
  }
}