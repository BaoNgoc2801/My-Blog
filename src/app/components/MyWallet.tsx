"use client"

import axios from 'axios';
import React, {useEffect} from 'react';
import {useAccount, useBalance} from "wagmi";
import { useChainId } from 'wagmi'
import { useChains } from 'wagmi'


const MyWallet = () => {
    const {address, isConnected} = useAccount();
    const {data: balance} = useBalance({
        address,
    });
    const chainId = useChainId();
    const chains = useChains();
    const currentChain = chains.find((chain) => chain.id === chainId)
    const chainName = currentChain?.name || "Unknown name";
    interface SignResponse {
        sign_msg: string;
        nonce: string;
    }

    useEffect(() => {
        if (isConnected) {
            handleSignMessage();
        }
    }, [isConnected]);


    if (!isConnected) {
        return (
            <p>
                Wallet Not Connected
            </p>
        )
    }


    const handleSignMessage = async () => {
        try {
            const response = await fetch ("api/sign");
            const data = await response.json();

            if (data?.data?.message) {
                console.log("Sign message:", data.data.message);
                alert(`Sign message: ${data.data.message}`);
            } else {
                console.error("No sign message received");
            }
        } catch (error) {
            console.error("Failed to fetch sign message:", error);
        }
    }

    return (
        <div>
            <p><strong className="text-3xl">ID:</strong> {chainId}</p>
            <p><strong className="text-3xl">Chain name:</strong> {chainName}</p>
            <p><strong className="text-3xl">Address:</strong> {address}</p>
            <p><strong className="text-3xl">Balance:</strong> {balance?.formatted} {balance?.symbol}</p>
            <button onClick={handleSignMessage}>Connect Wallet</button>
        </div>
    );
};

export default MyWallet;








