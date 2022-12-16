const mamoSand = document.getElementById('mamo');
const shirSand = document.getElementById('shir');
const oferSand = document.getElementById('ofer');
const sandContainer = document.querySelector('.sand_container');
const scheduleContainer = document.querySelector('.schedule_container');
const resetBtn = document.querySelector('.delButton');
const popUp = document.querySelector('.pop-up_container');
const noBtn = document.getElementById('btn_no');
const yesBtn = document.getElementById('btn_yes');



let  selectedColor, active

sandContainer.addEventListener('click',selectSand);
scheduleContainer.addEventListener('click',setColors);
resetBtn.addEventListener('click',openPopup);
noBtn.addEventListener('click',closePopup);
yesBtn.addEventListener('click',deleteSands);


function selectSand (e){
    resetSands();

    sandColor = e.target.style.backgroundColor;

    switch (e.target.id){
        case 'mamo':
            activeSand(mamoSand, sandColor);
            break
        case 'shir':
            activeSand(shirSand, sandColor);
            break
        case 'ofer':
            activeSand(oferSand, sandColor);
            break
    }
}
function setColors(e){
    if(e.target.classList.contains('sand') && active === true){
        e.target.style.backgroundColor = selectedColor;

    }
}
function activeSand(sand,color){
    sand.classList.toggle('selected');

    if (sand.classList.contains('selected')){
        active = true;
        selectedColor = color;
        return selectedColor;
    } else{
        active = false;
    }
}
function resetSands(){
    const allSands = document.querySelectorAll('.sand_name');

    allSands.forEach((item) =>{
        item.className ='sand_name';
    })
}

function deleteSands() {
    const sands = document.querySelectorAll('.sand');
    sands.forEach((item) => {
        item.innerHTML = '';
        item.style.backgroundColor = 'white';
    })
    closePopup();

}

function openPopup(){
    popUp.style.display = 'flex';

}
function closePopup(){
    popUp.style.display = 'none';

}


