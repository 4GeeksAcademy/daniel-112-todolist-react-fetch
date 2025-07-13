import React, { useState, useEffect } from "react";

function Fetch() {

	const [taskList, setTaskList] = useState([]);
    const apiURL = "https://playground.4geeks.com/todo";
    const userName = "Daniel";


    // este useEffect solo se ejecuta al inicio
    useEffect( () => {
        initializeTasks()
    }, []);


    async function initializeTasks() {
        // Por defecto la petición es GET si no se escribe excplicitamente otro método
        var resp = await fetch(`${apiURL}/users/${userName}`) // method: "GET"

        // Si la respuesta es 404, no lo encontró
        if (resp.status === 404) { // 404 "Not found"
            // Aquí se crea la lista en caso de que no exista
            resp = await fetch(`${apiURL}/users/${userName}`,
                                 {method: "POST"});
            // si lo crea exitosamente, crea la lista vacía
            if (resp.ok) {
                setTaskList([])
            } else {
                console.log("No se pudo inicar la lista")
            }
            return;
        }
        // Si la respuesta NO está ok, decirlo en la consola y salir del hilo
        if (!resp.ok) {
            console.log("Hubo un error fatal, fin del mundo")
            return;
        }
        // Si, por otro lado, todo OK, guardamos resp en formato JSON, variable "data"
        const data = await resp.json();

        // Al final, pasamos las tareas de la API (del objeto) en el useState de las tareas
        setTaskList(data.todos)
    }


	function getTasks() {
		fetch(`${apiURL}/users/${userName}`, { method: "GET" })
			.then((response) => response.json())
			.then((data) => setTaskList(data.todos))
			.catch((error) => console.log(error))
	}


	function addTask() {
        const inputElement = document.querySelector('.input');
        const inputValue = inputElement.value.trim();
        
        if (inputValue) {             
            fetch(`${apiURL}/todos/${userName}`, {
            method: "POST",
            body: JSON.stringify({
                "label": inputValue,
                "is_done": false
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                // console.log(response)
                if (response.status === 201) {
                    getTasks();
                    inputElement.value = "";
                }
                return response.json()
            })
            // .then((data) => console.log(data))
            .catch((error) => console.log(error))
 
        } else { 
            alert("ℹ️EMPTY TASKℹ️\nYou need to write something");
        }
	}

    
    function eliminateTask(id) {
		fetch(`${apiURL}/todos/${id}`, { method: "DELETE" })
			.then((response) => {
				if (response.ok) {
					getTasks();
				}
			})
			.catch((error) => console.log(error))
	}


    function taskCounter (taskAmount) {
        if (taskAmount === 0) {
            return `You have no tasks. Write one first.`;
        } else if (taskAmount === 1) {
            return `You have 1 pending task`;
        } else {
           return `You have ${taskAmount} pending tasks`;
        };
    };


	return (
        <div className="d-flex flex-column text-center mt-4">

            <p className="display-1 fw-bold text-black">TO-DOs</p>
            <p className="m-0 px-0 fs-5 m-3"><strong>User:</strong> {userName}</p>


            {/* LISTA DE TAREAS */}
            <ul className="list-unstyled shadow-lg border align-self-center m-0 bg-white p-4 mx-4" style={{width: "75%"}}>


                {/* INPUT DE TAREAS */}
                <li className="d-flex border-0 border-bottom fs-1 my-2">
                    <input type="text" className="flex-grow-1 px-0 border-0 input" placeholder="➕ Write a task"/>
                    <button className="btn btn-primary m-3" title="Add a task" onClick={addTask}>Add</button>
                </li>


                {/* ADICIÓN DE TAREAS CON .MAP */}
                {taskList.map((item) => (
                    <li key={item.id} className="d-flex border-0 border-bottom fs-1 my-2">
                        <p className="flex-grow-1 m-0 text-start">{item.label}</p>
                        <p className="m-0">
                            <button title="Eliminate task" className="p-0 border-0 bg-white eliminate-cross" onClick={() => eliminateTask(item.id)}> ❌ </button>
                        </p>
                    </li>
                ))}


                {/* CONTADOR DE TAREAS */}
                <li className="d-flex border-0 align-self-center">
                    <p className="align-self-start m-0 px-0 text-start text-secondary fs-5 m-3">
                        {taskCounter(taskList.length)}
                    </p>
                </li>

            </ul>

            {/* DECORACIÓN DE ABAJO */}
            <div className="bottom-effect-1 "></div>
            <div className="bottom-effect-2"></div>

        </div>
	);
};


export default Fetch;