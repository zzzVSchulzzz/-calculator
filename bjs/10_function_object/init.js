
window.onload = function() {
    const initPerson = personGenerator.getPerson();
    document.querySelector('#firstNameOutput').innerText = initPerson.firstName;
    document.querySelector('#surnameOutput').innerText = initPerson.firstName;
    document.querySelector('#genderOutput').innerText = initPerson.firstName;
    document.querySelector('#birthYearOutput').innerText = initPerson.firstName;
};

