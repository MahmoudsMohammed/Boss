import { NgModule } from "@angular/core";
import { loginComponent } from "./login/login.component";
import { materialModule } from "../../Material/materila.module";

@NgModule({
  declarations:[loginComponent],
  imports:[materialModule]
})
export class authModule{}