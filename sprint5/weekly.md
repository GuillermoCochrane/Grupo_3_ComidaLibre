***Fabricio***

- ¿Qué hice en la semana?
    Reuniones con el equipo para programar las actividades, armar la retro y actualizar el tablero.
    Implementar la posibilidad de que se recuerde al usuario (checkbox) en el formulario de login, al tildar el checkbox se utiliza la cookie de usuario para guardar esa información en el navegador. Implementar un middleware de aplicación que busque esa cookie y loguee al usuario en caso de que exista y sus datos sean correctos.

- ¿En qué tuve problemas?
    Validar la cookie capturada contra el archivo JSON donde guardamos toda la información de los usuarios creados.

- ¿Qué voy a hacer?
    Con la ayuda de mis compañeros se solucionó.


***Ariel***

- ¿Qué hice en la semana?
    Agregue los modelos que simulan el uso de una DB (User y Product).
    Agregue validaciones a los formularios de registro y edición de usuarios y productos.
    Correcciones a validaciones login.
    Agregada la vista de perfil de usuario.
    Cambios en las vistas para agregarles las funcionalidades.
    Funcionalidad al carrito de compra.

- ¿En qué tuve problemas?
    Al hacer los modelos, en el método edit, al mandar un formulario vacío reemplazaba los campos, pero fue solucionado.
    En en carrito de compras tuve problemas con el uso de cookies para que persista la info del carrito, la cookie se mantiene al cambiar de usuario.

- ¿Qué voy a hacer?
    Intentar solucionar los problemas del carrito de compras.
    Seguir puliendo el aspecto visual del sitio.


***Guillermo***

- ¿Qué hice en la semana?
    Reunion por Meet para programar y dividir las actividades del sprint.
    Creacion de middlewares de ruta que distingan si un usuario se encuentra logueado o no, y de acuerdo a ello, redirijan a una determinada pagina.
    Implementacion de los middlewares en la correspondientes rutas, de modo que si el usuario se encuentra logueado (o no), no lo deje acceder a dicha ruta, y lo redirija a la pagina correspondiente 
    
- ¿En qué tuve problemas?
    Al momento de testear el funcionamiento de los middlewares, al utilizar la base de datos de usuarios del sprint anterior, el sistema de login no permitia el acceso. Despues de revisar el codigo, me di cuenta que ya se encontraba implementado por otro compañero el sistema de hashing, por lo cual, al no estar encriptadas las contraseñas de los usuarios almacenados en la base de datos, la validacion de la contraseña mostraba un mensaje de error. Pude solucionar, y por lo tanto testear los middlewares, al crear un usuario nuevo.

- ¿Qué voy a hacer?
    Terminar de pulir detalles del proyecto para la entrega del sprint, y estar a disposicion de los compañeros por si surge algun inconveniente


***Andrés***

- ¿Qué hice en la semana?
    Reunión con el equipo, se realizo la distribución de las tareas y compromisos, se implemento el proceso de login
    en el proyecto, se implemento el uso de session para la sesion de login.

- ¿En qué tuve problemas?
    Se realizo revisión del video de login completo y validar nuevamente los errores presentados.

- ¿Qué voy a hacer?
    Revisar que posibles mejoras se pueden realizar.


***Laura***

- ¿Qué hice en la semana?
    Reuniones con el equipo para programar las actividades, armar la retro y actualizar el tablero. 
    Formulario de Registro de Usuario con multer y bcrypt implementados. Ajustes de forma en la vista de userEdit y en la ruta y controller de user.

- ¿En qué tuve problemas?
    No recordaba muy bien lo de bcrypt, pero bastó con ver nuevamente la clase en la que lo explicaban.

- ¿Qué voy a hacer?
    Estar atenta por si otro compañero del equipo necesita ayuda con algo.

