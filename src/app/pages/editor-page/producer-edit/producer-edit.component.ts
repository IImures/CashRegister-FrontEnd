import {Component, OnInit} from '@angular/core';
import {ProducerDetails} from "../../../interfaces/producer-details";
import {ProducerService} from "../../../services/producer.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-producer-edit',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './producer-edit.component.html',
  styleUrl: './producer-edit.component.scss'
})
export class ProducerEditComponent implements OnInit {

  producers: ProducerDetails[] = [];
  ifEditProducer : {[key: string]: boolean} = {};
  editProducerForm: {[key: string]: FormGroup} = {};

  producerFrom!: FormGroup;

  constructor(
    private producerService: ProducerService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.producerFrom = this.fb.group({
      producerName: ['', Validators.required],
      producerEdrpou: ['', Validators.required],
    })
    this.fetchData();
  }

  private fetchData() {
    this.producerService.getProducers().subscribe(
      {
        next: producer => {
          this.producers = producer;
          this.createForms();
        }
      }
    );
  }

  private createForms() {
    this.producers.forEach(producer => {
      this.ifEditProducer[producer.id] = false;
    });
  }

  onEditProducer(producer: ProducerDetails) {
    this.ifEditProducer[producer.id] = true;
    this.editProducerForm[producer.id] = this.fb.group({
      producerName: [producer.producerName, Validators.required],
      producerEdrpou: [''],
    })
  }

  onDeleteProducer(producer: ProducerDetails) {
    const confirmed = window.confirm('Точно видалити виробника?');
    if (confirmed) {
      this.producerService.deleteProducer(producer.id).subscribe({
        next: () => {
          alert("Операція вдалась");
          this.fetchData();
        },
        error : err => {
          alert("Виникла проблема, " + err.error.message);
        }
      });
    }
  }


  onSubmitEditProducer(producer: ProducerDetails) {
    const form = this.editProducerForm[producer.id];
    const data = form.value;
    this.producerService.updateProducer(producer.id, data.producerName, data.producerEdrpou).subscribe({
        next: () => {
          alert("Операція вдалась");
          this.fetchData();
        },
        error : err => {
          alert("Виникла проблема, " + err.error.message);
        }
    });
  }

  onDismissEditProducer(producer: ProducerDetails) {
    this.ifEditProducer[producer.id] = false;
    delete this.editProducerForm[producer.id];
  }

  onSubmit() {
    const data = this.producerFrom.value;
    this.producerService.createProducer(data.producerName, data.producerEdrpou).subscribe({
      next: () => {
        alert("Операція вдалась");
        this.fetchData();
        this.producerFrom.reset();
      },
      error : err => {
        alert("Виникла проблема, " + err.error.message);
      }
    })
  }

  onDismiss() {
    this.producerFrom.reset();
  }
}
