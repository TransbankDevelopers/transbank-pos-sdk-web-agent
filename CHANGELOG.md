## [4.0.0] - 23-04-2024

Se cambian funcionalidades. Funciona con la versión 4.0.0 del [SDK Web](https://github.com/TransbankDevelopers/transbank-pos-sdk-web-js/releases)

### Changed

- Ahora el agente usa https, por lo que es necesario utilizar certificados para su funcionamiento. Puedes ver la guía para generarlos en [este documento](docs/Generacion-certificado.md).

## [3.1.4] - 24-09-2021

### Fixed

- Se soluciona problema con los mensajes intermedios.
- Se añaden protecciones para evitar una doble ejecución del agente.
- Se fuerza el cierre del agente en Mac.

## [3.1.3] - 15-09-2021

Se mejoran funcionalidades. Funciona con la versión 3.1.1 del [SDK Web](https://github.com/TransbankDevelopers/transbank-pos-sdk-web-js/releases/tag/3.1.1)

### Added

- Se añade parámetro para configurar _baudrate_ para el método `autoconnect()`.
- Se añade el mensaje intermedio para el código de respuesta 80.

### Changed

- Se mejora el despliegue de información de los eventos.

## [3.1.2] - 07-07-2021

Se solucionan errores del agente. Funciona con la versión 3.1.0 del [SDK Web](https://github.com/TransbankDevelopers/transbank-pos-sdk-web-js/releases/tag/3.1.0)

### Fixed

- Solucionado problema con el icono del traybar en producción.

## [3.1.1] - 27-05-2021

Se solucionan errores del agente. Funciona con la versión 3.1.0 del [SDK Web](https://github.com/TransbankDevelopers/transbank-pos-sdk-web-js/releases/tag/3.1.0)

### Fixed

- Solucionado problema detectado en windows que no permitía restaurar la ventana después de minimizar y que tampoco permitía visualizar el icono en el system tray de windows.

## [3.1.0] - 27-05-2021

Se mejoran funcionalidades del agente. Funciona con la versión 3.1.0 del [SDK Web](https://github.com/TransbankDevelopers/transbank-pos-sdk-web-js/releases/tag/3.1.0)

### Added

- Se añade evento para la apertura del puerto.

## [3.0.0] - 25-05-2021

Se mejoran funcionalidades del agente. Funciona con la versión 3.0.0 del [SDK Web](https://github.com/TransbankDevelopers/transbank-pos-sdk-web-js/releases/tag/3.0.0) 

### Added

- Se agrega la versión en la interfaz del agente.
- Se añade respuesta para que el SDK web pueda solicitar la versión del agente.

## Changed

- Se cambia la respuesta para los mensajes intermedios, ahora se retorna un objeto.
- Se modifica la respuesta de las peticiones al agente, ahora se responde al nombre indicado por parámetro en la petición.

## [2.1.0]

### Added

- Primer release oficial. Funciona con la versión 2.1.0 del [SDK Web](https://github.com/TransbankDevelopers/transbank-pos-sdk-web-js/releases/tag/2.1.0) 
