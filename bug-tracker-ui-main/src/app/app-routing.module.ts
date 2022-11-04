import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { BugListComponent } from './bug-list/bug-list.component';
import { CreateBugComponent } from './create-bug/create-bug.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.manager] }
    },
    
    {
        path: 'bug-list',
        component: BugListComponent,
        canActivate: [AuthGuard],
        // data: { roles: [Role.manager] }
    },
    {
        path: 'create-bug',
        component: CreateBugComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.manager,Role.tester] }
    },{
        path: 'create-user',
        component: CreateUserComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.manager] }
    },{
        path: 'user-list',
        component: UserListComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.manager] }
    },
    {
        path: 'login',
        component: LoginComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
