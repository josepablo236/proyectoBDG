import { Component } from '@angular/core';
import { DynamoDBService } from '../../services/dynamo-db.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(private db: DynamoDBService) {
  }

}
