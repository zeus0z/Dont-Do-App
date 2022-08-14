/*
<div class="task card my-2">
                <h5 class="card-header">Task Exemplo</h5>
                <div class="card-body">
                    <span class="card-subtitle text-muted"> 11/08/2022 </span>
                    <p class="card-text"></p>
                    <div id="actions" class="d-flex justify-content-center">
                        <button onClick="editTask(this)" id="edit" class="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#meuModal"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button onClick="deleteTask(this)" id="delete" class="btn btn-danger mx-3"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>
*/

const SUBMIT = document.getElementById("submit_button");
const TITLE_INPUT = document.getElementById("titleInput");
const DATE_INPUT = document.getElementById("dateInput");
const TEXT_INPUT = document.getElementById("textInput");
const ALERT = document.getElementById("alert");
const TASK_LIST = document.getElementById("tasks");


let data = {};

    

SUBMIT.addEventListener("click", ()=>{
    inputValidation();
})

let inputValidation = () => {
    if (TITLE_INPUT.value === "") {
        ALERT.innerHTML="Este campo não pode ficar em branco.";
    }
    else {
        ALERT.innerHTML="";
        acceptData();
        createTask();
        SUBMIT.setAttribute("data-bs-dismiss","modal");
        SUBMIT.click();

        (()=>{
            SUBMIT.setAttribute("data-bs-dismiss","")
        })();

    }
    

}

let acceptData = () => {
    data.title = TITLE_INPUT.value;
    data.date = DATE_INPUT.value;
    data.text = TEXT_INPUT.value;
    console.log(data);
}

let createTask = () => {
    TASK_LIST.innerHTML+= `
    <div class="task card my-2">
        <h5 class="card-header">${data.title}</h5>
        <div class="card-body">
            <span class="card-subtitle text-muted"> ${data.date} </span>
            <p class="card-text"> ${data.text}</p>
            <div id="actions" class="d-flex justify-content-center">
                <button onClick="editTask(this)" id="edit" class="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#meuModal"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onClick="deleteTask(this)" id="delete" class="btn btn-danger mx-3"><i class="fa-solid fa-trash"></i></button>
            </div>
    </div>
</div>
    `
    resetForm();


}

let resetForm = () => {
    TITLE_INPUT.value="";
    DATE_INPUT.value="";
    TEXT_INPUT.value="";
}

let deleteTask = (i) =>{
    i.parentElement.parentElement.parentElement.remove();
    
}

let editTask = (i) =>{
    let thisTask = i.parentElement.parentElement.parentElement;
    
    TITLE_INPUT.value = thisTask.children[0].innerHTML;
    DATE_INPUT.value = thisTask.children[1].children[0].innerHTML;
    TEXT_INPUT.value = thisTask.children[1].children[1].innerHTML;

    thisTask.remove();

}