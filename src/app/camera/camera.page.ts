import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage {
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef;
  currentFilter = '';

  constructor(private renderer: Renderer2) {}

  async startCamera() {
    // Get the device's media stream and attach it to the video element
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    this.videoElement.nativeElement.srcObject = stream;
    this.videoElement.nativeElement.play();
  }

  applyFilter(filter: string) {
    this.currentFilter = filter;
  }

  stopCamera() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    const stream = video.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    video.srcObject = null;
  }

  ionViewWillLeave() {
    this.stopCamera(); // Stop camera when leaving page
  }
}
