window.KRIPTO_GALDERAK = [
  {
    "id": 1,
    "blokea": 1,
    "kategoria": "Oinarrizko Kontzeptuak",
    "galdera": "Zein da esteganografiaren eta kriptografiaren arteko desberdintasun nagusia?",
    "aukerak": [
      "Kriptografiak mezuaren edukia ulertezin bihurtzen du; esteganografiak, ordea, mezuaren existentzia bera ezkutatzen du beste datu baten barruan.",
      "Kriptografiak gako asimetrikoen bidez babesten du trafikoa; esteganografiak, aldiz, gako simetrikoak soilik aplikatzen ditu biltegian.",
      "Kriptografia algoritmo matematiko irekietan oinarritzen da beti; esteganografia, berriz, segurtasuna iluntasunean bilatzean datza.",
      "Kriptografiak fitxategiak konprimatu eta osotasuna zaintzen du; esteganografiak, ordea, biltegiratze-tamaina txikitzea du helburu bakarra."
    ],
    "zuzena": 0,
    "azalpena": "Kriptografiak mezuaren edukia ulertezin bihurtzen du (esanahia ezkutatu), baina mezua badagoela ikusten da. Esteganografiak mezua beste datu baten barruan (adibidez, irudi baten LSB bitetan) ezkutatzen du, inor konturatu ez dadin mezu bat dagoela."
  },
  {
    "id": 2,
    "blokea": 1,
    "kategoria": "Oinarrizko Kontzeptuak",
    "galdera": "Datu bat Base64 bidez kodetzeak konfidentzialtasunik ematen al du?",
    "aukerak": [
      "Bai, 64 karaktere desberdinez osatutako alfabetoa denez, gako pribaturik gabe deszifratzea konputazionalki ezinezkoa delako.",
      "Bai, baina babes hori bakarrik bermatzen da 256 biteko gako sekretu batekin nahastuta eta sare lokaletan erabiltzen denean.",
      "Ez, Base64 kodetze eskema publiko bat delako eta gakorik gabe edonork itzul dezakeelako berehala jatorrizko testura.",
      "Bakarrik ematen du konfidentzialtasuna fitxategi bitarrak (adibidez irudiak edo PDFak) MIME bidez garraiatzeko erabiltzen denean."
    ],
    "zuzena": 2,
    "azalpena": "Kodetzeak (Base64, UTF-8, URL encode) formatua aldatzen du bateragarritasuna bermatzeko, ez sekretua babesteko. Ez du gakorik erabiltzen eta estandarra publikoa da; beraz, ez du inolako konfidentzialtasunik ematen."
  },
  {
    "id": 3,
    "blokea": 1,
    "kategoria": "Oinarrizko Kontzeptuak",
    "galdera": "Zer dio Kerckhoffs-en printzipioak (1883)?",
    "aukerak": [
      "Sistema kriptografiko baten sendotasunak algoritmoa bera erabat ezkutuan mantentzean datza, erasotzaileak barne-egitura ezagutu ez dezan.",
      "Sistemaren segurtasunak gakoaren sekretutasunaren mende bakarrik egon behar duela, eta ez algoritmoaren sekretutasunaren mende.",
      "Gako kriptografikoen luzera minimoak algoritmoaren konplexutasun ziklomartikoaren bikoitza izan behar duela erasoak saihesteko.",
      "Sistema asimetrikoak simetrikoak baino seguruagoak direla berez, nahiz eta bietan gako publikoak publikoki banatu behar diren."
    ],
    "zuzena": 1,
    "azalpena": "Kerckhoffs-en printzipioaren arabera (Claude Shannon-ek 'etsaiak sistema ezagutzen du' gisa laburbildua), algoritmoa publikoa eta komunitateak aztertua izan behar da; segurtasun osoa gakoa ezkutuan mantentzean oinarritu behar da ('segurtasuna iluntasunaren bidez' praktika txarra da)."
  },
  {
    "id": 4,
    "blokea": 1,
    "kategoria": "Oinarrizko Kontzeptuak",
    "galdera": "Informazio-segurtasuneko helburuetatik, zein da baimendu gabeko aldaketak hautemateaz arduratzen dena?",
    "aukerak": [
      "Konfidentzialtasuna (edukia baimenik gabe ez irakurtzea)",
      "Autentikotasuna (igorlearen identitatea bermatzea)",
      "Ukatzerik eza (ekintza bat egin izana ezin ukatzea)",
      "Osotasuna (baimendu gabeko aldaketak hautematea)"
    ],
    "zuzena": 3,
    "azalpena": "Osotasunak (Integrity) bermatzen du informazioa ez dela baimenik gabe ez aldatu, ez manipulatu, ezta ezabatu ere (hash, HMAC edo sinadura digitalen bidez bermatzen da)."
  },
  {
    "id": 5,
    "blokea": 1,
    "kategoria": "Oinarrizko Kontzeptuak",
    "galdera": "Zergatik HMAC batek ematen du osotasuna eta autentikotasuna, baina EZ ukatzerik eza (no repudio)?",
    "aukerak": [
      "HMAC kalkulatzeko gako sekretua igorleak zein hartzaileak partekatzen dutenez, biek sor dezakete baliozko kode bera.",
      "HMAC-ek gako asimetrikoak erabiltzen ditu eta hirugarren edozeinek egiaztatu dezake gako publikoa erabiliz jatorria.",
      "HMAC funtzioak ez duelako inolako gako sekreturik erabiltzen, soilik datu-blokeen digestio publikoa kalkulatzen duelako.",
      "HMAC algoritmoak sare lokaleko ethernet paketeak soilik babesten ditu, eta ez garraio-geruzako aplikazio-datuak."
    ],
    "zuzena": 0,
    "azalpena": "HMAC-en gako sekretua bi aldeek (igorleak eta hartzaileak) dute. Beraz, hartzaileak ezin dio hirugarren bati frogatu mezua igorleak sortu zuenik eta ez berak; horregatik ez du ukatzerik eza bermatzen. Horretarako pertsona bakar batek duen gako pribatu bidezko sinadura digitala behar da."
  },
  {
    "id": 6,
    "blokea": 2,
    "kategoria": "Kriptografia Simetrikoa",
    "galdera": "Nola funtzionatzen du zifratze simetrikoak?",
    "aukerak": [
      "Zifratzeko gako publikoa erabiltzen da eta deszifratzeko gako pribatu bakarra.",
      "Gako sekretu bera erabiltzen da datuak zifratzeko zein deszifratzeko bi aldeetan.",
      "Datu-bloke bakoitza algoritmo ezberdin batekin zifratzen da ausazko gakorik gabe.",
      "Alderantzizko hash funtzio bat aplikatzen du datu-blokeen jatorrizko tamaina mantenduz."
    ],
    "zuzena": 1,
    "azalpena": "Zifratze simetrikoan (adib. AES) gako berbera partekatzen dute igorleak eta hartzaileak datuak enkriptatzeko eta desenkriptatzeko."
  },
  {
    "id": 7,
    "blokea": 2,
    "kategoria": "Kriptografia Simetrikoa",
    "galdera": "Zergatik jotzen da ECB (Electronic Codebook) modu guztiz arriskutsutzat eta ez da inoiz datu errealetarako erabili behar?",
    "aukerak": [
      "Gakoaren tamaina gehienez 56 bitekoa izan daitekeelako eta prozesadore modernoetan ezin delako paralelizatu.",
      "Hasieratze-bektorea (IV) sarean zehar zifratu gabe bidaltzen duelako eta horrek gako nagusia bistaratzen duelako.",
      "Bloke arrunt berdinek beti bloke zifratu bera sortzen dutenez, datuen egitura eta patroiak agerian uzten dituelako.",
      "Algoritmoak automatikoki konprimitzen dituelako datuak eta horrek CRIME motako albo-kanaleko erasoak errazten dituelako."
    ],
    "zuzena": 2,
    "azalpena": "ECB moduan bloke bakoitza modu independentean zifratzen da; ondorioz, bloke arrunt berdinak beti bloke zifratu berdin bihurtzen dira. Horrek irudien edo datu-egituren patroiak guztiz ikusgai uzten ditu (Tux pinguinoaren adibide ospetsua)."
  },
  {
    "id": 8,
    "blokea": 2,
    "kategoria": "Kriptografia Simetrikoa",
    "galdera": "Zein ezaugarri nagusi ditu GCM (Galois/Counter Mode) funtzionamendu-moduak?",
    "aukerak": [
      "Bloke bakoitza aurrekoarekin CBC moduan kateatzen du eta prozesadore modernoetan ezin da hardware bidez azkartu.",
      "Gako berarekin behin eta berriz nonce bera berrerabiltzeko bereziki diseinatutako algoritmo segurua da.",
      "ECB modua baino askoz motelagoa da kalkuluetan, baina ez du inolako gako sekreturik ezta noncerik behar funtzionatzeko.",
      "AEAD modua da: konfidentzialtasuna eta osotasuna aldi berean eskaintzen ditu, eta hardwarean oso erraz paralelizatzen da."
    ],
    "zuzena": 3,
    "azalpena": "GCM AEAD (Authenticated Encryption with Associated Data) modu bat da: datuak zifratzeaz gain (CTR bidez), autentifikazio-etiketa bat sortzen du (GHASH bidez) manipulazioak hautemateko, eta errendimendu handikoa da hardware-azelerazioarekin."
  },
  {
    "id": 9,
    "blokea": 2,
    "kategoria": "Kriptografia Simetrikoa",
    "galdera": "Zein da gaur egun segurutzat jotzen den bloke-zifratze algoritmo estandarra?",
    "aukerak": [
      "AES (Advanced Encryption Standard, 128, 192 edo 256 biteko gako-luzerekin)",
      "DES (Data Encryption Standard, 56 biteko gako-luzera eraginkorrarekin)",
      "3DES (Triple DES, 112 biteko segurtasun-mailarekin eta 64 biteko blokeekin)",
      "RC4 (Ron's Code 4, SSL eta WEP sareetan historikoki erabilitako fluxu-zifratzea)"
    ],
    "zuzena": 0,
    "azalpena": "AES (Rijndael) da 2001etik mundu mailako estandar nagusia eta NISTek onartua. DES hautsita dago (56 bit) eta 3DES erretiratuta dago (Sweet32 erasoa bloke txikiengatik)."
  },
  {
    "id": 10,
    "blokea": 2,
    "kategoria": "Kriptografia Simetrikoa",
    "galdera": "Zenbat gako sekretu behar dira n pertsonek bikoteka zifratze simetriko bidez modu isolatuan komunikatzeko?",
    "aukerak": [
      "Guztira n gako nahikoa dira komunikazio guztiak zifratzeko.",
      "Guztira 2n gako behar dira alde bakoitzak pare bat izateko.",
      "Guztira n^2 gako behar dira matrize osoa estaltzeko.",
      "Guztira n(n - 1) / 2 gako sekretu desberdin behar dira bikoteka."
    ],
    "zuzena": 3,
    "azalpena": "Zifratze simetrikoan bikote bakoitzak gako berezi bat behar du. n pertsonarentzat konbinazioak n*(n-1)/2 dira (adib. 100 pertsonarentzat 4.950 gako!). Hori da gako-banaketaren arazo klasikoa, kriptografia asimetrikoak konpontzen duena (pertsona bakoitzeko gako-pare bakarra nahikoa da: 2n)."
  },
  {
    "id": 11,
    "blokea": 2,
    "kategoria": "Kriptografia Simetrikoa",
    "galdera": "Zer da ChaCha20-Poly1305 eta noiz gomendatzen da bere erabilera?",
    "aukerak": [
      "Bloke-zifratze zaharkitu bat da, soilik 64 biteko gakoak onartzen dituena eta OpenSSL-k gaitzetsia duena.",
      "Fluxu-zifratze moderno eta segurua da, hardware bidezko AES azeleraziorik ez duten gailuetan oso azkar dabilena.",
      "RSA ordezkatzeko diseinatutako gako publikoko algoritmo bat da, bereziki fitxategi oso handiak sinatzeko balio duena.",
      "Hash funtzio kriptografiko bat da, soilik pasahitzak datu-baseetan gatzarekin biltegiratzeko erabiltzen dena."
    ],
    "zuzena": 1,
    "azalpena": "ChaCha20 fluxu-zifratze bat da eta Poly1305 autentifikatzaile bat (AEAD bikotea). AES-NI instrukziorik ez duten prozesadoreetan (mugikor zaharretan edo IoT txipetan) AES baino 3-4 aldiz azkarragoa da eta oso segurua da."
  },
  {
    "id": 12,
    "blokea": 3,
    "kategoria": "Kriptografia Asimetrikoa",
    "galdera": "Alicek mezu konfidentzial bat bidali nahi dio Bobi zifratze asimetrikoa erabiliz. Zein gakorekin zifratu behar du mezua?",
    "aukerak": [
      "Aliceren gako pribatuarekin zifratu behar du mezua.",
      "Aliceren gako publikoarekin zifratu behar du mezua.",
      "Boben gako publikoarekin zifratu behar du mezua.",
      "Boben gako pribatuarekin zifratu behar du mezua."
    ],
    "zuzena": 2,
    "azalpena": "Konfidentzialtasunerako: mezua HARTZAILEAREN GAKO PUBLIKOAREKIN zifratzen da. Horrela, hartzaileak bakarrik (Bobek) deszifratu ahal izango du bere GAKO PRIBATU sekretuarekin."
  },
  {
    "id": 13,
    "blokea": 3,
    "kategoria": "Kriptografia Asimetrikoa",
    "galdera": "Zein problema matematikotan oinarritzen da RSA algoritmoaren segurtasuna?",
    "aukerak": [
      "Zenbaki lehen oso handien biderkadura faktorizatzeko dagoen zailtasun matematikoan.",
      "Kanal ez-seguruetan ausazko gako simetrikoak hedatzearen ezintasun fisikoan.",
      "Kurbetan puntu-biderkadura diskretua alderantzikatzearen konplexutasun konputazionalean.",
      "Hash funtzioetan talka kriptografikoak aurkitzearen ezintasun estatistikoan."
    ],
    "zuzena": 0,
    "azalpena": "RSA bi zenbaki lehen handi (p eta q) biderkatzean oinarritzen da (n = p * q). Biderketa egitea oso erraza da, baina n emanda p eta q faktorizatzea konputazionalki ezinezkoa da gakoa behar bezain luzea bada (adib. 2048 edo 4096 bit)."
  },
  {
    "id": 14,
    "blokea": 3,
    "kategoria": "Kriptografia Asimetrikoa",
    "galdera": "Zertarako balio du Diffie-Hellman (DH) protokoloak?",
    "aukerak": [
      "Pasahitzen hash-ak ortzadar-taulen bidez haustea ekiditeko gatz dinamikoak sortzeko.",
      "Dokumentu handiak formatu asimetrikoan azkar konprimitu eta diskoan seguru biltegiratzeko.",
      "Ziurtagiri digitalen baliogabetze-zerrendak (CRL) zerbitzari publikoetan seguru argitaratzeko.",
      "Kanal ez-seguru baten bidez bi alderdik gako simetriko sekretu partekatu bat adosteko."
    ],
    "zuzena": 3,
    "azalpena": "Diffie-Hellman-ek (1976) ahalbidetzen du bi pertsonak (Alice eta Bob) kanal publiko batetik elkarri datuak bidaliz sekretu partekatu berbera kalkulatzea, sareko entzule batek gako hori jakin gabe. Ez da erabiltzen mezuak zifratzeko, gakoak adosteko baizik."
  },
  {
    "id": 15,
    "blokea": 3,
    "kategoria": "Kriptografia Asimetrikoa",
    "galdera": "Zergatik da erakargarria Kurba Eliptikoen Kriptografia (ECC) mugikorretan eta IoT gailuetan?",
    "aukerak": [
      "Ez duelako inolako gako pribaturik behar kalkuluetan, gako publiko bakarra baizik.",
      "Segurtasun maila bererako gako askoz laburragoak behar dituelako, baliabide gutxiago kontsumituz.",
      "Ordenagailu kuantikoen bidezko Shor algoritmoaren erasoen aurrean matematikoki aldaezina delako.",
      "Fitxategi handiak zifratze simetrikoa (AES) baino askoz azkarrago zifratzeko gai delako beti."
    ],
    "zuzena": 1,
    "azalpena": "ECC-k gako askoz txikiagoekin ematen du segurtasun bera: ECC 256 bitek RSA 3072 biten pareko babesa ematen du. Horrek esan nahi du konputazio azkarragoa, bateria aurreztea, memoria gutxiago eta sarean datu gutxiago transmititzea."
  },
  {
    "id": 16,
    "blokea": 3,
    "kategoria": "Kriptografia Asimetrikoa",
    "galdera": "Zer da Zifratze Hibridoa eta zergatik erabiltzen du HTTPS protokoloak?",
    "aukerak": [
      "Kriptografia eta esteganografia aldi berean konbinatzeko metodo espezifiko bat da trafikoa ezkutatzeko.",
      "Bakarrik bi motatako sistema eragile desberdin konektatzean erabiltzen den protokolo berezi bat da.",
      "Kriptografia asimetrikoa erabiltzen du gako simetriko azkar bat adosteko, eta datuak simetrikoki zifratzen ditu.",
      "Zifratu gabeko datuak eta zifratutakoak txandaka bidaltzen dituen sistema da banda-zabalera aurrezteko."
    ],
    "zuzena": 2,
    "azalpena": "Kriptografia asimetrikoa oso motela da datu handiak zifratzeko. Horregatik, HTTPS-k (TLS) zifratze asimetrikoa (ECDHE) erabiltzen du bakarrik saio-gako simetriko bat seguru adosteko, eta ondoren konexioko mezu guztiak zifratze simetriko azkarrez (AES-GCM edo ChaCha20) babesten dira."
  },
  {
    "id": 17,
    "blokea": 4,
    "kategoria": "Hash Funtzioak",
    "galdera": "Zer da hash funtzio baten 'Elur-jausi efektua' (Avalanche Effect)?",
    "aukerak": [
      "Sarreran aldaketa minimo bat egitean (bit bakar bat), sortzen den hash-a erabat eta era ez-aurreikusgarrian aldatzea.",
      "Sarrera-datuen tamaina handitu ahala irteerako hash-aren karaktere kopurua esponentzialki haztea.",
      "Hainbat sarrera desberdinek elkarrekin talka egitea eta aldi berean hash emaitza berbera sortzea.",
      "Zerbitzaria gainkargatuta dagoenean hash-a kalkulatzeko behar den CPU denbora etengabe bikoiztea."
    ],
    "zuzena": 0,
    "azalpena": "Elur-jausi efektuak bermatzen du sarrerako testuan letra bakar bat edo espazio bat aldatzean, sortzen den hash digest-aren biten %50 inguru aldatzea modu pseudo-aleatorioan, erasotzaileak inolako erlaziorik ondorioztatu ez dezan."
  },
  {
    "id": 18,
    "blokea": 4,
    "kategoria": "Hash Funtzioak",
    "galdera": "Zein da MD5 eta SHA-1 hash funtzioen egoera gaur egun?",
    "aukerak": [
      "Guztiz seguruak dira oraindik eta banketxeetako HTTPS ziurtagiri berrietan erabiltzen dira egunero.",
      "MD5 hautsita dago guztiz, baina SHA-1 oraindik segurua da pasahitzak eta agiri ofizialak sinatzeko.",
      "SHA-256 baino gomendagarriagoak dira luzera txikiagoa dutenez CPU baliabide gutxiago behar dutelako.",
      "Kriptografikoki hautsita daude talka-erasoengatik; ez dira erabili behar inolaz ere segurtasun-arloan."
    ],
    "zuzena": 3,
    "azalpena": "MD5 (2004tik) eta SHA-1 (2017an CWI/Googlek SHAttered erasoaz erakutsia) hautsita daude: bi fitxategi desberdinek hash berbera izatea lortu da (talka erasoa). Gaur egun gutxienez SHA-256 (SHA-2 familia) edo SHA-3 erabili behar dira."
  },
  {
    "id": 19,
    "blokea": 4,
    "kategoria": "Hash Funtzioak",
    "galdera": "Zergatik da ezinbestekoa pasahitzei GATZA (Salt) gehitzea hash-a kalkulatu aurretik?",
    "aukerak": [
      "Pasahitza deszifratzea errazten duelako administratzaileak datu-baseko sarbidea galduko balu.",
      "Bi erabiltzailek pasahitz bera izan arren hash desberdina izatea lortzen duelako eta ortzadar-taulak baliogabetzen dituelako.",
      "Sortutako hash-aren luzera 512 bitera automatikoki handitzen duelako algoritmo motela erabiliz.",
      "Pasahitza aplikazioaren iturburu-kodean ezkutatzen duelako kanpoko erasotzaileek aurkitu ez dezaten."
    ],
    "zuzena": 1,
    "azalpena": "Gatzik gabe, '123456' pasahitza duten erabiltzaile guztiek hash bera izango lukete datu-basean, eta ortzadar-taulak (aldez aurretik kalkulatutako milioika hash) erabiliz berehala hautsiko lirateke. Gatz ausazko batekin (erabiltzaile bakoitzeko desberdina), pasahitz berdinak hash guztiz desberdinak sortzen ditu."
  },
  {
    "id": 20,
    "blokea": 4,
    "kategoria": "Hash Funtzioak",
    "galdera": "Pasahitzak modu seguruan gordetzeko, zein algoritmo mota gomendatzen du gaur egun OWASPek?",
    "aukerak": [
      "SHA-256 edo SHA-512 zuzenean gatzik gabe, GPU bidez kalkulatzeko oso azkarrak direlako.",
      "MD5 algoritmoa gatz finko batekin birritan aplikatuta aplikazio-zerbitzariaren konfigurazioan.",
      "KDF motelak eta kostu erregulagarrikoak: Argon2id (onena), bcrypt edo scrypt bezalakoak.",
      "AES-256 enkriptatzea ECB moduan pasahitzen taula osoa zifratuta mantentzeko zerbitzarian."
    ],
    "zuzena": 2,
    "azalpena": "SHA-256 oso azkarra da kalkulatzen (GPU batek milaka milioi segundoko proba ditzake: indar gordina erraza da). Pasahitzetarako KDF (Key Derivation Function) geldoak behar dira, CPU eta RAM memoria asko eskatzen dutenak (Argon2id gomendatua)."
  },
  {
    "id": 21,
    "blokea": 5,
    "kategoria": "Sinadura Digitala eta PKI",
    "galdera": "Nola sinatzen da dokumentu bat elektronikoki?",
    "aukerak": [
      "Dokumentuaren hash-a kalkulatuz eta hash hori egilearen gako PRIBATUAREKIN zifratuz.",
      "Dokumentuaren amaieran egilearen izen-abizenak eta uneko ordua gehituz formatu arruntean.",
      "Dokumentu osoa hartzailearen gako publikoarekin zifratuz eta Base64z kodetuz.",
      "Hartzailearen gako pribatuarekin fitxategiaren lehen 16 byteak enkriptatuz eta partekatuz."
    ],
    "zuzena": 0,
    "azalpena": "Sinatzeko: egileak dokumentuaren hash-a kalkulatzen du eta bere GAKO PRIBATUAREKIN zifratzen du (hori da sinadura). Egiaztatzeko: edonork egilearen GAKO PUBLIKOA erabil dezake sinadura deszifratzeko eta hash berbera lortzen den egiaztatzeko."
  },
  {
    "id": 22,
    "blokea": 5,
    "kategoria": "Sinadura Digitala eta PKI",
    "galdera": "Hurrengo propietateetatik, zein EZ DU bermatzen sinadura digital arrunt batek?",
    "aukerak": [
      "Osotasuna (dokumentua bidean ez dela manipulatu)",
      "Autentikotasuna (nork sinatu duen egiaztatzea)",
      "Ukatzerik eza (egileak ezin duela sinatu izana ukatu)",
      "Konfidentzialtasuna (edukia sekretuan mantentzea)"
    ],
    "zuzena": 3,
    "azalpena": "Sinadura digitalak osotasuna, autentikotasuna eta ukatzerik eza bermatzen ditu. Baina EZ du konfidentzialtasunik ematen: sinatutako dokumentua testu arruntean doa eta edonork irakur dezake. Konfidentzialtasuna nahi bada, dokumentua zifratu egin behar da gainera."
  },
  {
    "id": 23,
    "blokea": 5,
    "kategoria": "Sinadura Digitala eta PKI",
    "galdera": "Zer da X.509 ziurtagiri digital bat eta zein arazo konpontzen du?",
    "aukerak": [
      "Pasahitzak memorian biltegiratzeko formatu kriptografiko itxia da, baimenik gabeko sarbideak eragozten dituena.",
      "Identitate bat eta bere gako publikoa lotzen dituen agiri ofiziala da, CA konfiantzazko erakunde batek sinatua.",
      "Disko gogorreko partizioak manipulazioetatik babesteko hardware bidezko kontrolagailu berezi bat da.",
      "Sareko ataken gaineko indar gordin bidezko erasoak blokeatzen dituen suebaki-arau estandarizatu bat da."
    ],
    "zuzena": 1,
    "azalpena": "Gako publiko bat edonork sortu dezake 'Google' izenarekin (MitM erasoa). X.509 ziurtagiriak bermatzen du gako publiko hori benetan pertsona/enpresa horrena dela, Ziurtagiri Erakunde batek (CA) digitalki sinatu duelako."
  },
  {
    "id": 24,
    "blokea": 5,
    "kategoria": "Sinadura Digitala eta PKI",
    "galdera": "Zer da 'Forward Secrecy' (Secreto hacia adelante) TLS protokoloan?",
    "aukerak": [
      "Etorkizunean bidaliko diren mezu guztiak zerbitzari nagusiak aurretik irakurtzeko duen gaitasun administratiboa.",
      "Gako pribatua urtean behin automatikoki berritzen duen ziurtagiri-kudeaketako protokolo irekia.",
      "Saio bakoitzean Diffie-Hellman gako efimeroak erabiltzea, zerbitzariaren gakoa lapurtuta ere iraganeko trafikoa ez deszifratzeko.",
      "Ziurtagiri digitalak iraungi baino 30 egun lehenago sistema eragileari abisua bidaltzen dion mekanismoa."
    ],
    "zuzena": 2,
    "azalpena": "Forward Secrecy-rekin (PFS, TLS 1.3n derrigorrezkoa), saio bakoitzak gako efimero (aldi baterako) bakarrak sortzen ditu ECDHE bidez. Erasotzaile batek trafiko zifratua grabatuko balu eta urte batzuk geroago zerbitzariaren gako pribatua lapurtuko balu, EZIN ditu iraganeko saioak deszifratu."
  },
  {
    "id": 25,
    "blokea": 5,
    "kategoria": "Sinadura Digitala eta PKI",
    "galdera": "Espainiako eta Europako legerian (eIDAS erregelamendua), zein sinadura motak du eskuz idatzitako sinaduraren balio juridiko bera?",
    "aukerak": [
      "Sinadura elektroniko kalifikatuak (ziurtagiri kalifikatuarekin eta QSCD gailu seguruarekin egina, adib. DNIe).",
      "Sinadura elektroniko aurreratuak (dokumentuaren osotasuna bermatzen duena baina software arruntean egina).",
      "Sinadura elektroniko sinpleak (adibidez email bidezko onarpena edo botoi bat sakatzea webgune batean).",
      "Edozein PDF dokumenturi irudi eskaneatu bat txertatuz sortutako sinadura elektroniko digitalizatuak."
    ],
    "zuzena": 0,
    "azalpena": "eIDAS erregelamenduaren arabera, Sinadura Elektroniko Kalifikatuak (Firma Electrónica Cualificada) bakarrik du eskuzko sinaduraren parekotasun juridiko zuzena eta automatikoa. Horretarako ziurtagiri kalifikatu bat eta sinadura sortzeko gailu seguru bat (QSCD, adibidez DNIe txartela edo txartel kriptografikoa) behar dira."
  },
  {
    "id": 26,
    "blokea": 1,
    "kategoria": "Gakoen Kudeaketa",
    "galdera": "Zenbaki aleatorioak sortzeko gako kriptografikoetan, zergatik EZ da erabili behar rand() edo uneko ordua?",
    "aukerak": [
      "Funtzio horiek zenbaki bakoitiak bakarrik sortzen dituztelako eta horrek gako-espazioa murrizten duelako.",
      "Ez direlako kriptografikoki seguruak (aurreikusgarriak dira) eta erasotzaile batek gakoak asma ditzakeelako.",
      "Funtzio horiek exekutatzean CPUaren RAM memoria gehiegi kontsumitzen dutelako eta aplikazioa blokeatzen dutelako.",
      "Algoritmo horiek soilik fitxategi laburretarako balio dutelako eta ez 256 biteko gako handiak sortzeko."
    ],
    "zuzena": 1,
    "azalpena": "rand() edo time() funtzioak deterministak dira (sasi-aleatorio arruntak). Erasotzaile batek hazia (seed) edo ordua jakinez gero, gako berbera birsortuko du. CSPRNG (Cryptographically Secure Pseudo-Random Number Generator) erabili behar da beti (adibidez /dev/urandom edo libsodium)."
  },
  {
    "id": 27,
    "blokea": 1,
    "kategoria": "Gakoen Kudeaketa",
    "galdera": "Zer da 'Passphrase' bat eta zergatik da pasahitz labur bat baino hobea?",
    "aukerak": [
      "Karaktere berezirik ez duen zortzi digituko zenbaki multzo bat da, gogoratzeko erraza dena.",
      "Urtero nahitaez aldatu beharreko pasahitz administratibo bat da, iraungitze-data zorrotza duena.",
      "Ausazko hitz batzuek osatutako esaldi luzea da; gogoratzeko erraza da eta entropia handia eskaintzen du.",
      "Bakarrik Linux zerbitzarietan SSH gakoak zifratzeko onartzen den formatu mugatu bat da."
    ],
    "zuzena": 2,
    "azalpena": "Passphrase batek (adib. 'zaldia-berdea-mendi-gailurra') hitz luze eta ausazkoak erabiltzen ditu. Karaktereen kopurua handia denez entropia ikaragarria du (indar gordinaren aurka babesa) eta aldi berean gizakiarentzat askoz errazagoa da gogoratzeko."
  },
  {
    "id": 28,
    "blokea": 6,
    "kategoria": "Ahultasun Historikoak",
    "galdera": "Zer gertatu zen Heartbleed (CVE-2014-0160) ahultasunean?",
    "aukerak": [
      "RSA algoritmoaren oinarrizko faktorizazio matematikoa ebatzi zen denbora errekorrean superordenagailu bidez.",
      "AES zifratze-blokeen arteko CBC moduko gakoak indar gordin bidez hautsi ahal izan ziren hardware akats bategatik.",
      "OpenSSL-ren buffer over-read akats batengatik erasotzaileek zerbitzariaren RAM memoriako zatiak erauzten zituzten.",
      "TLS 1.3 protokoloaren sinadura digitalak ordezkatzeko aukera eman zuen eta CA erroko zerrenda faltsutu zen."
    ],
    "zuzena": 2,
    "azalpena": "OpenSSL-ren TLS Heartbeat luzapenean tamaina-egiaztapenik ez zegoenez (buffer over-read), erasotzaile batek zerbitzariaren RAMeko 64 KB eskatu zitzakeen behin eta berriz, gako pribatuak, saio-tokenak eta pasahitzak lortuz."
  },
  {
    "id": 29,
    "blokea": 6,
    "kategoria": "Praktika Onak",
    "galdera": "Zein da kriptografiaren 'Urrezko Araua' software garatzaileentzat?",
    "aukerak": [
      "Inoiz ez inplementatu zeure kriptografia; erabili probatutako liburutegi estandarrak (OpenSSL, libsodium).",
      "Algoritmo kriptografiko propioak sortzea sekretutasun maila handitzeko, inork haien barne-egitura ezagutu ez dezan.",
      "Erabili beti gako simetriko finkoak aplikazioaren konfigurazioan datu-basearen konexioak asko ez moteltzeko.",
      "Gako kriptografiko guztiak hilero behartuta aldatzea, nahiz eta sistemak gako-errotazio automatikorik ez eduki."
    ],
    "zuzena": 0,
    "azalpena": "'Don't roll your own crypto'. Kriptografia algoritmoak eta inplementazioak oso konplexuak dira (albo-kanaleko erasoak, timing erasoak...). Adituek aztertutako liburutegi estandarrak erabili behar dira beti."
  },
  {
    "id": 30,
    "blokea": 7,
    "kategoria": "Kriptografia Klasikoa",
    "galdera": "Zergatik hautsi daitezke kriptografia klasikoko sistemak (Zesar, Vigenère) berehala gaur egun?",
    "aukerak": [
      "Ez zutelako inolako gako publikorik sortzen eta bi pertsonen arteko komunikazioak baimenik gabe entzuten zirelako.",
      "Soilik letra larriekin funtzionatzen dutelako eta testu zifratuan zuriuneak eta puntuazio-markak ezabatzen dituztelako.",
      "Sistema eragile modernoek biraketa modularrak egiteko hardware-azelerazio berezia dutelako nukleoan.",
      "Gako-espazioa oso txikia delako eta jatorrizko hizkuntzaren maiztasun-estatistikak agerian uzten dituztelako."
    ],
    "zuzena": 3,
    "azalpena": "Zesar-ek 25 gako posible bakarrik ditu (indar gordinez segundo-zati batean hausten da). Vigenère-k, ordezkatze polialfabetikoa izan arren, Kasiski analisia eta maiztasun-analisia erabiliz erraz hausten da."
  },
  {
    "id": 31,
    "blokea": 7,
    "kategoria": "Biltegiratze Segurua",
    "galdera": "Disko-zifratzeak (BitLocker, LUKS) babesten al ditu datuak ordenagailua piztuta eta desblokeatuta dagoenean malware baten aurrean?",
    "aukerak": [
      "Bai, fitxategi bakoitza irekitzeko unean sistemak administratzailearen pasahitza eskatzen duelako nahitaez.",
      "Ez, disko-zifratzeak datuak atsedenean babesten ditu; sistema piztuta dagoenean automatikoki deszifratuta daude.",
      "Bai, BitLocker eta LUKS sistemek TPM txiparen bidez malware eta ransomware prozesu guztiak blokeatzen dituztelako.",
      "Bakarrik babesten ditu fitxategiak beste sare-unitate batera edo USB memoria batera kopiatzen diren unean."
    ],
    "zuzena": 1,
    "azalpena": "FDE (Full Disk Encryption) sistemek 'data at rest' (datuak atsedenean) babesten dute ekipoa itzalita badago (adib. eramangarria lapurtzen badute). Sistema piztuta eta desblokeatuta dagoenean, OSak automatikoki deszifratzen ditu datuak RAMean, eta edozein malwarek irakur ditzake."
  },
  {
    "id": 32,
    "blokea": 7,
    "kategoria": "Teknologia Berriak",
    "galdera": "Blockchain teknologian, datuak zifratuta al doaz?",
    "aukerak": [
      "Ez, bloke-katean transakzioak PUBLIKOAK dira; kriptografiak osotasuna eta autentikotasuna ematen ditu, ez konfidentzialtasuna.",
      "Bakarrik bankuen arteko transakzioak zifratzen dira, eta partikularren arteko transakzioak irekian uzten dira.",
      "Bai, bloke barruko transakzio guztiak AES-256 bidez ezkutatzen dira meatzarien gako pribatuak erabiliz.",
      "Transakzioen helbideak RSA gako publikoaren bidez ezkutatzen dira, baina bidalitako diru kopurua argi ageri da."
    ],
    "zuzena": 0,
    "azalpena": "Blockchain publikoetan (Bitcoin, Ethereum) datuak EZ daude zifratuta; edonork ikus ditzake transakzioak. Kriptografia HASH bidezko katea osatzeko (osotasuna) eta SINADURA DIGITAL bidez jabetza frogatzeko (autentikotasuna) erabiltzen da."
  },
  {
    "id": 33,
    "blokea": 7,
    "kategoria": "Kriptografia Poskuantikoa",
    "galdera": "Zer eragin izango luke konputazio kuantikoak eta Shor algoritmoak gaur egungo kriptografian?",
    "aukerak": [
      "Ez luke inolako eragin aipagarririk izango kriptografian, bakarrik simulazio fisikoetan erabiliko litzatekeelako.",
      "AES-256 algoritmo simetrikoa segundo gutxitan hautsiko luke erabat, gako-espazio osoa hutsera murriztuz.",
      "Kriptografia asimetrikoa (RSA, Diffie-Hellman, ECC) hautsiko luke, faktorizazioa eta logaritmo diskretua azkar ebatziz.",
      "Hash funtzio guztiak guztiz ezgaituko lituzke eta SHA-256 bidezko sinadura digital guztiak baliogabetuko lituzke."
    ],
    "zuzena": 2,
    "azalpena": "Shor-en algoritmo kuantikoak denbora polinomikoan ebazten ditu zenbaki lehenen faktorizazioa eta logaritmo diskretua; beraz, RSA, DH eta ECC guztiz hautsiko lituzke. Zifratze simetrikoan (AES), aldiz, Grover-en algoritmoak gako-tamaina erdira jaisten du (AES-256k 128 biteko segurtasuna mantentzen du oraindik)."
  },
  {
    "id": 34,
    "blokea": 1,
    "kategoria": "Oinarrizko Kontzeptuak",
    "galdera": "Zer da 'Kriptoanalisia' zibersegurtasunaren testuinguruan?",
    "aukerak": [
      "Kriptomoneten finantza-mugimenduak eta merkatuetako joerak adimen artifizial bidez aztertzeko arloa.",
      "Gako asimetriko publikoak sortzeko eta CA erroko erakundeen artean banatzeko prozesu administratiboa.",
      "Testu fitxategiak Base64 formatu bitarrera bihurtzeko eta sarean zehar transmititzeko metodoa.",
      "Sistema kriptografikoak ebaluatu eta gakoa jakin gabe hausteko edo haien ahultasunak aztertzeko zientzia eta teknika."
    ],
    "zuzena": 3,
    "azalpena": "Kriptologia bi adarretan banatzen da: Kriptografia (mezuak babesteko sistemak sortzea) eta Kriptoanalisia (sistema horiek hausteko, aztertzeko edo ahultzeko teknikak)."
  },
  {
    "id": 35,
    "blokea": 2,
    "kategoria": "Kriptografia Simetrikoa",
    "galdera": "Zertarako erabiltzen da Hasieratze Bektorea (IV - Initialization Vector) CBC moduan?",
    "aukerak": [
      "Pasahitz nagusia zerbitzari urrunera modu seguruan bidaltzeko eta erabiltzailearen saioa autentifikatzeko.",
      "Gako bera eta mezu bera erabilita ere testu zifratu desberdina lortzeko eta lehen blokearen patroiak ezkutatzeko.",
      "Artxibo handien tamaina algoritmo matematikoen bidez erdira murrizteko eta transmisioa azkartzeko.",
      "Zifratze asimetrikoko gako publikoak zifratze simetrikoko gako bihurtzeko prozesua automatizatzeko."
    ],
    "zuzena": 1,
    "azalpena": "CBC moduan, lehen bloke arruntari IV-a aplikatzen zaio XOR bidez zifratu aurretik. IV-a ausazkoa izan behar da mezu bakoitzean; horrela, mezu bera birritan zifratuta ere zifratua guztiz desberdina izango da."
  },
  {
    "id": 36,
    "blokea": 4,
    "kategoria": "Hash Funtzioak",
    "galdera": "Zer da hash baten 'Aurreirudiaren aurkako erresistentzia' (Preimage resistance)?",
    "aukerak": [
      "Hash balio bat emanda, jatorrizko mezua atzeraka aurkitzea konputazionalki ezinezkoa izatearen propietatea.",
      "Mezu jakin bat emanda, hash bera sortuko duen beste bigarren mezu alternatibo bat aurkitzeko ezintasuna.",
      "Edozein bi mezuk, ausaz aukeratuta ere, inoiz hash bera ez sortzeko berme matematiko absolutua.",
      "Sarrerako datuen luzera edozein dela ere, irteerako hash-ak beti 256 biteko luzera finkoa mantentzea."
    ],
    "zuzena": 0,
    "azalpena": "Preimage resistance (noranzko bakarreko propietatea): h = Hash(m) jakinda, ezinezkoa izan behar da m mezua kalkulatzea. Bigarren aurreirudiaren erresistentzia (Second preimage resistance), berriz, m1 jakinda Hash(m1) = Hash(m2) betetzen duen m2 aurkitzeko zailtasuna da."
  },
  {
    "id": 37,
    "blokea": 5,
    "kategoria": "Sinadura Digitala eta PKI",
    "galdera": "Nola jakin dezake sistema batek ziurtagiri digital bat baliogabetu (revoked) dela iraungitze-data baino lehen?",
    "aukerak": [
      "Ezin da inolaz ere jakin ziurtagiriaren baliozkotasun-epea guztiz amaitu arte eta zerbitzariak uko egin arte.",
      "Gako publikoa birkalkulatuz eta zerbitzariaren IP helbidearekin bat datorren egiaztatuz DNS bidez.",
      "CRL zerrendak kontsultatuz edo OCSP protokoloaren bidez CA erakundeari egoera zuzenean galdetuz.",
      "Fitxategiaren hash-a kalkulatu eta fitxategi-tamaina hasierako byteekin konparatuz sistema lokalean."
    ],
    "zuzena": 2,
    "azalpena": "Ziurtagiri bat gakoa lapurtu delako baliogabetu daiteke. Sistemek bi bide dituzte egiaztatzeko: CRL (Certificate Revocation List, baliogabetutako ziurtagirien zerrenda deskargatzea) edo OCSP (Online Certificate Status Protocol, CAri denbora errealean galdetzea)."
  },
  {
    "id": 38,
    "blokea": 6,
    "kategoria": "Gakoen Kudeaketa",
    "galdera": "Non gorde behar dira gako pribatu kritikoak segurtasun gorena bermatzeko?",
    "aukerak": [
      "Aplikazioaren GitHub biltegi pribatuan enkriptatuta, garatzaile guztiek eskuragarri izan dezaten.",
      "Aplikazioaren iturburu-kodeko aldagai estatiko batean Base64z kodetuta eta bertsio-kontrolean gordeta.",
      "Zerbitzariko fitxategi-sistema nagusiko /etc/keys direktorioan baimen irekiekin biltegiratuta.",
      "HSM hardware kriptografiko seguru batean edo hodeiko KMS zerbitzu administratu batean."
    ],
    "zuzena": 3,
    "azalpena": "Gako pribatu kritikoak (CA gakoak, ordainketa-sistemen gakoak) HSM (Hardware Security Module) txipetan gorde behar dira. HSMak bermatzen du gakoa sekula ez dela txipetik ateratzen: eragiketa kriptografikoak txip barruan egiten dira eta manipulazio fisikoaren aurka babestuta daude."
  },
  {
    "id": 39,
    "blokea": 4,
    "kategoria": "Hash Funtzioak",
    "galdera": "Zer da 'Pimienta' (Pepper) pasahitzen kudeaketan?",
    "aukerak": [
      "Erabiltzaileak bere borondatez hautatzen duen bigarren pasahitz osagarria autentifikazio bikoitzean.",
      "Aplikazio mailako gako sekretua, datu-basean gorde gabe konfigurazioan edo HSM batean gordetzen dena.",
      "Pasahitz bakoitzari erabiltzaileak berak ausaz gehitzen dion karaktere berezien sekuentzia finkoa.",
      "Bcrypt algoritmoaren barnean iterazio kopurua kalkulatzeko erabiltzen den faktore matematiko finkoa."
    ],
    "zuzena": 1,
    "azalpena": "Gatza (Salt) erabiltzaile bakoitzeko desberdina da eta datu-basean gordetzen da hash-arekin batera. Piperra (Pepper), ordea, aplikazio osoarentzat sekretu orokor bat da eta datu-basetik KANPO gordetzen da (adib. zerbitzariaren konfigurazioan edo HSMn). Datu-basea filtratuko balitz ere, piperrik gabe ezin dira hash-ak egiaztatu."
  },
  {
    "id": 40,
    "blokea": 2,
    "kategoria": "Kriptografia Simetrikoa",
    "galdera": "OpenSSL-n `openssl enc -d -aes-256-cbc ...` gako okerra ematean `bad decrypt` errorea agertzen da. Zergatik daki OpenSSL-k okerra dela?",
    "aukerak": [
      "Deszifratutako azken blokeko PKCS#7 padding betegarri-byteak ez datozelako bat arauarekin.",
      "OpenSSL-k pasahitz guztien kontrol-zerrenda zentral bat egiaztatzen duelako deszifratu aurretik.",
      "Sartutako pasahitzaren luzera ez delako zehatz-mehatz 256 bitekoa eta formatu-errorea ematen duelako.",
      "Zifratutako fitxategiak fitxategi-goiburuan jatorrizko gakoaren hash-a gordetzen duelako beti."
    ],
    "zuzena": 0,
    "azalpena": "AES-CBC-k PKCS#7 padding erabiltzen du azken blokea 16 bytekoa izan dadin (adib. 3 byte falta badira, 0x03 0x03 0x03 gehitzen da). Gako oker batekin deszifratzean, azken blokeak balio ausazkoak emango ditu eta padding-a ez da baliozkoa izango; horregatik ematen du 'bad decrypt' errorea."
  },
  {
    "id": 41,
    "blokea": 5,
    "kategoria": "Segurtasun Protokoloak",
    "galdera": "Zer gertatzen da TLS 1.3 konexio baten hasieran (Handshake)?",
    "aukerak": [
      "Bezeroak eta zerbitzariak pasahitz partekatu estatiko bat bidaltzen diote elkarri testu arruntean.",
      "Zerbitzariak bezeroaren disko gogor osoa urrunetik zifratzen du datuak transmititu aurretik.",
      "Bezeroak eta zerbitzariak ECDHE gako efimeroak trukatzen dituzte, eta zerbitzaria ziurtagiri bidez autentifikatzen da.",
      "Bezeroak CA erroko ziurtagiri berri bat deskargatzen du Interneteko biltegi zentral ireki batetik."
    ],
    "zuzena": 2,
    "azalpena": "TLS 1.3-k 1-RTT (bidaia bakar bat) erabiltzen du: bezeroak bere gako-partekatze efimeroa bidaltzen du lehen mezuan, zerbitzariak berearekin erantzuten du (Diffie-Hellman kalkulatzen da), bere ziurtagiria bidaltzen du eta komunikazioa zifratuta geratzen da berehala."
  },
  {
    "id": 42,
    "blokea": 4,
    "kategoria": "Hash Funtzioak",
    "galdera": "Zergatik gertatzen da talka-erasoa (collision attack) 2^(n/2) eragiketetan eta ez 2^n eragiketetan?",
    "aukerak": [
      "Prozesadoreen hardware akats baten ondorioz kalkulu matematikoak automatikoki laburtzen direlako.",
      "Gako asimetrikoen luzera simetrikoen bikoitza denez eraso-denbora erdia behar delako teorian.",
      "Hash funtzioek zenbaki lehen bikoitiak bakarrik erabiltzen dituztelako digestioa sortzeko orduan.",
      "Urtebetetzearen Paradoxagatik: edozein bi mezuk hash bera izatea askoz probableagoa delako mezu jakin bat bilatzea baino."
    ],
    "zuzena": 3,
    "azalpena": "Urtebetetzearen paradoxa: 23 laguneko gela batean, %50eko probabilitatea dago bikotek urtebetetze bera izateko (nahiz eta urteak 365 egun izan). Hash batean, EDOZEIN bi fitxategik hash bera izatea 2^(n/2) saiakeretan aurkitzen da; horregatik SHA-256k 128 biteko segurtasuna ematen du talken aurka."
  },
  {
    "id": 43,
    "blokea": 6,
    "kategoria": "Gakoen Kudeaketa",
    "galdera": "Nola kalkulatzen da pasahitz edo passphrase baten entropia teoriko maximoa bitetan?",
    "aukerak": [
      "Entropia kalkulatzeko formulak karaktereen luzera bider bi egiten du beti: E = L * 2.",
      "Entropia kalkulatzeko formula E = L * log2(N) da, non L luzera den eta N sinbolo/hitz multzoa.",
      "Entropia kalkulatzeko gakoaren bit kopurua zortzirekin zatitu behar da: E = Bitak / 8.",
      "Entropia kalkulatzeko hiztegiko hitzen kopuru osoari 256 biteko gatz finkoa gehitzen zaio."
    ],
    "zuzena": 1,
    "azalpena": "Entropia (Shannon) bitetan: E = L * log2(N). Adibidez: 12 karaktere letra larriz, xehez eta zenbakiz osatuta (N=62): 12 * log2(62) ≈ 71.4 bit entropia. Diceware bidez 5 hitz (N=7776): 5 * log2(7776) ≈ 64.6 bit entropia."
  },
  {
    "id": 44,
    "blokea": 7,
    "kategoria": "Kriptografia Poskuantikoa",
    "galdera": "NIST-ek 2024an argitaratutako Kriptografia Poskuantikoaren estandarretan, zein da gako-adostasunerako aukeratutako algoritmoa?",
    "aukerak": [
      "FIPS 203: ML-KEM algoritmoa, sare-egituretan oinarritutako CRYSTALS-Kyber barneratzen duena.",
      "FIPS 204: ML-DSA algoritmoa, sare-kriptografian oinarritutako CRYSTALS-Dilithium barneratzen duena.",
      "RSA-4096 algoritmo indartua, gako-luzera erraldoia erabiliz konputazio kuantikoa gainditzen duena.",
      "AES-GCM-512 protokoloa, blokeen tamaina handituz ordenagailu kuantikoen aurrean babesten duena."
    ],
    "zuzena": 0,
    "azalpena": "2024ko abuztuan NISTek lehen hiru estandar poskuantikoak (PQC) ofizialdu zituen: FIPS 203 da ML-KEM (lehen CRYSTALS-Kyber), sare-kriptografian (lattices) oinarritua, Diffie-Hellman eta RSA gako-trukea ordezkatzeko."
  },
  {
    "id": 45,
    "blokea": 7,
    "kategoria": "Kriptografia Poskuantikoa",
    "galdera": "Zein da NISTen FIPS 204 sinadura digital poskuantikoaren estandar nagusia?",
    "aukerak": [
      "SLH-DSA estandar osagarria, hash zuhaitzetan (SPHINCS+) oinarritutako egitura duena.",
      "ECDSA secp256k1 algoritmoa, Bitcoin eta Ethereum sareetan erabiltzen den kurba eliptikoa.",
      "ML-DSA sinadura-eskema modernoa, CRYSTALS-Dilithium algoritmoan oinarrituta dagoena.",
      "ChaCha20 algoritmoa Poly1305 autentifikazioarekin konbinatuta fluxu-zifratze bidez."
    ],
    "zuzena": 2,
    "azalpena": "FIPS 204 da ML-DSA (Module-Lattice-Based Digital Signature Algorithm, lehen CRYSTALS-Dilithium), RSA eta ECDSA sinadurak ordezkatzeko estandar nagusia konputazio kuantikoaren garaian."
  },
  {
    "id": 46,
    "blokea": 1,
    "kategoria": "Oinarrizko Kontzeptuak",
    "galdera": "Zer desberdintasun dago testu arruntaren (plaintext) eta testu zifratuaren (ciphertext) artean?",
    "aukerak": [
      "Testu arrunta fitxategi testuala da soilik, eta testu zifratua bideo edo audio fitxategia da beti.",
      "Testu arrunta publikoki partekatzen da sarean, eta testu zifratua ezin da sekula deszifratu.",
      "Testu arrunta Base64 bidez kodetuta dago beti, eta testu zifratua ASCII karaktereetan soilik doa.",
      "Testu arrunta informazio ulergarria da; testu zifratua gako bidez ausazkoa dirudien emaitza da."
    ],
    "zuzena": 3,
    "azalpena": "Plaintext jatorrizko mezua edo datua da (edozein formatutan). Ciphertext enkriptazio algoritmoa eta gakoa aplikatu ondoren lortzen den datu ulertezina da, gako egokia izan ezean deszifratu ezin dena."
  },
  {
    "id": 47,
    "blokea": 2,
    "kategoria": "Kriptografia Simetrikoa",
    "galdera": "Zergatik erretiratu zuen NIST-ek 3DES (Triple DES) 2023tik aurrera?",
    "aukerak": [
      "Gakoaren tamaina laburregia zelako (24 bit) eta indar gordin bidez berehala hausten zelako.",
      "Bloke-tamaina 64 bitekoa delako eta Sweet32 erasoaren aurrean zaurgarria delako datu handietan.",
      "Soilik ordenagailu zaharretan exekutatu daitekeelako eta prozesadore berriek blokeatzen dutelako.",
      "Ez zuelako inolako gako sekreturik onartzen eta algoritmoak publikoki zabaltzen zituelako datuak."
    ],
    "zuzena": 1,
    "azalpena": "3DESek 112 biteko segurtasun eraginkorra du (Sweet32 erasoa bloke-tamainaren araberakoa da: 64 biteko blokeekin 2^32 bloke zifratu ondoren talkak gertatzen dira urtebetetzearen paradoxagatik). Horregatik AES (128 biteko blokeak) erabiltzea derrigorrezkoa da."
  },
  {
    "id": 48,
    "blokea": 4,
    "kategoria": "Hash Funtzioak",
    "galdera": "Zer abantaila nagusi du SHA-3 algoritmoak SHA-2rekiko?",
    "aukerak": [
      "Belaki-egituran (sponge / Keccak) oinarritzen da, diseinu erabat desberdineko ordezko segurua eskainiz.",
      "SHA-3k fitxategiak automatikoki deszifratzen dituela gako pribaturik gabe pasahitza eskatuz.",
      "SHA-2 erabat hautsita dagoela matematikoki eta SHA-3k ez duela inolako talkarik onartzen.",
      "SHA-3k pasahitz guztiak gatzik gabe eta algoritmo geldoak erabili gabe babesten dituela beti."
    ],
    "zuzena": 0,
    "azalpena": "SHA-2 oso segurua da oraindik, baina Merkle-Damgård egituran oinarritzen da (MD5 eta SHA-1 bezala). SHA-3 (Keccak) belaki-egituran (sponge construction) oinarritzen da; etorkizunean SHA-2 ahulduko balitz, SHA-3k diseinu guztiz desberdina duen alternatiba sendoa bermatzen du."
  },
  {
    "id": 49,
    "blokea": 5,
    "kategoria": "Sinadura Digitala eta PKI",
    "galdera": "DNI elektronikoak (DNIe) bi ziurtagiri ditu bere txip barruan babestuta. Zeintzuk dira?",
    "aukerak": [
      "Bata diskoa zifratzeko eta bestea tokiko Wi-Fi sarera segurtasunez konektatzeko erabiltzen da.",
      "Bata gako publikoetarako soilik eta bestea pasahitzak zerbitzarietan gordetzeko erreserbatua.",
      "Bata AUTENTIFIKAZIORAKO (nortasuna frogatzeko) eta bestea SINADURA DIGITALERAKO (lege-agirietarako).",
      "Bata Windows sistema eragilearentzat eta bestea Linux zein Android gailu mugikorrentzat."
    ],
    "zuzena": 2,
    "azalpena": "DNIe txartelak bi ziurtagiri ditu: 1) Autentifikazio ziurtagiria (nor zaren frogatzeko zerbitzari baten aurrean) eta 2) Sinadura digital kualifikatua (agiriak eskuz idatzitako sinaduraren balio juridiko berarekin sinatzeko)."
  },
  {
    "id": 50,
    "blokea": 6,
    "kategoria": "Segurtasun Protokoloak",
    "galdera": "Zer da Man-in-the-Middle (MitM) erasoa eta nola babesten du TLSk bere aurka?",
    "aukerak": [
      "Zerbitzaria sareko gainkarga bidez itzaltzeko erasoa da, eta suebaki aurreratu batek babesten du.",
      "Ekipoaren disko gogorra fisikoki lapurtzea da, eta BitLocker zifratze bidez saihesten da.",
      "Pasahitzak hiztegi bidez asmatzeko teknika automatikoa da, eta CAPTCHA bidez kontrolatzen da.",
      "Erasotzailea bi aldeen artean jartzen da trafikoa irakurtzeko; TLSk CA ziurtagiri bidez babesten du."
    ],
    "zuzena": 3,
    "azalpena": "MitM erasoan erasotzaileak komunikazioa eteten du eta bi aldeen artean jartzen da haien mezuak ikusteko edo manipulatzeko. TLSk zerbitzariaren X.509 ziurtagiria egiaztatzen du (CA fidagarri batek sinatua); erasotzaileak ezin duenez baliozko ziurtagirik sortu domeinu horrentzat, nabigatzaileak konexioa mozten du."
  },
  {
    "id": 51,
    "blokea": 1,
    "kategoria": "Oinarrizko Kontzeptuak",
    "galdera": "Zergatik da akats larria pasahitzak edo tokenak Base64 formatuan gordetzea?",
    "aukerak": [
      "Base64k karaktere kopurua bikoizten duelako eta diskoan leku gehiegi okupatzen duelako.",
      "Base64 kodetzea denez eta ez zifratzea, edonork des-kodetu dezakeelako gakorik gabe berehala.",
      "Datu-base erlazionalek ezin dituztelako Base64 eremuko karaktereak indexatu modu efizientean.",
      "Base64 kodea automatikoki ezabatzen delako zerbitzari nagusiaren sistema berrabiaraztean."
    ],
    "zuzena": 1,
    "azalpena": "Base64 ez da zifratzea, kodetze eskema publiko bat baizik. Gakorik ez duenez, erasotzaile batek datuak ikustean 'base64 -d' egitea nahikoa du jatorrizko testua irakurtzeko."
  },
  {
    "id": 52,
    "blokea": 2,
    "kategoria": "Kriptografia Simetrikoa",
    "galdera": "Zer da AES-NI instrukzio multzoa?",
    "aukerak": [
      "CPU modernoetan integratutako instrukzioak, AES zifratzea hardware bidez ikaragarri azkartzen dutenak.",
      "AES algoritmoaren bertsio zaharkitua, 64 biteko gakoekin soilik funtzionatzen duena sisteman.",
      "Gako simetrikoen luzera 512 bitera automatikoki zabaltzeko diseinatutako protokolo berria.",
      "Txartel adimendunetan gako pribatuak biltegiratzeko erabiltzen den fitxategi-egitura berezia."
    ],
    "zuzena": 0,
    "azalpena": "AES-NI (Intel/AMD) hardware bidezko instrukzio multzo bat da: AES eragiketa matematikoak (SubBytes, ShiftRows, MixColumns) prozesadorean zuzenean exekutatzen ditu, zifratzea oso azkar bihurtuz eta aldi berean cache-timing albo-kanaleko erasoak saihestuz."
  },
  {
    "id": 53,
    "blokea": 3,
    "kategoria": "Kriptografia Asimetrikoa",
    "galdera": "Gako asimetrikoetan, gako pribatua gako publikotik ondorioztatu al daiteke?",
    "aukerak": [
      "Bai, formula matematiko bera alderantzikatuz segundotan lor daiteke edozein ordenagailutan.",
      "Bai, jatorrizko mezuaren luzera eta algoritmoaren ziklo-zenbakia aldez aurretik ezagutzen badira.",
      "Ez, matematikoki konputazio-kostu erraldoia eskatzen duelako noranzko bakarreko tranpa-ateagatik.",
      "Bakarrik 4096 biteko gakoetan lor daiteke, tamaina handiak biraketa modularrak errazten dituelako."
    ],
    "zuzena": 2,
    "azalpena": "Kriptografia asimetrikoa noranzko bakarreko funtzioetan oinarritzen da (faktorizazioa, logaritmo diskretua). Publikotik pribatua ateratzea unibertsoaren adina baino denbora gehiago kostatuko litzateke gaur egungo superordenagailuekin."
  },
  {
    "id": 54,
    "blokea": 4,
    "kategoria": "Hash Funtzioak",
    "galdera": "Zertarako erabiltzen du Git bertsio-kontrol sistemak hash funtzioa?",
    "aukerak": [
      "Fitxategiak diskoan zifratuta mantentzeko eta garatzaile baimenduek bakarrik irakur ditzaten.",
      "Commit bakoitza, fitxategiak eta zuhaitza SHA hash bidez identifikatuz osotasuna bermatzeko.",
      "Garatzaileen pasahitzak eta baimen-tokenak zerbitzari urrunean seguru biltegiratzeko.",
      "Sareko abiadura azkartzeko eta datuak biltegiratzean automatikoki konprimitzeko soilik."
    ],
    "zuzena": 1,
    "azalpena": "Git-ek Merkle zuhaitz bat erabiltzen du: commit, zuhaitz eta fitxategi (blob) bakoitzak bere SHA-1 (edo SHA-256 berrietan) hash identifikatzailea du. Komaren bat aldatuz gero hash-a aldatzen da; horrela bermatzen da proiektuaren historia osoaren osotasuna eta manipulazio-eza."
  },
  {
    "id": 55,
    "blokea": 5,
    "kategoria": "Segurtasun Protokoloak",
    "galdera": "Zer gertatzen da nabigatzaile batean webgune baten TLS ziurtagiria iraungita (caducado) badago?",
    "aukerak": [
      "Nabigatzaileak segurtasun-abisu gorria erakusten du konfiantza galdu delako, datuak arriskuan egon daitezkeela ohartaraziz.",
      "Nabigatzaileak automatikoki berritzen du ziurtagiria Let's Encrypt zerbitzariaren bidez erabiltzaileari galdetu gabe.",
      "Konexioa zifratu gabeko HTTP arruntera pasatzen da automatikoki erabiltzailearen nabigatzailean inolako mezurik eman gabe.",
      "Sistema eragileak sareko txartela guztiz desgaitzen du segurtasun neurri gisa eta ordenagailua berrabiarazten du."
    ],
    "zuzena": 0,
    "azalpena": "Ziurtagiri baten epea bukatzean, CAren baliozkotze-katea hausten da. Nabigatzaileek 'Zure konexioa ez da pribatua' abisu larria erakusten dute, balitekeelako domeinua berritu ez izana edo erasotzaile batek kontrolatzea."
  },
  {
    "id": 56,
    "blokea": 6,
    "kategoria": "Biltegiratze Segurua",
    "galdera": "Zer da 'Crypto-erase' edo suntsitze kriptografikoa?",
    "aukerak": [
      "Disko gogor osoa hardware bidez desmagnetizatzea eta sektore guztiak zerotan jartzea behin eta berriz.",
      "RAM memoriako datuak zeroz gainidaztea ordenagailua piztuta mantentzen den bitartean kontrolik gabe.",
      "Sistema eragilearen BIOS konfigurazioa berrezartzea eta firmwareko segurtasun-gakoak berritzea.",
      "Zifratutako datuak deszifratzeko gako bakarra behin betiko ezabatzea, datuak berreskuraezin bihurtuz."
    ],
    "zuzena": 3,
    "azalpena": "Crypto-shredding edo Crypto-erase: datu-bolumen handiak fisikoki ezabatu beharrean (ordak behar lituzkeena), datuak zifratzen dituen gako nagusia (MEK/DEK) ezabatzen da. Gakorik gabe, diskoan dauden terabyteak zabor kriptografiko ulertezin bihurtzen dira berehala."
  },
  {
    "id": 57,
    "blokea": 7,
    "kategoria": "Kriptografia Poskuantikoa",
    "galdera": "Zer da 'Harvest now, decrypt later' (Bildu orain, deszifratu geroago) mehatxua?",
    "aukerak": [
      "Estatuko nekazaritza-datu publikoak hacker-taldeek baimenik gabe biltzea eta datu-baseetan gordetzea.",
      "Gaur egungo trafiko zifratua gordetzea, etorkizuneko ordenagailu kuantikoekin atzeraeraginez deszifratzeko.",
      "Pasahitz zaharrak beste zerbitzu batzuetan errepikatuz kontu pertsonaletan indar gordin bidez sartzea.",
      "Argon2id funtzioa erabiliz pasahitzen milioika hash aldez aurretik kalkulatzea eta biltegiratzea."
    ],
    "zuzena": 1,
    "azalpena": "Gobernu eta inteligentzia agentziek (eta zibergaizkileek) gaur egun zifratuta doan trafiko estrategikoa (gobernu-mezuak, banku-transakzioak, osasun-datuak) grabatzen dute. 10-15 urte barru ordenagailu kuantiko batek RSA/ECC haustean, grabatutako guztia deszifratuko dute."
  },
  {
    "id": 58,
    "blokea": 3,
    "kategoria": "Kriptografia Asimetrikoa",
    "galdera": "Zergatik da 'gako pribatuarekin zifratu' esamoldea teknikoki zehaztugabea sinadura digitalean?",
    "aukerak": [
      "Gako pribatuak matematikoki ezin duelako inolako eragiketa kriptografikorik egin testu arruntekin.",
      "Sinadura digitala sortzean beti gako simetrikoak erabiltzen direlako dokumentuaren hash-a kalkulatzeko.",
      "Gako pribatuarekin egindako eragiketak ez duelako sekretutasunik ematen, edonork deszifratu baitezake publikoarekin.",
      "Gako publikoa ezkutuan mantentzen delako eta gako pribatua zerbitzari publikoetan argitaratzen delako."
    ],
    "zuzena": 2,
    "azalpena": "Kriptografian 'zifratu' hitzak konfidentzialtasuna lortzea esan nahi du (edukia ezkutatzea). Gako pribatuarekin eragiketa egitean (sinatzea), edonork deszifratu dezake gako publikoarekin; beraz ez dago sekreturik. Matematikoki antzekoa izan arren, helburua autentikotasuna eta osotasuna frogatzea da, ez ezkutatzea."
  },
  {
    "id": 59,
    "blokea": 6,
    "kategoria": "Kriptoanalisia",
    "galdera": "Zer dira Ortzadar-Taulak (Rainbow Tables)?",
    "aukerak": [
      "Aldez aurretik kalkulatutako milioika hash dituzten taulak, gatzik gabeko hash-ak alderantziz bilatzeko.",
      "Aplikazioen interfaze grafikoan pasahitzen sendotasuna koloreen bidez adierazten duten taulak.",
      "DNS zerbitzarietan domeinu-izenak eta IP helbideak modu zifratuan lotzen dituzten taula publikoak.",
      "Zibersegurtasuneko suebaki modernoek paketeak aztertzeko erabiltzen dituzten portu-arauen zerrendak."
    ],
    "zuzena": 0,
    "azalpena": "Rainbow table-ak memoria-denbora konpromisoa (time-memory trade-off) erabiltzen duten taulak dira: milioika pasahitz posible eta haien hash-ak gordetzen dituzte kateatuta. Hash bat ikustean, taulan bilatu eta segundo batean pasahitza asmatzen da (gatza erabiliz gero, taulak alferrikako bihurtzen dira)."
  },
  {
    "id": 60,
    "blokea": 1,
    "kategoria": "Oinarrizko Kontzeptuak",
    "galdera": "Kriptologian, zer desberdintasun dago zifratze algoritmo (cipher) baten eta gako (key) baten artean?",
    "aukerak": [
      "Algoritmoa datuak konprimatzeko metodoa da soilik; gakoa, aldiz, fitxategiaren izena aldatzeko erabiltzen da.",
      "Algoritmoa gailu fisiko bati deritzo (HSM txartela); gakoa disko gogorrean gordetzen den fitxategia da.",
      "Algoritmoa erabiltzaile bakoitzak asmatzen du; gakoa, berriz, nazioarteko erakunde batek finkatzen du.",
      "Algoritmoa funtzio matematiko finko eta publikoa da; gakoa parametro aldakor eta sekretua da."
    ],
    "zuzena": 3,
    "azalpena": "Algoritmoa (adib. AES) arau matematiko publikoa da; gakoa (adib. 256 biteko zenbaki ausazkoa) algoritmo horri sartzen zaion sekretua da. Kerckhoffs-en printzipioaren arabera, algoritmoa ezagututa ere, gakoa gabe ezin da ezer deszifratu."
  },
  {
    "id": 61,
    "blokea": 6,
    "kategoria": "Nmap eta Portuen Eskaneatzea",
    "galdera": "Zergatik da Nmap-en lehenetsitako eskaneoa TCP SYN (-sS) eta zergatik deritzo 'ezkutuko' (stealth) eskaneoa?",
    "aukerak": [
      "Ez duelako inolako paketerik bidaltzen sarera eta bakarrik sareko trafikoa pasiboki entzuten duelako.",
      "TCP 3-bideko eskua-ematea amaitzen ez duelako (SYN/ACK jaso ondoren RST bidaltzen du) eta ez da logeatu ohi.",
      "Sareko suebaki guztiek automatikoki baimendutako UDP protokolo zifratua erabiltzen duelako datuetan.",
      "Emaitza guztiak diskoan zifratuta gordetzen dituelako eta administratzaileak ezin dituelako irakurri."
    ],
    "zuzena": 1,
    "azalpena": "SYN eskaneoan (-sS), Nmap-ek SYN bat bidaltzen du; portua irekita badago xedeak SYN/ACK erantzuten du, baina Nmap-ek berehala RST (reset) bidaltzen du konexioa osatu gabe. Aplikazio askok konexio osoa (3-way handshake) amaitutakoan bakarrik erregistratzen dute logetan; horregatik deitzen zaio stealth."
  },
  {
    "id": 62,
    "blokea": 6,
    "kategoria": "Nmap eta Portuen Eskaneatzea",
    "galdera": "Nmap-en emaitzetan, zer esan nahi du portu bat 'FILTERED' egoeran agertzeak?",
    "aukerak": [
      "Portuan dagoen zerbitzuak eskaera jaso eta berariazko RST errore-pakete batekin erantzun duela.",
      "Portua irekita dagoela eta zerbitzua bezeroaren konexio-eskaeraren datuak onartzeko zain dagoela.",
      "Suebaki edo iragazki batek paketeak blokeatu dituela eta Nmap-ek ezin duela jakin irekita ala itxita dagoen.",
      "Portua guztiz desgaituta dagoela eta sistema eragilearen kernela erantzunik eman gabe gelditu dela."
    ],
    "zuzena": 2,
    "azalpena": "'FILTERED' egoerak esan nahi du Nmap-ek bidalitako probek ez dutela inolako erantzunik jaso (drop egin ditu suebaki batek) edo ICMP errore batekin (adib. type 3 unreachable) blokeatu direla. Beraz, Nmap-ek ezin du baieztatu portua irekita ala itxita dagoen."
  },
  {
    "id": 63,
    "blokea": 6,
    "kategoria": "Nmap eta Portuen Eskaneatzea",
    "galdera": "Zergatik da UDP eskaneoa (-sU) TCP SYN eskaneoa baino askoz motelagoa?",
    "aukerak": [
      "UDP konexiorik gabekoa denez eta portu itxietan ICMP errore-erantzunek segundoko muga zorrotza dutelako.",
      "UDP protokoloak baimen administratibo bereziak eskatzen dituelako eta sistemak blokeatu egiten duelako.",
      "UDP kable fisiko bidez bakarrik dabilelako eta ezin delako Wi-Fi sare lokaletan zehar transmititu.",
      "Nmap-ek aldi berean UDP portu bakarra aztertu dezakeelako eta TCPn milaka portu aldi berean aztertzen dituelako."
    ],
    "zuzena": 0,
    "azalpena": "UDP eskaneoa oso motela da bi arrazoirengatik: 1) Irekitako portuek ez dute erantzuten askotan (timeout luzea itxaron behar da), eta 2) Linux kernelek segundoko ICMP Port Unreachable erantzun kopurua mugatzen dute (rate limiting, adib. 1 segundoko RFC 1812ren arabera)."
  },
  {
    "id": 64,
    "blokea": 6,
    "kategoria": "Nmap eta Portuen Eskaneatzea",
    "galdera": "Zergatik gomendatzen da segurtasun-auditorietan '-p-' aukera erabiltzea Nmap-ekin?",
    "aukerak": [
      "Ping automatikoaren proba desgaitzen duelako eta horrek azterketa nabarmen azkartzen duelako.",
      "Baimen guztiak root erabiltzaile gisa exekutatzen dituelako eta suebakiaren alertak saihesten dituelako.",
      "Emaitza guztiak XML eta PDF formatu ofizialetan batera gordetzeko agindua ematen duelako sisteman.",
      "Nmap-ek lehenetsiz 1.000 portu ohikoenak soilik aztertzen dituelako, eta '-p-'k 65.535 portu guztiak aztertzen dituelako."
    ],
    "zuzena": 3,
    "azalpena": "Nmap-ek parametrorik gabe TOP 1.000 portu ohikoenak bakarrik aztertzen ditu. Erasotzaileek edo zerbitzariek ataka altuetan ezkutatzen dituzte sarritan atzeko ateak (adib. Metasploitable2ko distccd 3632/tcp edo bind shell-ak 1524/tcp). '-p-' aukerak 1etik 65535era portu guzti-guztiak miatzen ditu."
  },
  {
    "id": 65,
    "blokea": 6,
    "kategoria": "Nmap eta Portuen Eskaneatzea",
    "galdera": "Zer abantaila eskaintzen dute Nmap Scripting Engine (NSE) scriptek (--script=vuln)?",
    "aukerak": [
      "Eskaneatze-abiadura %50 handitzen dutela ataka bakoitzean algoritmo bereziak aplikatuz.",
      "Bertsio hutsa irakurri ordez, proba aktibo ez-kaltegarriak bidaltzen dituztela CVE zaurgarritasunak baieztatzeko.",
      "Xedeko ekipoaren pasahitz guztiak automatikoki aldatzen dituztela eta segurtasun-kopia sortzen dutela.",
      "Konektatutako ekipoen disko osoa zifratzen dutela eta administratzaileari baimenak kentzen dizkiotela."
    ],
    "zuzena": 1,
    "azalpena": "NSE scriptek (Lua lengoaian idatziak) zaurgarritasun ezagunak (CVEak) automatikoki detektatzen dituzte; adibidez, vsftpd 2.3.4 atzeko atea edo Samba usermap script ahultasuna egiazki ustiagarriak diren frogatzen dute."
  },
  {
    "id": 66,
    "blokea": 6,
    "kategoria": "Nmap eta Portuen Eskaneatzea",
    "galdera": "Zein aukera erabiltzen da Nmap-en zerbitzuen bertsio zehatzak (softwarearen bertsioa) identifikatzeko?",
    "aukerak": [
      "-sN aukera erabiltzen da, TCP paketeetan NULL banderak erabiliz suebakiak saihesteko.",
      "-sO aukera erabiltzen da, sareko IP protokolo gaituak eta haien goiburukoak miatzeko.",
      "-sV aukera erabiltzen da, ataketan entzuten ari diren zerbitzuen bertsio zehatzak detektatzeko.",
      "-sP aukera erabiltzen da, tokiko sareko ekipoak bakarrik piztuta dauden baieztatzeko."
    ],
    "zuzena": 2,
    "azalpena": "-sV (Version Detection) aukerak portuan dauden zerbitzuekin komunikatzen da (banner grabaketa eta proba zehatzak) softwarearen izen eta bertsio zehatza (adib. Apache 2.4.41, OpenSSH 8.2p1) jakiteko."
  },
  {
    "id": 67,
    "blokea": 6,
    "kategoria": "Nmap eta Portuen Eskaneatzea",
    "galdera": "Nola lortzen du Nmap-ek makina baten sistema eragilea (-O) asmatzea?",
    "aukerak": [
      "TCP/IP sare-pilaren ezaugarri bereziak (TTL balioak, leiho-tamainak) bere aztarnekin konparatuz.",
      "Zerbitzariko /etc/issue eta /etc/os-release fitxategi irekiak automatikoki deskargatuz.",
      "DNS zerbitzariari domeinuko makinen erregistro ofizialak zuzenean kontsultatuz sare publikoan.",
      "Makinari itzaltze-seinale berezi bat bidaliz eta itzaltze-denboraren arabera ondorioztatuz."
    ],
    "zuzena": 0,
    "azalpena": "OS Fingerprinting (-O): OS bakoitzak (Linux, Windows, FreeBSD) desberdintasun txikiak ditu TCP/IP estandarra inplementatzean (hasierako TTL, TCP window size, DF bit, ACK erantzunak). Nmap-ek proba sorta bat bidaltzen du eta erantzunak bere milaka aztarnako basearekin alderatzen ditu."
  },
  {
    "id": 68,
    "blokea": 6,
    "kategoria": "Nmap eta Portuen Eskaneatzea",
    "galdera": "Zein Nmap aukerak sortzen ditu aldi berean emaitzak hiru formatu nagusietan (Normala, XML eta Grepable)?",
    "aukerak": [
      "-oN <fitxategia> aukerak, soilik testu arrunteko txosten irakurgarria sortzen duenak.",
      "-oX <fitxategia> aukerak, beste tresnetarako XML formatu egituratua sortzen duenak.",
      "-oG <fitxategia> aukerak, terminaleko grep agindurako lerro bakarreko irteera sortzen duenak.",
      "-oA <fitxategia> aukerak, hiru formatuak (.nmap, .xml, .gnmap) aldi berean gordetzen dituenak."
    ],
    "zuzena": 3,
    "azalpena": "-oA (Output All): Fitxategi-izen bat emanda (adib. -oA scan_emaitzak), hiru fitxategi sortzen ditu automatikoki: scan_emaitzak.nmap (irakurtzeko), scan_emaitzak.xml (Metasploit edo beste tresnetan inportatzeko) eta scan_emaitzak.gnmap (grep egiteko)."
  },
  {
    "id": 69,
    "blokea": 1,
    "kategoria": "Zibersegurtasun Lege-esparrua",
    "galdera": "DBEO/RGPDren 33. artikuluaren arabera, zenbateko gehieneko epea du erakunde batek datu-urraketa bat AEPDri jakinarazteko?",
    "aukerak": [
      "24 orduko epe zorrotza du, inolako salbuespenik edo luzapenik onartzen ez duena.",
      "72 ordu, arrazoirik gabeko atzerapenik gabe ezagutzen den unetik aurrera kontatuta.",
      "48 orduko epea du, baldin eta datu pertsonalek finantza-informazioa barneratzen badute.",
      "30 egun naturaleko epea du, betiere barne-auditoria tekniko osoa burutu ondoren."
    ],
    "zuzena": 1,
    "azalpena": "RGPDren 33. artikuluak dio segurtasun-urraketa baten berri izan bezain laster jakinarazi behar zaiola kontrol-agintaritzari (AEPD), ahal bada 72 orduko epean. Atzerapena egonez gero, arrazoituta egon behar du."
  },
  {
    "id": 70,
    "blokea": 1,
    "kategoria": "Zibersegurtasun Lege-esparrua",
    "galdera": "Zein da DBEO/RGPDren arau-hauste larriengatik enpresa bati ezar dakiokeen zigor ekonomiko maximoa?",
    "aukerak": [
      "Gehienez 300.000 € edo aurreko ekitaldiko fakturazio osoaren % 1 arteko zigorra.",
      "Gehienez 1.000.000 € soilik, enpresaren tamaina edo irabaziak kontuan hartu gabe.",
      "Gehienez 20 milioi euro edo mundu mailako negozio-bolumenaren % 4 (bi horietatik handiena).",
      "Ez dago zigor ekonomikorik, erakundeari ohartarazpen publiko bat egitea bakarrik aurreikusten da."
    ],
    "zuzena": 2,
    "azalpena": "Arau-hauste larrienetan (oinarrizko printzipioak, baimenak edo eskubideak urratzea), zigorra 20 milioi euro edo aurreko urteko mundu mailako negozio-bolumenaren %4 artekoa izan daiteke (zenbateko handiena aplikatzen da)."
  },
  {
    "id": 71,
    "blokea": 1,
    "kategoria": "Zibersegurtasun Lege-esparrua",
    "galdera": "Espainiako Zigor Kodearen arabera (197 bis artikulua), nola zigortzen da baimenik gabe sistema informatiko batean sartzea?",
    "aukerak": [
      "Espetxe-zigorrarekin (6 hilabetetik 2 urtera arteko kartzela) zigortutako delitu penala da.",
      "Soilik administrazio-arauhauste arintzat hartzen da eta isun txiki bat ezartzen da.",
      "Ez da delitutzat hartzen, baldin eta sartutakoan informaziorik lapurtzen edo ezabatzen ez bada.",
      "Trafiko-arauhauste baten pareko zigor ekonomikoa ezartzen da eta ez du aurrekari penalik uzten."
    ],
    "zuzena": 0,
    "azalpena": "Zigor Kodearen 197 bis artikuluak ('Hacking' delitua) ezartzen du baimenik gabe eta segurtasun-neurriak urratuz sistema informatiko batean sartzea edo bertan mantentzea delitu penala dela, espetxe-zigorrarekin (6 hilabetetik 2 urtera)."
  },
  {
    "id": 72,
    "blokea": 1,
    "kategoria": "Zibersegurtasun Lege-esparrua",
    "galdera": "Zer ezartzen du Europar Batasuneko NIS2 Zuzentarauak zibersegurtasunaren alorrean?",
    "aukerak": [
      "Europar Batasun osoan kriptografia asimetrikoa erabiltzea guztiz debekatzen duela.",
      "Enpresa guztiek beren pasahitzak urtean behin nahitaez aldatu behar dituztela agintzen duela.",
      "Administrazio publiko guztietan software librea soilik erabili behar dela derrigortzen duela.",
      "Sektore kritikoetako erakundeei zibersegurtasun neurri zorrotzak eta zuzendaritzaren ardura ezartzen dizkiela."
    ],
    "zuzena": 3,
    "azalpena": "NIS2 Zuzentarauak (2022/2555) erakunde esentzial eta garrantzitsuei (energia, garraioa, osasuna, bankuak, azpiegitura digitalak) zibersegurtasun neurri sendoak, hornikuntza-katearen segurtasuna, intzidentzien jakinarazpen azkarra (24 ordu) eta goi-zuzendaritzaren erantzukizun pertsonala ezartzen dizkie."
  },
  {
    "id": 73,
    "blokea": 1,
    "kategoria": "Zibersegurtasun Lege-esparrua",
    "galdera": "Zer esan nahi du 'Privacy by Design' (Diseinuzko Datuen Babesa) printzipioak software garapenean?",
    "aukerak": [
      "Aplikazioaren diseinu bisuala eta interfaze grafikoa erabiltzailearentzat oso erakargarriak izatea.",
      "Pribatutasun neurriak softwarearen lehen unetik (arkitektura eta diseinutik) integratu behar direla.",
      "Datu pertsonal guztiak diskoan Base64 bidez soilik gordetzea diseinu-fasean leku gutxiago hartzeko.",
      "Erabiltzaileei interfazearen koloreak eta sistemaren ezarpenak aldatzeko baimenik ez ematea."
    ],
    "zuzena": 1,
    "azalpena": "Privacy by Design (RGPD 25. artikulua): datuen babesa ez da proiektuaren amaieran jarri beharreko adabaki bat. Softwarearen sorreratik bertatik (arkitektura, datu-basearen diseinua) pribatutasun-neurriak (zifratzea, minimizazioa, sarbide-mugak) txertatu behar dira."
  },
  {
    "id": 74,
    "blokea": 1,
    "kategoria": "Zibersegurtasun Lege-esparrua",
    "galdera": "Zertan datza software garapeneko 'Shift-Left Security' ikuspegia?",
    "aukerak": [
      "Teklatuko ezkerreko 'Shift' tekla erabiliz administratzaile-pasahitzak azkarrago zifratzean.",
      "Zerbitzari nagusiak geografikoki Europar Batasunaren mendebaldeko herrialdeetan kokatzean.",
      "Segurtasun probak garapen-zikloaren hasierara (ezkerrera: kodeketa eta diseinura) aurreratzean.",
      "Erabiltzaileen baimenak administratzaile-panelean ezkerretik eskuinera murrizteko metodoan."
    ],
    "zuzena": 2,
    "azalpena": "'Shift Left': Garapen zikloan (DevSecOps) segurtasuna ekoizpen-fasera edo azterketa-fasera (eskuinera) itxaron beharrean, hasiera-hasierara (ezkerrera: arkitektura, kode-analisia, unitate-probak) ekartzea da, akatsak garapenean konpontzea 30-100 aldiz merkeagoa delako."
  },
  {
    "id": 75,
    "blokea": 1,
    "kategoria": "Zibersegurtasun Lege-esparrua",
    "galdera": "Zein da Euskadiko zibersegurtasun agentzia ofiziala, euskal azpiegituren babesaz arduratzen dena?",
    "aukerak": [
      "Cyberzaintza (Zibersegurtasunaren Euskal Agentzia), Euskal Autonomia Erkidegoko agentzia ofiziala.",
      "INCIBE (Instituto Nacional de Ciberseguridad), Espainia osoko herritar eta enpresa txikientzako zentroa.",
      "CNI (Centro Nacional de Inteligencia), estatuko segurtasun eta inteligentzia arloko erakundea.",
      "Europol (European Union Agency for Law Enforcement Cooperation), polizia-koordinazioko agentzia."
    ],
    "zuzena": 0,
    "azalpena": "Cyberzaintza (lehen BCSC / Basque Cybersecurity Centre) Eusko Jaurlaritzaren Zibersegurtasun Agentzia ofiziala da, Euskadiko azpiegitura publikoak, enpresak eta herritarrak zibermehatxuetatik babesteko sortua."
  },
  {
    "id": 76,
    "blokea": 1,
    "kategoria": "Zibersegurtasun Lege-esparrua",
    "galdera": "Zer motatako datuak dira osasun-datuak, historia klinikoak edo datu genetikoak DBEO/RGPDren arabera?",
    "aukerak": [
      "Datu arruntak dira, posta elektronikoaren edo telefono zenbaki arruntaren babes-maila berbera dutenak.",
      "Datu Publikoak dira, edozein erakundek bere ikerketa zientifikoetan askatasunez erabil ditzakeenak.",
      "Datu Kategoria Bereziak (9. art.), babes gorena eta tratatzeko debeku orokorra dutenak salbuespenik ezean.",
      "Ez dira datu pertsonaltzat hartzen legedian, pertsonen bizitza pribatuarekin loturarik ez dutelako."
    ],
    "zuzena": 2,
    "azalpena": "RGPDren 9. artikuluak 'Kategoria Bereziko Datuak' (Datu Sentikorrak) izendatzen ditu osasuna, genetika, biometria, arraza, iritzi politikoak edo erlijioa. Hauek tratatzea printzipioz DEBEKATUTA dago, baimen esplizitua edo osasun-interes publikoa bezalako salbuespen oso zehatzetan salbu."
  },
  {
    "id": 77,
    "blokea": 1,
    "kategoria": "Zibersegurtasun Lege-esparrua",
    "galdera": "Zigor Kodearen 264. artikuluak (Kalte Informatikoak edo Sabotajea) zer zigortzen du?",
    "aukerak": [
      "Lantokian lan-jardunaldia amaitzean ordenagailua itzali gabe uztea eta argindarra xahutzea.",
      "Baimenik gabe datuak, fitxategiak edo babeskopiak ezabatzea, kaltetzea, hondatzea edo eskuragaitz uztea.",
      "Sare publiko bateko ataka irekiak baimenik gabe Nmap bidez soilik aztertzea eta zerrendatzea.",
      "Linux terminalean administratzaile-baimenekin 'ls' edo 'cd' aginduak baimenik gabe exekutatzea."
    ],
    "zuzena": 1,
    "azalpena": "264. artikuluak (Kalte Informatikoak): baimenik gabe datu informatikoak, programak edo agiri elektronikoak ezabatu, kaltetu, hondatu, aldatu edo eskuraezin uzten dituenari (adibidez Ransomware bidez diskoa enkriptatuz edo datu-basea ezabatuz) espetxe zigor handiak ezartzen dizkio."
  },
  {
    "id": 78,
    "blokea": 1,
    "kategoria": "Zibersegurtasun Lege-esparrua",
    "galdera": "Zergatik da erakunde baten arduradunen betebeharra 'Corporate Compliance' (Betetze Eredu Penala) izatea?",
    "aukerak": [
      "Enpresaren barruan delitu penalik (ziberdelituak barne) egin ez dadin kontrol-neurriak ezartzeko.",
      "Erakundeak zerga publikoak ordaintzea legez saihesteko eta finantza-auditoretzak saihesteko.",
      "Ordenagailu guztietan doako birus-kontrako tresna sinple bat instalatuta edukitzeko soilik.",
      "Webgune nagusiaren errendimendua eta bisitarien kopurua estatistikoki neurtzeko metodo gisa."
    ],
    "zuzena": 0,
    "azalpena": "Zigor Kodearen 31 bis artikuluaren arabera, Pertsona Juridikoek (enpresek) erantzukizun penala dute beren langileek egindako delituengatik (adib. hacking, sekretuen errebelazioa). Compliance penal batek frogatzen du enpresak neurri egokiak hartu zituela delitua saihesteko, enpresa zigorretik salbuetsiz."
  },
  {
    "id": 79,
    "blokea": 1,
    "kategoria": "Oinarrizko Kontzeptuak",
    "galdera": "Zein dira zibersegurtasunaren oinarrizko CIA triadaren hiru zutabeak?",
    "aukerak": [
      "Control, Inspection eta Audit (Kontrola, Ikuskapena eta Auditoria teknikoa).",
      "Certificate, Identification eta Authentication (Ziurtagiria, Nortasuna eta Egiaztapena).",
      "Cloud, Internet eta Automation (Hodeia, Sarea eta Automatizazio industriala).",
      "Confidentiality, Integrity eta Availability (Konfidentzialtasuna, Osotasuna eta Eskuragarritasuna)."
    ],
    "zuzena": 3,
    "azalpena": "CIA triada informazio-segurtasunaren oinarri absolutua da: Confidentiality (baimendutakoek bakarrik irakurtzea), Integrity (datuak ez manipulatzea) eta Availability (behar denean informazioa eskuragarri egotea)."
  },
  {
    "id": 80,
    "blokea": 1,
    "kategoria": "Oinarrizko Kontzeptuak",
    "galdera": "DoS (Denial of Service) edo Ransomware eraso batek CIA triadako zein zutabe jotzen du nagusiki?",
    "aukerak": [
      "Konfidentzialtasuna soilik, fitxategietako datuak publikoki zabaltzen dituelako sarean zehar.",
      "Autentikotasuna soilik, zerbitzariaren SSL ziurtagiria faltsutzen duelako bezeroen aurrean.",
      "Eskuragarritasuna (Availability), zerbitzua edo datuak erabiltzaile legitimoentzat eskuraezin utziz.",
      "Ez du CIA triada ukitzen, hardware mailako akats fisikotzat hartzen delako zerbitzarian."
    ],
    "zuzena": 2,
    "azalpena": "DoS eraso batek zerbitzaria saturatzen du zerbitzurik eman ez dezan; Ransomware batek diskoak enkriptatu eta erabilgaitz uzten ditu. Biek Eskuragarritasuna (Availability) hausten dute nagusiki, zerbitzu legitimoa eteten baitute."
  },
  {
    "id": 81,
    "blokea": 1,
    "kategoria": "Oinarrizko Kontzeptuak",
    "galdera": "Zer da 'Barneko Mehatxu' bat (Insider Threat) zibersegurtasunean?",
    "aukerak": [
      "Ordenagailuaren kableak eta sare-konektoreak barrutik ustekabean deskonektatzea.",
      "Baimendutako langile batek bere sarbide legitimoak erabiltzea informazioa lapurtu edo sabotatzeko.",
      "Ezezagun baten partetik jasotako publizitatezko spam posta elektroniko masiboa.",
      "Kanpoko hacker ezezagun batek urrunetik suebakia hautsiz egindako eraso konplexua."
    ],
    "zuzena": 1,
    "azalpena": "Insider Threat (barneko mehatxua) erakundeko barne-pertsona batek (langilea, administratzailea, hornitzailea) sortzen duena da, izan nahita (espioitza, mendekua, dirua) edo nahi gabe (arduragabekeria, phishing-ean erortzea). Sarbide legitimoak dituenez, detektatzen zailenetakoa da."
  },
  {
    "id": 82,
    "blokea": 1,
    "kategoria": "Mehatxu Aurreratuak",
    "galdera": "Zer da APT (Advanced Persistent Threat) bat zibersegurtasunaren arloan?",
    "aukerak": [
      "Debian eta Ubuntu banaketetan softwarea eguneratzeko erabiltzen den sistemako prozesu automatikoa.",
      "Erabiltzaile batek pasahitz oso laburra edo aurreikusgarria edukitzeagatik sortzen den arrisku arrunta.",
      "Birus-kontrako aplikazio modernoek disko gogorra aldian-aldian aztertzeko sortzen duten ataza programatua.",
      "Estatuek edo erakunde boteretsuek finantzatutako taldea, sarean denbora luzez ezkutuan mantentzen dena."
    ],
    "zuzena": 3,
    "azalpena": "APT (Advanced Persistent Threat): baliabide handiko eraso-talde antolatua da (sarritan estatu batek finantzatua). Ez dute zaratari egiten: sarean sartu, hilabetez edo urtez ezkutuan egon, informazio estrategikoa erauzi edo une egokian sabotajea egitea dute helburu."
  },
  {
    "id": 83,
    "blokea": 1,
    "kategoria": "Mehatxu Motak",
    "galdera": "Zertan bereizten da 'Hacktibismoa' ziberdelinkuentzia arrunteik?",
    "aukerak": [
      "Hacktibismoak motibazio politiko edo soziala duela, eta ziberdelinkuentziak irabazi ekonomikoa bilatzen duela.",
      "Hacktibistek ez dutela sekula tresna informatikorik erabiltzen beren protestak eta aldarrikapenak egiteko.",
      "Hacktibismoa legedi guztietan erabat baimenduta dagoela adierazpen-askatasunaren oinarrizko eskubide gisa.",
      "Hacktibistek soilik sare sozialetako kontu pertsonalak sortzen dituztela eta ez dutela zerbitzaririk ukitzen."
    ],
    "zuzena": 0,
    "azalpena": "Hacktibismoak (adib. Anonymous) helburu politiko, sozial edo ideologikoak ditu (adibidez zentsura salatzea, giza eskubideen aldeko protestak, informazio konfidentziala filtratzea). Ziberdelinkuentzia arruntak, berriz, zuzeneko etekin ekonomikoa bilatzen du (ransomware, banku-iruzurrak)."
  },
  {
    "id": 84,
    "blokea": 1,
    "kategoria": "Zibererasoen Faseak",
    "galdera": "Zer da 'Datuen Exfiltrazioa' (Data Exfiltration) eraso baten testuinguruan?",
    "aukerak": [
      "Datu-baseko taulak Excel formatura automatikoki esportatzeko zerbitzariaren mantentze-ataza arrunta.",
      "Disko gogorreko partizio guztiak zeroz gainidaztea eta fitxategi-sistema guztiz garbi uztea betirako.",
      "Erasotzaileak biktima-erakundeko zerbitzarietatik kanpora baimenik gabe datu sentikorrak kopiatu eta ateratzea.",
      "Enpresaren segurtasun-kopiak hodeiko biltegiratze-zerbitzu seguru batera automatikoki kargatzea gauez."
    ],
    "zuzena": 2,
    "azalpena": "Exfiltration (datuak ateratzea): behin erasotzailea sarean sartuta (post-exploitation), enpresako datu baliotsuak (bezeroen datuak, gakoak, patenteak) bere kontrolpeko zerbitzarietara bidaltzea (sarritan DNS tunelez, HTTPS bidez edo zifratuta detekzioa saihesteko)."
  },
  {
    "id": 85,
    "blokea": 3,
    "kategoria": "SQL Injekzioa (SQLi)",
    "galdera": "Zergatik da '1=1' adierazpena hain ezaguna eta erabilia SQL injekzioetan?",
    "aukerak": [
      "SQL motorraren konfigurazio-fitxategiko bertsio-zenbaki nagusia adierazten duelako beti sisteman.",
      "Tautologia bat delako (beti egiazkoa), eta WHERE klausulan sartzean baldintza errenkada guztientzat betearazten duelako.",
      "Datu-baseko administratzaile nagusiaren identifikazio-zenbaki lehenetsia delako SQL estandarrean.",
      "Datu-basearen zerbitzua berehala berrabiaraztera behartzen duelako memoriako errore bat sortuz."
    ],
    "zuzena": 1,
    "azalpena": "'1=1' beti da egiazkoa (True). 'SELECT * FROM users WHERE user='' OR 1=1 --' egiten denean, WHERE baldintza egiazkoa bihurtzen da taulako errenkada GUZTIENTZAT, lehen erabiltzailea (normalean 'admin') itzuliz eta pasahitza egiaztatzea saihestuz."
  },
  {
    "id": 86,
    "blokea": 3,
    "kategoria": "SQL Injekzioa (SQLi)",
    "galdera": "Zer egiten du hash ikurrak (#) edo gidoi bikoitzak (--) SQL injekzio baten amaieran?",
    "aukerak": [
      "Kontsultako pasahitza berehala zifratzen du datu-basean Base64 algoritmoaren bidez biltegiratzeko.",
      "Datu-baseko uneko erabiltzailearen baimenak ezabatzen ditu eta administratzaile berria sortzen du.",
      "SQL transakzio osoa bertan behera uzten du eta zerbitzariari hutsik dagoen erantzun bat itzultzen dio.",
      "Jatorrizko kontsultan ondoren zetozen baldintza guztiak iruzkin bihurtzen ditu erroreak saihesteko."
    ],
    "zuzena": 3,
    "azalpena": "SQLn '-- ' (edo '#' MySQLn) lerro amaierako iruzkina da. Aplikazioak prestatutako jatorrizko kontsultaren amaiera (adib. \"AND pass='$pass'\") iruzkin bihurtzen du; beraz, datu-baseak ez du pasahitza egiaztatuko."
  },
  {
    "id": 87,
    "blokea": 3,
    "kategoria": "SQL Injekzioa (SQLi)",
    "galdera": "Zer motatako SQL injekzioa da 'UNION-based SQL Injection'?",
    "aukerak": [
      "Jatorrizko kontsultari beste SELECT baten emaitzak batuz beste taula batzuetako datuak erakusteko teknika.",
      "Datu-baseko taula guztiak segundotan ezabatu eta suntsitzen dituen injekzio-mota suntsitzailea.",
      "Soilik inolako errorerik ematen ez duten zerbitzarietan aplikatu daitekeen injekzio itsu konplexua.",
      "Komatxorik gabeko zenbakizko eremuetan soilik aplikatu daitekeen kontsulta-metodo murriztua."
    ],
    "zuzena": 0,
    "azalpena": "UNION eragileak bi SELECTen emaitzak elkartzen ditu. Erasotzaileak jatorrizko kontsultari 'UNION SELECT username, password FROM users' gehitzen dio; ondorioz, web orriak pantailan erasotzaileak eskatutako taulako datu sentikorrak bistaratuko ditu."
  },
  {
    "id": 88,
    "blokea": 3,
    "kategoria": "SQL Injekzioa (SQLi)",
    "galdera": "Zer da 'Blind SQL Injection' (Itsua) eta nola ustiatzen da?",
    "aukerak": [
      "Monitorerik gabeko zerbitzarietan bakarrik aplikatu daitekeen eraso automatiko bat da terminalean.",
      "Datu-basearen pasahitz guztiak zerbitzariko pantailan kolore gorriz bistaratzeko metodo azkarra.",
      "Webguneak daturik erakusten ez duenean, galdera bitarren edo denbora-atzerapenen bidez datuak ateratzeko teknika.",
      "Aplikazioaren baimen guztiak root mailara automatikoki igotzeko erabiltzen den script itxia."
    ],
    "zuzena": 2,
    "azalpena": "SQL Injekzio Itsuan aplikazioak ez du daturik erakusten pantailan. Bi mota nagusi daude: Boolean-based (BAI/EZ erantzunak alderatuz, adib. orria kargatzen da ala ez) eta Time-based (datu-baseari 'SLEEP(5)' aginduz; orriak 5 segundo beranduago erantzuten badu, letra asmatu dela badaki)."
  },
  {
    "id": 89,
    "blokea": 3,
    "kategoria": "SQL Injekzioa (SQLi)",
    "galdera": "Prepared Statements erabiltzean, zergatik ezin du erasotzaile batek SQL injekziorik egin?",
    "aukerak": [
      "Kontsulta prestatuak datu-baseko memorian Base64 bidez zifratuta geratzen direlako beti exekutatu aurretik.",
      "Datuak eta kodea bereizita bidaltzen direlako; erabiltzailearen sarrera datu huts gisa tratatzen da beti.",
      "Web zerbitzariak automatikoki suebaki bat instalatzen duelako PHP aplikazioaren eta MySQL artean.",
      "Kontsultak administratzailearen gako pribatuarekin sinatuta bidaltzen direlako datu-baseko motorrera."
    ],
    "zuzena": 1,
    "azalpena": "Kontsulta prestatuetan (Prepared Statements / Parametrized Queries), SQL egitura aurretik konpilatzen da datu-basean. Ondoren bidaltzen diren parametroak (erabiltzailearen sarrera) datu literal gisa tratatzen dira bakarrik; erabiltzaileak \"' OR 1=1 --\" sartuta ere, testu arrunt gisa bilatuko du, inoiz ez SQL kode gisa."
  },
  {
    "id": 90,
    "blokea": 3,
    "kategoria": "SQL Injekzioa (SQLi)",
    "galdera": "PHP eta PDO erabiliz, zein da parametro bat zenbaki oso gisa lotzeko komando segurua?",
    "aukerak": [
      "$stmt->query('SET GLOBAL sql_safe_mode = 1'); agindua bidaliz datu-base osoa babestea.",
      "$sql = 'SELECT * FROM users WHERE id = ' . $id; komandoa erabiliz katea zuzenean kateatzea.",
      "$stmt->execute(array('id' => addslashes($id))); funtzioa erabiliz ihes-karaktereak eranstea.",
      "$stmt->bindParam(':id', $id, PDO::PARAM_INT); komandoa erabiliz parametroa zenbaki gisa lotzea."
    ],
    "zuzena": 3,
    "azalpena": "PDO bidez: `$stmt->bindParam(':id', $id, PDO::PARAM_INT);` adierazpenak bermatzen du `$id` parametroa zenbaki oso moduan tratatuko dela zorrotz, inolako SQL metakaraktererik interpretatu gabe."
  },
  {
    "id": 91,
    "blokea": 3,
    "kategoria": "SQL Injekzioa (SQLi)",
    "galdera": "Zer da 'information_schema' MySQL datu-basean eta zergatik erabiltzen dute erasotzaileek?",
    "aukerak": [
      "Datu-base guztien metadatuak biltzen dituen barne-eskema da, taulen eta zutabeen izenak aurkitzeko balio duena.",
      "MySQL-ren lizentzia ofiziala eta garatzaileen datu pertsonalak biltzen dituen taula publikoa da.",
      "Webguneko erabiltzaileen saio-tokenak eta aldi baterako cookie-ak gordetzen dituen memoria-eremua da.",
      "MySQL-ren disko-zifratzea kudeatzen duen eta gako simetriko guztiak biltzen dituen fitxategia da."
    ],
    "zuzena": 0,
    "azalpena": "information_schema MySQL/MariaDBko datu-base berezia da: zerbitzarian dauden datu-base, taula (information_schema.tables) eta zutabe guztien (information_schema.columns) izenak gordetzen ditu. Erasotzaile batek UNION bidez kontsultatzen du zein taula dauden jakiteko (adib. 'users' taula eta 'password' zutabea aurkitzeko)."
  },
  {
    "id": 92,
    "blokea": 3,
    "kategoria": "SQL Injekzioa (SQLi)",
    "galdera": "OWASP Top 10 sailkapenean, zein kategoriari dagokio SQL Injekzioa?",
    "aukerak": [
      "A01:2021 - Broken Access Control (Sarbide Kontrolaren Akatsak) kategoriari dagokio.",
      "A07:2021 - Identification and Authentication Failures (Autentifikazio Akatsak) kategoriari.",
      "A03:2021 - Injection (Injekzioak) kategoriari dagokio, SQL, NoSQL eta OS aginduak barne hartuz.",
      "A09:2021 - Security Logging and Monitoring Failures (Erregistro eta Jarraipen Akatsak) taldeari."
    ],
    "zuzena": 2,
    "azalpena": "OWASP Top 10 (2021): A03 kategoria da 'Injection'. SQL injekzioa, komando injekzioa, LDAP injekzioa eta XSS mota batzuk bertan kokatzen dira, erabiltzailearen kontrolatu gabeko datuak interprete bati bidaltzen zaizkionean gertatzen direnak."
  },
  {
    "id": 93,
    "blokea": 6,
    "kategoria": "Metasploit eta Eraso Praktikoak",
    "galdera": "Metasploit Framework barruan, zer desberdintasun dago 'Exploit' baten eta 'Payload' baten artean?",
    "aukerak": [
      "Exploita komandoak exekutatzen dituen terminala da; Payloada, berriz, datu-baseko pasahitza da.",
      "Exploitak zaurgarritasuna aprobetxatzen du sisteman sartzeko; Payloadak lortutakoan exekutatuko den kodea darama.",
      "Exploita beti Windowsentzat da soilik; Payloada, ordea, Linux eta Unix sistemetarako erreserbatuta dago.",
      "Exploita suebakia konfiguratzeko agindua da; Payloada sarea eskaneatzeko erabiltzen den protokoloa da."
    ],
    "zuzena": 1,
    "azalpena": "Exploit: zaurgarritasun bat (buffer overflow, atzeko atea) aprobetxatzeko metodoa da defentsak gainditzeko. Payload: exploita arrakastatsua denean biktima makinan exekutatzen den software-zatia da (adibidez reverse shell bat irekitzea edo Meterpreter saio bat abiaraztea)."
  },
  {
    "id": 94,
    "blokea": 6,
    "kategoria": "Metasploit eta Eraso Praktikoak",
    "galdera": "Zer da 'Reverse Shell' bat eta zergatik da ohikoena pentesting-ean 'Bind Shell' baten aurrean?",
    "aukerak": [
      "Biktima makinaren pantaila erabat desaktibatu eta monitorean alderantzizko irudia erakusteko scripta da.",
      "Soilik Bluetooth bidez konektatutako gailu mugikorretan aplikatu daitekeen shell mota mugatu bat da.",
      "Erasotzailearen makina itzaltzen denean biktima makinako zerbitzu guztiak automatikoki berrabiarazten ditu.",
      "Biktima makinak konektatzen du erasotzailearen IPra; horrela biktimaren sarrerako suebakiak gainditzen ditu."
    ],
    "zuzena": 3,
    "azalpena": "Bind Shell-ean biktima makinak portu bat irekitzen du eta erasotzailea hara konektatzen da (suebakiak blokeatu ohi du sarrerako konexioa). Reverse Shell-ean biktima makinak KANPORANTZ egiten du konexioa erasotzailearen IP/portura; suebakiek irteerako trafikoa (outbound) baimendu ohi dutenez, defentsak erraz gainditzen ditu."
  },
  {
    "id": 95,
    "blokea": 6,
    "kategoria": "Metasploit eta Eraso Praktikoak",
    "galdera": "Metasploit-en parametroak konfiguratzean, zer adierazten dute 'RHOST' eta 'LHOST' aldagaiek?",
    "aukerak": [
      "RHOST = Urruneko xedea (biktima makinaren IPa) eta LHOST = Tokiko erasotzailea (gure makinaren IPa).",
      "RHOST = Root Host (administratzailea) eta LHOST = Limited Host (erabiltzaile arrunta sisteman).",
      "RHOST = Ausazko ostalaria (Random Host) eta LHOST = Beti 'localhost' (127.0.0.1) helbide finkoa.",
      "RHOST eta LHOST biak dira erasoan aztertzen ari garen biktima makinaren IP helbide lokalak."
    ],
    "zuzena": 0,
    "azalpena": "Metasploit-en: RHOSTS (Remote Host) = zaurgarria den biktima-makinaren IPa (nori eraso). LHOST (Local Host) = gure makinaren (erasotzailearen/Kali-ren) IPa, Reverse Shell-ak nora konektatu behar duen jakiteko."
  },
  {
    "id": 96,
    "blokea": 6,
    "kategoria": "Metasploit eta Eraso Praktikoak",
    "galdera": "Meterpreter saio batean, zergatik ematen du errorea 'whoami' aginduak eta zein da alternatiba?",
    "aukerak": [
      "whoami agindua Windows sisteman bakarrik existitzen delako eta Linux zerbitzarietan ez delako ezagutzen.",
      "whoami exekutatzeko lehenik zerbitzariko root pasahitza tekleatu behar delako baimen-leihoan.",
      "Meterpreter-en agindua 'getuid' delako; edo 'shell' aginduaz Linuxeko terminal arruntera pasa behar delako.",
      "Meterpreter saioak ez duelako inolako erabiltzaile-profilik onartzen eta bakarrik fitxategiak kargatzen dituelako."
    ],
    "zuzena": 2,
    "azalpena": "Meterpreter ez da Linux shell arrunt bat, bere API eta agindu propioak dituen payload aurreratua baizik. Erabiltzailea jakiteko 'getuid' erabili behar da. Sistemaren shell arrunta nahi bada, 'shell' tekleatu behar da, eta ondoren Linuxeko edozein agindu ('whoami', 'uname -a') exekutatu ahal izango da."
  },
  {
    "id": 97,
    "blokea": 6,
    "kategoria": "Metasploit eta Eraso Praktikoak",
    "galdera": "vsftpd 2.3.4 zerbitzuaren atzeko ateak (backdoor) zein mekanismo erabiltzen du root shell-a irekitzeko?",
    "aukerak": [
      "Erabiltzaile-izenean 'admin' edo 'root' sartuz gero FTP zerbitzaria berehala desblokeatzen duelako.",
      "Erabiltzaile-izenaren amaieran irribarre bat ' :) ' idaztean, 6200/tcp portuan root shell bat irekitzen duelako.",
      "Pasahitza hutsik utziz gero zerbitzariak automatikoki administratzaile-saioa hasten duelako terminalean.",
      "FTP zerbitzariari 10 konexio jarraian egitean zerbitzua erori eta larrialdiko shell bat sortzen duelako."
    ],
    "zuzena": 1,
    "azalpena": "2011n vsftpd 2.3.4ren kode ofizialean atzeko ate bat txertatu zuten ezezagunek: erabiltzaile izenak ':)' bazuen (adib. 'neroni:)'), zerbitzariak 6200/tcp portuan atzeko ate bat irekitzen zuen, root gisa shell batera konektatzea ahalbidetuz ('exploit/unix/ftp/vsftpd_234_backdoor')."
  },
  {
    "id": 98,
    "blokea": 6,
    "kategoria": "Metasploit eta Eraso Praktikoak",
    "galdera": "Samba 3.0.20 bertsioaren CVE-2007-2447 zaurgarritasunak ('usermap script') zer ahalbidetzen du?",
    "aukerak": [
      "Bakarrik zerbitzariko fitxategi publikoak irakurtzea eta erabiltzaile-zerrendak esportatzea.",
      "Disko gogorreko partizioak formatu asimetrikoan zifratzea eta erabilgaitz uztea betirako.",
      "Erabiltzaileen pasahitzak aldatzea eta administratzaileari saioa ixtera behartzea modu lokalean.",
      "Erabiltzaile-izenean shell metakaraktereak (`nohup`) sartuz, komandoak zuzenean root gisa exekutatzea (RCE)."
    ],
    "zuzena": 3,
    "azalpena": "Samba 3.0.20n 'username map script' aukera gaituta zegoenean, Sambak erabiltzaile-izena zuzenean shell komando batean sartzen zuen egiaztatu gabe. Erabiltzaile gisa 'nohup komandoa' bidaliz, zerbitzariak komando hori root pribilegioekin exekutatzen zuen (Remote Code Execution - RCE)."
  },
  {
    "id": 99,
    "blokea": 6,
    "kategoria": "Metasploit eta Eraso Praktikoak",
    "galdera": "Linuxeko shell-ean zaudela biktima makina berehala eta guztiz itzaltzeko zein komando erabili zen klasean?",
    "aukerak": [
      "shutdown -h now komandoa erabili zen, makina berehala geratu eta itzaltzeko.",
      "exit agindua erabili zen, saioa itxi eta ordenagailua itzaltzeko agindua emateko.",
      "close -f parametroarekin exekutatu zen, ataka guztiak segundotan ixteko aginduz.",
      "poweroff --wait 10 agindua erabili zen, hamar segundoko atzerapenarekin itzaltzeko."
    ],
    "zuzena": 0,
    "azalpena": "'shutdown -h now' (edo 'poweroff') aginduak sistema eragileari seinalea bidaltzen dio zerbitzu guztiak itxi eta ekipoa berehala itzaltzeko (-h: halt, now: une honetan bertan)."
  },
  {
    "id": 100,
    "blokea": 6,
    "kategoria": "Metasploit eta Eraso Praktikoak",
    "galdera": "Zergatik da arriskutsua zerbitzari batean distccd (3632/tcp) ataka irekita eta babesik gabe edukitzea?",
    "aukerak": [
      "Bideoak eta multimedia fitxategiak inolako baimenik gabe sarean deskargatzeko balio duelako.",
      "Prozesadorearen RAM memoria gehiegi kontsumitzen duelako eta zerbitzaria moteltzen duelako.",
      "Inolako autentifikaziorik gabe urruneko komandoak zuzenean exekutatzeko aukera ematen duelako (RCE).",
      "Ez du inolako arriskurik sortzen zibersegurtasunean, konpilazio-prozesu lokaletarako bakarrik baita."
    ],
    "zuzena": 2,
    "azalpena": "distccd C/C++ kodea sareko hainbat makinaren artean banatuta konpilatzeko zerbitzua da. Berez ez du inolako autentifikaziorik eskatzen; beraz, CVE-2004-2687 ahultasunaren bidez, edozein erasotzailek komandoak bidal ditzake eta zerbitzariak deabruaren baimenekin (daemon) exekutatuko ditu."
  },
  {
    "id": 101,
    "blokea": 2,
    "kategoria": "Kriptografia Simetrikoa",
    "galdera": "Zer da PKCS#7 padding-a bloke-zifratzeetan?",
    "aukerak": [
      "Gako sekretuak memorian zifratuta mantentzeko eta hardware-erasoetatik babesteko metodo itxi bat.",
      "Azken blokeak 16 byte betetzen ez dituenean, falta diren byteak osatzeko eransten den betegarri arautua.",
      "Pasahitz laburrei ausazko karaktere bereziak eransten dizkien gatza datu-baseetan gordetzeko.",
      "Fitxategien konpresio-metodo estandarizatua, datuak zifratu aurretik tamaina txikitzeko erabiltzen dena."
    ],
    "zuzena": 1,
    "azalpena": "AESek 16 byteko bloke finkoak erabiltzen ditu. Mezuaren azken blokeak 11 byte baditu (5 byte falta dira), PKCS#7-k 5 byte gehitzen ditu, bakoitza 0x05 balioarekin. 16 byte zehatz baditu, 16 byteko bloke oso bat gehitzen du 0x10 balioarekin, deszifratzean betegarria kentzen jakiteko."
  },
  {
    "id": 102,
    "blokea": 2,
    "kategoria": "Kriptografia Simetrikoa",
    "galdera": "Zer gertatzen da AES-GCM moduan gako berarekin Nonce (zenbaki bakarra) bera bi aldiz errepikatzen bada?",
    "aukerak": [
      "GCMren segurtasuna erabat apurtzen da: GHASH gakoa berreskura daiteke eta mezuak faltsutu daitezke.",
      "Sistemaren segurtasun maila bikoiztu egiten da gakoen entropia handitzen delako automatikoki.",
      "Zifratutako fitxategiaren tamaina erdira murrizten da eta konexioaren abiadura nabarmen handitzen da.",
      "Ez da inolako arazorik gertatzen, gomendatutako praktika estandarra baita errendimendua hobetzeko."
    ],
    "zuzena": 0,
    "azalpena": "AES-GCMn 'Nonce' = Number used ONCE (behin bakarrik erabilitako zenbakia). Gako berarekin nonce bera birritan erabiltzen bada, bi testu zifratuen arteko XOR eginez testu arrunten arteko XOR lortzen da, eta autentifikazio-gakoa (H) berreskura daiteke, erasotzaileari mezuak faltsutzeko aukera emanez."
  },
  {
    "id": 103,
    "blokea": 3,
    "kategoria": "Kriptografia Asimetrikoa",
    "galdera": "Diffie-Hellman algoritmoaren analogia klasikoan (pintura-nahasketa), zer adierazten du margoak nahasteak?",
    "aukerak": [
      "Datu guztiak diskoan behin betiko ezabatzea eta fitxategi-sistema garbi uztea berrezarpenaren bidez.",
      "Fitxategien hash-ak kalkulatzea eta biltegiratze-kostua murrizteko konpresio-taulak aplikatzea.",
      "Gako pribatua automatikoki gako publiko bihurtzea eta zerbitzari publikoetan seguru partekatzea.",
      "Margoak nahastea erraza dela (noranzko bakarreko funtzioa), baina behin nahastuta banatzea ezinezkoa dela."
    ],
    "zuzena": 3,
    "azalpena": "Analogia: kolore komun bat (publikoa) hartu, bakoitzak bere kolore sekretua gehitu eta nahasketa bidali. Nahasketa publikotik kolore sekretua bereiztea ezinezkoa da (noranzko bakarreko tranpa-atea). Baina biek amaieran kolore komun sekretu bera lortzen dute."
  },
  {
    "id": 104,
    "blokea": 4,
    "kategoria": "Hash Funtzioak",
    "galdera": "Argon2id funtzioak zein hiru parametro nagusi doitzen ditu pasahitzen babesa indartzeko?",
    "aukerak": [
      "Pantailaren kolorea, distira-maila eta kontrastea interfaze grafikoan erakusteko.",
      "Gakoaren luzera, fitxategiaren izena eta luzapen mota diskoan biltegiratzeko.",
      "Denbora-kostua (iterazioak), memoria-kostua (RAM erabilera) eta paralelismo-maila (hariak).",
      "Sareko ataka, zerbitzariaren IP helbidea eta domeinu-izenaren karaktere kopurua."
    ],
    "zuzena": 2,
    "azalpena": "Argon2id-ek hiru kostu definitzen ditu: 1) Time cost (t): iterazio kopurua, 2) Memory cost (m): zenbat KB/MB RAM behar diren kalkulatzeko (GPU eta ASIC erasoak gelditzeko funtsezkoa), eta 3) Parallelism (p): zenbat CPU hari erabiliko diren aldi berean."
  },
  {
    "id": 105,
    "blokea": 5,
    "kategoria": "Sinadura Digitala eta PKI",
    "galdera": "Zer da CA baten 'Erroko Ziurtagiri Autofirmatua' (Root CA)?",
    "aukerak": [
      "Bakarrik froga-inguruneetan balio duen ziurtagiri baliogabea, ekoizpenean erabiltzea debekatuta dagoena.",
      "Konfiantza-katearen gailurreko ziurtagiria, bere burua sinatzen duena eta OSetan aurrez instalatuta datorrena.",
      "Webgune guztiek Interneteko biltegi batetik doan eta inolako kontrolik gabe deskargatzen dutena.",
      "Erabiltzailearen pasahitz guztiak zifratuta biltzen dituen disko gogorreko fitxategi sekretua."
    ],
    "zuzena": 1,
    "azalpena": "Root CA (adib. DigiCert, Izenpe) konfiantza-katearen oinarria da. Ezin du inork bere gainetik sinatu; horregatik bere gako pribatuarekin bere burua sinatzen du (self-signed). Bere gako publikoa sistema eragile eta nabigatzaileetan aurrez instalatuta dator 'Trusted Root Certification Authorities' biltegian."
  },
  {
    "id": 106,
    "blokea": 6,
    "kategoria": "Gakoen Kudeaketa",
    "galdera": "Zer da KEK (Key Encryption Key) zibersegurtasuneko arkitekturetan?",
    "aukerak": [
      "Datuak zifratzen dituzten gako operatiboak (DEK) biltegiratzean zifratuta mantentzeko gako maisua.",
      "Teklatuan maiuskulak blokeatzeko erabiltzen den tekla fisikoa eta bere kontrolagailu elektronikoa.",
      "Erabiltzaileek aplikazioan sartzeko erabiltzen duten lau digituko pasahitz labur eta finkoa.",
      "Linux sistema eragilearen nukleoan zereginak kudeatzeko integratutako programazio-modulua."
    ],
    "zuzena": 0,
    "azalpena": "Envelop Encryption eredua: Datuak DEK (Data Encryption Key) batekin zifratzen dira (azkarra). DEK gako horiek, ordea, KEK (Key Encryption Key) gako maisu batekin zifratuta gordetzen dira diskoan. KEK gakoa HSM edo KMS batean babesten da eta sekula ez da handik ateratzen."
  },
  {
    "id": 107,
    "blokea": 7,
    "kategoria": "Biltegiratze Segurua",
    "galdera": "Linuxeko LUKS disko-zifratzean, zein enkriptatze-modu lehenesten da datuak babesteko?",
    "aukerak": [
      "AES-ECB modua, bloke bakoitza modu independentean zifratzen duena azkartasun handiz.",
      "DES-CBC modua, bloke zaharren arteko XOR eragiketak aplikatzen dituena diskoan.",
      "AES-XTS-plain64 modua, sektore-zifratzerako bereziki diseinatutako IEEE estandarra.",
      "RC4 fluxu-zifratzea, disko gogorreko byteak jarraian eta atzerapenik gabe babesteko."
    ],
    "zuzena": 2,
    "azalpena": "XTS (XEX Tweakable Block Cipher with Ciphertext Stealing) sektorizatutako biltegiratze-zifratzerako (FDE) IEEE 1619 estandarra da. LUKS-ek 'aes-xts-plain64' erabiltzen du: sektore bakoitzaren zenbakia 'tweak' gisa erabiltzen du, bi blokek eduki bera izan arren zifratu desberdina sortzeko diskoan."
  },
  {
    "id": 108,
    "blokea": 7,
    "kategoria": "Kriptografia Poskuantikoa",
    "galdera": "Zer da 'Kripto-Agilitatea' (Crypto-Agility) erakundeen sistemetan?",
    "aukerak": [
      "Garatzaileek gako kriptografikoak teklatuan azkarrago idatzi eta kargatzeko duten trebezia teknikoa.",
      "Sistemako gako eta ziurtagiri guztiak aldi berean ezabatzeko eta hutsetik hasteko agindua.",
      "Zifratze simetrikotik asimetrikora sareko konexio bakoitzean automatikoki aldatzeko metodoa.",
      "Sistema bat diseinatzeko gaitasuna, algoritmo bat haustean azpiegitura berritu gabe berri batera erraz pasatzeko."
    ],
    "zuzena": 3,
    "azalpena": "Kripto-agilitatea (Crypto-Agility): sistemak (TLS, VPN, datu-baseak) era modularrean diseinatzea da, algoritmo kriptografikoak erraz ordezkatu ahal izateko. Adibidez, konputazio kuantikoak RSA hausten duenean, sistema osoa berriz programatu gabe konfigurazio-aldaketa baten bidez ML-KEM/ML-DSAra pasatzeko gaitasuna."
  }
];
