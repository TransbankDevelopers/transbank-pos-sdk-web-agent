# Transbank SDK client


## ¿cómo usar?
Descarga el ejecutable desde la [sección de releases](https://github.com/TransbankDevelopers/transbank-pos-sdk-web-client-nodejs/releases) y ejecutalo. 
Una vez iniciada la aplicación por primera vez, se configurará automáticamente para arrancar al iniciar el computador. 

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
