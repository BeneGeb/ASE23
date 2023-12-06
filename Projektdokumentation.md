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
(Wie wird die Software gebaut/gestartet?)

## Dokumentation (Entwicklersicht)
(Was müssen externe Entwickler über die Struktur des Projektes wissen? Welche Erweiterungsmöglichkeiten gibt es? Welches sind die wichtigsten Klassen/Module?)

## Fazit
(War das Projekt erfolgreich? Was würden wir beim nächsten Mal anders machen? ...)