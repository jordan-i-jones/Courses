const Migrations = artifacts.require("./Migrations");
const Courses = artifacts.require("./Courses");

module.exports = function(deployer) {
    deployer.deploy(Migrations);
    deployer.deploy(Courses);
};
