import React from "react";
import { trcp } from "../lib/trcp";

const TodoList = () => {
  const responce = trcp.todo.list.useQuery();
  const deleteMutation = trcp.todo.delete.useMutation();
  const updateMutation = trcp.todo.update.useMutation();

  const trcpContext = trcp.useContext();

  if (responce.isError) {
    return <h2>Error</h2>;
  }

  if (responce.isLoading) {
    return <h2>Loading....</h2>;
  }

  const handelDelete = (e: string): void => {
    deleteMutation.mutate(
      { id: e },
      {
        onSuccess: () => {
          trcpContext.todo.list.invalidate();
        },
      }
    );
  };

  const handelUpdate = (e: string, completed: boolean): void => {
    updateMutation.mutate(
      { id: e, isCompleted: completed ? false : true },
      {
        onSuccess: () => {
          trcpContext.todo.list.invalidate();
        },
      }
    );
  };
  return (
    <div>
      <ul>
        {responce.data.map((i) => {
          return (
            <div
              key={i.id}
              className="flex items-center w-[600px] bg-gray-200 p-3 my-4 rounded-lg"
            >
              <p className=" grow">{i.title}</p>
              <p
                onClick={() => handelUpdate(i.id, i.isCompleted)}
                className="mx-4 bg-green-400 px-6 py-2 rounded-lg text-white cursor-pointer hover:text-black"
              >
                {i.isCompleted ? "Completed" : "Incomplete"}
              </p>
              <p
                onClick={() => handelDelete(i.id)}
                className=" cursor-pointer hover:text-red-500"
              >
                Delete
              </p>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
