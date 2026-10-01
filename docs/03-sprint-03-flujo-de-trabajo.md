Sprint 3 — Flujo de trabajo del POS

## 1. Tablero inicial

To Do:
- Historia 1: Identificarse (login) — 5 puntos. Va primero porque desbloquea las demás.
- Historia 2: Ver lista de productos — 2 puntos.
- Historia 3: Buscar/filtrar productos por nombre — 3 puntos. Depende de la historia 2.
- Historia 5: Registrar cliente frecuente — 5 puntos.
- Historia 6: Enlazar cliente a venta — 3 puntos. Depende de la historia 5.

Total: 18 puntos.

In Progress:
- (Vacío al inicio del sprint)

In Review:
- (Vacío al inicio del sprint)

Done:
- Setup inicial del kit: backend con conexión a DB, frontend con las rutas principales. Ambos corriendo. PR #1 mergeado, no agrega puntos ya que era necesario para avanzar y es lo que se suponía que traía el "Repo Base" y no era una historia.

---

## 2. Flujo de una historia (ejemplo: "Registrar cliente")

Paso 1: Historia entra a "To Do"
Paso 2: Dev toma historia → mueve a "In Progress", actualiza su branch main y crea el branch feature/registrar-cliente a partir de main.
Paso 3: Dev desarrolla y hace commits pequeños, como `feat: add POST /api/customers endpoint`.
Paso 4: Dev abre el PR de la Historia 5 (Registrar cliente). La historia se mueve a "In Review".
Paso 5: Se revisa la historia y si todo se ve bien se hace merge con merge commit (para conservar los commits).
Si hay conflictos se regresa a "In Progress" y vuelve al paso 3. Se deben resolver los conflictos en la rama con `git merge main`, nunca directo sobre main, se vuelven a probar los criterios, y se hace push.
Si hay errores (un criterio no se cumple o algo del checklist falla), se deja un comentario en el PR con lo que se encontró y cómo reproducirlo, la historia se regresa a "In Progress" y vuelve al paso 3. La corrección se sube a la misma rama y el PR se actualiza solo.
Paso 6: Historia llega a "Done".

---

## 3. Estrategia de ramas Git

Convención de nombres:
- feature/<historia-en-infinitivo>
- feature/identificarse
- feature/ver-productos
- feature/buscar-productos
- feature/registrar-cliente
- feature/enlazar-cliente-venta
- bugfix/<descripcion-que-falla>
- bugfix/busqueda-sin-acentos
- bugfix/redireccion-erronea-de-admin-a-pantalla-de-ventas
- chore/<tarea-de-mantenimiento>
- chore/actualizar-dependencias
- docs/<qué-se-documenta>
- docs/agregar-nuevos-scripts-a-readme

¿Cuándo crear rama?
- Se crea una rama cuando una historia pasa de "To Do" a "In Progress", sale del main actualizado.

¿Cuándo crear PR?
- Se crea un PR cuando se cumplan los criterios de aceptación y han sido probados en local. Aquí la tarjeta pasa de "In Progress" a "In Review".

¿Quién revisa?
- Idealmente lo tiene que revisar un tech lead, en este proyecto reviso yo mismo, pero como en rol de revisor, habiendo descansado para no estar viciado y ver con ojos "frescos", se sigue un checklist: probar criterios de aceptación, que no traiga secretos y que no tenga console.log, ni otro código de depuración.

---

## 4. Reglas del equipo

WIP Limit: Máximo 2 historias en "In Progress" por persona. Se usan dos porque en teoría solo se puede estar trabajando en 1 a la vez por persona, pero cuando hay un PR que no es aceptado y vuelve a "In Progress" no tienes que mover tu historia actual de la sección de "In Progress" para trabajar el fix de la historia que no fue aceptada en el PR.

Definición de "In Review":
- Cuando el PR de la historia está abierto, con la descripción clara y probada en local, en revisión y esperando aprobación.

Definición de "Done":
- Cumple con los criterios de aceptación establecidos en la historia.
- Checklist:
	- funcionalidad (hace lo que tenía que cumplir)
	- validaciones que aplican
	- integración (no afecta a otras cosas ya integradas, como endpoints)
	- código (commits chiquitos y claros, PR revisado, aprobado, y hace merge a main con merge commit, con conflictos resueltos y sigue corriendo frontend y backend desde el branch del PR sin errores)
