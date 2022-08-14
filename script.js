/*
<div class="task card my-2">
                <h5 class="card-header">Task Exemplo</h5>
                <div class="card-body">
                    <span class="card-subtitle text-muted"> 11/08/2022 </span>
                    <p class="card-text"></p>
                    <div id="actions" class="d-flex justify-content-center">
                        <button onClick="editTask(this)" id="edit" class="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#meuModal"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button onClick="deleteTask(this);createTask()" id="delete" class="btn btn-danger mx-3"><i class="fa-solid fa-trash"></i></button>
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


let data = [];

    

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
    data.push({
        title: TITLE_INPUT.value,
        date: DATE_INPUT.value,
        text: TEXT_INPUT.value,

    })

    localStorage.setItem("savedTasks",JSON.stringify(data));
}

let createTask = () => {
    
    TASK_LIST.innerHTML="";
    data.map((x,y)=>{
        return TASK_LIST.innerHTML+= `
        <div id=${y} class="task card my-2">
            <h5 class="card-header">${x.title}</h5>
            <div class="card-body">
                <span class="card-subtitle text-muted"> ${x.date} </span>
                <p class="card-text"> ${x.text}</p>
                <div id="actions" class="d-flex justify-content-center">
                    <button onClick="editTask(this)" id="edit" class="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#meuModal"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button onClick="deleteTask(this);createTask()" id="delete" class="btn btn-danger mx-3"><i class="fa-solid fa-trash"></i></button>
                </div>
        </div>
    </div>
        `
    })
    
    resetForm();


}

let resetForm = () => {
    TITLE_INPUT.value="";
    DATE_INPUT.value="";
    TEXT_INPUT.value="";
}

let deleteTask = (i) =>{
    data.splice(i.parentElement.parentElement.parentElement.id,1);
    localStorage.setItem("savedTasks",JSON.stringify(data));
    console.log(data);
    
}

let editTask = (i) =>{
    let thisTask = i.parentElement.parentElement.parentElement;
    
    TITLE_INPUT.value = thisTask.children[0].innerHTML;
    DATE_INPUT.value = thisTask.children[1].children[0].innerHTML;
    TEXT_INPUT.value = thisTask.children[1].children[1].innerHTML;

    deleteTask(i);

}

(()=>{
    data = JSON.parse(localStorage.getItem("savedTasks")) || [];
    createTask();
})()