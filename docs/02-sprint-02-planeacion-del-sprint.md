Sprint 2 — Planeación del Sprint

Instrucciones:

- Asigna puntos a cada historia.
- Selecciona las que entran al sprint (máx 20 puntos).
- Justifica brevemente tu selección.

Backlog:

| Historia    | Puntos | Descripción                        |
| ----------- | ------ | ---------------------------------- |
| Historia 1  | 5      | Identificarse (Login)              |
| Historia 2  | 2      | Ver lista de productos             |
| Historia 3  | 3      | Buscar/filtrar prods. por nombre   |
| Historia 4  | 8      | Ajustar carrito (cant., quitar)    |
| Historia 5  | 5      | Registrar cliente frecuente        |
| Historia 6  | 3      | Enlazar cliente a venta            |
| Historia 7  | 8      | Ver sub/total/descuento en carrito |
| Historia 8  | 8      | Registrar venta al completar       |
| Historia 9  | 3      | Generar ticket de venta            |
| Historia 10 | 5      | Crear y editar productos (admin)   |
| Historia 11 | 2      | Desactivar productos (admin)       |

Sprint seleccionado:

- Historia 1 (5 pts)
- Historia 2 (2 pts)
- Historia 3 (3 pts)
- Historia 5 (5 pts)
- Historia 6 (3 pts)

Total puntos del sprint: 18

Justificación:
¿Por qué estas historias y no otras?

Las que sí entran:

1. Desbloquea las demás historias: Para todas las historias de ventas se ocupa login de vendedor (historias 2, 3, 4, 5, 6, 7, 8, 9), y para mantener el catálogo (historias 10 y 11), se requieren los permisos que da el login.
2. La historia 2 es requisito para filtrar (3), agregar al carrito y modificar el carrito (4).
3. La historia 5 es requisito de la historia 6: buscar al cliente y enlazarlo con la compra, y para la historia 7: darle el descuento apropiado.
4. La historia 6 se deja aunque en este sprint no la consuma ninguna otra en este sprint porque va de la mano de la historia 5, se registra a un cliente para enlazarlo con ventas/carritos para uso futuro en historias con más lógica de negocio (descuentos, validación de stock, etc).
5. Con estas historias se tiene algo usable de principio a fin. Al final se tiene casi todo el proceso de una venta, el vendedor puede hacer login, ver catálogo, buscar un producto, registrar a un cliente frecuente y volver a encontrarlo después para enlzaralo a una venta.
6. Con estas historias se trabaja verticalmente, backend, frontend y su integración, y por tanto se tiene usabilidad completa, no solo algo funcional de la API que no se consume desde el frontend, ni algo bonito que no tiene funcionalidad en el front end.

El total de puntos es 18, quedan dos puntos de margen, es deliberado, la única que cabría es desactivar productos en admin (10), pero va de la mano con la historia 10, eso queda mejor en otro sprint para trabajarse juntas y dar ese valor en ese sprint.

Historia ancla:

Es la #2 (ver la lista de productos) = 2 puntos, porque consumir un endpoint ya definido y mostrarlo en pantalla, sin más lógica. Todo lo demás se compara con esto. Escala: 1, 2, 3, 5, 8, 3; Si hay duda se escoge el siguiente en la escala. Se mide la complejidad, riesgos y desconocimiento.

¿Por qué no se escogen las demás historias para este Sprint?

Las historias 4 (Ajustar carrito (cant., quitar)), 7 (Ver sub/total/descuento en carrito) y 8 (Registrar venta al completar) comparten reglas de negocio y de la venta, son más complejas y es mejor mantenerlas en el mismo sprint si es posible. Las historias de manejo de catálogo (10 y 11) van también de la mano y no bloquean el flujo de hacer una venta.
