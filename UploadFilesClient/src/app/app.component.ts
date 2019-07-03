import { UserToCreate } from './_interfaces/userToCreate.model';
import { User } from './_interfaces/user.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MessageService} from './message.service';
import {MessageItem} from './message_item';
import {filesize} from 'filesize';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Upload Files'
  public name: string;
  public up_time: string;
  public user: UserToCreate;
  public users: User[] = [];
  public response: {'dbPath': '', 'filesize':''}; 


  constructor(private http: HttpClient, private ms:MessageService){}

  ngOnInit(){
    this.getFiles();
  }

  public onCreate = () => {
    
    if(this.name == '' || this.name == undefined)
      {
        if(this.ms.messages.map(item => item.message_str).indexOf('Please fill your name!') == -1){
          

          let msg: MessageItem = {message_str:'Please fill your name!',status: false};
          this.ms.add(msg);
        return;
      }
    }
    
    
    let up_time = new Date();
    this.user = {
      name: this.name,
      up_time: up_time.toLocaleDateString() + " " + up_time.toLocaleTimeString(),
      imgSize : this.response.filesize,
      imgPath: this.response.dbPath
    }
    
    this.http.post('https://localhost:5001/api/users', this.user)
    .subscribe(res => {
      this.getFiles();
      
    });
    }



  private getFiles = () => {
    this.http.get('https://localhost:5001/api/users')
    .subscribe(res => {
      this.users = res as User[];
    });
  }

  public returnToCreate = () => {
    //
  }

  public uploadFinished = (event) => {
    this.response = event;
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:5001/${serverPath}`;
  }
  //extract real file name from server filepath
  public getfilename = (path) => {
    
    return path.split("\\").pop();
  }
  //check if file is image file
  public checkFileType = (path) =>{
    let file_ext = this.getfilename(path).split(".").pop();  
    if(file_ext.toUpperCase() == "TXT")
      return false;
    else 
      return true; 
  }

}
