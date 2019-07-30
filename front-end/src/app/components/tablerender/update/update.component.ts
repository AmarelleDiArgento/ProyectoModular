import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class UpdateComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
  }

  // redirect to update any component's
  update(name,iduser, username) {
    // save the id
    localStorage.setItem('id' + name, name);
    // save the id
    localStorage.setItem('idUser', iduser);
    //redirect
    this.router.navigate(['/update' + name]);
  }

}
