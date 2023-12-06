# Projektdokumentation (Gruppe)

**Gruppenmitglieder:** Benedikt Gebauer, Samuel Amoah, Pascal Weider, Yichen Zhang
**Source Code Repo URL:** https://github.com/BeneGeb/ASE23

## Requirements
Die Requirements für unser Projekt wurden innerhab des Github Repositorys als Issues erfasst. Wir haben uns dabei an dem Lastenheft orientiert. Um weitere Issues zu definieren haben wir uns zunächst eine initale Struktur und einen Programmablaufplan überlegt. Basierend darauf haben wir weitere Issues erfasst.

## Vorgehen
Wir haben einen wöchentlich festen Termin vereinbart. An diesem Termin sind wir in der gesamten Gruppe zusammengekommen. Bei Bedarf haben wir uns auch außerhalb der Festen Termine getroffen.  
Die Tasks wurden über Github Project verwaltet. Jeder Task wurde mit einem Issue in Verbindung gesetzt und mindestens einem von uns zugeordnet. Wir haben bei jedem Meeting die Ergebnisse der Letzten Itteration präsentiert. Außerdem haben wir uns darum gekümmert das die Tasks für alle klar und eindeutig sind.

## Rollen
Scrum Master: Yichen Zhang  
Product Owner: Benedikt Gebauer  
Entwicklungsteam: Pascal Weider, Samuel Amoah  


## Architektur (siehe Tasks in Vorlesung)
**Client-Server:** 
Bei der Architektur haben wir uns für eine Client Server Struktur entschieden. Die Entscheidung für eine Client-Server-Architektur basiert auf der klaren Aufteilung von Spiellogik und Graphischer Oberfläche. Die klare Trennung erleichtert die Wartung, Erweiterung und die Anbindung verschiedener Clients, was eine robuste und gut strukturierte Lösung für unser Spiel bietet.  


## Design (siehe Tasks in Vorlesung)
**Composite Pattern**
In unserer Anwendung nutzen wir das **ReactJS-Framework**, welches auf einer hierarchischen Baumstruktur basiert, um die Webapplikation zu organisieren. Das Framework implementiert dabei automatisch das sogenannte Composite Pattern. Dieses Entwurfsmuster ermöglicht es uns, Komponenten hierarchisch zu strukturieren, wobei eine zentrale Oberkomponente alle anderen Komponenten enthält. Diese Beziehung bildet eine Baumstruktur, die charakteristisch für das Composite Pattern ist. Durch diese Struiktur kann jede Komponente unabhängig behandelt und gewartet werden. Außerdem wird die Übersichlichtkeit des Programms gewährleistet  

**Strategy Pattern**
In unserem Backend verwenden wir eine WebSocket-Verbindung für die Kommunikation zwischen einem Client und dem Server. Für die Verarbeitung von WebSocket-Anfragen haben wir eine Funktion definiert, die automatisch aufgerufen wird, sobald der Server eine solche Anfrage empfängt. Diese Funktion fungiert als Interface, das im Sinne des Strategy Patterns. Sie bildet die Schnittstelle zwischen dem Client und dem Algorithmus, der durch die Anfrage ausgelöst wird. Innerhalb dieser Funktion erfolgt die Entscheidung darüber, wie der empfangene Request weiter verarbeitet werden soll. Auf diese Weise ermöglichen wir eine flexible und anpassbare Verarbeitung von WebSocket-Anfragen, wobei die spezifische Logik abhängig von den erhaltenen Daten und Anfragen variiert.

## Qualitätssicherung
(Welche Art von Tests haben wir implementiert (Beispiele)? Welche Abdeckung wurde erreicht (Nachweis)?)

## Reuse
**PyJWT**: Wir haben PyJWT in unserem Backend verwendet. Dadurch ist es uns möglich eine JWT Token basierte Authentifizierung in unserem Projekt zu benutzen  
**Daphne**: Wir verwenden in unsere Applikation die python Bibliothek Daphne. Daphne wird in Verbindung mit Django Channels genutzt um Asynchrone Websocket Verbindungen benutzen zu können.  
**ReactJS**: Für die Implementierung unseres Frontends haben wir die Javascript Bibliothek ReactJS verwendet. ReactJS erleichtet die Entwicklung einer Webapplikation. Wir haben uns speziell für React aufgrund von bereits vorhandenen Vorkenntnissen entschieden.

## Continuous Integration
Wir haben unsere verschiedenen Beiträge über Github miteinander vereint. Dafür habenw wir mit Pull Requests gearbeitet. Jeder von uns hat auf seinem eigenen Branch gearbeitet und einen Pull Request zum mergen auf den main branch erstellt. Anschließend muss der Pull Request von einem anderen Nutzer reviewed werden, bevor die Änderungen auf den main branch gepusht werden.

## Dokumentation (Benutzersicht)
Unsere Anwendung wird über Docker bereitgestellt.
Mit dem folgenden Befehl wir der Container gebaut:
```
docker-compose build
```
Mit dem folgenden Befehl wird der Container gestartet:
```
docker-compose up
```
Mit dem folgenden Befehl wird der Containter gestoppt:
```
docker-compose down
```
Die Applikation steht anschließend unter folgender IP-Adresse zur Verfügung
`127.0.0.1:8000`

## Dokumentation (Entwicklersicht)
(Was müssen externe Entwickler über die Struktur des Projektes wissen? Welche Erweiterungsmöglichkeiten gibt es? Welches sind die wichtigsten Klassen/Module?)  
### Erweiterungsmöglichkeiten
#### Lobbys
Wir unterstützen zur Zeit die Erstellung und Benutzung von einer Lobby. Eine Erweiterungsmöglichkeit ist das Auswählen und Erstellen von mehreren Lobbys.

#### Statistik
Wir bieten bei unserem Projekt die Möglichkeit Daten zu einem bestimmten Benutzer zu speichern. Es ist denkbar, diese Daten um ein Statistiksystem zu erweitern. In diesem könnten beispielsweise gewonnene Spiele, gespielte Spiele, etc. gespeichert werden.

#### Accountmanagement
Unser aktuelles Accountmanagement bietet die Möglichkeit eine E-Mail Adresse und ein Passwort festzulegen. Dieses System könnte so erweitert werden das beispielsweise auch Profilbilder, Alter oder andere persönliche Daten in einem Account gespeichert werden. Das würde zu einer besseren und sozialeren Vernetzung unserer Spieler führen.

#### Spielmodi
Die aktuelle Version unserer Applikation funktioniert streng nach den Regeln des originalen Blokus Spiels. Das bedeutet, es gibt immer 4 Spieler, wobei jeder Spieler immer dieselben Spielsteine besitzt. Es besteht die Möglichkeit das aktuelle Spielsystem um weitere Spielmodi zu erweitern. Diese könnten beispielsweise einen zwei Spieler Modus beinhalten. 

### Wichtigste Backend Module
#### Gameinterface
Das Gameinterface Modul ist für unsere Spiellogik verantwortlich. Innerhalb des Moduls wird das Interface für die Websocket Verbindung zwischen Client und Server bereitgestellt. Über die Websocket Verbindung kann jeder Client einer Lobby beitreten. Außerdem werden hier die benötigten Funktionen für das Empfangen und verteilen von Spielzügen bereitgestellt.

#### Users
Das Users Modul stellt in unsere Applikation die Möglichkeit für einen Login bereit. Über das Modul kann ein Nutzer sich einen Account erstellen. Des Weiteren wird ein Endpunkt bereitgestellt um sich einzuloggen. Nach dem Login wird ein JWT Token bereitgestellt durch das sich der Nutzer an dem Server authentifizieren kann.

### Wichtigste Komponenten Frontend
#### Login
Wir haben für den Login eine eigene Komponente erstellt. Innerhalb dieser Komponente hat der Nutzer die Möglichkeit seine Credentials einzuben. Anschließend wird nach einem erfolgreichen Login auf die Lobby Komponente weitergeleitet. 

#### Lobby
Innerhalb der Lobby Komponente kann der Nutzer die aktuelle zur Lobby beigetretenen Spieler sehen. Der Nutzer kann seine eigene Farbe, sowies seinen eigenen Namen anpassen. Nachdem alle Spieler auf bereit gedrückt haben wird das Spiel gestartet und jeder Nutzer wird zur Gamepage Komponente weitergeleitet.

#### Gamepage
Die Gamepage Komponente stellt unser eigentliches Spiel dar. Die Komponente ist so aufgebaut das in der Mitte das Spielfeld angezeigt wird. Außen herum können die noch verfügbaren Spielsteine von jedem Spieler angezeigt werden.

## Fazit
(War das Projekt erfolgreich? Was würden wir beim nächsten Mal anders machen? ...)