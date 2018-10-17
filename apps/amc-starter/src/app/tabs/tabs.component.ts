import { Component, OnInit } from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'trm-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  private tabs = new Array<TabComponent>();

  constructor() { }

  ngOnInit() {
  }

  addTab(tab: TabComponent) {
    if (this.tabs.length === 0) {
      this.select(tab);
    }
    this.tabs.push(tab);
  }

  select(selectedTab: TabComponent) {
    this.tabs.forEach(tab => { tab.selected = false });
    selectedTab.selected = true;
  }

}
