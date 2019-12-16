// Обработчки формы добавления задачи
document.getElementById('todo-add').addEventListener('submit', e => {
    e.preventDefault();

    let error = false;
    let data = [];

    e.target.querySelectorAll('input').forEach(item => {
        item.classList.remove('error');

        if (item.value === '') {
            item.classList.add('error');
            error = true;
        } else {
            data.push(item.value);
        }
    });

    if (!error) {
        const item = todo.create(data[0], data[1]);
        placeElement(item);
        recountElements();
        e.target.reset();
    }
});

// Удаление всех элементов
document.querySelectorAll('.delete-all').forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        todoDelete(e);
    });
});

// Обработчики для модалок
document.querySelectorAll('.modal').forEach(item => {
    // Закрытие модального окна при клике на серый фон
    item.addEventListener('click', e => {
        e.preventDefault();
        e.target.classList.remove('active');
    });

    // Закрытие модального окна при клике на кнопку закрытия
    item.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            e.target.closest('.modal').classList.remove('active');
        });
    });
});

// Подтверждение удаления в модалке
document.querySelector('.modal .confirm').addEventListener('click', e => {
    e.preventDefault();

    const is_all = e.target.getAttribute('data-all') === 'true';
    const target = e.target.getAttribute('data-target');

    removeElement(target, is_all);

    e.target.closest('.modal').classList.remove('active');
});

// Попытка достать задачи из localstorage
const todo_list = JSON.parse(localStorage.getItem('todo'));
if (todo_list) {
    todo.data = todo_list;
    todo_list.forEach(item => {
        placeElement(item);
    });
    recountElements();
}
