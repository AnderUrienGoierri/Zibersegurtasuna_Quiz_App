# 🛡️ KriptoQuiz 2026 — Zibersegurtasuna (2MG3)

> **Goierri Eskola** | 2. Maila — Zibersegurtasuna (1. Ebaluazioko Azterketa Prestatzeko Aplikazio Osoa)  
> **Egilea:** Ander Urien Telleria (`AnderUrienGoierri`)

---

## 📌 Aurkezpena

Aplikazio interaktibo oso bat da (Android natiboa zein Web bertsioa), 1. ebaluazioko Zibersegurtasuneko azterketa teorikoa eta praktikoa errepasatu, simulatu eta entrenatzeko diseinatua.

Aplikazioak irakaslearen (`Estebe Ormazabal Urbieta`) azterketa-eredu zehatza jarraitzen du:
* **Zati Teorikoa:** 20 galderako simulazio automatikoak (108 galderako bankutik ausaz), erantzun zuzenak algoritmo bidez nahastuta eta berehalako azalpen teknikoekin.
* **Zati Praktikoa:** Kali Linux (`192.168.56.105`) ⚔️ Metasploitable 2 (`192.168.56.104`) laborategi osoa, 23 TCP portuen Nmap writeup-a, vsftpd atzeko atea, Netcat 1524 zuzeneko root shell-a, Samba RCE, MySQL eta OpenSSL komando guztiak klik bakarrez kopiatzeko botoiekin.

---

## 🚀 Ezaugarri Nagusiak

### 1. 📚 Zati Teorikoa (108 Galdera & Sintaxi Koloreztatua)
* **7 Bloke Teorikoak:**
  1. Oinarrizko Kontzeptuak (Zibersegurtasunaren printzipioak, eraso motak, arriskuak).
  2. Zifratze Simetrikoa (AES-256, CBC, GCM, CTR, ECB, gatza/salt, IV).
  3. Zifratze Asimetrikoa (RSA, Diffie-Hellman, ElGamal, ECC).
  4. Hash Funtzioak (SHA-256, MD5, talkak, ortzadar-taulak).
  5. Sinadura Digitala eta PKI (X.509 ziurtagiriak, CA, CSR, CRL, OCSP).
  6. Gako-Kudeaketa eta Erasoak (CSPRNG, Replay, MITM, Brute Force).
  7. Zabaltzea (Zesar/Vigenere, LUKS/BitLocker, Post-Quantum PQC).
* **Sintaxi-Nabarmendura (Syntax Highlighting):** Aginduak (ziana), banderak (anbarra), algoritmoak (bioleta), IP/atakak (berdea) eta CVEak (arrosa) automatikoki koloreztatuta agertzen dira.
* **Joko Moduak:** Azterketa Simulatua (20 galdera denborarekin), Ikasketa Librea, Gai-Blokeka entrenatzea eta Huts Egindakoak Berrikustea.

### 2. ⚡ Zati Praktikoa: Kali Linux ⚔️ Metasploitable 2 Kasu Praktikoa (23 Gai)
* **Host-Only Isolamendua (`192.168.56.0/24`):** Zergatik eta nola konfiguratu VirtualBox eskolako sarean alertarik ez sortzeko.
* **Nmap Errekonozimendu Sakona (2.D Praktika):** `nmap -sV -O -sC 192.168.56.104` eta 23 ataka irekien zerrenda osoa.
* **Ustiapenak (Exploitation):**
  * `vsftpd 2.3.4` atzeko atea (`CVE-2011-2523`) Metasploit eta Telnet bidez.
  * **Port 1524 Ingreslock:** Root shell zuzena `nc 192.168.56.104 1524` bidez (Metasploit gabe!).
  * `Samba 3.0.20` usermap_script RCE (`CVE-2007-2447`).
  * `MySQL 5.0.51a` sarbidea pasahitzik gabe eta DVWA hash-ak erauztea.
  * `DVWA` (Damn Vulnerable Web App): SQL Injection login bypass (`admin' -- `) eta UNION SELECT.
  * `OWASP Juice Shop` Docker bidez (`localhost:3000/#/score-board`).
  * Makinak garbi itzaltzea (`sudo poweroff`).
* **OpenSSL Kriptografia Praktikoa:**
  * AES-256-CBC zifratu eta deszifratu gatza eta IV-rekin.
  * RSA 2048 gako-bikotea sortu, gako publikoa erauzi, zifratu eta deszifratu.
  * SHA-256 sinadura digitala sortu eta egiaztatu.
  * HMAC eta `sha256sum` osotasun-egiaztapena.

---

## 💻 Nola Erabili Ordenagailuan (Portatila / PC)

### A Aukera (Gomendatua):
1. Egin klik bikoitza **`ABIARAZI_PORTATILEAN.bat`** fitxategian.
2. Automatikoki irekiko da zure nabigatzailea `http://localhost:3000` helbidean.

### B Aukera (Zuzenean nabigatzailean):
1. Joan `zati_teorikoa/` karpetara.
2. Egin klik bikoitza **`index.html`** fitxategian.

---

## 📱 Nola Instalatu Android Mugikorrean

1. Deskargatu karpetan dagoen **`Zibersegurtasuna_Quiz_2MG3.apk`** fitxategia (5.7 MB).
2. Zure mugikorrean fitxategia ireki eta eman baimena (*"Instalar aplicaciones desconocidas"*).
3. Segundotan aplikazio osoa instalatuta izango duzu ikono pertsonalizatuarekin eta offline erabili ahal izango duzu edonon.

---

## 📂 Proiektuaren Egitura

```text
├── ABIARAZI_PORTATILEAN.bat            # Ordenagailuan klik bakarrean abiarazteko script-a
├── Zibersegurtasuna_Quiz_2MG3.apk       # Android mugikorretarako APK instalagarria
├── Zibersegurtasuna_Web_App.zip        # Web bertsio trinkoa (PC/iOS erabiltzaileentzat)
├── azkerketa_eredua.png                # Irakaslearen azterketa-ereduaren argibideak
├── README.md                           # Proiektuaren dokumentazio orokorra
│
├── zati_praktikoa/
│   ├── Azterketa_Praktikoa_Gida_Osoa.md     # 28 KB-ko laborategi eta ariketen gida sakona
│   └── Azterketa_Praktikoa_Txuleta_Azkarra.md # Orrialde bakarreko txuleta bizkorra
│
└── zati_teorikoa/
    ├── index.html                      # Web interfaze nagusia (PWA)
    ├── styles.css                      # Diseinu iluna, sintaxi-koloreak eta responsive
    ├── app.js                          # Aplikazioaren logika (testak, sintaxi nabarmentzailea)
    ├── practical_data.js               # 23 gai praktikoak, komandoak eta tranpak
    ├── questions_data.js               # 108 galdera teorikoak feedbackekin
    ├── galderak.json                   # Galderen JSON datu-base gordina
    ├── server.js                       # Tokiko HTTP zerbitzaria (Node.js)
    └── zibersegurtasuna_quiz_app/      # Android Studio proiektu natiboa (Gradle + WebView)
```

---

## ⚖️ Lizentzia eta Erabilera

Proiektu hau hezkuntza-helburuetarako sortua da **Goierri Eskolako 2MG3 Zibersegurtasuna** modulurako. Baimendua dago gelakideek libreki erabiltzea eta partekatzea.
