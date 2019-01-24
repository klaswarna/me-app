var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: "Välj ett specifikt kursmoment att läsa om. Skriv det sist i url:en"
        }
    };

    res.json(data);
});

router.get("/kmom01", (req, res) => {
    const data = {
        data: {
            msg: [
                "Jag tycker det är bra att det finns backendramverk i javascript (node). Eftersom javascript används på frontend-sidan i webbvärlden måste man ändå kunna det, och då finns ju mycket att vinna på att kunna använda samma språk även backend. ",
                "Även om javascript är knasigt på sitt sätt och inte alltid beter sig som man intuitivt föreställt sig, verkar det vara väldigt dynamiskt och ha lösningar till det mesta och klara litet av varje av olika programmeringsparadigmer.",
                "Som ramverk använde jag Express av den enkla anledningen att jag använt det flera gånger tidigare (samt att vi fått god handledning av det i kurserna). Det känns bäst att först lära sig ett ramverk ordentligt innan man tar sig an nästa (om inte situationen kräver annat). När man väl lärt sig ett ramverk någorlunda ordentligt, vet man vad man kan vänta sig av ett sådant och då blir det förmodligen lättare att ta till sig ett annat.",
                "Jag följde samma struktur som i övningsexemplet, där routesen ligger i en mapp och har en fil per ”huvud-route”. Programmet startas med en app.js-fil som ligger i grundkatalogen.",
                "Först provade jag emellertid att scaffolda fram hela ramverket med hjälp av express application generator, med view-engines och hela baletten. Det verkade smidigt och så kommer jag nog göra många gånger framöver, men just nu, när jag något sånär har lite överblick steg för steg i ramverket, valde jag tillslut att inte använda det, utan istället bygga ett ramverk likt det i övningsuppgiften. Så har man inte mycket mer än man för tillfället behöver (cookies-hantering kändes t.ex. som overkill för kursmomentet). Men i takt med att programmet kommer att byggas ut kommer jag nog följa i stort sett samma struktur som det som scaffoldades (kataloger för vyer, css o.s.v.).",
                "Vidare hade jag tankar att på något sätt samla json-filer i en egen katalog och kanske ha en och samma json-fil för alla kursmoment, indexerade efter respektive. Men sen efter att jag sneglat lite på kommande kursmoment, ansåg jag det smidigast att inte krångla till det i onödan, eftersom ännu bättre lösningar verkar komma framöver, där man ändå måste bygga om.",
                "En viktig TIL för detta kmom är insikten om att man kan lägga flera server-appar på samma server, köra alla samtidigt oberoende av varandra (om man vill) och nå de olika från olika adresser bara de pekas till olika portar. Över huvud taget var själva driftsättandet mycket lärorikt. Jag har visserligen driftsatt några sidor förut, men då har jag bara följt visade exempel utan att begripa mycket av det (och jag har fullständigt struntat i allt vad säkerhet heter). Fortfarande känns mycket av det höljt i dunkel, men det börjar ljusna."
            ]
        }
    };

    res.json(data);
});



module.exports = router;
