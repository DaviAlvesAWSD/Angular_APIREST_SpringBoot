import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Primeng components
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { SelectButtonModule } from 'primeng/selectbutton';

// criados
import { MessageComponent } from './message/message.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    InputMaskModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    ButtonModule,
    TabViewModule,
    TableModule,
    TooltipModule,
    ToastModule,
    SidebarModule,
    CalendarModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    SelectButtonModule,
    HttpClientModule,

  ],
  exports: [
    MessageComponent,

    CommonModule,
    FormsModule,
    InputMaskModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    ButtonModule,
    TabViewModule,
    TableModule,
    TooltipModule,
    ToastModule,
    SidebarModule,
    CalendarModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    SelectButtonModule,
    HttpClientModule

  ],
  providers: [MessageService, ConfirmationService]
})
export class UtilsModule { }
