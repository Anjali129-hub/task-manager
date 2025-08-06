import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component'; // ✅ Update path if needed
import { SidebarComponent } from '../sidebar/sidebar.component'; // ✅ if you also use <app-sidebar>

@Component({
  selector: 'app-main-layout',
  standalone: true,
  templateUrl: './main-layout.component.html',
  imports: [RouterModule, HeaderComponent, SidebarComponent], // ✅ Include it here
})
export class MainLayoutComponent {}
