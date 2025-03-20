import React from 'react';
import Wallet from "../components/MyWallet"

const WalletPage = () => {
    return (
        <div>
            <h2 className="text-[80px] flex flex-col items-center justify-between mt-20 font-bold text-gray-600">My Wallet</h2>
            <div className="flex flex-col items-center text-2xl mt-5">
            <Wallet />
            </div>
        </div>
    );
};

export default WalletPage;
