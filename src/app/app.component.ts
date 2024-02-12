import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  // title = 'FaceBook';
  showPost = true; // กำหนดค่าเริ่มต้นเป็น true
  constructor(private router: Router, private route: ActivatedRoute) { }


  togglePostView(event: any) {
    if (event) {
      const currentUrl = this.route.snapshot.url[0]?.path; // อ่าน URL ปัจจุบันและเลือกเส้นทางแรก
      if (currentUrl === 'posts') {
        this.showPost = false; // เปลี่ยนเป็น false ถ้า URL เป็น '/post'
      } else {
        this.showPost = true; // เปลี่ยนเป็น true ถ้า URL เป็นอยู่ที่อื่นๆ (ไม่ใช่ '/post')
      }
    }
  }

}
