import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cuenta.html',
  styleUrl: './cuenta.css'
})
export class Cuenta implements OnInit {
  carrito: any[] = [];
  mesaSeleccionada: string = '';
  nombreMozo: string = 'Mozo';
  mensaje: string = '';
  total: number = 0;

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    // Cargar carrito
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
    }
    
    // Cargar mesa
    const mesaGuardada = localStorage.getItem('mesa');
    if (mesaGuardada) {
      this.mesaSeleccionada = mesaGuardada;
    }
    
    this.total = this.calcularTotal();
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + item.precio, 0);
  }

  pagar(metodo: string) {
    if (this.carrito.length === 0) {
      this.notificationService.show(
        '⚠️ No hay productos para pagar',
        'warning',
        2500
      );
      return;
    }

    const total = this.calcularTotal();
    
    // NOTIFICACIÓN BONITA
    this.notificationService.show(
      `💳 Pago de S/ ${total} realizado con ${metodo}. ¡Gracias!`,
      'success',
      4000
    );
    
    console.log('Pago realizado:', metodo, total);
    
    // Esperar un momento y finalizar
    setTimeout(() => {
      this.finalizar();
    }, 2000);
  }

  finalizar() {
    const mesaActual = localStorage.getItem('mesa');
    if (mesaActual) {
      // Quitar la mesa de ocupadas
      const mesasOcupadas = localStorage.getItem('mesas_ocupadas');
      if (mesasOcupadas) {
        let ocupadas = JSON.parse(mesasOcupadas);
        ocupadas = ocupadas.filter((num: number) => num !== parseInt(mesaActual));
        localStorage.setItem('mesas_ocupadas', JSON.stringify(ocupadas));
        console.log(`Mesa ${mesaActual} liberada`);
      }
    }
    
    // Limpiar carrito y mesa
    this.carrito = [];
    localStorage.removeItem('carrito');
    localStorage.removeItem('mesa');
    
    // Mostrar notificación de mesa liberada
    this.notificationService.show(
      `✅ Mesa ${mesaActual} liberada - ¡Lista para nuevos pedidos!`,
      'success',
      3000
    );
    
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1500);
  }

  volver() {
    this.router.navigate(['/carrito']);
  }
}