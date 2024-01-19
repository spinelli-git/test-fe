import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  messages: string[] = [];
  private sseSubscription: Subscription | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {}

  startEventStream() {
    if (this.sseSubscription) {
      this.sseSubscription.unsubscribe();
      this.messages = [];
    }

    this.sseSubscription = this.dataService.getServerSentEvent().subscribe({
      next: (data) => {
        this.messages.push(data);
      },
      error: (error) => console.error(error),
    });
  }

  stopEventStream() {
    if (this.sseSubscription) {
      this.sseSubscription.unsubscribe();
      this.messages = [];
    }
  }

  ngOnDestroy() {
    // Assicurati di disiscriverti per evitare perdite di memoria
    if (this.sseSubscription) {
      this.sseSubscription.unsubscribe();
    }
  }
}
