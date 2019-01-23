var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: [
                "Hej. Jag heter Klas W. Detta är min sista dbwebb-kurs (som jag har förstått det). Det känns lite sorgligt, men det känns desto roligare att snart vara klar med hela utbildningen",
                "Det känns ibland som att man inte kan någonting i den stora programmeringsvärlden, ty för varje ny sak man lär sig stöter man på tio saker som är okända, men när jag tittar tillbaka på vad jag kunde för ett och ett halvt år sedan inser jag att jag lärt mig massor.",
                "Jag har har faktiskt de kunskaper som krävs för att skapa en (givet vissa restriktioner) godtycklig webbsida med interaktivt innehåll, eller kanske en app till mobilen på samma vis. Och den kunskapen är värd en hel del. Nästa steg är förstås att göra det snabbt och snyggt också, kanske helst på ett dussin olika sätt, men det får man ta allt eftersom."
            ]
        }
    };

    res.json(data);
});


module.exports = router;
