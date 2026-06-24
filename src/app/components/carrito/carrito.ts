import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito implements OnInit {
  carrito: any[] = [];
  mesaActual: string = '';

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.cargarCarrito();
    this.mesaActual = localStorage.getItem('mesa') || '1';
  }

  cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
    }
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + item.precio, 0);
  }

  eliminarItem(index: number) {
    this.carrito.splice(index, 1);
    this.guardarCarrito();
    this.notificationService.show(
      '🗑️ Producto eliminado del carrito',
      'info',
      2000
    );
  }

  enviarPedido() {
    if (this.carrito.length === 0) {
      this.notificationService.show(
        '⚠️ El carrito está vacío',
        'warning',
        2500
      );
      return;
    }

    const mesaActual = localStorage.getItem('mesa') || '1';
    let mesasOcupadas = localStorage.getItem('mesas_ocupadas');
    let ocupadas = mesasOcupadas ? JSON.parse(mesasOcupadas) : [];
    if (!ocupadas.includes(parseInt(mesaActual))) {
      ocupadas.push(parseInt(mesaActual));
      localStorage.setItem('mesas_ocupadas', JSON.stringify(ocupadas));
    }

    console.log('Pedido enviado a cocina:', this.carrito);

    this.notificationService.show(
      '📨 ¡Pedido enviado a cocina correctamente!',
      'success',
      3500
    );

    this.carrito = [];
    this.guardarCarrito();

    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1500);
  }

  cancelarPedido() {
    if (this.carrito.length === 0) {
      this.notificationService.show(
        '⚠️ No hay pedido para cancelar',
        'warning',
        2500
      );
      return;
    }

    this.notificationService.show(
      '❌ Pedido cancelado correctamente',
      'error',
      3000
    );

    this.carrito = [];
    this.guardarCarrito();

    setTimeout(() => {
      this.router.navigate(['/menu']);
    }, 1000);
  }

  volver() {
    this.router.navigate(['/menu']);
  }

  guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }
}