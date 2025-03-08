import React, { useState } from 'react';
import { Send, GraduationCap, BookOpen, Phone, Mail, User, School } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

interface FormData {
  name: string;
  year: string;
  institute: string;
  department: string;
  phone: string;
  email: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    year: '',
    institute: '',  
    department: '',
    phone: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://attendence-75ro.onrender.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Attendance submitted successfully!");
        setFormData({ name: "", year: "", institute: "", department: "", phone: "", email: "" });  // ✅ Fixed: Reset institute field too
      } else {
        toast.error("Error submitting attendance.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Network error. Try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ">
      <Toaster />

      {/* Full-width Header */}
      <header className="w-full bg-gradient-to-r from-yellow-300 to-yellow-500 text-black py-6 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-center space-x-4">
          <img 
            src="/PPF-LOGO.jpg" 
            alt="Pentapolis Foundation Logo" 
            className="h-12 w-12 rounded-full" 
          />
          <h1 className="text-3xl font-bold">Pentapolis Foundation</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-6">
        <div className="relative h-40">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Education Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
          <h2 className="absolute bottom-4 left-6 text-3xl font-bold text-white">
            Student Attendance
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <GraduationCap className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Year</option>
                <option value="1">First Year</option>
                <option value="2">Second Year</option>
                <option value="3">Third Year</option>
                <option value="4">Fourth Year</option>
              </select>
            </div>

            <div className="relative">
              <School className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="institute"
                value={formData.institute}  
                onChange={handleChange}
                placeholder="Institute"
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <BookOpen className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Department"
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Phone className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                pattern="[0-9]{10}"
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Mail className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-black py-2 px-4 rounded-lg transition-colors duration-200"
          >
            <Send className="h-5 w-5" />
            Submit Attendance
          </button>
        </form>
      </div>

      <h1 className="text-center mt-8">
          <a
            href="https://forms.gle/y9ACHaMGEBvGW3wcA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg font-semibold text-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl focus:ring-4 focus:ring-indigo-300"
          >
            📋 Register Now
          </a>
        </h1>

    </div>
  );
}

export default App;
