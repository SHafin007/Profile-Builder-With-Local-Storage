
function Profile(name, email,profession){
    this.name = name;
    this.email = email;
    this.profession = profession;
};

function UI(){};

UI.prototype.addProfileToList = function({name,email,profession}){
    const tr = document.createElement('tr');
    tr.innerHTML= `
    <th scope="row">${name}</th>
    <td>${email}</td>
    <td>${profession}</td>
    <td><i class="fa fa-trash" id="delete"></i></td>
    `;

    document.querySelector('#profile-list').appendChild(tr);
};

// delete Profile
UI.prototype.deleteProfile = function(target){

        if(target.id ==='delete'){
            target.parentElement.parentElement.remove();
        }
};

//Showing alert message

UI.prototype.showAlert = function(message, className){

    const form = document.querySelector('form');
    const container = document.querySelector('.container');
    const div = document.createElement('div');
    div.className =`alert alert-${className}`;
    div.textContent = message;
   container.insertBefore(div,form);
   setTimeout(()=>{
    document.querySelector('.alert').remove();
   },2000);

};

// Clearing field after submitting
UI.prototype.clearField=function(){
    document.querySelector('#name').value='';
    document.querySelector('#email').value='';
    document.querySelector('#profession').value='';
};

document.querySelector('form').addEventListener('submit',e=>{
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const profession = document.querySelector('#profession').value;
    
    //Instantiate profile object
    const profile = new Profile(name, email,profession);

    //Instantiate ui object
    const ui = new UI();
    if(name === '' || email === '' || profession === ''){
        ui.showAlert('Please provide necerray information','danger');
    }else{
        ui.showAlert('Profile is added','success');
        ui.addProfileToList(profile);
        ui.clearField();
    }
    

    e.preventDefault();
});

//Evebt delegation pratical use

document.querySelector('#profile-list').addEventListener('click',e=>{
    //Instantiate ui object
    const ui = new UI();
    ui.deleteProfile(e.target);
    ui.showAlert('Profile is Remove','success');
});