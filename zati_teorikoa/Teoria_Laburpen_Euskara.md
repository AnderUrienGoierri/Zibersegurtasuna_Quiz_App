# Kriptografia: Azterketa Teorikorako Laburpen Integrala (Euskaraz)

**Iturria:** `kriptografia_estebe.pdf`  
**Modulua:** Zibersegurtasuna (1. Ebaluaketa) — 2MG3 Zibersegurtasuna  
**Ikastetxea:** Goierri Eskola  
**Formatua:** Kontzeptu teorikoak, taulak, funtsezko ideiak eta azterketarako tranpa tipikoak.

---

> [!NOTE]
> **Azterketaren Egitura Teorikoa:**
> * 20 galderako inkesta (galdera bakoitzak 4 aukera, bat zuzena).
> * Galderak **kontzeptualak** dira: ez da koderik ikasi behar, baina kontzeptuak zehaztasun handiz ulertu behar dira.

---

## 1. BLOKEA: OINARRIZKO KONTZEPTUAK

### 1.1. Kriptografia, Kriptoanalisia eta Esteganografia
Kriptologia bi arlotan banatzen da:
* **Kriptografia:** Informazioa babesteko teknikak diseinatzen dituen diziplina da. Mezuaren **esanahia ezkutatzen** du (adib. fitxategi bat AES bidez zifratzea). Baina mezua badagoela ikusten da.
* **Kriptoanalisia:** Sistema kriptografikoak gakoa ezagutu gabe hausteko edo ahultzeko zientzia eta teknikak dira.
* **Esteganografia:** Mezuaren **existentzia bera ezkutatzea** du helburu (oharkabean pasatzea). Adibidez, irudi baten pixel-en bit ez-esanguratsuenetan (LSB) testua ezkutatzea.
* **Segurtasun maximoa:** Mezua zifratu eta, ondoren, esteganografia bidez ezkutatzea.

### 1.2. Zifratu, Deszifratu, Kodetu eta Enkriptatu
* **Zifratu (*Cifrar*):** Testu arrunta testu zifratu bihurtzea algoritmo eta **gako sekretu** baten bidez.
* **Deszifratu (*Descifrar*):** Testu zifratutik jatorrizko testua berreskuratzea gako egokia erabiliz.
* **Kodetu (*Codificar*):** Datuak formatu publiko eta estandar baten bidez adieraztea (Base64, UTF-8, hexadezimalean). **EZ DU GAKORIK BEHAR**. Helburua datu-bateragarritasuna da, **ez sekretua**.
* **Enkriptatu (*Encriptar*):** *Encrypt* ingelesezko hitzaren mailegua da. Erabilera arruntean sinonimotzat hartzen da, baina teknikoki *zifratu* da zuzena.

> [!WARNING]
> **Ohiko Akatsa Azterketan:** Base64k **EZ DU BABESTEN**. Pasahitzak Base64z gordetzea testu argian idaztea bezalakoa da, edonork alderantzika dezakeelako gakorik gabe.

### 1.3. Kerckhoffs-en Printzipioa (1883)
* **Arau Nagusia:** Sistema kriptografiko baten segurtasunak **GAKOAREN SEKRETUTASUNAREN MENDE BAKARRIK** egon behar du, ez algoritmoaren sekretutasunaren mende.
* **Claude Shannon-en laburpena:** *"Etsaiak sistema ezagutzen du"*.
* **Arrazoia:** Algoritmo sekretuak ez ditu komunitate zientifikoak aztertu eta ahultasunak berandu azaleratzen dira. Algoritmo sekretu bat filtratzen bada sistema osoa bota behar da; gakoa filtratzen bada, nahikoa da gako berri bat sortzea. *"Segurtasuna iluntasunaren bidez"* (*security through obscurity*) praktika oso txarra da.

### 1.4. Informazio-Segurtasuneko 4 Helburuak
| Helburua | Zer bermatzen du? | Zein teknikak estaltzen du? |
| :--- | :--- | :--- |
| **Konfidentzialtasuna** | Baimendutako pertsonek bakarrik irakur dezakete informazioa. | Zifratzea (simetrikoa, asimetrikoa, hibridoa). |
| **Osotasuna (*Integrity*)** | Informazioa baimenik gabe ez dela aldatu edo manipulatu. | Hash funtzioak, HMAC, Sinadura Digitala, AEAD (GCM). |
| **Autentikotasuna** | Igorlearen identitatea benetakoa dela egiaztatzea. | Sinadura digitala, ziurtagiriak, HMAC, pasahitzak. |
| **Ukatzerik eza (*No repudio*)** | Egileak ezin du ukatu berak sortu edo bidali duenik. | **Sinadura digitala gako asimetrikoarekin**, ziurtagiria eta denbora-zigilua. |

> [!IMPORTANT]
> **HMAC vs Sinadura Digitala:** HMAC-ek osotasuna eta autentikotasuna ematen ditu, baina **EZ UKATZERIK EZA (no repudio)**, gakoa igorleak eta hartzaileak partekatzen dutelako eta biek sor dezaketelako kode bera. Ukatzerik eza lortzeko pertsona bakar batek duen gako pribatua behar da!

---

## 2. BLOKEA: ZIFRATZE SIMETRIKOA

### 2.1. Nola funtzionatzen du?
* **Gako bera** erabiltzen da zifratzeko eta deszifratzeko ($C = Cifrar(K, M)$ eta $M = Descifrar(K, C)$).
* **Muga nagusia:** Gakoa aldez aurretik kanal seguru batetik partekatu behar da.

### 2.2. Bloke-zifratzea vs Fluxu-zifratzea
* **Bloke-zifratzea:** Mezua tamaina finkoko bloketan banatzen du (128 bit AES-en, 64 bit DES-en) eta bloke bakoitza zifratzen du. Funtzionamendu-modua eta betegarria (*padding*) behar ditu. Adibideak: DES, 3DES, AES.
* **Fluxu-zifratzea:** Sasi-ausazko sekuentzia bat (*keystream*) sortzen du gakoarekin eta datuekin XOR egiten du bit/byte bakoitzean. Ausazko balio bakarra (*nonce*) behar du, gako berarekin sekula errepikatu ezin dena. Adibideak: ChaCha20 (RC4 zaharkitua).

### 2.3. Blokeen Funtzionamendu Moduak
| Modua | Funtzionamendua | Arriskuak / Oharrak |
| :--- | :--- | :--- |
| **ECB (Electronic Codebook)** | Bloke bakoitza independenteki zifratzen da gako berarekin. | **INOIZ EZ ERABILI**. Patroiak mantentzen ditu (irudien siluetak ikusten jarraitzen du). Ez du IV-rik erabiltzen. |
| **CBC (Cipher Block Chaining)** | Bloke bakoitza aurreko bloke zifratuarekin XOR egiten da. Lehenengoak ausazko IV bat behar du. | Patroiak ezkutatzen ditu. Ez du autentifikaziorik ematen. Gaizki eginez gero *padding oracle* erasoei bide ematen die. Ezin da paralelizatu. |
| **GCM (Galois/Counter Mode)** | Kontagailu modua (AES fluxu bihurtuz) + autentifikazio-etiketa (AEAD). | **Gomendatuena eta estandarra (TLS 1.2/1.3)**. Konfidentzialtasuna eta osotasuna aldi berean. Azkarra eta paralelizagarria. Nonce-a ez da inoiz berrerabili behar. |

### 2.4. Algoritmoen Egoera Gaur Egun
* **DES (1977):** 64 biteko blokea, 56 biteko gako eraginkorra. **Ez-segurua**. Indar gordin bidez ordu gutxitan hausten da.
* **3DES:** 64 biteko blokea. **Zaharkitua**. Motela da eta Sweet32 erasoaren aurrean zaurgarria (NIST-ek erretiratua 2023an).
* **AES (2001):** 128 biteko blokea; 128, 192 edo 256 biteko gakoak. **Segurua eta munduko estandarra**. Hardware bidezko azelerazioa du (AES-NI).
* **ChaCha20-Poly1305:** 256 biteko fluxu-zifratzea. **Oso segurua eta azkarra softwarean**. Bikaina mugikorrentzat (AES azeleraziorik ez dutenentzat). WireGuard, TLS 1.3 eta SSH-n erabilia.

### 2.5. Gakoen Banaketa Arazoa
* $n$ pertsonek elkarrekin modu seguruan komunikatzeko $\frac{n(n-1)}{2}$ gako simetriko behar dira (100 pertsonarentzat $\rightarrow$ 4.950 gako). Arazo hori Kriptografia Asimetrikoak konpontzen du.

---

## 3. BLOKEA: ZIFRATZE ASIMETRIKOA

### 3.1. Gako Publikoa eta Pribatua
Matematikoki elkarrekin lotutako bi gako daude:
* **Gako Publikoa:** Edonork ezagut dezake. Jabeari mezuak zifratzeko eta jabearen sinadurak egiaztatzeko balio du.
* **Gako Pribatua:** Jabeak bakarrik ezagutzen du, sekula ez da partekatzen. Mezuak deszifratzeko eta agiriak sinatzeko balio du.

| Erabilera | Zer egin nahi da? | Igorleak zer erabiltzen du? | Hartzaileak zer erabiltzen du? |
| :--- | :--- | :--- | :--- |
| **Konfidentzialtasuna** | Mezu sekretu bat bidali | Hartzailearen **gako publikoa** | Bere **gako pribatua** |
| **Autentikotasuna / Sinadura** | Agiria sinatu eta egiletza frogatu | Bere **gako pribatua** | Igorlearen **gako publikoa** |

### 3.2. Algoritmoak eta Oinarri Matematikoa
Noranzko bakarreko tranpa-ate funtzioetan oinarritzen dira:
* **RSA (1977):** Zenbaki lehen handien biderkadura erraza da; biderkadura horren faktorizazioa bideraezina. Gutxienez 2048 bit gomendatzen dira (3072 bit epe luzerako).
* **Diffie-Hellman (1976):** Logaritmo diskretuan oinarritua ($g^x \pmod p$). Bi alderdik sekretu partekatu bat adosten dute (ez ditu datuak zifratzen).
* **ECC (Kurba Eliptikoak):** Logaritmo diskretua kurba eliptiko baten puntuen gainean. Segurtasun berbera eskaintzen du gako askoz laburragoekin (adib. **ECC 256 bit $\approx$ RSA 3072 bit**). Mugikorretan, IoT gailuetan eta txartel adimendunetan oso erabilia (P-256, Curve25519).

### 3.3. Zifratze Hibridoa (Zergatik konbinatzen ditu HTTPSk biak?)
* Asimetrikoa segurua da gakoak trukatzeko baina **ehunka/milaka aldiz motelagoa** da.
* Simetrikoa oso azkarra da baina gakoa nola bidali arazoa du.
* **Zifratze Hibridoa:**
  1. Asimetrikoa erabiltzen da (ECDHE eta zerbitzariaren sinadura) zerbitzaria autentifikatzeko eta saio-gako iragankor bat adosteko.
  2. Saio-gako horrekin trafiko osoa zifratze simetriko azkarrez (AES-GCM edo ChaCha20) zifratzen da.

---

## 4. BLOKEA: HASH FUNTZIOAK

### 4.1. Zer da eta zein propietate ditu?
Edozein tamainatako sarrera bat hartu eta **luzera finkoko** kate bat sortzen du (laburpena edo hatz-marka). **EZ DA ZIFRATZEA**, ez dago gakorik eta ezin da "deszifratu".
1. **Determinsta:** Sarrera berak beti hash bera ematen du.
2. **Tamaina finkoa:** Sarrerak 1 byte edo terabyteak izan, irteera berdin okupatzen du (256 bit SHA-256n).
3. **Elur-jausi efektua (*Avalanche Effect*):** Sarreran bit bakarra aldatuta ere hash-aren erdia aldatzen da erabat.
4. **Aurreirudiaren erresistentzia (*Preimage resistance*):** Hash bat emanda ezinezkoa da jatorrizko mezua aurkitzea (noranzko bakarrekoa).
5. **Bigarren aurreirudiaren erresistentzia:** Mezu bat emanda ezinezkoa da hash bera duen beste mezu bat aurkitzea.
6. **Talken erresistentzia (*Collision resistance*):** Ezinezkoa da hash bera duten edozein bi mezu aurkitzea. Urtebetetzearen paradoxagatik $2^{n/2}$ eragiketa behar dira.

### 4.2. Algoritmoen Egoera
* **MD5 (128 bit):** **Hautsita** 2004tik aurrera. Talkak segundotan sortzen dira ordenagailu arrunt batean.
* **SHA-1 (160 bit):** **Hautsita** (SHAttered erasoa Google-k 2017an).
* **SHA-2 (SHA-256, SHA-512):** **Segurua**. Gaur egungo estandarra.
* **SHA-3 (Keccak):** **Segurua**. Belaki-arkitektura du, SHA-2ren erreserba sendo gisa.

### 4.3. Pasahitzak: Gatzak eta KDF motelak
* **Zergatik ez SHA-256 pasahitzetarako?** SHA-256 oso azkarra da (GPU batek segundoko milaka milioi kalkulatzen ditu).
* **Gatza (*Salt*):** Erabiltzaile bakoitzeko ausazko balio publikoa. Erabiltzaile berberek hash desberdinak izatea lortzen du eta Ortzadar-taulak (*Rainbow tables*) deuseztatzen ditu.
* **Pimienta (*Pepper*):** Aplikazio mailako gako sekretua, HSM edo konfigurazioan gordea (ez datu-basean).
* **Funtzio motelak (KDF):** **Argon2id** (OWASP gomendio nagusia), **bcrypt**, **scrypt**, **PBKDF2**.

---

## 5. BLOKEA: SINADURA DIGITALA, ZIURTAGIRIAK ETA PKI

### 5.1. Nola sinatzen da?
* Agiri osoa zifratzea motelegia denez, **agiriari SHA-256 hash-a ateratzen zaio eta hash hori egilearen gako PRIBATUAREKIN zifratzen da**.
* Egiaztatzean, hartzaileak agiriaren hash-a kalkulatzen du eta egilearen gako PUBLIKOAREKIN sinadura deszifratzen du. Biak berdinak badira, baliozkoa da.
* **Bermatzen duena:** Osotasuna, Autentikotasuna eta Ukatzerik eza.
* **EZ duena bermatzen:** **Konfidentzialtasuna** (agiria argi eta garbi irakur daiteke).

### 5.2. X.509 Ziurtagiriak eta CA
* Gako publikoa eta nortasun bat elkarrekin lotzen dituen agiria da, CA (*Certificate Authority*) fidagarri batek sinatua.
* **Konfiantza-katea:** Gunearen ziurtagiria $\rightarrow$ Tarteko CA $\rightarrow$ Erroko CA (nabigatzailean aurrez instalatua).
* **Baliogabetzea:** CRL zerrendak edo OCSP protokoloa.

### 5.3. TLS 1.3 Handshake (1 RTT)
1. **ClientHello:** Bezeroak zifratze-suiteak eta Diffie-Hellman efimeroaren gako publikoa (ECDHE) bidaltzen ditu.
2. **ServerHello:** Zerbitzariak bere ECDHE balio publikoa bidaltzen du. Biek saio-gakoa kalkulatzen dute.
3. **Ziurtagiria eta Sinadura:** Zerbitzariak bere X.509 ziurtagiria bidaltzen du eta trukea sinatzen du identitatea frogatzeko.
4. **Forward Secrecy (*Secreto hacia adelante*):** Gako efimeroei esker, etorkizunean zerbitzariaren gako pribatua lapurtuko balitz ere, iraganeko elkarrizketak ezin dira deszifratu.

### 5.4. Legedia eta Erakundeak
* **DNIe:** Txip batean 2 ziurtagiri: Autentifikaziorako eta Sinadurarako.
* **FNMT:** Erakunde jaulkitzaile publikoa (4 urteko baliozkotasuna).
* **eIDAS (UE 910/2014):** Sinadura kalifikatuak (*cualificada*) eskuz idatzitakoaren balio juridiko bera du.

---

## 6. BLOKEA: GAKO-KUDEAKETA ETA ERASOAK

### 6.1. Bizi-zikloa eta Entropia
* **Ausazkotasuna:** CSPRNG erabili behar da (`/dev/urandom`, `SecureRandom`). Inoiz ez `rand()` edo denbora-hazirik.
* **Biltegiratzea:** HSM, KMS edo Vault batean; inoiz ez kode-iturrian.
* **Suntsitzea (*Crypto-erase*):** Gakoa suntsitzea datuak berak suntsitzea da.
* **Entropia:** $E = L \cdot \log_2(N)$. Ausazko hitzez osatutako **passphrase** luze batek (Diceware) sinboloak dituen pasahitz motz batek baino entropia askoz handiagoa du eta errazago gogoratzen da.

### 6.2. Eraso Nagusiak
* **Indar gordina (*Brute force*):** Gako posible guztiak probatzea.
* **Ortzadar-taulak (*Rainbow tables*):** Aurrez kalkulatutako hash-taulak (Gatzak ezerezean uzten ditu).
* **MitM (*Man-in-the-Middle*):** Erdian jarrita trafikoa atzematea (TLS ziurtagiriek saihesten dute).
* **Heartbleed (CVE-2014-0160):** OpenSSL-ren programazio-akatsa (buffer over-read) Heartbeat luzapenean. Ez zen matematikaren akatsa izan, C kodearen balidazio eza baizik; zerbitzariaren RAMeko 64 KB irakurtzea eta gako pribatuak lapurtzea ahalbidetu zuen.
* **Urrezko Araua:** *"Ez inplementatu zure kriptografia propioa"*; erabili egiaztatutako liburutegiak (OpenSSL, libsodium).

---

## 7. BLOKEA: ZABALTZEA ETA ETORKIZUNA

### 7.1. Kriptografia Klasikoa
* **Zesar, Vigenère, Enigma:** Espazio txikia dute eta hizkuntzaren maiztasun-estatistikak mantentzen dituzte. Gaur egungo ordenagailuek berehala hausten dituzte.

### 7.2. Disko-zifratzea (LUKS, BitLocker, VeraCrypt)
* Datuak atsedenean (*data at rest*) babesten dituzte: ordenagailua itzalita dagoenean datuak ilegibleak dira.
* **Muga:** Ordenagailua piztuta eta saioa desblokeatuta dagoenean **EZ DU BABESTEN** martxan dagoen malware baten aurrean.

### 7.3. Blockchain eta Kriptomonetak
* **EZ DU DATURIK ZIFRATZEN:** Bitcoin transakzio guztiak publikoak dira.
* **Hash-ak:** Blokeak kateatzeko (Merkle zuhaitza) eta lan-froga egiteko (Proof of Work).
* **Sinadura Digitala:** Transakzioak baimentzeko (ECDSA secp256k1).

### 7.4. Konputazio Kuantikoa eta PQC (Post-Quantum Cryptography)
* **Shor-en algoritmoa:** RSA, Diffie-Hellman eta ECC **HAUTSI** egiten ditu (faktorizazioa eta logaritmo diskretua azkartuz).
* **Grover-en algoritmoa:** Indar gordina azkartzen du (erro karratua). AES-256 eta SHA-256 seguru mantentzen dira gakoen tamaina bikoiztuz.
* **NIST estandar berriak (2024):**
  - **FIPS 203 (ML-KEM):** Gako-adostasuna (Diffie-Hellman ordezkatzen du, Kyber-en oinarritua).
  - **FIPS 204 (ML-DSA):** Sinadura digitala (Dilithium-en oinarritua).
  - **FIPS 205 (SLH-DSA):** Hash funtzioetan bakarrik oinarritutako sinadura.
