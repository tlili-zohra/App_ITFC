import { Outlet } from "react-router-dom";

export default function ServicesLayout() {
  return (
    <div className="pt-20 px-6 min-h-screen">
      <Outlet /> {/* Where child components will render */}
    </div>
  );
}
