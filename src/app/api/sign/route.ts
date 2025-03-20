import axios from 'axios';
import {NextResponse} from "next/server";


const axiosInstance = axios.create({
     baseURL: process.env.NEXT_PUBLIC_LUBAN_API,
     timeout: 5000,
})
export async function GET() {
    try {
        const { data } = await axiosInstance.get("/sign-message")
        return NextResponse.json(data);
    } catch (error) {
        console.error("Failed to fetch message:", error);
        return NextResponse.json(
            { error: "Failed to fetch message"},
                  { status: 500 }
        )
    }
}

export async function POST(req: Request) {
    try {
        const { signature, nonce, publicAddress, chainId } = await req.json();

        const { data } = await axiosInstance.post("/sign-in/wallet", {
            signature,
            nonce,
            publicAddress,
            chainId,
        });

        return NextResponse.json(data); // Trả về accessToken, etc.
    } catch (error) {
        console.error("Failed to sign in with wallet:", error);
        return NextResponse.json({ error: "Failed to sign in with wallet" }, { status: 500 });
    }
}