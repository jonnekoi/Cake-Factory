# <u>Cake Factory</u>

### Tekijät

*[Miro Hintikka](https://github.com/hinmiro), [Jonne Koivisto](https://github.com/jonnekoi), [Jafar Jafarov](https://github.com/Jafestro/), [Jasper Kaira](https://github.com/japuter)*

### Idea ja kohderyhmä

Sovellus on verkkokauppa leivonnaisia ja kakkuja myyvälle yritykselle. Asiakas voi olla kuka tahansa. Asiakkaat voivat
rekisteröityä sovelluskäyttäjäksi, jolloin ohjelma osaa hakea käyttäjätiedot valmiiks tilauskenttään, sekä rekisteröityneet
käyttäjät saavat aika-ajoin alennuskoodeja verkkokauppaa.

<br/>

### Toiminnallisuudet

Heti etusivulta löytyvät kaikki tuotteet. Tuotteet ovat tuotekorteissa. Kortti kääntyy korttia klikkaamalla, joka
näyttää tuotteen ainesosat ja allergeenit toisella puolella. Klikkaamalla uudestaan kortti kääntyy etuperin ja tuotteen
voi lisätä ostoskoriin painamalla "Add to cart" painiketta. Kun tuotteet on lisätty ostoskoriin, voi siirtyä "Cart"
sivulle jossa kaikki tuotteet on korissa eriteltynä hinnan kanssa. Korissa on myös alennuskoodi kenttä mihin käyttäjä
voi syöttää saadun alennuskoodin. Mikäli koodi on oikea osaa ostoskori vähentää hinnasta alennuskoodin tarjoaman alennuksen
verran. Oikealla on tilaajan tiedot lomake ja lomakkeen lopusta löytyy "Order" nappula mitä painamalla tilaus lähtee eteenpäin.
Jos käyttäjä on rekisteröitynyt ja kirjautunut sisään tilauslomake saa automaattisesti käyttäjän tiedot serveriltä. Näitä
tietoja voi tottakai vaihtaa tilauslomakkeeseen suoraan. Rekisteröityminen löytyy kirjautumis painikkeen takaa navigaatio palkista.
Rekisteröityäkseen pitää täyttää lomakkeen tiedot ja sen jälkeen voi kirjautua omilla tunnuksilla sisään samasta kirjautumis
painikkeesta mistä löytyi rekisteröinti. Pääset muokkaamaan omia tietoja kun olet kirjautunut ja klikkaat omaa käyttäjä-
tunnustasi navigointipalkissa.

Sovellus sisältää myös Hallintapaneelin, josta tuotteita voi muokata, lisätä ja poistaa. Ainesosia voi lisätä ja poistaa
ja tilauksia, sekä käyttäjiä hallita.

### Ohjeistus

Sovellusta voit testata lisäämällä tuotteita ostoskoriin ja tilaamalla. Koodilla AVAJAISET24 saat 10% alennuksen tuotteista
ostoskorissa. Kokeile rekisteröitymistä myös ja omien tietojen muokkaamista klikkaamalla omaa käyttäjänimeä yläreunasta.

### Asennusohjeet

1. [Asenna Node](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
2. Aloita kloonaamalla seuraavat repositoriot: [Frontend](https://github.com/jonnekoi/Cake-Factory) & [Backend](https://github.com/hinmiro/CakeFactoryBackend)
3. Aja molemmissa komento ```npm i```
4. Luodaan tietokanta sovellukselle, kopio [SQL Scripti](https://github.com/jonnekoi/Cake-Factory/blob/main/scripti.sql)
5. Kun olet luonut tietokannan, tee Backend sovelluksen juureen uusi tiedosto .env ja kopio [.ENV](https://github.com/jonnekoi/Cake-Factory/blob/main/envtiedosto.md)
6. Muokkaa env tiedostossa "" olevat kohdat
7. Avaa backend puolen terminaali ja aja komento "npm run dev" palvelin käynnistyy
8. Luodaan admin käyttäjä, rekisteröi käyttäjä sivustolla jonka jälkeen syötä seuraava scripti tietokantaan ```UPDATE users SET access = 'admin' WHERE username = 'luomasi käyttäjänimi';```
9. Tämän jälkeen luomasi käyttäjätunnekset antavat pääsyn hallintasivustolle.
10. Voit aloittaa sivuston käytön. (luo tuotteita hallinta sivustolta)

[ApiDoc](http://10.120.32.97/)

[Validoinnit](https://users.metropolia.fi/~mirohi/WebOhjelmointi/cakefactory/validation/Validations.html)

[Cake Factory appi](http://10.120.32.83/Cake-Factory/HTMLs/index.html)

<br/>

&copy; 2024 Cake Factory
