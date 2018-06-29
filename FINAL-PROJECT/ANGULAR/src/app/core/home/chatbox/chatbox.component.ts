import { Component, OnInit, ViewChildren, ViewChild, AfterViewInit, QueryList, ElementRef } from '@angular/core';
import { SessionService } from "src/app/session.service";
import { ChatboxService } from "src/app/chatbox.service";


@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  toggleDisp = true;
  questions = [];
  answers : string[] = [];
  randomAns:string;
  randomVal :number = 0;
  answerToggle = true;

  //////////////////
 
  messages: string[] = [];
  messageContent: string;
  ioConnection: any;

  // socket = io.connect('http://localhost:3001');
  constructor(private sessionServices: SessionService,
              private chatService: ChatboxService) { }

  ngOnInit() {
    this.chatService.initSocket();
    
    this.chatService.onMessage();

    setTimeout(() => {
      this.initIoConnection();
    }, 0);
  }

  //  message = document.getElementById('message');;
  // handle = document.getElementById('handle');
  // btn = document.getElementById('send');
  // output = document.getElementById('output');
  // feedback = document.getElementById('feedback');
 
userEmailId: string = this.sessionServices.getValueFromSession('email');
userName: string = this.sessionServices.getValueFromSession('user');



  onToggleDisp(){
    this.toggleDisp = !this.toggleDisp;
    this.getChatInitDetails();
  }

  getChatInitDetails(){
    this.questions=[];
    this.chatService.fetchQuestions().subscribe(data =>
       {
         //console.log(data);
          
          data.forEach(element => {
              this.questions.push(element.question);
              for(let i = 0 ; i <element.answer.length ; i++ ){
                this.answers.push(element.answer[i]);
               }
              
             }); 
       },err => {
        alert("Server Down");
      });
     }

     showAnswers(){
       this.answerToggle = !this.answerToggle;
       var len = this.answers.length;
       this.randomAns = this.answers[(Math.floor(Math.random() * len/2  ) +1)]
     }

     checkLogged(){
        if(!this.sessionServices.getValueFromSession('isLoggedIn')){
          alert('Please Login to chat')
        }
      }

      startChat(messageVal: HTMLInputElement){
        if(!this.sessionServices.getValueFromSession('isLoggedIn')){
          alert('Please Login to chat')
        }else{
          this.chatService.joinchat(this.userEmailId);
          if(messageVal.value!=''){
            let tempval = this.userName+" : "+messageVal.value;
            this.chatService.send( tempval );
              this.messageContent = null;
              messageVal.value = '';
          }
        }
      }

      private initIoConnection(): void {
        this.chatService.initSocket();
    
        this.ioConnection = this.chatService.onMessage()
          .subscribe((message: string) => {
            let temp = message
            this.messages.push(temp);
          });
    
    
      }
  }
  
