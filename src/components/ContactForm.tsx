"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle, Loader2, AlertCircle, RefreshCcw } from "lucide-react";
import { useTheme } from "next-themes";

interface ContactFormProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormState {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

const STORAGE_KEY = "contact_form_draft";

// Sound effects helper
const playSound = (type: 'focus' | 'success' | 'click' | 'error') => {
    const audioContent = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContent.createOscillator();
    const gainNode = audioContent.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContent.destination);

    if (type === 'focus') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContent.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioContent.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.02, audioContent.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContent.currentTime + 0.1);
        oscillator.start();
        oscillator.stop(audioContent.currentTime + 0.1);
    } else if (type === 'click') {
        oscillator.type = 'triangle'; // Click sound
        oscillator.frequency.setValueAtTime(200, audioContent.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioContent.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContent.currentTime + 0.05);
        oscillator.start();
        oscillator.stop(audioContent.currentTime + 0.05);
    } else if (type === 'success') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContent.currentTime);
        oscillator.frequency.linearRampToValueAtTime(880, audioContent.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.05, audioContent.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContent.currentTime + 0.5);
        oscillator.start();
        oscillator.stop(audioContent.currentTime + 0.5);
    } else if (type === 'error') {
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(150, audioContent.currentTime);
        oscillator.frequency.linearRampToValueAtTime(100, audioContent.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.05, audioContent.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContent.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(audioContent.currentTime + 0.3);
    }
};


export function ContactForm({ isOpen, onClose }: ContactFormProps) {
    const { theme } = useTheme();
    const [formState, setFormState] = useState<FormState>({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [progress, setProgress] = useState(0);

    // Auto-load draft
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setFormState(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse saved draft", e);
            }
        }
    }, []);

    // Auto-save draft
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
    }, [formState]);

    // Clear draft on close if successful or manually cleared?
    // User might want to keep draft if they accidentally close.
    // We clear only on success.

    const validate = (fieldName: string, value: string): string | undefined => {
        if (!value.trim()) {
            if (fieldName === 'subject' || fieldName === 'message' || fieldName === 'name') return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
        }

        if (fieldName === 'email') {
            if (!value.trim()) return "Email is required";
            if (!/^\S+@\S+\.\S+$/.test(value)) return "Please enter a valid email";
        }
        return undefined;
    };

    const handleBlur = (field: keyof FormState) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        const error = validate(field, formState[field]);
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const handleChange = (field: keyof FormState, value: string) => {
        setFormState(prev => ({ ...prev, [field]: value }));
        if (touched[field]) {
            const error = validate(field, value);
            setErrors(prev => ({ ...prev, [field]: error }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        playSound('click');

        // Validate all
        const newErrors: FormErrors = {};
        let isValid = true;
        (Object.keys(formState) as Array<keyof FormState>).forEach(key => {
            const error = validate(key, formState[key]);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });
        setErrors(newErrors);
        setTouched({ name: true, email: true, subject: true, message: true });

        if (!isValid) {
            playSound('error');
            return;
        }

        setIsSubmitting(true);
        // Simulate progress
        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 20;
            if (p > 90) p = 90;
            setProgress(p);
        }, 200);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        clearInterval(interval);
        setProgress(100);
        setIsSubmitting(false);
        setIsSuccess(true);
        playSound('success');
        localStorage.removeItem(STORAGE_KEY);

        setTimeout(() => {
            setIsSuccess(false);
            setProgress(0);
            onClose();
            setFormState({ name: "", email: "", subject: "", message: "" });
            setTouched({});
        }, 3000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 m-auto w-[95%] max-w-lg h-fit max-h-[90vh] overflow-y-auto p-1 z-[101] pointer-events-none flex items-center justify-center"
                    >
                        <div className="w-full relative bg-white/80 dark:bg-neutral-900/80 backdrop-blur-2xl rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)] border border-white/20 dark:border-white/10 overflow-hidden pointer-events-auto">

                            {/* Gradient Border Line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

                            {/* Texture Noise Overlay */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />

                            <div className="p-6 md:p-8 relative z-10">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors group"
                                >
                                    <X size={20} className="text-gray-500 group-hover:rotate-90 transition-transform duration-300" />
                                </button>

                                <div className="mb-8 pr-8">
                                    <motion.h3
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-gray-400"
                                    >
                                        Let's Create Together
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-gray-500 dark:text-gray-400 mt-2 text-sm md:text-base"
                                    >
                                        Fills fast, replies faster. Usually within 24 hours.
                                    </motion.p>
                                </div>

                                {isSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center py-12 text-center"
                                    >
                                        <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-400 relative">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                            >
                                                <CheckCircle size={40} strokeWidth={3} />
                                            </motion.div>
                                            <div className="absolute inset-0 rounded-full border-green-500/30 animate-ping" />
                                        </div>
                                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h4>
                                        <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                                            Thanks for reaching out. I'll get back to you shortly.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <InputField
                                                label="Name"
                                                id="name"
                                                value={formState.name}
                                                onChange={(val) => handleChange('name', val)}
                                                onBlur={() => handleBlur('name')}
                                                error={errors.name}
                                                placeholder="John Doe"
                                                delay={0.1}
                                            />
                                            <InputField
                                                label="Email"
                                                id="email"
                                                type="email"
                                                value={formState.email}
                                                onChange={(val) => handleChange('email', val)}
                                                onBlur={() => handleBlur('email')}
                                                error={errors.email}
                                                placeholder="john@example.com"
                                                delay={0.2}
                                            />
                                        </div>

                                        <InputField
                                            label="Subject"
                                            id="subject"
                                            value={formState.subject}
                                            onChange={(val) => handleChange('subject', val)}
                                            onBlur={() => handleBlur('subject')}
                                            error={errors.subject}
                                            placeholder="Project Inquiry"
                                            delay={0.3}
                                        />

                                        <div className="space-y-2 relative group">
                                            <div className="relative">
                                                <textarea
                                                    id="message"
                                                    required
                                                    rows={4}
                                                    value={formState.message}
                                                    onChange={(e) => handleChange('message', e.target.value)}
                                                    onFocus={() => playSound('focus')}
                                                    onBlur={() => handleBlur('message')}
                                                    className={`peer w-full px-4 py-4 rounded-xl bg-gray-50/50 dark:bg-black/40 border-2 outline-none transition-all resize-none text-gray-900 dark:text-gray-100 placeholder-transparent
                                                        ${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-transparent focus:border-purple-500/50 hover:border-gray-200 dark:hover:border-white/10'}
                                                    `}
                                                    placeholder="Tell me about your project..."
                                                />
                                                <label
                                                    htmlFor="message"
                                                    className={`absolute left-4 transition-all duration-200 pointer-events-none text-gray-500 dark:text-gray-400
                                                        ${formState.message ? '-top-2.5 text-xs bg-white dark:bg-black px-1 rounded-sm text-purple-600 font-medium' : 'top-4 text-base peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-white dark:peer-focus:bg-black peer-focus:px-1 peer-focus:text-purple-600'}
                                                    `}
                                                >
                                                    Message
                                                </label>
                                                {errors.message && (
                                                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="absolute right-3 top-4 text-red-500">
                                                        <AlertCircle size={18} />
                                                    </motion.div>
                                                )}
                                            </div>
                                            <div className="flex justify-between items-center px-1">
                                                {errors.message && (
                                                    <span className="text-xs text-red-500 font-medium">{errors.message}</span>
                                                )}
                                                {!errors.message && <span />}
                                                <span className={`text-xs ${formState.message.length > 500 ? 'text-red-500' : 'text-gray-400'}`}>
                                                    {formState.message.length}/1000
                                                </span>
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full relative py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg shadow-lg hover:shadow-purple-500/25 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 overflow-hidden group"
                                            >
                                                <div className="relative z-10 flex items-center justify-center gap-2">
                                                    {isSubmitting ? (
                                                        <>
                                                            <Loader2 size={20} className="animate-spin" />
                                                            <span>Sending...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>Send Message</span>
                                                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                        </>
                                                    )}
                                                </div>

                                                {/* Progress Bar overlay */}
                                                {isSubmitting && (
                                                    <motion.div
                                                        className="absolute bottom-0 left-0 h-1 bg-white/30"
                                                        initial={{ width: "0%" }}
                                                        animate={{ width: `${progress}%` }}
                                                    />
                                                )}
                                            </button>

                                            <div className="mt-4 flex justify-between items-center text-xs text-gray-400 dark:text-gray-500 px-1">
                                                <span className="flex items-center gap-1.5 list-none">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                    Secure SSL
                                                </span>
                                                <span>•</span>
                                                <span>Replies in ~24h</span>
                                                <span>•</span>
                                                <span>No Spam</span>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

const InputField = ({ label, id, type = "text", value, onChange, onBlur, error, placeholder, delay }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="relative group"
        >
            <input
                id={id}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => playSound('focus')}
                onBlur={onBlur}
                className={`peer w-full px-4 py-4 rounded-xl bg-gray-50/50 dark:bg-black/40 border-2 outline-none transition-all text-gray-900 dark:text-gray-100 placeholder-transparent
                    ${error ? 'border-red-500/50 focus:border-red-500' : 'border-transparent focus:border-purple-500/50 hover:border-gray-200 dark:hover:border-white/10'}
                `}
                placeholder={placeholder}
            />
            <label
                htmlFor={id}
                className={`absolute left-4 transition-all duration-200 pointer-events-none text-gray-500 dark:text-gray-400
                    ${value ? '-top-2.5 text-xs bg-white dark:bg-black px-1 rounded-sm text-purple-600 font-medium' : 'top-4 text-base peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-white dark:peer-focus:bg-black peer-focus:px-1 peer-focus:text-purple-600'}
                `}
            >
                {label}
            </label>
            {error && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="absolute right-3 top-4 text-red-500">
                    <AlertCircle size={18} />
                </motion.div>
            )}
            {error && (
                <span className="absolute -bottom-5 left-1 text-xs text-red-500 font-medium">{error}</span>
            )}
        </motion.div>
    );
};
