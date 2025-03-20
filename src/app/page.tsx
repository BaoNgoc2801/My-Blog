"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
            <div className="absolute -z-10 top-[-6rem] right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] bg-[#4cbcd831]"></div>
            <div className="absolute -z-10 top-[-1rem] left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] bg-[#6285c25b] md:left-[33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>



            <div className="mt-5">
                <Image
                    src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164153/8_big22.png"
                    alt="Blog"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-lg"
                />
            </div>

            {/* Header */}
            <div className="text-center mt-10">
                <h1 className="text-5xl font-extrabold text-gray-800">Welcome to My Blog</h1>
                <p className="text-gray-600 mt-3 text-lg">Write. Inspire. Connect</p>
            </div>

            <div className="mt-10">
                <button
                    onClick={() => router.push("/signup")}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md text-xl "
                >
                    Join Our Community
                </button>
            </div>
        </div>
    );
}
