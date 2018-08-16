contract JobList {

  struct Job {
    uint256 jobSalary;
    string jobTitle;
    string jobDescription;
    bool salaryDelivred;
    bool active;
    bool inProgress;
    address workerAddress;
    address creatorAddress;

  }

  Job[] jobArray;

  uint jobCount = 0;
  uint finishedJobCount = 0;
  uint workInprogressCount = 0;

  mapping (uint => Job) jobs;
  mapping (address => uint) myWorkInprogress;

  event LogAddJob(string title, string desc, uint salary);
  event LogPayFreelancer(uint _index, address indexed creatorAddress, address indexed workerAddress, uint salary);
  event LogFreelancerDoneJob(uint index, address indexed workerAddress);
  event LogFreelancerTakeJob(uint index, address indexed workerAddress);

  function addJob(
    string _jobTitle,
    string _jobDescription,
    uint256 _jobSalary
    ) public {
        require(_jobSalary > 0);
        require(bytes(_jobTitle).length > 0);
        require(bytes(_jobTitle).length > 0);

      var _job = jobs[jobCount];

      _job.workerAddress = 0x0;
      _job.jobSalary += (_jobSalary * 10e18);
      _job.jobTitle = _jobTitle;
      _job.jobDescription = _jobDescription;
      _job.active = true;
      _job.inProgress = false;
      _job.creatorAddress = msg.sender;
      _job.salaryDelivred = false;

      jobArray.push(_job);
      jobCount++;

      emit LogAddJob(_job.jobTitle, _job.jobDescription, _job.jobSalary);
  }

  function getTotalJobNumber() view public returns(uint) {
    return jobCount;
  }

  function getJobByIndex(uint _index) view public returns(address, uint, string, string, bool, bool, bool) {
    return (
      jobs[_index].workerAddress,
      jobs[_index].jobSalary,
      jobs[_index].jobTitle,
      jobs[_index].jobDescription,
      jobs[_index].active,
      jobs[_index].inProgress,
      jobs[_index].salaryDelivred
      );
  }

  function doThisJob(uint _index) {
    require(jobs[_index].active == true);
    jobs[_index].workerAddress = msg.sender;
    jobs[_index].inProgress = true;

    workInprogressCount++;

    emit LogFreelancerTakeJob(_index, jobs[_index].workerAddress);
  }

  function jobDone(uint _index) {
    require(jobs[_index].workerAddress == msg.sender);

    jobs[_index].inProgress = false;
    jobs[_index].active = false;

    emit LogFreelancerDoneJob(_index, jobs[_index].workerAddress);
  }

  function cancelJob(uint _index) {
    require(jobs[_index].creatorAddress == msg.sender && jobs[_index].inProgress == false);

    jobs[_index].active = false;
  }

  function payTheFreelancer(uint _index) public payable{
    require(jobs[_index].creatorAddress == msg.sender);
    require(jobs[_index].inProgress == false && jobs[_index].active == false);

    address dest = jobs[_index].workerAddress;

    require(jobs[_index].jobSalary <= msg.value * 1 ether);

    jobs[_index].workerAddress.send(msg.value);
    jobs[_index].salaryDelivred = true;

    emit LogPayFreelancer(_index, jobs[_index].creatorAddress, dest, jobs[_index].jobSalary);

  }
}