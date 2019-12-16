// Добавление элемента в список
const placeElement = item => {
    let task = document.getElementById(item.id);

    if (!task) {
        task = document.createElement('div');
        task.setAttribute('id', item.id);
        task.setAttribute('class', 'todo-item');
        task.innerHTML = `${item.name} (${item.date}) <button class="btn btn-success btn-next">&raquo;</button><button class="btn btn-danger btn-delete">&times;</button>`;
        task.querySelector('.btn-next').addEventListener('click', e =>
            todoNext(e)
        );
        task.querySelector('.btn-delete').addEventListener('click', e =>
            todoDelete(e)
        );
    }

    const list = document.getElementById(item.list).querySelector('.task-list');
    list.append(task);
};

// Удаление элемента
const removeElement = (target, is_all) => {
    if (is_all) {
        todo.clear(target);
        document.getElementById(target).querySelector('.task-list').innerHTML =
            '';
    } else {
        todo.delete(target);
        const element = document.getElementById(target);
        element.parentNode.removeChild(element);
    }

    recountElements();
};

// Перенос элементов между списками
const todoNext = event => {
    event.preventDefault();

    if (
        event.target.closest('.col').id === 'todo' &&
        document.getElementById('progress').querySelector('.task-list')
            .childElementCount >= 5
    ) {
        document.getElementById('warning-modal').classList.add('active');
    } else {
        const item = todo.update(event.target.parentElement.id);
        placeElement(item);
        recountElements();
    }
};

// Нажатие кнопки удаления одного элемента
const todoDelete = event => {
    event.preventDefault();

    const list = event.target.closest('.col').id;
    const is_all = event.target.classList.contains('delete-all');

    const id = is_all
        ? event.target.closest('.col').id
        : event.target.closest('.todo-item').id;

    if (list === 'progress') {
        deleteModal(id, is_all);
    } else {
        removeElement(id, is_all);
    }
};

// Открытие модалки при попытке удалить элементы из списка In Progress
const deleteModal = (target, is_all = false) => {
    const modal = document.getElementById('delete-modal');
    modal.classList.add('active');
    const btn = modal.querySelector('.confirm');
    btn.setAttribute('data-all', is_all);
    btn.setAttribute('data-target', target);
};

// Пересчёт элементов в заголовках
const recountElements = () => {
    document.querySelectorAll('.task-list').forEach(item => {
        item.parentElement.querySelector('h3 span').innerHTML =
            item.childElementCount;
    });
};
