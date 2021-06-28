import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { AgentComponent } from './agent/agent.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { AdminRequestsComponent } from './admin-requests/admin-requests.component';
import { AdminUpdateComponent } from './admin-update/admin-update.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { GuestComponent } from './guest/guest.component';
import { RealEstateComponent } from './real-estate/real-estate.component';
import { UserAddReComponent } from './user-add-re/user-add-re.component';
import { UserUpdateReComponent } from './user-update-re/user-update-re.component';
import { UserMyReComponent } from './user-my-re/user-my-re.component';
import { AgentManageReComponent } from './agent-manage-re/agent-manage-re.component';
import { AgentUpdateComponent } from './agent-update/agent-update.component';
import { AgentAddReComponent } from './agent-add-re/agent-add-re.component';
import { AgentMyReComponent } from './agent-my-re/agent-my-re.component';
import { AgentUpdateReComponent } from './agent-update-re/agent-update-re.component';
import { InboxComponent } from './inbox/inbox.component';
import { MsgthreadComponent } from './msgthread/msgthread.component';
import { MsgComposeComponent } from './msg-compose/msg-compose.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    RegisterComponent,
    AgentComponent,
    AdminAddComponent,
    AdminRequestsComponent,
    AdminUpdateComponent,
    UserUpdateComponent,
    GuestComponent,
    RealEstateComponent,
    UserAddReComponent,
    UserUpdateReComponent,
    UserMyReComponent,
    AgentManageReComponent,
    AgentUpdateComponent,
    AgentAddReComponent,
    AgentMyReComponent,
    AgentUpdateReComponent,
    InboxComponent,
    MsgthreadComponent,
    MsgComposeComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
