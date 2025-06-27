import { React,useState } from "react";

function TodoApp() {

	const [taskList, setTaskList] = useState(["Example Task (delete me ➡️)"]);

	function addTask(event) {
		
        if (event.key === "Enter") {
            const inputValue = event.target.value.trim(); 
            
            if (inputValue) { 
                setTaskList(taskList.concat(inputValue));
                event.target.value = "";
            } else { 
                alert("ℹ️EMPTY TASKℹ️\nYou need to write something"); // por si acaso le da a enter con el input vacio
            };
        };
	};

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


            {/* LISTA DE TAREAS */}
            <ul className="list-unstyled shadow-lg border align-self-center m-0 bg-white p-4 mx-4" style={{width: "75%"}}>


                {/* INPUT DE TAREAS */}
                <li className="border-0 border-bottom align-self-center fs-1 my-2">
                    <input type="text" className="w-100 px-0 border-0" placeholder="➕ Write a task and press Enter" onKeyDown={addTask} />
                </li>


                {/* ADICIÓN DE TAREAS CON .MAP */}
                {taskList.map((item, i) => (

                    <li key={i} className="d-flex border-0 border-bottom align-self-center fs-1 my-2">
                        <p className="flex-grow-1 align-self-start m-0 text-start">{item}</p>
                        <p className=" align-self-end text-end m-0">
                            <button className="p-0 border-0 bg-white" onClick={() => setTaskList(taskList.filter((_, index) => index !== i))}> ❌ </button>
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

export default TodoApp;