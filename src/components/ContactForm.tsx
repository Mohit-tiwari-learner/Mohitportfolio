"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ContactFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ContactForm({ isOpen, onClose }: ContactFormProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black overflow-y-auto flex flex-col items-center p-4 sm:p-8"
                >
                    <div className="w-full flex-1 flex flex-col items-center min-h-[max-content] py-8 sm:py-12">
                        {/* Huge Header */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            className="flex justify-center w-full overflow-hidden mb-10 sm:mb-12 mt-4"
                        >
                            <h1
                                className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-black text-white uppercase tracking-tight leading-none text-center"
                                style={{ transform: "scaleX(1.2)", transformOrigin: "center" }}
                            >
                                GET IN TOUCH
                            </h1>
                        </motion.div>

                        {/* Card */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="w-full max-w-[700px] border border-[#222] bg-[#000] rounded-xl p-6 sm:p-8 mb-12 shadow-2xl"
                        >
                            {/* Card Header */}
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-white text-xl font-medium">Project Inquiry</h2>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-white transition-colors p-1 rounded-md"
                                    aria-label="Close form"
                                    type="button"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="15" y1="12" x2="9" y2="12"></line>
                                        <polyline points="11 10 9 12 11 14"></polyline>
                                    </svg>
                                </button>
                            </div>

                            {/* Form Grid */}
                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput label="NAME" placeholder="Jane Smith" />
                                    <FormInput label="Email" placeholder="name@gmail.com" type="email" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormSelect 
                                        label="Interested In" 
                                        placeholder="Select..." 
                                        options={["Freelance Work", "Full-time Role", "Consulting", "Networking"]}
                                    />
                                    <FormSelect 
                                        label="Estimated Timeline" 
                                        placeholder="Select..." 
                                        options={["ASAP", "1-3 months", "3-6 months", "Flexible", "Just exploring"]}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput label="Phone Number (Optional)" placeholder="123-456-7890" />
                                    <FormInput label="Company (Optional)" placeholder="Company Name" />
                                </div>
                                <FormTextarea label="Project Details" placeholder="Tell me a bit about what you're building or how I can help..." />

                                <div className="pt-6 flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors text-sm"
                                    >
                                        Submit Form
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const FormInput = ({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) => {
    return (
        <div className="flex flex-col w-full">
            <label className="text-[13px] text-[#DDDDDD] mb-2 font-medium">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full bg-[#1A1A1A] text-white border border-transparent focus:border-[#333] rounded-[6px] px-4 py-3 outline-none text-[14px] placeholder:text-[#666] transition-colors"
            />
        </div>
    );
};

const FormSelect = ({ label, placeholder, options = [] }: { label: string; placeholder: string; options?: string[] }) => {
    const [hasSelected, setHasSelected] = useState(false);
    return (
        <div className="flex flex-col w-full relative">
            <label className="text-[13px] text-[#DDDDDD] mb-2 font-medium">
                {label}
            </label>
            <div className="relative">
                <select
                    className={`w-full bg-[#1A1A1A] border border-transparent focus:border-[#333] rounded-[6px] px-4 py-3 outline-none text-[14px] transition-colors appearance-none cursor-pointer ${hasSelected ? 'text-white' : 'text-[#666]'}`}
                    defaultValue=""
                    onChange={() => setHasSelected(true)}
                >
                    <option value="" disabled className="text-[#666]">{placeholder}</option>
                    {options.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#666]">
                    <ChevronDown size={18} />
                </div>
            </div>
        </div>
    );
};

const FormTextarea = ({ label, placeholder }: { label: string; placeholder: string }) => {
    return (
        <div className="flex flex-col w-full">
            <label className="text-[13px] text-[#DDDDDD] mb-2 font-medium">
                {label}
            </label>
            <textarea
                placeholder={placeholder}
                rows={4}
                className="w-full bg-[#1A1A1A] text-white border border-transparent focus:border-[#333] rounded-[6px] px-4 py-3 outline-none text-[14px] placeholder:text-[#666] transition-colors resize-none"
            />
        </div>
    );
};
