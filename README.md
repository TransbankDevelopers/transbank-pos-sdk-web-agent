# Transbank SDK Web - Agente
Este proyecto es parte del SDK Web para POS integrado. 

## SDK Web POS Integrado
Este SDK Web consta de dos partes: 

Agente **(este repositorio)**: Este agente es un programa que se debe instalar e inicializar en el computador que tendrá el equipo POS conectado físicamente. Al instalar e inicializar este servicio, se creará un servidor de websockets local en el puerto `8090` que permitirá, a través del [SDK de Javascript](https://github.com/TransbankDevelopers/transbank-pos-sdk-web-js), poder enviar y recibir mensajes del equipo POS, de manera simple y transparente. 

[SDK Javascript](https://github.com/TransbankDevelopers/transbank-pos-sdk-web-js): Este SDK se debe instalar en el software de caja (o cualquier software web que presente HTML, CSS y JS en un navegador web). Este SDK entrega una interfaz simple para conectarse con el agente, de manera que se puedan mandar instrucciones al POS con un API fácil de usar. 

## Quick start 
Este es un proyecto construido en Node.js. En la [sección de releases (versiones)](https://github.com/TransbankDevelopers/transbank-pos-sdk-web-agent/releases) se incluye el ejecutable/instalador ya compilado y listo para usar de cada versión publicada. 
Solo se debe descargar y ejecutar para iniciar este servicio en el computador donde se encuentra el POS conectado físicamente (USB ó conexión serial)

## ¿Cómo usar?
Descarga el ejecutable desde la [sección de releases](https://github.com/TransbankDevelopers/transbank-pos-sdk-web-client-nodejs/releases) y ejecutalo. 
Una vez iniciada la aplicación por primera vez, se configurará automáticamente para arrancar al iniciar el computador. 


# Inicie automático
Al iniciar el programa, este automáticamente se configura para iniciar cuando el computador prenda/inicie sesión. 

## Compilar manualmente
Este proyecto está desarollado en Node.js, por lo que se requiere tener [Node](https://nodejs.org/es/) y NPM instalado. 

Para correr el proyecto, primero entrar a la carpeta del proyecto e instalar las dependencias. 
```bash
# Descargar el repositorio usando git. también se puede descargar como zip
git clone https://github.com/TransbankDevelopers/transbank-pos-sdk-web-agent.git
cd transbank-pos-sdk-web-agent

# Instalar dependencias
npm install
```

Para ejecutar el proyecto: 
```bash
npm run start
```

Una vez ejecutado, ya se puede conectar usando el SDK de javascript para interactuar de manera simple con el POS a través de la web. 



## Desarrollo

Se puede desarrollar con el comando `yarn start` que ejecutará la aplicación en modo desarrollo.
```bash
git clone https://github.com/TransbankDevelopers/transbank-pos-sdk-web-client-nodejs
cd transbank-pos-sdk-web-client-nodejs
yarn install
yarn start
```


### Package
Para generar un executable, se utiliza electron-forge. 

#### Mac
```bash
git clone https://github.com/TransbankDevelopers/transbank-pos-sdk-web-client-nodejs
cd transbank-pos-sdk-web-client-nodejs
yarn install
yarn package
```

#### Windows
Para que se pueda compilar correctamente, hay que realizar el proceso en windows. 

Requisitos: 

1. Instalar Node.js
2. Instalar yarn
Instalar Visual Studio 2019 con la opción "Desktop development with C++" habilitada, como se comenta acá: https://github.com/nodejs/node-gyp 

Compilación: 

1. Descargar el repositorio
2. Instalar dependencias `yarn install`
3. Recompilar binarios nativos con `./node_modules/.bin/electron-rebuild`
4. `yarn package`


## Documentación 

Puedes encontrar toda la documentación de cómo usar este SDK en el sitio https://www.transbankdevelopers.cl.

La documentación relevante para usar este SDK es:

- Documentación general sobre los productos y sus diferencias:
  [POSIntegrado](https://www.transbankdevelopers.cl/producto/posintegrado)
- Primeros pasos con [POSIntegrado](https://www.transbankdevelopers.cl/documentacion/posintegrado).
- Referencia detallada sobre [POSIntegrado](https://www.transbankdevelopers.cl/referencia/posintegrado).



## Información para contribuir y desarrollar este SDK

### Standares

- Para los commits respetamos las siguientes normas: https://chris.beams.io/posts/git-commit/
- Usamos ingles, para los mensajes de commit.
- Se pueden usar tokens como WIP, en el subject de un commit, separando el token con `:`, por ejemplo:
`WIP: This is a useful commit message`
- Para los nombres de ramas también usamos ingles.
- Se asume, que una rama de feature no mezclada, es un feature no terminado.
- El nombre de las ramas va en minúsculas.
- Las palabras se separan con `-`.
- Las ramas comienzan con alguno de los short lead tokens definidos, por ejemplo: `feat/tokens-configuration`

#### Short lead tokens
##### Commits
- WIP = Trabajo en progreso.
##### Ramas
- feat = Nuevos features
- chore = Tareas, que no son visibles al usuario.
- bug = Resolución de bugs.

### Todas las mezclas a master se hacen mediante Pull Request.

## Generar una nueva versión (con deploy automático a NPM)

Para generar una nueva versión, se debe crear un PR (con un título "Prepare release X.Y.Z" con los valores que correspondan para `X`, `Y` y `Z`). Se debe seguir el estándar semver para determinar si se incrementa el valor de `X` (si hay cambios no retrocompatibles), `Y` (para mejoras retrocompatibles) o `Z` (si sólo hubo correcciones a bugs).

En ese PR deben incluirse los siguientes cambios:

1. Modificar el archivo `CHANGELOG.md` para incluir una nueva entrada (al comienzo) para `X.Y.Z` que explique en español los cambios **de cara al usuario del SDK**.
2. Modificar el archivo `package.json` y modificar la versión

Luego de obtener aprobación del pull request, debe mezclarse a master e inmediatamente generar un release en GitHub con el tag `vX.Y.Z`. En la descripción del release debes poner lo mismo que agregaste al changelog.
Adicionalmente, se debe compilar el ejecutable para Windows y Mac (opcionalmente también el de linux), siguiendo las instrucciones de este REDME de como empaquetar la aplicación para cada plataforma. 

#### Fallback
Si el deploy automático falla o se deshabilita, se puede publicar la nueva verisón del paquete en npm usando el comando `npm publish` dentro de la carpeta de este proyecto.  
