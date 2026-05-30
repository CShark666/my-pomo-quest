import { Sidebar } from "./Sidebar";

export function NotFoundPage() {
  return (
    <>
      <Sidebar />
      <div className="flex justify-center items-center text-9xl text-secondary/30">
        <h1>404</h1>
      </div>
    </>
  );
}
