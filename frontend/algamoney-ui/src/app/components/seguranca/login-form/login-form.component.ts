import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ErroHandlerService } from 'src/app/components/core/erro-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    public  auth: AuthService,
    private errorHandler: ErroHandlerService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login(usuario: string, senha: string){
    let nome = '';
     this.auth.login(usuario, senha)
      .then(() =>{
        this.router.navigate(['/lancamentos']);
      })
      .catch(erro => {
        this.errorHandler.handle(erro, nome);
      });


  }

}
