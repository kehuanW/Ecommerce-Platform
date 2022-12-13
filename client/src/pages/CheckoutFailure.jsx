import React from 'react';

const Failure = () => {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            Sorry, something went wrong...
            Please try again.
            <button style={{ padding: 10, marginTop: 20 }}>Go to Cart</button>
        </div>
    )
}

export default Failure;