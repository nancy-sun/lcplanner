const getTasksByDate = (tasks: Array<any>, showTasks: string): Array<any> => {
    return tasks.filter((task) => task.date === showTasks);
};

export { getTasksByDate };