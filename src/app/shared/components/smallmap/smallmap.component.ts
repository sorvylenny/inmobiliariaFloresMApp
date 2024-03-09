import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-smallmap',
  templateUrl: './smallmap.component.html',
  styleUrls: ['./smallmap.component.css']
})
export class SmallmapComponent implements OnInit, AfterViewInit {

  @Input() longitude: number = 0;
  @Input() latitude: number = 0;
  @ViewChild('map') divMapa!: ElementRef;
  showSpinner: boolean = true; // Mostrar el spinner por defecto
  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'indeterminate';


  constructor() { }
  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapBoxToken;
  }

  ngAfterViewInit(): void {
    const mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [this.longitude, this.latitude],
      zoom: 14,
      interactive: false
    });

    new mapboxgl.Marker()
      .setLngLat([this.longitude, this.latitude])
      .addTo(mapa);

    mapa.on('load', () => {
      mapa.addControl(new mapboxgl.AttributionControl({
        customAttribution: ''
      }));

      setTimeout(() => {
        mapa.resize();
        this.showSpinner = false; // Desactiva el spinner después de 3 segundos
      }, 3000);
    });
  }


}
