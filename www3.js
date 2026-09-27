const http = require('http');

//moodul päringu parsimiseks
const url = require('url');

//moodul failitee haldamiseks
const path = require('path');

//moodul faili lugemiseks, async puhul on vaja seda toetavat erilisemat moodulit
//const fs = require('fs');
const fs = require('fs').promises;

const dateTimeET = require('./src/dateTimeET');

const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title> Kaspar Kuusk, veevbiprogrammeerimine</title>\n</head>\n<body>\n';

const pageBody = '\t<h1>Kaspar Kuusk, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sislda tõµsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';

const pageBanner = '<img src="veebiprogrammeerimine_2026_TA.png" alt="">';

const pageFoot = '\n</body>\n</html>';

http.createServer(async function(req, res){
	//parsin url-i
	console.log('Päring: ' + req.url);
	let currentURL = url.parse(req.url, true);
	console.log('Parsituna: ' + currentURL.pathname);
	
	//hakkame erinevaid lehti jaotama -> routes (marsruudid)
	if(currentURL.pathname ==='/'){
	
	res.writeHead(200, {"Content-type": "text/html"});
	const pageDateTime = '\n\t<p>Täna on ' + dateTimeET.weekDay() + '.</p>\n\t<p>Kuupäev: ' + dateTimeET.fullDate(1) + '.</p>\n\t<p>Lehe avamise aeg: ' + dateTimeET.fullTime() + '.</p>';
	res.write(pageBanner);
	res.write(pageHead);
	res.write(pageBody);
	res.write(pageDateTime);
	res.write('\n\t<ul>\n\t\t<li><a href="/vanasona">Tänane vanasõna</a></li>');
	res.write('\n\t\t<li><a href="/oppimine">Miks astusin TLÜ?</a></li>');
	res.write('\n\t</ul>');
	res.write('<img src="/tallinn-laevalt.jpg" alt="Vaade Tallinnale laevast" style="max-width: 30%; height: auto;">');
	res.write('<br>2026 august, Tallinn');
	res.write(pageFoot);
	return res.end();
	}
	
	else if (currentURL.pathname === '/vanasona'){
	res.writeHead(200, {"Content-type": "text/html"});
	const pageDateTime =('\n\t<p>Täna on ' + dateTimeET.weekDay() + '.</p>\n\t<p>Kuupäev: ' + dateTimeET.fullDate(1) + '.</p>\n\t<p>Lehe avamise aeg: ' + dateTimeET.fullTime() + '.</p>');
	
	const data = await fs.readFile(path.join(__dirname, 'txt', 'vanasonad.txt'), 'utf8');
	let folkWisdom = data.split(';');
	let juhuslikVanasona = folkWisdom[Math.round(Math.random() * (folkWisdom.length - 1))];
	
	res.write(pageHead);
	res.write('\t<h1>Eesti vanasõnad</h1>\n\t<p>Siin näed tänase päeva vanasõna.</p>\n\t<hr>');
	res.write('\n\t<p>' + juhuslikVanasona + '</p>');
	res.write('\n\t<ul>\n\t\t<li><a href="/">Tagasi avalehele</a></li>');
	res.write(pageFoot);
	return res.end();
	}
	
	else if (currentURL.pathname === '/oppimine'){
	res.writeHead(200, {"Content-type": "text/html"});
	res.write(pageHead);
	res.write('\t<h1>Miks astusin TLÜ?</h1>\n\t<p>Huvitun tehnikast ja tarkvarast ning soovin ehitada karjääri alal, mis pakub mulle alati tegevust ja rõõmu.</p>\n\t<hr>');
	res.write('<img src="/tallinn-laevalt.jpg" alt="Vaade Tallinnale laevast" style="max-width: 60%; height: auto;">');
	res.write('\n\t<ul>\n\t\t<li><a href="/">Tagasi avalehele</a></li>');
	res.write(pageFoot);
	return res.end();
	}
	
	else if(currentURL.pathname === '/veebiprogrammeerimine_2026_TA.png'){
		//teeme pildi tegeliku asukoha programmile kättesaadavaks
		let picPath = path.join(__dirname, 'pic', currentURL.pathname);
		try {
			const data = await fs.readFile(picPath); 
			res.writeHead(200, {"Content-type": "image/png"});
			res.end(data);
		} catch (err){
			res.writeHead(404, {"Content-type": "text/plain; charset=utf8"});
			return res.end('Pilti ei leitud!');
		} 
	}	

else if(path.extname(currentURL.pathname) === '.jpg'){
	let picPath = path.join(__dirname, 'pic', currentURL.pathname);
	try {
		const data = await fs.readFile(picPath);
		res.writeHead(200, {"Content-type": "image/jpeg"});
		res.end(data);
	} catch (err){
		res.writeHead(404, {"Content-type": "text/plain; charset=utf8"});
		return res.end('Pilti ei leitud!');
	}
}

	else {
		res.end('Viga 404, ei leia sellist lehte!');
	}
}).listen(5106)
