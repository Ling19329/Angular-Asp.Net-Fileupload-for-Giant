import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { MAX_LENGTH_VALIDATOR } from '@angular/forms/src/directives/validators';
import {MessageService} from '../message.service';
import {MessageItem} from '../message_item';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public MAX_SIZE: number = 5242880; //MAX_SIZE 5MB
  //public MAX_SIZE: number = 10; //MAX_SIZE 5MB


  public FILE_TYPE:string[] = ['text/plain', 'image/png', 'image/jpeg'];
  public progress: number;
  
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient, private ms:MessageService) { }

  ngOnInit() {
  }

  public uploadFile = (files) => {
    this.ms.clear();
    this.progress = 0;
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    


    
    if(fileToUpload.size > this.MAX_SIZE || this.FILE_TYPE.indexOf(fileToUpload.type) == -1){
      if(fileToUpload.size > this.MAX_SIZE)
      {
        let msg: MessageItem = {message_str:'Size must be less 5MB',status: false};
        this.ms.add(msg);
      }
      
      
      if(this.FILE_TYPE.indexOf(fileToUpload.type) == -1){
        let msg: MessageItem = {message_str:'Type is not allowed',status: false};
        this.ms.add(msg);
      }
        
      
      return;
    }

    
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          let msg: MessageItem = {message_str:'Upload success.',status: true};
          this.ms.add(msg);
          
          this.onUploadFinished.emit(event.body);
        }
      });
  }
}
