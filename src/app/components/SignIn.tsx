"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {useAccount, useSignMessage} from "wagmi";
import { signInWithGoogle } from "@/lib/firebaseConfig";


interface SignInModalProps {
    onClose: () => void;
    onLogin: (user: string) => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ onClose, onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { address, isConnected } = useAccount();
    const { } = useSignMessage();
    const { signMessageAsync } = useSignMessage();

    useEffect(() => {
        if (isConnected && !isLoggedIn) {
            handleSign();
        }
    }, [isConnected]);

    useEffect(() => {
        const storedUser = localStorage.getItem("isLoggedIn");
        if (storedUser) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();


        const mockUser = {
            username: "test1",
            password: "123456"
        };

        if (username === mockUser.username && password === mockUser.password) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", username);
            setIsLoggedIn(true);
            setError("");
            onLogin(username);
            onClose();
        } else {
            setError("Invalid username or password!");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

    const handleSign = async () => {
        try {
            if (!address) {
                alert("Please connect your wallet!");
                return;
            }

            const messageRes = await fetch("/api/sign");
            const messageData = await messageRes.json();

            const message = messageData?.data?.message;
            const nonce = messageData?.data?.nonce;

            if (!message || !nonce) {
                console.error("No message or nonce!");
                return;
            }

            const signature = await signMessageAsync({ message });
            console.log("Signature:", signature);

            const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
            const chainId = parseInt(chainIdHex, 16);

            const response = await fetch("/api/sign", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    signature,
                    nonce,
                    publicAddress: address,
                    chainId,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                console.log("Wallet login success:", result);
                alert("Login success!");
                localStorage.setItem("accessToken", result.data.accessToken);
                setIsLoggedIn(true);
                setUsername(address);
                onLogin(address);
            } else {
                console.error("Login failed:", result.error);
                alert("Login failed!");
            }

        } catch (error) {
            console.error("Error in handleSign:", error);
            alert("Something went wrong during signing!");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const user = await signInWithGoogle();
            alert(`Hello ${user.displayName}`);

            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", user.displayName || "Google User");

            setIsLoggedIn(true);
            onLogin(user.displayName || "Google User");
            onClose();
        } catch (error) {
            console.error(" Google login failed:", error);
            alert("Google Sign-In failed!");
        }
    };



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
                <div className="w-1/2  relative flex items-center justify-center rounded-l-lg overflow-hidden">
                    <video
                        src="https://cdn.pixabay.com/video/2020/08/30/48569-454825064_large.mp4"
                        autoPlay
                        loop
                        muted
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />

                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center text-center    bg-opacity-40 backdrop-blur-md p-8">
                        <h1 className="text-5xl font-extrabold text-white drop-shadow-2xl">
                            Welcome Back
                        </h1>
                        <p className="mt-4 text-lg text-white max-w-lg drop-shadow-lg">
                            Sign in to continue your journey
                        </p>
                    </div>

                </div>


                <div className="w-1/2 p-6 relative">
                    <button
                        className="absolute top-3 right-3 text-gray-600 hover:text-black"
                        onClick={onClose}
                    >
                        ✖
                    </button>
                    {isLoggedIn ? (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
                            <button
                                onClick={handleLogout}
                                className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
                            {error && <p className="text-red-500 text-center">{error}</p>}
                            <form className="space-y-4" onSubmit={handleLogin}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div className="text-right">
                                    <button className="text-purple-500 hover:underline">
                                        Forgot password?
                                    </button>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg"
                                >
                                    Sign In
                                </button>
                            </form>
                            <div className="flex items-center my-4">
                                <hr className="flex-grow border-gray-300"/>
                                <span className="mx-2 text-gray-500">OR</span>
                                <hr className="flex-grow border-gray-300"/>
                            </div>
                            <button
                                className="w-full flex items-center justify-center gap-2 border border-gray-300 text-black p-3 rounded-lg hover:bg-gray-100"
                                onClick={handleGoogleLogin}
                            >
                                Sign in with Google
                            </button>
                            <div className="text-center mt-4 text-gray-600">
                                Don’t have an account?
                                <Link
                                    href="/signup"
                                    className="text-purple-500 hover:underline ml-1"
                                >
                                    Sign up
                                </Link>
                            </div>
                            <ConnectButton/>
                        </>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default SignInModal;
