import { Injectable } from '@angular/core';
import {MessageItem} from './message_item'
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: MessageItem[] = [];
  
  add(msg : MessageItem) {
    this.messages.push(msg);
  }
 
  clear() {
    this.messages = [];
  }
}