# 🛒 Obchod – Internetový obchod

## 📌 Anotace

Projekt **Obchod** představuje webovou aplikaci internetového obchodu, postavenou na platformě ASP.NET Framework s využitím TypeScriptu. Cílem je vytvořit moderní a bezpečný e-shop s robustním backendem a typově bezpečným frontendem, který umožní uživatelům pohodlně nakupovat produkty online.

## 📝 Úvod

Internetový obchod **Obchod** je navržen jako plně funkční e-commerce platforma, která poskytuje uživatelům možnost prohlížet produkty, přidávat je do košíku a provádět objednávky. Backend aplikace je postaven na ASP.NET Frameworku 4.8, což zajišťuje stabilní a výkonné serverové prostředí. Frontend je vyvíjen v TypeScriptu, což přispívá k lepší udržovatelnosti a předcházení chybám během vývoje.

Projekt je strukturován do dvou hlavních částí:

- **Obchod.Server**: Zajišťuje serverovou logiku, správu dat a API rozhraní.
- **obchod.client**: Obsahuje klientskou část aplikace, která komunikuje s backendem a poskytuje uživatelské rozhraní.

Cílem tohoto projektu je nejen vytvořit funkční internetový obchod, ale také poskytnout základ pro další rozšiřování a přizpůsobení specifickým potřebám.

## 📊 Ekonomická rozvaha

### Konkurence

Na trhu existuje mnoho e-commerce řešení, jako jsou Shopify, WooCommerce nebo Magento. Tyto platformy nabízejí širokou škálu funkcí, ale často jsou spojeny s vyššími náklady nebo omezenou možností přizpůsobení.

### Výhody projektu Obchod

- **Flexibilita**: Díky vlastnímu vývoji je možné aplikaci přizpůsobit konkrétním požadavkům bez omezení.
- **Nákladová efektivita**: Absence licenčních poplatků a možnost hostování na vlastních serverech snižuje provozní náklady.
- **Bezpečnost**: Použití moderních technologií a pravidelných aktualizací zajišťuje vysokou úroveň bezpečnosti.

### Propagace

- **Online marketing**: Využití sociálních sítí, SEO optimalizace a PPC kampaní.
- **Spolupráce**: Navázání partnerství s blogery a influencery v oblasti e-commerce.
- **Reference**: Vytvoření případových studií a prezentace úspěšných implementací.

### Návratnost investic

Předpokládá se, že investice do vývoje a propagace se vrátí během 12–18 měsíců, v závislosti na rozsahu a intenzitě marketingových aktivit.

## 🛠️ Vývoj

### Použité technologie

- **Backend**: ASP.NET Framework 4.8
- **Frontend**: TypeScript
- **Vývojové prostředí**: Visual Studio 2022
- **Další nástroje**: Node.js, NuGet balíčky

### Struktura programu

- **Obchod.Server**: Obsahuje kontrolery, modely a služby pro zpracování požadavků a správu dat.
- **obchod.client**: Implementuje uživatelské rozhraní a logiku pro interakci s API.

### Průběh vývoje

Vývoj probíhal iterativně s důrazem na testování a validaci jednotlivých komponent. Dokumentace je průběžně aktualizována a kód je opatřen komentáři pro lepší srozumitelnost.

## ✅ Testování

### Testovací scénáře

1. **Registrace uživatele**: Ověření funkčnosti registračního formuláře a validace vstupních dat.
2. **Přihlášení uživatele**: Testování autentizace a správy relací.
3. **Přidání produktu do košíku**: Kontrola správného přidání a aktualizace položek v košíku.
4. **Proces objednávky**: Simulace celého procesu od výběru produktu po potvrzení objednávky.
5. **Nasazení aplikace**: Ověření správné konfigurace a funkčnosti aplikace po nasazení na server.

### Výsledky testování

Všechny testovací scénáře byly úspěšně provedeny s očekávanými výsledky. Aplikace funguje stabilně a bez kritických chyb.

## 🚀 Nasazení

### Požadavky

- **Visual Studio 2022**
- **.NET Framework 4.8**
- **Node.js** (doporučena nejnovější LTS verze)
- **TypeScript**

### Postup nasazení

1. **Klonování repozitáře**:

   ```bash
   git clone https://github.com/Grimhandy321/Obchod.git
   cd Obchod
2. Obnovení NuGet balíčků:
   
   - Otevřete řešení Obchod.sln ve Visual Studiu.
   - Klikněte pravým tlačítkem na řešení a vyberte „Obnovit NuGet balíčky“.
   - V nuget console spuste prikaz upddate-database
3.  Instalace závislostí pro frontend:
   - Otevřete terminál ve složce obchod.client.
   - Spusťte příkaz npm install.
4. Sestavení a spuštění aplikace:
   - Ve Visual Studiu spusťte projekt Obchod.Server jako výchozí projekt.
   - Aplikace bude dostupná na http://localhost:5000 (nebo jiném konfigurovaném portu).
   
