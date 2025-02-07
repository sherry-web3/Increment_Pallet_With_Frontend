import React, { useState, useEffect } from "react";
import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";

const SherryModule = () => {
    const [api, setApi] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(0);

    // Increment Pallet State
    const [currnetIncrementPalletData, setcurrnetIncrementPalletData] = useState(null);


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
                // Object.keys(apiInstance.tx).forEach((module) => {
                //     console.log(`Pallet: ${module}`);
                //     console.log("Calls:", Object.keys(apiInstance.tx[module]));
                // });
    
                setApi(apiInstance);

                // On load Get my value
                fetchCurrentValue(apiInstance); // Fetch value on load

            } catch (err) {
                console.error("Failed to connect to Substrate:", err);
            }
        };
    
        connect();
    }, []);


    const fetchCurrentValue = async (apiInstance) => {

        setLoading(true);
        if (!apiInstance) return;
        
        try {
            const rawValue = await apiInstance.query.sherryModule.storedValue();
            
            // Unwrap Option<u32>: If None, set 0; Otherwise, get the value
            const value = rawValue.isSome ? rawValue.unwrap().toNumber() : 0;
            console.log("Current Value:", value);
            setcurrnetIncrementPalletData(value); // Update state
            setLoading(false);

        } catch (error) {
            console.error("Error fetching value:", error);
        }
    };
    
    

    const incrementCounter = async () => {
        if (!api) return alert("API not connected!");
        
        setLoading(true);
        try {
            const keyring = new Keyring({ type: "sr25519" });
            const sender = keyring.addFromUri("//Alice");

            const tx = api.tx.sherryModule.incrementValue();
            await tx.signAndSend(sender, ({ status }) => {
                if (status.isInBlock) {
                    console.log(`Transaction included in block: ${status.asInBlock}`);
                    fetchCurrentValue(api); // Fetch new value after increment
                }
            });

            alert("Incremented successfully!");


        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed!");
        }
        setLoading(false);
    };

    return (
        <div>
            <h3>First - Increment Pallet</h3>

            <div>
                <p>Current Value: {currnetIncrementPalletData !== null ? currnetIncrementPalletData : "Loading..."}</p>
            </div>


            <button onClick={incrementCounter} disabled={loading || !api}>
                {loading ? "Incrementing..." : "Increment Counter"}
            </button>
        </div>
    );
};

export default SherryModule;
