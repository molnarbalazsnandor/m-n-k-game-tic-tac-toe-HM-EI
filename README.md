Az alkalmazás egy böngészőben futtatható amőba játék (angolul: m,n,k-game) két játékos számára, amely React-ben íródott.

A React egy Javascript alapú könyvtár, így a JS nyelv ismerete után az elsajátítása egyszerű, mindemellett a komponensekre épülő struktúrája összetettebb felületek létrehozását is lehetővé teszi, a logikai átláthatóság és a props-okon keresztüli könnyű adattovábbítás mellett.
A React továbbá virtuális DOM-jával gyors renderelést és az oldal könnyű, dinamikus frissítését is biztosítja.

A projekt lokális futtatásához a következő lépések szükségesek:

- a Git könyvtár (repository) klónozása: https://github.com/molnarbalazsnandor/m-n-k-game-tic-tac-toe-HM-EI,
- majd az mnk-game mappába való navigálás után (cd mnk-game) npm/yarn install parancs futtatásával a package.json-ban meghatározott szükséges csomagok telepítése (ld.lejjebb),
- a telepítés után az alkalmazás npm/yarn start paranccsal lokálisan futtatható, és a http://localhost:3000-on elérhető.

Telepítendő csomagok:

- react-dom (18.2.0-ban készült)
- react-router-dom
- react-google-button
- swiper
- @mui/material @emotion/react @emotion/styled
- firebase

A fenti URL védett, azért az alkalmazás automatikusan a http://localhost:3000/login route-ra navigál. A továbblépés Google alapú bejelentkezéshez kötött, amit a firebase autentikációs rendszere biztosít. A Google egy gyors, biztonságos és széleskörűen elterjedt autentikációs opció, ezért esett rá a választásom. Az autentikációs adatokat egy Context alapú komponensben tároltam, és utaztattam a komponensek között.

Bejelentkezés után az app automatikusan továbbirányít a http://localhost:3000/setup route-ra, ahol ekkor már megjelennek a felhasználó alapvető adatai (itt ki is jelentkezhet), és a játék beállításai. Beállíthatóak a a pálya mérete, a játékosok nevei, továbbá a jelölő ikonjaik. Ugyan a győzelmi limit és a játékosok számának módosítása is kezdetben fent forgott, ezeket később elvetettem, mivel véleményem szerint a játék alapkoncepcióját túlzottan megtörnék.

A preferenciák megadása után a játék elindítható, ekkor léptet az app tovább a http://localhost:3000 route-on található játéktáblára, ami az amőba alapvető szabályait követi. A játék tetszés szerint újraindítható, vagy akár csak a legutóbbi lépést is vissza lehet vonni, továbbá lehetőség van a játékbeállításokhoz való visszalépésre is.
