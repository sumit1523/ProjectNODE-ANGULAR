import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router'; 
import { Observable } from "rxjs"; 
import { Observer } from 'rxjs/Observer'; 
import * as socketIo from 'socket.io-client';
import 'rxjs/add/operator/map';

const SERVER_URL = 'http://localhost:3001';

@Injectable({
	providedIn: 'root'
})
export class ChatboxService {

	url = "http://localhost:3001";
	private socket;
	constructor(private http: HttpClient, private router: Router) { }

	fetchQuestions(): Observable<any> {
		let url1 = this.url + "/chat/getqueans";
		return this.http.get<any>(url1);
	}

	public initSocket(): void {
		this.socket = socketIo(SERVER_URL);
	}

	public send(message: string): void {
		this.socket.emit('chat', message);
	}

	public onMessage(): Observable<any> {
		return new Observable<any>(observer => {
			this.socket.on('chat', (data: any) =>{observer.next(data)});
		});
	}

	//For room chat
	public joinchat(email: string): void {
		this.socket.emit('join', { email: email });
	}

	public onEvent(event: Event): Observable<any> {
		return new Observable<Event>(observer => {
			this.socket.on(event, () => observer.next());
		});
	}

}
