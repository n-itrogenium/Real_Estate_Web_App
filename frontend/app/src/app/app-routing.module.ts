import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { AdminRequestsComponent } from './admin-requests/admin-requests.component';
import { AdminUpdateComponent } from './admin-update/admin-update.component';
import { AdminComponent } from './admin/admin.component';
import { AgentAddReComponent } from './agent-add-re/agent-add-re.component';
import { AgentManageReComponent } from './agent-manage-re/agent-manage-re.component';
import { AgentMyReComponent } from './agent-my-re/agent-my-re.component';
import { AgentUpdateReComponent } from './agent-update-re/agent-update-re.component';
import { AgentUpdateComponent } from './agent-update/agent-update.component';
import { AgentComponent } from './agent/agent.component';
import { ErrorComponent } from './error/error.component';
import { GuestComponent } from './guest/guest.component';
import { InboxComponent } from './inbox/inbox.component';
import { LoginComponent } from './login/login.component';
import { MsgComposeComponent } from './msg-compose/msg-compose.component';
import { MsgthreadComponent } from './msgthread/msgthread.component';
import { RealEstateComponent } from './real-estate/real-estate.component';
import { RegisterComponent } from './register/register.component';
import { UserAddReComponent } from './user-add-re/user-add-re.component';
import { UserMyReComponent } from './user-my-re/user-my-re.component';
import { UserUpdateReComponent } from './user-update-re/user-update-re.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'user', component: UserComponent},
  {path: 'user/addRealEstate', component: UserAddReComponent},
  {path: 'user/myRealEstate', component: UserMyReComponent},
  {path: 'user/update', component: UserUpdateComponent},
  {path: 'user/updateRealEstate', component: UserUpdateReComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/add', component: AdminAddComponent},
  {path: 'admin/requests', component: AdminRequestsComponent},
  {path: 'admin/update', component: AdminUpdateComponent},
  {path: 'agent', component: AgentComponent},
  {path: 'agent/addRealEstate', component: AgentAddReComponent},
  {path: 'agent/manageRealEstate', component: AgentManageReComponent},
  {path: 'agent/manageRealEstate/myRealEstate', component: AgentMyReComponent},
  {path: 'agent/manageRealEstate/updateRealEstate', component: AgentUpdateReComponent},
  {path: 'agent/update', component: AgentUpdateComponent},
  {path: 'guest', component: GuestComponent},
  {path: 'inbox', component: InboxComponent},
  {path: 'msgthread', component: MsgthreadComponent},
  {path: 'composeMessage', component: MsgComposeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'realestate', component: RealEstateComponent},
  {path: 'pageNotFound', component: ErrorComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
