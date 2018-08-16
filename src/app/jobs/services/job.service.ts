import { Injectable } from '@angular/core';
import { Web3Service } from '@shared/services/web3.service';

declare let require: any;
const joblist_artifacts = require('./../../../../build/contracts/JobList.json');

@Injectable({
  providedIn: 'root',
})
export class JobService {
  JobList = null;
  deployedJobList = null;

  accountsList = null;
  account = null;

  constructor(private web3Service: Web3Service) {
    this.web3Service
      .artifactsToContract(joblist_artifacts)
      .then(async JobListAbstraction => {
        this.JobList = JobListAbstraction;
        return this.JobList;
      })
      .then(async jobList => {
        this.deployedJobList = await jobList.deployed();
      });
    this.getConnectedAccount();
  }

  getConnectedAccount() {
    this.web3Service.accountsObservable.subscribe(accounts => {
      this.accountsList = accounts;
      this.account = accounts[0];
    });
  }

  getDeployedJobList() {
    if (this.deployedJobList === null) return 'not deployed';
    return this.deployedJobList;
  }
  getJobList() {
    if (this.JobList !== null) return 'contract not ready';
    return this.JobList;
  }
}
