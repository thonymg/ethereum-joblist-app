import { Component, TemplateRef, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styles: [],
})
export class JobListComponent implements OnInit {
  data: any[] = [
    {
      title: 'Title 1',
      description: 'description description description description description',
    },
    {
      title: 'Title 2',
      description: 'description description description description description',
    },
    {
      title: 'Title 3',
      description: 'description description description description description',
    },
    {
      title: 'Title 4',
      description: 'description description description description description',
    },
  ];
  list = [null];

  loading = true;

  tplModal: NzModalRef;
  tplModalButtonLoading = false;
  htmlModalVisible = false;

  submitting = false;
  form: FormGroup;
  jobDescription: string;
  jobSalary = 1;

  constructor(
    private modalService: NzModalService,
    private fb: FormBuilder,
    private msg: NzMessageService,
    private jobService: JobService,
  ) {}

  formatterDollar = value => `${value}.00 Eth`;
  parserDollar = value => value.replace('.00 Eth', '');

  ngOnInit() {
    this.form = this.fb.group({
      jobTitle: [null, [Validators.required]],
      jobDescription: [null, [Validators.required]],
      jobSalary: [true, [Validators.required]],
    });

    this.getAllData();
    this.jobService.getConnectedAccount();
  }

  getAllData() {
    this.list = this.list.concat(this.data);
    this.loading = false;
  }

  createTplModal(
    tplTitle: TemplateRef<{}>,
    tplContent: TemplateRef<{}>,
    tplFooter: TemplateRef<{}>,
  ): void {
    this.tplModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: null,
      // nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok'),
    });
  }

  async submitForm() {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.invalid) return;
    this.submitting = true;

    console.log(
      this.jobService.accountsList,
      this.jobService.account,
      this.jobService.deployedJobList,
    );
    try {
      const addJob = await this.jobService.deployedJobList.addJob(
        'dev Js',
        'Dev Js fullstack avec une description',
        1,
        { from: this.jobService.account },
      );
      if (!addJob) {
        console.log('Transaction failed!', addJob);
      } else {
        console.log('Transaction complete!', addJob);
      }
    } catch (e) {
      console.log(e);
      console.log('see log.');
    }

    setTimeout(() => {
      this.submitting = false;
      this.msg.success(`Form send`);
    }, 1000);
  }
}
