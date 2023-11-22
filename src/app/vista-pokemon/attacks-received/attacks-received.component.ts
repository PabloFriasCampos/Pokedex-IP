import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-attacks-received',
  templateUrl: './attacks-received.component.html',
  styleUrls: ['./attacks-received.component.css']
})
export class AttacksReceivedComponent implements OnChanges {

  @Input()
  types: string[] = []

  @Input()
  listaColores: any;
  @Input()
  tablaTipos: any;

  veryWeak: string[] = [];
  weak: string[] = [];
  x0: string[] = [];
  strong: string[] = [];
  veryStrong: string[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.types.length != 0) {
      this.calcularTiposRecibir(this.types[0], this.types[1]);

    }
  }

  calcularTiposRecibir(type1: string, type2: string) {

    this.x0 = [];
    this.weak = [];
    this.strong = [];
    this.veryStrong = [];
    this.veryWeak = [];

    if (type2) {

      for (let tipoEnTabla in this.tablaTipos) {

        if (this.tablaTipos[type1][tipoEnTabla] == 0 || this.tablaTipos[type2][tipoEnTabla] == 0) {
          this.x0.push(tipoEnTabla);
        }
        else if (this.tablaTipos[type1][tipoEnTabla] == 2 && this.tablaTipos[type2][tipoEnTabla] == 2) {
          this.veryWeak.push(tipoEnTabla);
        }

        else if (this.tablaTipos[type1][tipoEnTabla] == 0.5 && this.tablaTipos[type2][tipoEnTabla] == 0.5) {
          this.veryStrong.push(tipoEnTabla);
        }

        else if ((this.tablaTipos[type1][tipoEnTabla] == 2 && this.tablaTipos[type2][tipoEnTabla] != 0.5) || (this.tablaTipos[type2][tipoEnTabla] == 2 && this.tablaTipos[type1][tipoEnTabla] != 0.5)) {
          this.weak.push(tipoEnTabla);
        }

        else if ((this.tablaTipos[type1][tipoEnTabla] == 0.5 && this.tablaTipos[type2][tipoEnTabla] != 2) || (this.tablaTipos[type2][tipoEnTabla] == 0.5 && this.tablaTipos[type1][tipoEnTabla] != 2)) {
          this.strong.push(tipoEnTabla);
        }

      }

    } else {
      for (let tipoEnTabla in this.tablaTipos) {

        if (this.tablaTipos[type1][tipoEnTabla] == 2) {
          this.weak.push(tipoEnTabla);

        }

        else if (this.tablaTipos[type1][tipoEnTabla] == 0) {
          this.x0.push(tipoEnTabla);

        }

        else if (this.tablaTipos[type1][tipoEnTabla] == 0.5) {
          this.strong.push(tipoEnTabla);

        }
      }
    }
  }
}