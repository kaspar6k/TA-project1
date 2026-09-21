const http = require('http');

const dateTimeET = require('./src/dateTimeET');

const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title> Kaspar Kuusk, veevbiprogrammeerimine</title>\n</head>\n<body>\n';

const pageBody = '\t<h1>Kaspar Kuusk, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sislda tõµsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';

const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res){
	res.writeHead(200, {"Content-type": "text/html"});
	const pageDateTime = '\n\t<p>Täna on ' + dateTimeET.weekDay() + '.</p>\n\t<p>Kuupäev: ' + dateTimeET.fullDate(1) + '.</p>\n\t<p>Lehe avamise aeg: ' + dateTimeET.fullTime() + '.</p>';
	res.write(pageHead);
	res.write(pageBody);
	res.write(pageDateTime);
	res.write(pageFoot);
	return res.end();
}).listen(5106)
