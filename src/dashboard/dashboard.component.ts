import {Component, OnInit, ViewChild, Input, ViewContainerRef, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
import {MainComponent} from './components/main.component';
import {ProductSummaryCardComponent} from './components/product-summary-card.component';
import {ActionComponent} from './components/action.component';
import {SaleCardComponent} from './components/sale-card.component';
import {RevenueCardComponent} from './components/revenue-card.component';
import {UserCardComponent} from './components/user-card.component';

@Component({
  selector: 'app-product',
  template: `
    <nz-layout>
      <nz-content>
        <div>
          <div>
            <div>
              <div nz-row [nzGutter]="20">
                <ng-template #overview></ng-template>
              </div>
            </div>
          </div>
          <br>
          <div nz-row [nzGutter]="20">
            <div nz-col [nzSpan]="18">
              <div nz-row [nzGutter]="20">
                <ng-template #main></ng-template>
              </div>
            </div>
            <div nz-col [nzSpan]="6">
              <ng-template #action></ng-template>
            </div>
          </div>
        </div>
      </nz-content>
    </nz-layout>
  `,
  styleUrls: ['../../node_modules/@sgxbz/shared/assets/styles/default-page-style.scss'],
  styles: [`
    nz-layout {
      background: #f0f2f5;
      padding: 0px 20px 30px;
      height: 100%;
    }
  `]
})


export class DashboardComponent implements OnInit, AfterViewInit{
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef
    ) {}
  @ViewChild('overview', {read: ViewContainerRef}) overview: ViewContainerRef;
  @ViewChild('main', {read: ViewContainerRef}) main: ViewContainerRef;
  @ViewChild('action', {read: ViewContainerRef}) action: ViewContainerRef;
  @Input() componentList: {component: any; data?: any, section?: string, index?: number, class?: string, style?: string}[] = [
    { component: ProductSummaryCardComponent, section: 'overview', class: 'ant-col ant-col-6', style: 'padding-left: 10px; padding-right: 10px;'},
    { component: SaleCardComponent, data: {title: 'Visits', content: 'content'}, section: 'overview', class: 'ant-col ant-col-6', style: 'padding-left: 10px; padding-right: 10px;'},
    { component: RevenueCardComponent, data: {title: 'Visits', content: 'content'}, section: 'overview', class: 'ant-col ant-col-6', style: 'padding-left: 10px; padding-right: 10px;'},
    { component: UserCardComponent, data: {title: 'Visits', content: 'content'}, section: 'overview', class: 'ant-col ant-col-6', style: 'padding-left: 10px; padding-right: 10px;'},
    { component: MainComponent, data: '', section: 'main', class: 'ant-col ant-col-24', style: 'padding-left: 10px; padding-right: 10px; height: 530px'},
    { component: ActionComponent, data: '', section: 'action', style: 'height: 530px'}
    ,
  ];
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.componentList.forEach(element => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(element.component);
      let viewContainerRef = this.overview;
      if (element.section === 'main') {
        viewContainerRef = this.main;
      }
      else if (element.section === 'action') {
        viewContainerRef = this.action;
      }
      const componentRef =  viewContainerRef.createComponent<any>(componentFactory);
      componentRef.instance.data = element.data;
      if (element.class) {
        componentRef.location.nativeElement.className = element.class;
      }
      if (element.style) {
        componentRef.location.nativeElement.style.cssText = element.style;
      }
    });
    this.changeDetectorRef.detectChanges();
  }
}
