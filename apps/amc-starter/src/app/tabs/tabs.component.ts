import { Component, OnInit, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'trm-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, AfterContentInit {

  @ContentChildren(TabComponent)
  tabs: QueryList<TabComponent>;

  constructor() { }

  ngOnInit() {
  }

  select(selectedTab: TabComponent) {
    this.tabs.forEach(tab => { tab.selected = false });
    selectedTab.selected = true;
  }

  ngAfterContentInit(): void {
    this.select(this.tabs.first);
  }

}
