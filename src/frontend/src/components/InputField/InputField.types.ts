export interface InputFieldProps {
    id: string;
    name: string;

    type: InputFieldTypes;

    label?: string;
    info?: string;
    placeholder?: string;
    error?: string | null;
    disabled?: boolean;

    step?: string; // only for number type

    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type InputFieldTypes =
    | "datetime-local"
    | "email"
    | "number"
    | "password"
    | "range"
    | "text"
    | "time"
    | "date"
    | "month"
    | "week";