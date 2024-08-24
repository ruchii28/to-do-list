// Immediately Invoked Function Expression (IIFE) to avoid polluting global scope
(() => {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const filterAll = document.getElementById('filter-all');
    const filterPending = document.getElementById('filter-pending');
    const filterCompleted = document.getElementById('filter-completed');
    let tasks = [];

    // Add a new task
    const addTask = () => {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            tasks.push(task);
            renderTasks();
            newTaskInput.value = '';
        }
    };

    // Render tasks based on filter
    const renderTasks = (filter = 'all') => {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
            return true;
        });

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button onclick="toggleTask(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button onclick="editTask(${task.id})">Edit</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    };

    // Toggle task completion
    const toggleTask = (id) => {
        tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
        renderTasks();
    };

    // Edit a task
    const editTask = (id) => {
        const newText = prompt('Edit the task:');
        if (newText) {
            tasks = tasks.map(task => task.id === id ? { ...task, text: newText } : task);
            renderTasks();
        }
    };

    // Delete a task
    const deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    };

    // Event listeners
    addTaskButton.addEventListener('click', addTask);
    filterAll.addEventListener('click', () => renderTasks('all'));
    filterPending.addEventListener('click', () => renderTasks('pending'));
    filterCompleted.addEventListener('click', () => renderTasks('completed'));

    // Allow pressing Enter to add a task
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Expose functions to global scope for button onclick handlers
    window.toggleTask = toggleTask;
    window.editTask = editTask;
    window.deleteTask = deleteTask;
})();
