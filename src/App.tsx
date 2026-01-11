import { HeroUIProvider } from "@heroui/react";

const App = () => {
  return (
    <>
      <HeroUIProvider className="h-full">
        <div className="p-5 h-full bg-gray-400">
          <h1 className="text-red-200 text-center">Todo app</h1>
        </div>
      </HeroUIProvider>
    </>
  );
};

export default App;
