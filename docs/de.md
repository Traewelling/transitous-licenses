# Lizenz bei Träwelling aktivieren

Träwelling zeigt nur Fahrten an, deren Fahrplandaten unter einer Lizenz stehen, die eine Nutzung durch uns erlaubt.
Bei vielen Quellen fehlt diese Information – solche Fahrten werden standardmäßig nicht angezeigt. Damit möglichst
viele Verbindungen sichtbar sind, pflegen wir Lizenzinformationen hier und im Transitous-Repo. Diese Anleitung zeigt,
wie du einen Eintrag ergänzen und einen Pull Request (PR) über die GitHub-Weboberfläche stellen kannst, ganz ohne
Kommandozeile.

## Wo gehört die Lizenz hin?

Lizenzen werden pro Feed im [Transitous](https://github.com/public-transport/transitous)-Repo gepflegt. **Dieses
Repository (`transitous-licenses`) ist eine temporäre Zwischenlösung** für proprietäre Lizenzen, die Transitous noch
nicht nativ unterstützt.

- **Bekannte Open-Source-Lizenz (z. B. CC-BY-4.0, ODbL-1.0):** Trage die Lizenz direkt
  im [Transitous-Feeds-Verzeichnis](https://github.com/public-transport/transitous/tree/main/feeds) beim jeweiligen Feed
  per SPDX-Bezeichner ein. Dieses Repository ist dafür **nicht** zuständig.
- **Eigene oder proprietäre Lizenz:** Verwende dieses Repository wie unten beschrieben.

Den richtigen SPDX-Bezeichner findest du unter https://spdx.org/licenses/.

## Schritt 1: Den richtigen Dateinamen herausfinden

Öffne https://traewelling.de/debug/motis-sources und suche die Quelle, für die du eine Lizenz hinzufügen möchtest. Merke
dir den genauen Dateinamen (z. B. `de_DELFI.gtfs.zip`).

## Schritt 2: Die Datei `licenses.json` auf GitHub öffnen

Navigiere im Repository zu [`licenses.json`](../licenses.json) und klicke oben rechts auf das Stift-Symbol ("Edit this
file").

## Schritt 3: Proprietäre Lizenz eintragen

Zuerst im Abschnitt `"proprietary_licenses"` einen neuen Eintrag hinzufügen:

```json
{
  "identifier": "Mein Verkehrsbetrieb Lizenz",
  "name": "Mein Verkehrsbetrieb Open Data Lizenz",
  "attribution_text": null,
  "url": "https://link-zur-lizenzbeschreibung.example"
}
```

Dann im Abschnitt `"sources"` darauf verweisen:

```json
{
  "file": "xx_Meine-Quelle.gtfs.zip",
  "spdx": null,
  "url": "https://link-zur-datenquelle.example",
  "custom_license": "Mein Verkehrsbetrieb Lizenz"
}
```

Der Wert bei `"custom_license"` muss exakt dem `"identifier"` aus `proprietary_licenses` entsprechen.

### Welche Lizenzen sind erlaubt?

Eine Lizenz muss folgende Bedingungen erfüllen:

- Nutzung, Weitergabe und Bearbeitung der Daten muss erlaubt sein
- Keine Lizenzgebühren oder Nutzungsentgelte
- Nicht produkt- oder technologiespezifisch
- Einschränkungen sind erlaubt, müssen aber klar angegeben sein (z. B. nur nichtkommerzielle Nutzung)

## Schritt 4: Pull Request erstellen

1. Scrolle auf der Bearbeitungsseite nach unten zu "Commit changes"
2. Wähle "Create a new branch for this commit and start a pull request"
3. Gib dem Branch einen kurzen Namen (z. B. `add-license-for-DELFI`)
4. Klicke auf "Propose changes"
5. Auf der nächsten Seite füllst du die PR-Vorlage aus:
    - **Country / Land**: z. B. Deutschland
    - **License / Lizenz**: Name der Lizenz
    - **Source / Quelle**: Dateiname aus Schritt 1
    - **Notes / Anmerkungen**: Alles, was noch wichtig ist
6. Klicke auf "Create pull request"

Fertig! Der PR wird dann geprüft und bei Freigabe zusammengeführt.
