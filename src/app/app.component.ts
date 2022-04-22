import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  nb:any;
  tableau: any[] = [];
  
 
  bu1:string = '';
  email1:string = '';
  name1:string = '';
  password1:string = '';
  role1:string = '';
 
  idActuel=0;
  
  bu:string = '';
  email:string = '';
  name:string = '';
  password:string = '';
  role:string = '';


  url: string ='https://personne29200-default-rtdb.europe-west1.firebasedatabase.app/';
  //url: string = 'https://gestion-equipe.firebaseio.com/';
  url2 = this.url + 'personne.json';
  // httpClient
  constructor(private httpClient: HttpClient) {}
  ngOnInit() {
    this.nb=this.getNb();
    this.httpClient.get<any>(this.url2).subscribe((response) => {
      console.log(response);
      if (response != undefined) {
        // comment recupére les "id"
        for (let attribut in response) {
          let p: any = response[attribut];
          // p.prenom = p['prenom']
          p.id = attribut;
          this.tableau.push(p);
        }
      }
    });
  }
  onAjouter() {
    // post
   
    let p: any = {};
    p.bu = this.bu;
    p.email=this.email;
    p.name= this.name;
    p.password=this.password;
    p.role= this.role;
    this.bu =this.email = this.name = this.password = this.role='';//vider les input

    
    this.httpClient.post<any>(this.url2, p).subscribe((response) => {
      console.log(response);
      let id = response.name;
      p.id = id;
      this.tableau.push(p);
      console.log(this.tableau);
    });
  }
  onEnlever(i: number) {
    // delete
    // https://gestion-equipe.firebaseio.com/personne/chkjqdhID.json
    let url2 = this.url + 'personne/'+this.tableau[i].id+'.json';
    this.httpClient.delete(url2).subscribe(response=>{
      console.log('delete ok !');
      this.tableau.splice(i, 1);
    })
    
  }
  onCharger(i: number)
  {

    this.bu1 = this.tableau[i].bu;
    this.email1=this.tableau[i].email;
    this.name1= this.tableau[i].name;
    this.password1=this.tableau[i].password;
    this.role1= this.tableau[i].role;

    this.idActuel =i;
       
  }

  onModifier()
  {
    
    let url3 = this.url + 'personne/'+this.tableau[this.idActuel].id+'.json';
    let p= {bu:this.bu1,
            name:this.name1,
            email:this.email1, 
            password:this.password1, 
            role:this.role1 };
    this.httpClient.put(url3,p ).subscribe((response) => {
    console.log(response);
    this.tableau[this.idActuel] =p;
    });

  }
  onSupprimerTout()
  {
    let url2 = this.url + 'personne.json';
    this.httpClient.delete(url2).subscribe(response=>{
      console.log('delete ok !');
      this.tableau.splice(0, this.tableau.length);
    });
       
    
  }
  getNb()
  {
      return this.tableau.length;
   }
}
