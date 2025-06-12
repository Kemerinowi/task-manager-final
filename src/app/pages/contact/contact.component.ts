import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  contactForm: FormGroup;
  success = false;
  error = '';
  isLoading = false;

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  async submitForm() {
    if (this.contactForm.valid) {
      this.isLoading = true;
      this.error = '';

      try {
        const messageData = {
          name: this.contactForm.value.name,
          email: this.contactForm.value.email,
          subject: this.contactForm.value.subject,
          message: this.contactForm.value.message,
          timestamp: new Date(),
        };

        const messagesRef = collection(this.firestore, 'message-contact');
        await addDoc(messagesRef, messageData);

        this.success = true;
        this.contactForm.reset();

        // 3 saniye sonra success mesajını kaldır
        setTimeout(() => {
          this.success = false;
        }, 3000);
      } catch (err) {
        this.error =
          'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.';
        console.error('Error sending message:', err);
      } finally {
        this.isLoading = false;
      }
    } else {
      this.error = 'Lütfen tüm alanları doğru şekilde doldurun.';
    }
  }
}
