import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-cliente-carrito',
  templateUrl: './vista-cliente-carrito.component.html',
  styleUrls: ['./vista-cliente-carrito.component.css']
})
export class VistaClienteCarritoComponent {

  constructor() { }

  carrito: any[] = [];

  ngOnInit(): void {

    // Obten los productos del carrito
    if (localStorage.getItem('carrito') != null) {

      let carrito: any[] = JSON.parse(localStorage.getItem('carrito') || '{}');

      this.carrito = carrito;

      this.calcularTotal();
    }
  }

  onCantidadChange(event: any, producto: any) {
    const nuevaCantidad = parseInt(event.target.value, 10); // Obtener la nueva cantidad como entero
    producto.cantidad = nuevaCantidad; // Actualizar la cantidad en el objeto producto
    producto.subtotal = nuevaCantidad * producto.costo; // Actualizar el subtotal en función de la nueva cantidad
  }

  eliminarProducto(producto: any) {

    // Eliminar el producto del carrito
    this.carrito = this.carrito.filter(p => p.id !== producto.id);

    // Actualizar el carrito en el localStorage
    localStorage.setItem('carrito', JSON.stringify(this.carrito));

    this.calcularTotal();
  }

  calcularTotal() {
    let total = 0;

    for (let producto of this.carrito) {
      total += producto.subtotal;
    }

    console.log(total);

    return total;
  }

  comprar() {

    if (this.carrito.length == 0 || this.carrito == null) {

      Swal.fire({
        title: 'Carrito vacío',
        text: 'No hay productos en el carrito',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });

    }else{

      // Abrir el iframe
    Swal.fire({
      title: 'Pagar',
      html: `
      <!DOCTYPE html>
<html>
<head>
  <title>IFrame Example</title>
</head>
<body>
  <iframe srcdoc='
    <html>
    <head>
      <script src="https://sdk.mercadopago.com/js/v2"></script>
    </head>
    <body>
      <div id="cardPaymentBrick_container"></div>
      <script>
        const mp = new MercadoPago("TEST-d1b052fa-346c-4d17-8eb0-7953680d7673", {
          locale: "es-AR",
        });
        const bricksBuilder = mp.bricks();
        const renderCardPaymentBrick = async (bricksBuilder) => {
          const settings = {
            initialization: {
              amount: 100,
              payer: {
                email: "",
              },
            },
            customization: {
              visual: {
                style: {
                  theme: "bootstrap",
                },
              },
              paymentMethods: {
                maxInstallments: 1,
              },
            },
            callbacks: {
              onReady: () => {
                // callback llamado cuando Brick esté listo
              },
              onSubmit: (cardFormData) => {
                // callback llamado cuando el usuario haga clic en el botón enviar los datos
                return new Promise((resolve, reject) => {
                  fetch("/process_payment", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(cardFormData),
                  })
                    .then((response) => {
                      // recibir el resultado del pago
                      resolve();
                    })
                    .catch((error) => {
                      // tratar respuesta de error al intentar crear el pago
                      reject();
                    });
                });
              },
              onError: (error) => {
                // callback llamado para todos los casos de error de Brick
              },
            },
          };
          window.cardPaymentBrickController = await bricksBuilder.create(
            "cardPayment",
            "cardPaymentBrick_container",
            settings
          );
        };
        renderCardPaymentBrick(bricksBuilder);
      </script>
    </body>
    </html>
  ' style="width: 100%; height: 500px;"></iframe>
</body>
</html>
      `,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: 'Cerrar'
    }).then((result) => {

      // Si el usuario hace click en el botón de pagar
      if (!result.isConfirmed) {

        Swal.fire({
          title: 'Pago realizado',
          text: 'El pago se realizó correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {

          // Eliminar el carrito del localStorage
          localStorage.removeItem('carrito');

          // Redirigir al usuario a la página de inicio
          window.location.href = '/miCarrito';

        });
      }
    });

    }


  }
}
