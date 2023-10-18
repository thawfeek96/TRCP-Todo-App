import React, { useState } from "react";
import { trcp } from "../lib/trcp";

const AddTodo = () => {
  const [title, setTitle] = useState<string>("");
  const addTodoMutation = trcp.todo.create.useMutation();
  const trcpContext = trcp.useContext();
  const handelAdd = () => {
    addTodoMutation.mutate(
      {
        title: title,
      },
      {
        onSuccess: () => {
          setTitle("");
          trcpContext.todo.list.invalidate();
        },
      }
    );
  };
  return (
    <div className=" flex items-center justify-center gap-x-4 ">
      <input
        type="text"
        className=" border-2 border-black outline-none rounded-lg w-[300px] p-2 "
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyPress={(e) => {
          if(e.key === "Enter") {
            handelAdd()
          }
        }}
      />
      <button
        onClick={handelAdd}
        className=" bg-blue-300 text-white font-semibold px-4 py-1 rounded-lg"
      >
        Add
      </button>
    </div>
  );
};

export default AddTodo;
