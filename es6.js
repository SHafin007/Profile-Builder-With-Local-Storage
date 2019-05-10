class Profile{
    constructor(id,name, email, profession){
        this.id = id;
        this.name = name;
        this.email = email;
        this.profession = profession;
    }
};
class Store{
static addToStorage(profile){
    let profiles;
    if(localStorage.getItem('profiles')===null){
        profiles=[];
    }else{
        profiles=JSON.parse(localStorage.getItem('profiles'));
    }
    profiles.push(profile);
    localStorage.setItem('profiles',JSON.stringify( profiles));
}

static getProfiles(){
    let profiles;
    if(localStorage.getItem('profiles')===null){
        profiles=[];
    }else{
        profiles= JSON.parse(localStorage.getItem('profiles'));
        }
    return profiles;
    }
    static displayProfiles(){
        const profiles = Store.getProfiles();
        profiles.forEach(profile =>{
            const ui = new UI();
            ui.addProfileToList(profile);
        });
    }
    static deleteProfileFromStorage(id){
        const profiles = Store.getProfiles();

        profiles.forEach((profile,index) =>{
            if(profile.id === id){
                profiles.splice(index , 1);
            }
        });
        localStorage.setItem('profiles', JSON.stringify(profiles));
    };
};

window.addEventListener('DOMContentLoaded',Store.displayProfiles);
class UI{
    addProfileToList({id,name,email,profession}){
        const tr = document.createElement('tr');
        tr.innerHTML= `
        <th scope="row">${name}</th>
        <td>${email}</td>
        <td>${profession}</td>
        <input type="hidden" data-id="${id}">
        <td><i class="fa fa-trash" id="delete"></i></td>
        `;
    
        document.querySelector('#profile-list').appendChild(tr);
    };
    deleteProfile(target){
        if(target.id ==='delete'){

            const id = Number(target.parentElement
                        .previousElementSibling.dataset.id);
            Store.deleteProfileFromStorage(id);
            
            //remove tr
            target.parentElement.parentElement.remove();
        }
    };
    showAlert(message, className){
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

    getId(){
        return document.querySelectorAll('tr').length;
    }

    clearField(){
        document.querySelector('#name').value='';
        document.querySelector('#email').value='';
        document.querySelector('#profession').value='';
    };

};

document.querySelector('form').addEventListener('submit',e=>{
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const profession = document.querySelector('#profession').value;
       //Instantiate ui object
       const ui = new UI();
       const id = ui.getId();
       console.log(id);
    //Instantiate profile object
    const profile = new Profile(id, name, email,profession);

 
    if(name === '' || email === '' || profession === ''){
        ui.showAlert('Please provide necerray information','danger');
    }else{
        ui.showAlert('Profile is added','success');
        //Adding to list
        ui.addProfileToList(profile);
        
        //Adding to Localstorage
        Store.addToStorage(profile);
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