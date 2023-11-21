const fecha = document.querySelector("#fecha");
const lista = document.querySelector("#lista");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#boton-enter");
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-through";
let id
let LIST 

const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString("es-ES", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

function agregarTarea(tarea, id, realizado, eliminado) {
  if (eliminado) {
    return;
  }

  const REALIZADO = realizado ? check : uncheck;
  const LINE = realizado ? lineThrough : "";
  const elemento = ` <li id="elemento">
  <i class="fa-regular ${REALIZADO} co" data="realizado" id="${id}"></i>
    <p class="texto ${LINE}">${tarea}</p>
    <i class="fa-solid fa-trash de" data="eliminado" id="${id}"></i>
    </li>`;

  lista.insertAdjacentHTML("beforeend", elemento);
}
function tareaRealizada(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".texto").classList.toggle(lineThrough);
  LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
}

function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].eliminado = true;
}
botonEnter.addEventListener("click", () => {
  const tarea = input.value;
  if (tarea) {
    agregarTarea(tarea, id, false, false);
    LIST.push({
      nombre: tarea,
      id: id,
      realizado: false,
      eliminado: false,
    });
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
  input.value = "";
  id++;
});

document.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    const tarea = input.value;
    if (tarea) {
      agregarTarea(tarea, id, false, false);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
    input.value = "";
    id++;
  }
});

lista.addEventListener("click", function (event) {
  const element = event.target;
  const elementData = element.attributes.data.value;
  if (elementData == "realizado") {
    tareaRealizada(element);
  } else if (elementData == "eliminado") {
    tareaEliminada(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

let data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  cargarLista(LIST);
} else {
  LIST = [];
  id = 0;
}

function cargarLista(DATA){
  DATA.forEach(element => {
    agregarTarea(element.nombre, element.id, element.realizado, element.eliminado)
  });
}
