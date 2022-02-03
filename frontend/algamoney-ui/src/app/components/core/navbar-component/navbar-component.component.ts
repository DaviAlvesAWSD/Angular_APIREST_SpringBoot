import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../seguranca/auth.service';
import { LogoutService } from '../../seguranca/logout.service';
import { ErroHandlerService } from '../erro-handler.service';


@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent implements OnInit {

  gfg = false;


  usuarioLogado: string = ''

  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErroHandlerService,
    private router: Router
    ) { }

  ngOnInit() {
    this.usuarioLogado = this.auth.jwtPayload?.nome;
  }

  temPermissao(permissao: string) {
    return this.auth.temPermissao(permissao);
  }

  criarNovoAccessToken(){
    this.auth.obterNovoAccessToken();
  }

  logout() {
    let nome = '';
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro, nome));
  }

}
