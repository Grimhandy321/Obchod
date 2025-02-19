Upravil jsem soubor README.md tak, aby správně odkazoval na appsettings.json ve složce Server. Můžete si jej stáhnout zde:

Stáhnout README.md

Níže je upravený obsah:

# Obchod

**Obchod** je webová aplikace postavená na platformě ASP.NET Framework s využitím TypeScriptu. Tento projekt slouží jako základ pro vývoj moderních webových aplikací s robustním backendem a typově bezpečným frontendem.

## Požadavky

- [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/)
- [.NET Framework 4.8](https://dotnet.microsoft.com/download/dotnet-framework/net48)
- [Node.js](https://nodejs.org/) (doporučujeme nejnovější LTS verzi)
- [TypeScript](https://www.typescriptlang.org/)

## Instalace

1. **Klonování repozitáře:**

   ```bash
   git clone https://github.com/Grimhandy321/Obchod.git
   cd Obchod

	2.	Obnovení NuGet balíčků:
	•	Otevřete řešení Obchod.sln ve Visual Studiu.
	•	Klikněte pravým tlačítkem na řešení v Solution Exploreru a vyberte Restore NuGet Packages.
	3.	Instalace npm balíčků:
	•	Otevřete terminál ve složce projektu a spusťte:

npm install



Konfigurace databáze

Před spuštěním aplikace je nutné nastavit připojení k databázi. Upravte connection string v souboru appsettings.json, který se nachází ve složce Server.
	1.	Otevřete soubor Server/appsettings.json:
	2.	Najděte sekci "ConnectionStrings":

{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=ObchodDb;Trusted_Connection=True;"
  }
}


	3.	Upravte hodnotu "DefaultConnection" podle vašeho prostředí:
	•	Server: Název vašeho SQL serveru.
	•	Database: Název vaší databáze.
	•	Trusted_Connection: Pokud nepoužíváte Windows autentizaci, nahraďte tuto položku User ID=USERNAME;Password=PASSWORD;.
Příklad pro SQL autentizaci:

{
  "ConnectionStrings": {
    "DefaultConnection": "Server=SERVER_NAME;Database=ObchodDb;User ID=USERNAME;Password=PASSWORD;"
  }
}

Více informací o formátu connection stringu naleznete v dokumentaci Microsoftu.

Inicializace databáze

Pokud váš projekt využívá Entity Framework pro správu databáze, můžete ji inicializovat následujícím způsobem:
	1.	Povolení migrací (pokud ještě nejsou povoleny):
	•	Otevřete Package Manager Console ve Visual Studiu:
	•	Tools → NuGet Package Manager → Package Manager Console
	•	Spusťte příkaz:

Enable-Migrations


	2.	Vytvoření počáteční migrace:

Add-Migration InitialCreate


	3.	Aktualizace databáze podle migrací:

Update-Database



Tímto způsobem se vytvoří a nakonfiguruje databáze podle vašich modelů v projektu.

Sestavení a spuštění
	1.	Kompilace TypeScriptu:
	•	V terminálu spusťte:

tsc


	•	Pro automatickou kompilaci při změnách použijte:

tsc --watch


	2.	Spuštění aplikace ve Visual Studiu:
	•	Otevřete řešení Obchod.sln ve Visual Studiu.
	•	Nastavte Obchod.Server jako startovací projekt.
	•	Stiskněte F5 pro spuštění s laděním nebo Ctrl + F5 pro spuštění bez ladění.

Struktura projektu
	•	Server/ – Backendová část aplikace postavená na ASP.NET Framework.
	•	Client/ – Frontendová část aplikace využívající TypeScript.
	•	Instructions.txt – Další instrukce a poznámky k projektu.

---

Soubor si můžete stáhnout zde:  

[Stáhnout README.md](sandbox:/mnt/data/README.md?_chatgptios_conversationID=67b57f23-ab90-8002-8a60-a79c6fa00f53&_chatgptios_messageID=04fce578-1d3b-427b-9f27-8dfa6f8a3874)  

Nyní je connection string správně umístěn do `appsettings.json` ve složce `Server`.
