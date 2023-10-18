import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trcp } from "./lib/trcp";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trcpClient] = useState(() => {
    return trcp.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:5000/trcp",
        }),
      ],
    });
  });

  return (
    <trcp.Provider queryClient={queryClient} client={trcpClient}>
      <QueryClientProvider client={queryClient}>
        <div className=" flex items-center justify-center w-full h-[100vh] bg-slate-500 flex-col">
          <TodoList />
          <AddTodo />
        </div>
      </QueryClientProvider>
    </trcp.Provider>
  );
};

export default App;
