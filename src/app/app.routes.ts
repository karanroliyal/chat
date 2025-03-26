import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path:'',
        redirectTo:'chat',
        pathMatch:'full'
    },
    {
        path:'chat',
        title:"Chat",
        loadComponent: ()=>import('./components/layout/layout.component').then(m=>m.LayoutComponent)
    },
    {
        path:'login',
        title:"Login",
        loadComponent: ()=>import('./components/login/login.component').then(m=>m.LoginComponent)
    },
    {
        path:'register',
        title:"Register",
        loadComponent: ()=>import('./components/register/register.component').then(m=>m.RegisterComponent)
    }


];
