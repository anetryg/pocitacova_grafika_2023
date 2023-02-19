## Jednoduchý webserver

Pokud otevřete HTML soubor v prohlížeči přímo (např. poklikáním ve správci souborů nebo přetažením do okna prohlížeče), otevře se soubor pomocí `file:` protokolu a řada funkcí prohlížeče nebude fungovat, např. funkce `fetch()` nebo metoda `.getSVGDocument()` pro SVG vložené přes element `<object>`.

K webové stránce je tudíž potřeba přistupovat pomocí **webserveru**. Existuje řada dobrých možností:
* vestavěný *Python http.server* (viz níže)
* rozšíření textového editoru (např. `ritwickdey.liveserver` pro VS Code)
* *Apache* a *nginx* jsou pokročilejší možnosti, dlouhodobě jsou ale pro webový vývoj pohodlnější

### Python http.server

Je potřeba mít nainstalovaný Python, nejlépe ve verzi 3.X, potom si otevřete příkazový řádek ve složce kde chcete websever spustit, z Průzkumníku (File Explorer) držte Shift, klikněte pravým tlačítkem, v kontextové nabídce by měla být možnost otevření PowerShell. Druhá možnost je kliknout do lišty s umístěním složky a napsat do ní "cmd" → Enter.

<img src="https://gist.github.com/SLeitgeb/1465d9129872b0ed48d9269cd5e164a4/raw/f0756f501d68ecce7716e66146425789e1e22062/explorer_cmd_1.png" width="692" height="677">

<img src="https://gist.github.com/SLeitgeb/1465d9129872b0ed48d9269cd5e164a4/raw/f0756f501d68ecce7716e66146425789e1e22062/explorer_cmd_2.png" width="566" height="321">

**Nikdy nespouštějte webserver např. ve své domovské složce – mohli byste zveřejnit všechna svá data** (pro počítače v místní síti, v některých případech ale i v internetu!).

V příkazovém řádku spusťte:
```sh
python -m http.server 8000
```

Následně se můžete v prohlížeči dostat k libovolnému souboru ve složce, kde jste webserver spustili:
* `index.html → localhost:8000`
* `img/kotatko.jpg → localhost:8000/img/kotatko.jpg`

Odkazy uvnitř HTML souborů ale používejte pořád stejně! Tj. relativní odkaz `budovy.svg` si prohlížeč sám přeloží na `localhost:8000/budovy.svg`, adresu `localhost` nikdy do zdrojového kódu nepište. To platí i obecně – pokud můžete použít relativní cestu (tj. `img/kotatko.jpg`), nepoužívejte absolutní (tj. `https://mojeobrazky.cz/img/kotatko.jpg`) – absolutní cestu využívejte jen v případě, že se soubor nachází na jiném serveru.

8000 je výchozí port, který `http.server` použije také pokud port v příkazu vůbec neuvedete. **Pokud uvedete port 80** (a nepoužívá ho jiný proces), stačí do prohlížeče psát `localhost` bez čísla portu, tj.:
```sh
python -m http.server 80
```

Pokud máte stále Python verze 2 (zjistíte pomocí `python -v`), nejlépe ho nahraďte verzí 3 :) – případně použijte `SimpleHTTPServer` místo `http.server`, tj.:
```sh
python -m SimpleHTTPServer 80
```

Pokud máte nainstalovaný Python, **nemusíte instalovat** žádné další knihovny – HTTP server by měl fungovat i bez nich (kdyžtak napište).

Na používání webserveru pro psaní webových stránek se vyplatí navyknout i obecně. Nebudete muset řešit zvláštní chování prohlížeče, můžete si potom i lépe organizovat projekty. Sám používám Apache, který mi zveřejňuje obsah ve složce `/srv/http` (ekvivalent `C:\srv\http`), kam vkládám symbolické odkazy na složky jinde na disku.
