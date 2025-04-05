import {SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-800 via-pink-600 to-purple-900">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 blur-lg"
        style={{ backgroundImage: "url('/signin.jpg')" }}
      ></div>

      {/* SignIn Form */}
      <div className="relative z-10 bg-white/20 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome! </h1>
        <p className="text-white mb-6">Sign Up to continue</p>
        <SignUp />
      </div>
    </section>
  );
}
