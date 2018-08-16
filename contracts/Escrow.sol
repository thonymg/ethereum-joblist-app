contract Payable {

  address creatorAddr;
  address freelancerAddr;
  bool payFreelancer;
  // address balance;

  function Payable(
    address  _creatorAddr,
    address  _freelancerAddr,
    address  _payFreelancer
  ) payable {

    creatorAddr = _creatorAddr;
    freelancerAddr = _freelancerAddr;
    _payFreelancer = _payFreelancer;
    // _balance = msg.value;
  }

  // another way to add ether
  function deposit() payable {

  }

  // For paying the freelancer
  function pay() payable {
    freelancerAddr.transfer(this.balance);
  }
}