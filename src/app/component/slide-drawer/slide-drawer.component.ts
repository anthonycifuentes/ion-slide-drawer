import {
  Component,
  AfterViewInit,
  ElementRef,
  Renderer2,
  Input
} from '@angular/core';
import {
  GestureController
} from '@ionic/angular';
import {
  Gesture,
  GestureConfig
} from '@ionic/core';

@Component({
  selector: 'app-slide-drawer',
  templateUrl: './slide-drawer.component.html',
  styleUrls: ['./slide-drawer.component.scss'],
})
export class SlideDrawerComponent implements AfterViewInit {
  state: string = 'dowm';
  @Input() handleHeight: number = 144;

  constructor(
    private gestureCtrl: GestureController,
    private element: ElementRef,
    private renderer: Renderer2) {}

  ngOnInit() {}

  async ngAfterViewInit() {
    const windowHeight = window.innerHeight;
    this.renderer.setStyle(this.element.nativeElement, 'top', windowHeight - this.handleHeight + 'px')  

    const options: GestureConfig = {
      el: document.querySelector('#header'),
      direction: 'y',
      gestureName: 'slide-drawer-swipe',
      onStart: (ev) => {
        // do something as the gesture begins
        this.renderer.setStyle(this.element.nativeElement, 'transition', 'none');
      },
      onMove: (ev) => {
        // do something in response to movement
        if (ev.deltaY < 0 && this.state === 'dowm') {
          this.renderer.setStyle(this.element.nativeElement, 'transform', `translateY(${ev.deltaY}px)`);

        } else if (this.state === 'top') {
          // element size is -76 then deltaY subtraction. ex. calc (2 - 76) = -74 means downward movement.
          this.renderer.setStyle(this.element.nativeElement, 'transform', `translateY(calc(${ev.deltaY}px - 76vh))`);
        }
      },
      onEnd: (ev) => {
        // do something when the gesture ends
        this.renderer.setStyle(this.element.nativeElement, 'transition', '0.3s ease-out');
        if (ev.deltaY < -(windowHeight / 3) && this.state === 'dowm') {
          this.renderer.setStyle(this.element.nativeElement, 'transform', 'translateY(-76vh)');
          this.state = 'top';
        } else if (ev.deltaY < (windowHeight / 3) && this.state === 'top') {
          this.renderer.setStyle(this.element.nativeElement, 'transform', 'translateY(-76vh)');
          this.state = 'top';
        } else if (ev.deltaY > (windowHeight / 3) && this.state === 'top') {
          this.renderer.setStyle(this.element.nativeElement, 'transform', 'translateY(0px)');
          this.state = 'down';
        } else {
          this.renderer.setStyle(this.element.nativeElement, 'transform', 'translateY(0px)');
          this.state = 'dowm';
        }
      }
    };
    const gesture: Gesture = await this.gestureCtrl.create(options);
    gesture.enable();
  }

}