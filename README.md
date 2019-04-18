# Solidity Mapping, Structs, and Testing
#### This comes from the [Solidity Mapping and Structs tutorial](https://coursetro.com/posts/code/102/Solidity-Mappings-&-Structs-Tutorial), the code was updated to Solidity version 5.0.

To begin this project start by downloading _truffle_ and _solidity_ in your command window, using the following commands.
```
npm i -g truffle
npm i -g solc
```
Next, create the projecct folder and set up the file structure for the project with the following commands.
```
mkdir Courses
cd Courses
truffle init
```
Now that the structure for the project is set up, we need to create our contract as a .sol file. This can be done with the following command.
```
truffle create contract Courses
```
Now if you check the contract folder of the project, you will see the files _Courses.sol_ and _Migrations.sol_ in there. If you are following along witht the tutorial, several changes need to be made to the code to compile the contract. This is because the code is out of date, the syntax has change since the tutorial was released. Copy the code below into the _Courses.sol_ file, it has been updated.
```
pragma solidity ^0.5.0;
contract Courses {
  struct Instructor {
    uint age;
    string fName;
    string lName;
  }
  mapping (address => Instructor) instructors;
  address[] public instructorAccts;
  constructor() public{
  }
  function setInstructor(address _address, uint _age, string memory _fName, string memory _lName) public {
    //var instructor = instructors[_address];
    instructors[_address].age = _age;
    instructors[_address].fName = _fName;
    instructors[_address].lName = _lName;      
    instructorAccts.push(_address) -1;
  }
  function getInstructors() view public returns(address[] memory) {
    return instructorAccts;
  }
  function getInstructor(address _address) view public returns (uint, string memory, string memory) {
    return (instructors[_address].age, instructors[_address].fName, instructors[_address].lName);
  }
  function countInstructors() view public returns (uint) {
    return instructorAccts.length;
  }
}
```
We now need to deploy the contract on the Ethereum blockchain we need the help of a JavaScript file. Create a file in the migration folder named _2_deploy_contracts.js_ and copy the following code into the _.js_ file. 
```
var Courses = artifacts.require("./Courses.sol");
module.exports = function(deployer) {
  deployer.deploy(Courses);
};
```
Now that that is complete, it's time to test the contract. We will be using _Truffle Develop_ which is an interactive console that also spawns a development blockchain. The following commands will set it up.
```
truffle compile
truffle develop
```
When you get inside to confirm that everything has been compiled use the following code to recompile and run all migrations from the beginning.
```
migrate --reset --all
```
Notice that _truffle_ wasn't used in the command due to being in _Truffle Develop_. Now to test the functions in our contract the following codes can be used. During my testing I used my information, feel free to use your own. I have included an image of the results.
```
Courses.deployed().then(function(instance){return instance.setInstructor("0x3ffa45c3e017fccb7524f1457a44410963c9eccc",34,"Jordan","Jones");})
Courses.deployed().then(function(instance){return instance.getInstructor("0x8030bffef2c19e3a1b9751a0476d50b3ec0878a6");})
Courses.deployed().then(function(instance){return instance.getInstructors();})
Courses.deployed().then(function(instance){return instance.countInstructors();})
```
![Image of testing](https://github.com/jordan-i-jones/Solidity-Mapping-Structs-and-Testing-tutorial/blob/master/Testing.PNG)
Now you can try testing your own functions in contracts with _Truffle Develop_!
