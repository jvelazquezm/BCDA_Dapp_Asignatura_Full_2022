# BCDA_Dapp_Asignatura_Full_2022
Incluye la versión completa de la DAPP Asignatura desarrollada en BCDA

## Requisitos
* [Ganache](https://trufflesuite.com/ganache/ "Ganache")
* Google Chrome
* Extensión de Metamask
* Vincular metamask con Ganache 
* Truffle 

    npm install truffle

* Librería "create-react-app" Versión 4.0.3 

    npm install create-react-app@4.0.3

## Pasos para arrancar aplicación por primera vez

0.Tener arrancado Ganache con el workspace creado
1.Acceder a la carpeta de Truffle

    cd Asignatura/truffle

2.Compilar código del contrato

    truffle compile

3.Migrar contrato a la blockchain local que tenemos desplegada en Ganache

    truffle migrate

4.Pasar batería de test para comprobar que el contrato es correcto

    truffle test 

5.Ejecutar script para rellenar el contrato con contenido

    truffle exec scripts/rellenar.js

6.Ir a la carpeta de la DAPP

    cd ../dapp/

7.Instalar librerías

    npm install

8.Crear enlace simbólico para vincular el contrato con la dapp

    cd src
    ln -s ../../truffle/build/contracts

9.Arrancar servidor con la aplicación

    cd ..
    npm start

10.Se abrirá automáticamente la app en el navegador
11.Importando las distintas cuentas de nuestro workspace de Ganache en Metamask podemos simular distintos accesos (coordinador, profesor, alumno, etc)
12.Si por alguna razón no vemos el listado de datos cargados en la página hay que volver a ejecutar los pasos 3 y 5 para cargar los datos y arrancar de nuevo la aplicación con el paso 9