import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {

  let ms : MessageService;


  beforeEach(() => {
    ms = new MessageService();
  });

  /* it('should be created', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  })); */

  it("should remove all messages", () => {
    ms.add("This is my first post");
    ms.clear();
    expect(ms.messages.length).toBeLessThan(1);
  });
});
