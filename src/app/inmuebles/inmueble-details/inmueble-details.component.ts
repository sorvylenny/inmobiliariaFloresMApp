import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InmueblesService } from 'src/app/core/services/inmuebles.service';
import { Inmueble } from 'src/app/interfaces/inmueble';

@Component({
  selector: 'app-inmueble-details',
  templateUrl: './inmueble-details.component.html',
  styleUrls: ['./inmueble-details.component.css']
})
export class InmuebleDetailsComponent {
  propiety!: Inmueble;
  constructor(private inmuebleService: InmueblesService, private router: Router, private activerouter: ActivatedRoute) { }

  ngOnInit(): void {
    let inmueble : any = this.activerouter.snapshot.paramMap.get('id')
    this.inmueblesDetail (inmueble);
  }

  inmueblesDetail(id: string) {
    this.inmuebleService.getInmuebleById(id).subscribe(propiety => {
      this.propiety = propiety;
      console.log(propiety)
    });
  }
}
