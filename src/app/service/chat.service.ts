import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { ChatMessage } from '../chat/chat-message';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) {
    this.initializeWebSocketConnection();
   }

  
  getChatRoom(user1:number, user2:number){
    return this.http.get(`${this.baseUrl}/chatroom/${user1}/${user2}`, { responseType: 'text' });
  }
  getChat(chatId:any){
    return this.http.get(`${this.baseUrl}/chat/${chatId}`);
  }




  private stompClient: any;
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);

  initializeWebSocketConnection() {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
  
    this.stompClient.connect({}, () => {
      console.log('Connected to WebSocket');
      this.stompClient.subscribe(`/queue/messages`, (message: any) => {
        console.log('Raw message received:', message);
        const newMessage = JSON.parse(message.body);
        console.log('Parsed message:', newMessage);      
      
        // Get current messages and append the new one
        // const currentMessages = this.messageSubject.getValue();
        // currentMessages.push(newMessage);
  
        // Emit the updated messages list
        this.messageSubject.next([newMessage]);
      });
    });
  }



  sendMessage(chatMessage: ChatMessage) {
    this.stompClient.send('/app/chat/send', {}, JSON.stringify(chatMessage));
  }

  getMessages() {
    return this.messageSubject.asObservable();
  }
}
