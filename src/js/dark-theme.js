
const btnTheme = document.querySelector('#dark-theme');
const body = document.querySelector('.body-theme');

///////////////////////////////////////////dark-theme-refs//////////////////////////////////////////////
const footer = document.querySelector('.footer');
const footerTextleft = document.querySelector('#footer-text');
const footerTextCentre = document.querySelector('#footer-text-1');
const footerTextRight = document.querySelector('#footer-text-2');
const footerTeamLink = document.querySelector('.footer-team-link');
const signIn = document.querySelector('.signin');
const registrationFormIn = document.querySelector('.registration-form');
const labelTextEmailIn = document.querySelector('#label-text-email-in');
const labelTextPasswordin = document.querySelector('#label-text-password-in');
const registrationFormUn = document.querySelector('#registration-form-un');
const labelTextEmailUn = document.querySelector('#label-text-email-un');
const labelTextNamedUn = document.querySelector('#FullName');
const labelTextPasswordUn = document.querySelector('#label-text-password-un');
const labelTextRepeatPasswordUn = document.querySelector('#label-text-repeat-password-un');
const btnRegistration = document.querySelector('.registration-btn');


//////////////////////////////////////////////////////////////////////////////////////////////////////

const localTheme = localStorage.getItem('color-theme');

if (localTheme ==="dark-theme") {
    body.classList.add('dark-theme');
    footer.classList.add('dark-theme');
    footerTextleft.classList.add('dark-theme');
    footerTeamLink.classList.add('dark-theme');
    footerTextCentre.classList.add('dark-theme');
    footerTextRight.classList.add('dark-theme');
    signIn.classList.add('dark-theme');
    registrationFormIn.classList.add('dark-theme');
    labelTextEmailIn.classList.add('dark-theme');
    labelTextPasswordin.classList.add('dark-theme');
    registrationFormUn.classList.add('dark-theme');
    labelTextEmailUn.classList.add('dark-theme');
    labelTextNamedUn.classList.add('dark-theme');
    labelTextPasswordUn.classList.add('dark-theme');
    labelTextRepeatPasswordUn.classList.add('dark-theme');
    btnRegistration.classList.add('dark-theme');

}

btnTheme.addEventListener('click', darkThemeColor);

function darkThemeColor(){
    body.classList.toggle('dark-theme');
    footer.classList.toggle('dark-theme');
    footerTextleft.classList.toggle('dark-theme');
    footerTeamLink.classList.toggle('dark-theme');
    footerTextCentre.classList.toggle('dark-theme');
    footerTextRight.classList.toggle('dark-theme');
    signIn.classList.toggle('dark-theme');
    registrationFormIn.classList.toggle('dark-theme');
    labelTextEmailIn.classList.toggle('dark-theme');
    labelTextPasswordin.classList.toggle('dark-theme');
    registrationFormUn.classList.toggle('dark-theme');
    labelTextEmailUn.classList.toggle('dark-theme');
    labelTextNamedUn.classList.toggle('dark-theme');
    labelTextPasswordUn.classList.toggle('dark-theme');
    labelTextRepeatPasswordUn.classList.toggle('dark-theme');
    btnRegistration.classList.toggle('dark-theme');
    switchThemeColor() ;
};

const localCxheckboxLog = localStorage.getItem('checkbox-theme') || '';

if (localCxheckboxLog !=="") {
    btnTheme.checked = true;
}

function switchThemeColor() {
if (document.querySelector('.dark-theme')){
    localStorage.setItem('checkbox-theme', 'true'); // save
    localStorage.setItem('color-theme','dark-theme'); // save
}else {
    localStorage.removeItem('color-theme'); // delete
    localStorage.removeItem('checkbox-theme'); // delete
}
}

