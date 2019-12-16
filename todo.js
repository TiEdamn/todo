const todo = {
    data: [],
    create(name, date) {
        const item = {
            id: (+new Date()).toString(16),
            name,
            date,
            list: 'todo'
        };
        this.data.push(item);

        localStorage.setItem('todo', JSON.stringify(this.data));

        return item;
    },
    update(id) {
        const item = this.findIndex(id);
        this.data[item].list =
            this.data[item].list === 'todo'
                ? 'progress'
                : this.data[item].list === 'done'
                ? 'todo'
                : 'done';

        localStorage.setItem('todo', JSON.stringify(this.data));

        return this.data[item];
    },
    delete(id) {
        const item = this.findIndex(id);
        this.data.splice(item, 1);

        localStorage.setItem('todo', JSON.stringify(this.data));

        return id;
    },
    clear(list) {
        this.data = this.data.filter(item => {
            return item.list !== list;
        });

        localStorage.setItem('todo', JSON.stringify(this.data));
    },
    findIndex(id) {
        let idx;

        this.data.forEach((item, index) => {
            if (item.id === id) {
                idx = index;
            }
        });

        return idx;
    }
};
