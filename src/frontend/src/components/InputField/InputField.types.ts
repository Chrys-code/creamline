export interface InputFieldProps {
    id: string;
    name: string;

    type: InputFieldTypes;

    label?: string;
    info?: string;
    error?: string | null;
    disabled?: boolean;

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