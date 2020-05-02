import { Game } from './../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  juegos: any[] = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore.collection('goty')
                  .valueChanges()
                  .pipe(map( (resp: Game[]) => resp.map( ({name, votos}) => ({name, value: votos}) ) ))
                  .subscribe( juegos => {
                    // console.log(juegos);
                    this.juegos = juegos;
                  })


    /**
     * return resp.map( juego => {
     *                return {
     *                 name: juego.name,
     *                  value: juego.votos
     *                }
     *              })
     */


  }

}
