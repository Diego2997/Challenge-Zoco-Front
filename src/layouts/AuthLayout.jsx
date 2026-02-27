import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/auth/LoginPage";
import { FooterLayout } from "../components/ui/FooterLayout";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br ">
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </main>

      <div className="py-6 text-center text-sm text-gray-500">
        <FooterLayout />
      </div>

    </div>
  );
}