import { Component } from '@angular/core';



@Component({
  selector: 'app-sprint-game',
  templateUrl: './sprint-game.component.html',
  styleUrls: ['./sprint-game.component.scss']
})

export class SprintGameComponent {
 message: string = "DataModule";
display = false;
update(){
   this.display = !this.display;
}

}
