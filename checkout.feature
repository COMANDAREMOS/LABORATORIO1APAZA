# language: es
Característica: Finalización de una compra

  Como usuario con productos en el carrito
  Quiero completar la compra ingresando mis datos de envío
  Para recibir una confirmación al finalizar

  Escenario: Completar exitosamente la compra de un producto
    Dado que el usuario inició sesión con credenciales válidas
    Y agregó al menos un producto al carrito
    Cuando abre el carrito e inicia el checkout
    Y completa su nombre, apellido y código postal
    Y finaliza la compra
    Entonces debe ver el mensaje "Thank you for your order!"