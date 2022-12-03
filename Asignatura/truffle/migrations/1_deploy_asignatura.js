let Asignatura = artifacts.require("Asignatura");

module.exports = async function(deployer) {
  deployer.deploy(Asignatura, "BCDA", "2022");
};
