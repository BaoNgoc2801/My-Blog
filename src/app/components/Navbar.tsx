"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import SignInModal from "./SignIn";


interface Title {
    id: number;
    title: string;
}

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [titles, setTitles] = useState<Title[]>([]);
    const [search, setSearch] = useState("");
    const [filteredTitles, setFilteredTitles] = useState<Title[]>([]);






    useEffect(() => {
        const storedUser = localStorage.getItem("username");
        if (storedUser) {
            setIsLoggedIn(true);
            setUsername(storedUser);
        }

        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.json())
            .then((data: Title[]) => {
                const slicedData = data.slice(0, 10);
                setTitles(slicedData);
                setFilteredTitles(slicedData);
            });
    }, []);

    // Auto Sign if wallet is connected
    const handleLogout = () => {
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        setUsername("");
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toUpperCase();
        setSearch(query);

        if (query === "") {
            setFilteredTitles(titles);
        } else {
            const filtered = titles.filter(
                (post) => post.title.charAt(0).toUpperCase() === query
            );
            setFilteredTitles(filtered);
        }
    };




    return (
        <nav className="w-full flex items-center justify-between bg-white p-3 shadow-md px-10">
            <div className="flex items-center gap-2 cursor-pointer">
                <div className="bg-purple-500 text-white p-2 rounded">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </div>
                <span className="text-xl font-bold text-gray-800">My Blog</span>
            </div>

            {/* Search */}
            <div className="relative flex-1 mx-4 max-w-xl">
                <input
                    type="text"
                    className="w-full py-2 pl-4 pr-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Search by first letter..."
                    value={search}
                    onChange={handleSearch}
                />
                {search && (
                    <ul className="absolute left-0 w-full bg-white shadow-md mt-1 max-h-40 overflow-auto border border-gray-200 rounded-md">
                        {filteredTitles.length > 0 ? (
                            filteredTitles.map((post) => (
                                <li key={post.id} className="p-2 hover:bg-gray-100 cursor-pointer">
                                    {post.title}
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-gray-500">No results found</li>
                        )}
                    </ul>
                )}
            </div>

            <div className="flex space-x-6">
                <Link href="/client" className="text-purple-600 hover:underline">
                    Client
                </Link>
                <Link href="/server" className="text-purple-600 hover:underline">
                    Server
                </Link>
                <Link href="/wallet" className="text-purple-600 hover:underline">
                    My Wallet
                </Link>
            </div>

            <div className="flex items-center gap-4">
                {isLoggedIn ? (
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-500 text-white font-bold text-lg">
                            {username?.slice(2, 6)}...
                        </div>
                        <button onClick={handleLogout} className="text-red-500 hover:underline">
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-purple-700 border border-purple-700 px-4 py-2 rounded hover:bg-purple-100 transition-colors flex items-center gap-2"
                    >
                        Sign In
                    </button>
                )}


            </div>

            {isModalOpen && (
                <SignInModal
                    onClose={() => setIsModalOpen(false)}
                    onLogin={(user) => {
                        setIsLoggedIn(true);
                        setUsername(user);
                        setIsModalOpen(false);
                        localStorage.setItem("username", user);
                    }}
                />
            )}
        </nav>
    );
};

export default Navbar;
