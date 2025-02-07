import React, { useState, useEffect } from "react";
import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";

const SherryModule = () => {
    const [api, setApi] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const connect = async () => {
            try {
                const wsProvider = new WsProvider("ws://127.0.0.1:9944");
                const apiInstance = await ApiPromise.create({ provider: wsProvider });
    
                await apiInstance.isReady;
                console.log("Connected to Substrate");
    
                // Log all available modules
                console.log("Available Pallets:", Object.keys(apiInstance.tx));
    
                // Log all calls inside each module
                Object.keys(apiInstance.tx).forEach((module) => {
                    console.log(`Pallet: ${module}`);
                    console.log("Calls:", Object.keys(apiInstance.tx[module]));
                });
    
                setApi(apiInstance);
            } catch (err) {
                console.error("Failed to connect to Substrate:", err);
            }
        };
    
        connect();
    }, []);
    

    const incrementCounter = async () => {
        if (!api) return alert("API not connected!");
        
        setLoading(true);
        try {
            const keyring = new Keyring({ type: "sr25519" });
            const sender = keyring.addFromUri("//Alice"); // Use actual account
    
            // Use the correct extrinsic name
            const tx = api.tx.sherryModule.incrementValue();
            const hash = await tx.signAndSend(sender);
    
            console.log(`Transaction sent with hash: ${hash}`);
            alert("Incremented successfully!");
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed!");
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>SherryModule Counter</h1>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            <button onClick={incrementCounter} disabled={loading || !api}>
                {loading ? "Incrementing..." : "Increment Counter"}
            </button>
        </div>
    );
};

export default SherryModule;
