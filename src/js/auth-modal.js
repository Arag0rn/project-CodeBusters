"use strict";

export const close = document.querySelector(".modal-close")
export const modal = document.querySelector(".modal__auth");

const link = document.querySelector(".js-signup")

link.addEventListener('click', onSignOnclick)
close.addEventListener('click', onCloseClick)

export function onSignOnclick (e){
    e.preventDefault()
    modal.style.opacity = 1;
    modal.style.visibility = "visible"
}

export function onCloseClick (){
  modal.style.opacity = 0;
  modal.style.visibility = "hidden"
}
