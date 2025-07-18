// Import hooks from React
import { useState } from "react";

export function useToast(defaultMessage = "You can only compare two headphones at a time") {

    const [toast, setToast] = useState("");

    const showToast = (msg = defaultMessage) => {
        setToast(msg);
        // hide toast after 3s
        setTimeout(() => setToast(""), 3000);
    };

    return { toast, showToast };
}