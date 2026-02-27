import { useState } from "react";

export default function useForm() {
    const [formState, setFormState] = useState({});

    const handleChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;

        setFormState({
            ...formState,
            [field]: value,
        });
    };

    return {
        ...formState,
        formState,
        handleChange,
    };
}
