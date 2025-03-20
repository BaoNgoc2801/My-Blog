"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface SignInModalProps {
    onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ onClose }) => {
    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-opacity-60 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="w-full max-w-2xl bg-white text-black rounded-lg shadow-xl overflow-hidden flex"
                initial={{scale: 0.9, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                exit={{scale: 0.9, opacity: 0}}
                transition={{duration: 0.3}}
                onClick={(e) => e.stopPropagation()}
            >

                <div className="w-1/2 p-6 relative">
                    <button
                        className="absolute top-3 right-3 text-gray-600 hover:text-black"
                        onClick={onClose}
                    >
                        ✖
                    </button>
                    <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div className="text-right">
                            <button className="text-purple-500 hover:underline">Forgot password?</button>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg"
                        >
                            Sign Up
                        </button>
                    </form>
                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-gray-300"/>
                        <span className="mx-2 text-gray-500">OR</span>
                        <hr className="flex-grow border-gray-300"/>
                    </div>
                    <button
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 text-black p-3 rounded-lg hover:bg-gray-100"
                    >
                        Sign Up with Google
                    </button>
                    <div className="text-center mt-4 text-gray-600">
                        Already an account?
                        <Link
                            href="/signin"
                            className="text-purple-500 hover:underline ml-1"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>

                <div className="w-1/2  relative flex items-center justify-center rounded-l-lg overflow-hidden">
                    {/* Video Background - Cosmic Space */}
                    <video
                        src="https://cdn.pixabay.com/video/2020/08/30/48569-454825064_large.mp4"
                        autoPlay
                        loop
                        muted
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />

                    {/* Lớp phủ mờ + chữ nổi */}
                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center text-center    bg-opacity-40 backdrop-blur-md p-8">
                        <h1 className="text-5xl font-extrabold text-white drop-shadow-2xl">
                            Welcome to My Blog
                        </h1>
                        <p className="mt-4 text-lg text-white max-w-lg drop-shadow-lg">
                            Sign up to explore my website
                        </p>
                    </div>

                </div>

            </motion.div>
        </motion.div>
    );
};

export default SignInModal;
