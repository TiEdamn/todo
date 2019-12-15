// Добавление элемента в список
const placeElement = item => {
    let task = document.getElementById(item.id)

    if(!task) {
        task = document.createElement("div")
        task.setAttribute("id", item.id)
        task.setAttribute("class", "todo-item")
        task.innerHTML = `${item.name} (${item.date}) <button class="btn btn-success btn-next">&raquo;</button><button class="btn btn-danger btn-delete">&times;</button>`
        task.querySelector(".btn-next").addEventListener("click", e => tryUpdate(e))
        task.querySelector(".btn-delete").addEventListener("click", e => tryDelete(e))
    }

    const list = document.getElementById(item.list).querySelector(".task-list")
    list.append(task)
}

// Удаление элемента
const removeElement = (id) => {
    const element = document.getElementById(id);
    element.parentNode.removeChild(element);
}

// Перенос элементов между списками
const tryUpdate = event => {
    event.preventDefault()

    if(event.target.closest(".col").id === "todo" && document.getElementById("progress").querySelector(".task-list").childElementCount >= 5) {
        document.getElementById("warning-modal").classList.add("active")
    } else {
        const item = todo.update(event.target.parentElement.id)
        placeElement(item)
        recountElements()
    }
}

// Нажатие кнопки удаления
const tryDelete = event => {
    event.preventDefault()

    const list = event.target.closest(".col").id

    if(list === "progress") {
        deleteModal(event.target.parentElement.id)
    } else {
        const id = todo.delete(event.target.parentElement.id)
        removeElement(id)
        recountElements()
    }
}

// Удаление всех элементов
document.querySelectorAll(".delete-all").forEach(item => {
    item.addEventListener("click", e => {
        e.preventDefault()

        const list = e.target.closest(".col").id

        if(list === "progress") {
            deleteModal(list, true)
        } else {
            const id = todo.clear(list)
            e.target.closest(".col").querySelector(".task-list").innerHTML = ""
            recountElements()
        }
    })
})

const deleteModal = (target, all = false) => {
    const modal = document.getElementById("delete-modal")
    modal.classList.add("active")
    const btn = modal.querySelector(".confirm")
    btn.setAttribute("data-all", all)
    btn.setAttribute("data-target", target)
}

// Пересчёт элементов в заголовках
const recountElements = () => {
    document.querySelectorAll(".task-list").forEach(item => {
        item.parentElement.querySelector("h3 span").innerHTML = item.childElementCount
    })
}

// Обработчки формы добавления задачи
document.getElementById("todo-add").addEventListener("submit", e => {
    e.preventDefault()

    let error = false
    let data = [];

    e.target.querySelectorAll("input").forEach(item => {
        item.classList.remove("error")

        if(item.value === "") {
            item.classList.add("error")
            error = true
        } else {
            data.push(item.value)
        }
    })

    if(!error) {
        const item = todo.create(data[0], data[1])
        placeElement(item)
        recountElements()
        e.target.reset()
    }
})

document.querySelectorAll(".modal").forEach(item => {
    // Закрытие модального окна при клике на серый фон
    item.addEventListener("click", e => {
        e.preventDefault()
        e.target.classList.remove("active")
    })

    // Закрытие модального окна при клике на кнопку закрытия
    item.querySelectorAll(".close").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault()
            e.target.closest(".modal").classList.remove("active")
        })
    })
})

// Подтверждение удаления
document.querySelector(".modal .confirm").addEventListener("click", e => {
    e.preventDefault()

    if(e.target.getAttribute("data-all") === "true") {
        todo.clear(e.target.getAttribute("data-target"))
        document.getElementById(e.target.getAttribute("data-target")).querySelector(".task-list").innerHTML = ""
    } else {
        todo.delete(e.target.getAttribute("data-target"))
        removeElement(e.target.getAttribute("data-target"))
    }

    recountElements()

    e.target.closest(".modal").classList.remove("active")
})

const todo_list = JSON.parse(localStorage.getItem("todo"))

if(todo_list) {
    todo.data = todo_list
    todo_list.forEach(item => {
        placeElement(item)
    })
    recountElements()
}