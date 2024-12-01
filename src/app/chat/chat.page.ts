import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { ChatMessage } from './chat-message';
import { UserService } from '../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  user2Id!: string;
  chatId!: string;
  user: any;
  user2: any;
  chatInput = "";
  messagesList: any[] = [];
  message: ChatMessage = new ChatMessage();


  constructor(private chatService: ChatService, private userService: UserService, private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userService.getUserData().subscribe(
      (response: any) => {
        this.user = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
    this.user2Id = this.route.snapshot.params['id'];
    this.chatId = this.route.snapshot.params['chatId'];
    this.getUser2Data();
    this.getChat();
    this.listenerMessage();
  }


  getUser2Data() {
    this.apiService.getUser(this.user2Id).subscribe(
      (response: any) => {
        this.user2 = response;
      },
      (error: any) => {
        console.error(error);
      }
    )
  }

  getChat() {
    this.chatService.getChat(this.chatId).subscribe(
      (response: any) => {
        console.log(response);
        this.messagesList = response;
      },
      (error: any) => {
        console.error(error);
      }
    )
  }


  sendChatMessage() {
    this.message.chatId = this.chatId;
    this.message.sender = this.user.firstName;
    this.message.receiver = this.user.lastName;
    this.message.content = this.chatInput;
    this.chatService.sendMessage(this.message);
    this.chatInput = ''; // Clear input after sending
  }

  listenerMessage() {
    this.chatService.getMessages().subscribe((messages: any) => {
      this.messagesList.push(messages);
    })
  }

}
