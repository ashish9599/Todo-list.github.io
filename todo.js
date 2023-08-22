(function () {
    let tasks = [];
    const tasksList = document.getElementById("list");
    const addTaskInput = document.getElementById("add");
    const tasksCounter = document.getElementById("tasks-counter");
    // console.log("working");
  
    async function fetchTodo() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await response.json();
        tasks = data.slice(0, 10);
        renderlist();
      } catch (error) {
        console.log(error);
      }
    }
  
    function addTaskToDom(task) {
      const li = document.createElement("li");
      li.innerHTML = `
                         <input
                          type="checkbox"
                          id="${task.id}"  ${task.completed ? "checked" : " "}
                          data-id="${task.id}"
                          class="custom-checkbox"
                        />
                        <label for="${task.id}">${task.title}</label>
                        <img
                          src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUT1lqkTR6p9Azkhx6o7UcsP6dKC3qoEDDGpHJolG2e3cICQDERF70RX2vLuLhTIx7gPk&usqp=CAU"
                          class="delete"
                          data-id="${task.id}"
                        />
                    
                      `;
      tasksList.append(li);
    }
  
    function renderlist() {
      tasksList.innerHTML = "";
      for (let i = 0; i < tasks.length; i++) {
        addTaskToDom(tasks[i]);
      }
      tasksCounter.innerHTML = tasks.length;
    }
  
    function toggleTask(taskId) {
  let done=false;  
tasks.map((task)=>{
        if(taskId==task.id){
          task.completed=!task.completed;
        done=true;
        }
        return task;
      })
      if(done){
        renderlist();
        showNotifacation("task toggle successfully");      
      }else{
        showNotifacation("connot able to toggle successfully");      
      }
      
    }
  
    function deleteTask(taskId) {
      const newTasks = tasks.filter(function (task) {
        return task.id != taskId;
      });
      tasks = newTasks;
      renderlist();
      showNotifacation("task deleted successfully");
    }
  
    function addTask(task) {
      if (task) {
        fetch("https://jsonplaceholder.typicode.com/todos", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(task)
        })
          .then(function (response) {
            console.log(response);
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            tasks.push(task);
            renderlist();
            showNotifacation("task added successfully");
            return;
          })
          .catch(function (error) {
            console.log("error", error);
          });
  
      }
    }
  
    function showNotifacation(text) {
      alert(text);
    }
  
    // grab the user Input
  
    function handleInputKeypress(e) {
      if (e.key === "Enter") {
        const text = e.target.value;
        // console.log(text);
  
        if (!text) {
          showNotifacation("Task text can not be empty");
          return;
        }
  
        const task = {
          title: text,
          id: Date.now(),
          completed: false
        };
        e.target.value = "";
        addTask(task);
      }
    }
    function handleClicklistner(e) {
      const target = e.target;
      // console.log(target);
      if (target.className === 'delete') {
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
      } else if (target.className === "custom-checkbox") {
        const taskId = target.dataset.id;
        console.log("custom",taskId)
        toggleTask(taskId);
        return;
      }
    } 
    function initializeApp() {
      fetchTodo();
      addTaskInput.addEventListener("keyup", handleInputKeypress);
      document.addEventListener("click", handleClicklistner);
    }
    initializeApp();
  })
  ();
  
