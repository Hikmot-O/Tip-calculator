'use strict';
const billInput = document.querySelector('.input-bill');
const billLabelInvalid = document.querySelector('.input-label-right-bill');
const tipContainer = document.querySelector('.tip__container');
const customInput = document.querySelector('.bill__tip--custom');
const peopleInput = document.querySelector('.input-people');
const peopleLabelInvalid = document.querySelector('.input-label-right-people');
const tipPercent = document.querySelectorAll('.bill__tip--percent');
const tipPercentDisplay = document.querySelectorAll('.tip-display')
const tipAmount = document.querySelector('.amount__tip--value');
const totalAmount = document.querySelector('.amount__total--value');
const reset = document.querySelector('.btn');

let tip;

    
tipContainer.addEventListener('click', function(e){    
    if(e.target.textContent !== ''){
    tip = e.target.textContent;
        tip = tip.slice(0, - 1);
    }
});
    
    
let tipPerPerson;
let totalPerPerson;
peopleInput.addEventListener('keypress', function(e){
    const bill = Number(billInput.value);
    const custom = Number(customInput.value);
    const people = Number(peopleInput.value);
    if(e.keyCode === 13 || e.which === 13){

        if(billInput.value === '' || billInput.value < 1 || peopleInput.value === '' || peopleInput.value < 1 || tip < 0) {
            return;
        }

            //Calculate tip amount per person
            if(customInput.value === ''){
                tipPerPerson = ((bill/people) * (tip/100));
            }else{
                tip = custom;
                tipPerPerson = ((bill/people) * (tip/100));
            }
    
            //Update tip amount on UI
            tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
    
            //Calculate total amount per person
            totalPerPerson = tipPerPerson + (bill/people);
    
            //Update total amount on UI
            totalAmount.textContent = `$${totalPerPerson.toFixed(2)}`;
    }
});

//change style of % when clicked
Array.from(tipPercentDisplay).map(el => el.addEventListener('click', function(e){
    el.classList.toggle('percent-active');
}));

reset.addEventListener('click', function(){
    tipPerPerson = 0;
    totalPerPerson = 0;
    billInput.value = '';
    customInput.value = '';
    peopleInput.value = ''

    //Update UI
    tipAmount.textContent = '$0.00';
    totalAmount.textContent = '$0.00';

    Array.from(tipPercentDisplay).map(el => {
        el.classList.remove('percent-active');
    });
});

const invalidInput = function(el){
    el.addEventListener('input', function(){
        if(el.value <= 0 || el.value === ''){
            el.style.outline = '2px solid rgb(228, 94, 117)';
            
            if(el === billInput){
                billLabelInvalid.style.visibility = 'visible';
            }else{
                peopleLabelInvalid.style.visibility = 'visible';

            }
        }else{
            el.style.outline = 'hsl(172, 67%, 45%) solid 2px';

            if(el === billInput){
                billLabelInvalid.style.visibility = 'hidden';
            }else{
                peopleLabelInvalid.style.visibility = 'hidden';
            }
        }
    
    });
}

invalidInput(billInput);
invalidInput(peopleInput);





