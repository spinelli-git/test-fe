import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'http://localhost:8080/stream-file'; // Aggiorna con il tuo URL

  constructor(private zone: NgZone) {}

  getServerSentEvent(): Observable<string> {
    return new Observable(observer => {
      const eventSource = new EventSource(this.url);

      eventSource.onmessage = event => {
        this.zone.run(() => {
          observer.next(event.data);
        });
      };

      eventSource.onerror = error => {
        this.zone.run(() => {
          observer.error(error);
          eventSource.close();
        });
      };

      return () => {
        eventSource.close();
      };
    });
  }
}
