import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  productos = [
    { id: 1, nombre: '1 POLLO ENTERO', descripcion: 'POLLO FAMILIAR CON PAPA FAMILAIRES', precio: 58, stock: 5, categoria: 'Platos Principales' },
    { id: 2, nombre: 'MOSTRITO', descripcion: '1/4 POLLO CON CHAUFA PERSONAL', precio: 22, stock: 18, categoria: 'Platos Principales' },
    { id: 3, nombre: 'TEQUEÑOS', descripcion: '4 PORCIONES DE TEQUEÑOS', precio: 15, stock: 7, categoria: 'Entradas' },
    { id: 4, nombre: 'Chicha Morada', descripcion: 'Bebida tradicional', precio: 8, stock: 10, categoria: 'Bebidas' },
    { id: 5, nombre: 'Inca Kola', descripcion: 'Gaseosa', precio: 6, stock: 15, categoria: 'Bebidas' },
    { id: 6, nombre: 'Suspiro Limeño', descripcion: 'Postre tradicional', precio: 12, stock: 4, categoria: 'Postres' }
  ];

  categorias = ['Todos', 'Entradas', 'Platos Principales', 'Bebidas', 'Postres'];
  categoriaSeleccionada = 'Todos';
  productosFiltrados = this.productos;
  carrito: any[] = [];

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.cargarCarrito();
  }

  cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
    }
  }

  filtrarPorCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
    if (categoria === 'Todos') {
      this.productosFiltrados = this.productos;
    } else {
      this.productosFiltrados = this.productos.filter(p => p.categoria === categoria);
    }
  }

  agregarAlPedido(producto: any) {
    this.carrito.push(producto);
    this.guardarCarrito();
    
    // NOTIFICACIÓN BONITA
    this.notificationService.show(
      `✅ ${producto.nombre} agregado al pedido`,
      'success',
      2500
    );
  }

  guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  verCarrito() {
    this.guardarCarrito();
    this.router.navigate(['/carrito']);
  }

  volver() {
    this.router.navigate(['/dashboard']);
  }
}