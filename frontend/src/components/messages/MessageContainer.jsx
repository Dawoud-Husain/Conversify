// Sources: 
// - https://www.makeuseof.com/react-to-do-list-app-build-simple/
// - https://flowbite.com/docs/components/modal/

import { useEffect,useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { AiOutlineClose } from "react-icons/ai";
import { useAuthContext } from "../../context/AuthContext";

import Popup from 'reactjs-popup';
import Button from 'react-bootstrap/Button';
import { useTodoList } from "../../hooks/useTodoList";


const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const [replyMsg, setReplyMsg] = useState(null);

	const { authUser } = useAuthContext();

	const { deleteTodo, getAllTodos, createTodo } = useTodoList();
    const [inputTask, setInputTask] = useState('');
    const [todos, setTodos] = useState([]);

	useEffect(() => {
        // Reset replyMsg when selectedConversation changes
        setReplyMsg(null);
    }, [selectedConversation]);

    useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	
    useEffect(() => {
        const fetchTodos = async () => {
            if (selectedConversation?._id) {
                const data = await getAllTodos();
                setTodos(data || []);
            }
        };
        fetchTodos();
    }, [selectedConversation, getAllTodos]);

	
    const handleAddTodo = async () => {
        if (!inputTask.trim()) return;
        
        const newTask = { title: inputTask };
        const createdTodo = await createTodo(newTask);
        if (createdTodo) {
            setTodos(prev => [...prev, createdTodo]);
            setInputTask('');
        }
    };

    const handleDeleteTodo = async (todoId) => {
        const success = await deleteTodo(todoId);
        if (success) {
            setTodos(prev => prev.filter(todo => todo._id !== todoId));
        }
    };


	return (
        <div className="flex flex-col h-full w-full">
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header */}
                    <div className="bg-gray-200 px-4 py-2 mb-2 flex items-center justify-between shadow-sm">
                        <span className="text-gray-700 text-sm font-semibold">
                            To: {selectedConversation.firstName + ' ' + selectedConversation.lastName || "Unknown User"}
                        </span>

						<span className="text-gray-500 text-xs">

						{/* Add Todolist popup with task entry feild, task display with corresponding delete button */}
						<Popup
							trigger={<Button variant="primary"> Open Todo List </Button>}
							position="bottom center"
							contentStyle={{
								width: '400px',
								padding: '20px',
								backgroundColor: '#FFFFFF',
								textAlign: 'center',
							}}
						>
								<div className="rounded-lg bg-white p-6 shadow-md">
									<div className="mb-4 flex items-center">
										<input
											className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
											type="text" 
											placeholder="Add a new task"
											value={inputTask}
											onChange={(e) => setInputTask(e.target.value)}
										/>
										<button 
											className="ml-2 flex items-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
											onClick={handleAddTodo}
										>
											<svg 
												className="mr-1 h-4 w-4" 
												fill="none" 
												stroke="currentColor" 
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path 
													strokeLinecap="round" 
													strokeLinejoin="round" 
													strokeWidth="2"
													d="M12 6v6m0 0v6m0-6h6m-6 0H6"
												/>
											</svg>
											Add
										</button>
									</div>

									<ul className="divide-y divide-gray-300">
										{todos.map((todo) => (
											<li key={todo._id} className="flex items-center justify-between py-3">
												<span className="text-gray-700">{todo.title}</span>
												<button 
													className="rounded-md bg-red-100 px-2 py-1 text-red-600 hover:bg-red-200"
													onClick={() => handleDeleteTodo(todo._id)}
												>
													Delete
												</button>
											</li>
										))}
									</ul>
								</div>
						</Popup>
						</span>


                        <span className="text-gray-500 text-xs">
                            {selectedConversation?.isOnline ? "Online" : "Offline"}
                        </span>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto">
						<Messages setReplyMsg={setReplyMsg}/>
                    </div>

                    {/* Input */}
                    <div className="bg-gray-200 mt-2 px-4 py-3">
					{replyMsg && (
							<div className='bg-gray-100 p-3 rounded-lg mb-3 relative'>
								<button onClick={() => setReplyMsg(null)} className="absolute top-0 right-0 mt-3 mr-3">
								<AiOutlineClose className="text-xl text-gray-700 hover:text-gray-900" />
								</button>
								<div className='flex flex-col gap-2'>
									<span className='text-gray-500'>{replyMsg.senderId === authUser._id ? "You" : selectedConversation?.firstName + " " + selectedConversation?.lastName}</span>
									<span className='text-gray-800 font-semibold'>{replyMsg.message}</span>
								</div>
							</div>
						)}
                        <MessageInput replyMsg={replyMsg} resetReplyMsg={() => setReplyMsg(null)}/>
                    </div>
                </>
            )}
        </div>
    );
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.firstName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};
