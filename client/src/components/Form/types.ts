import { ErrorType } from "../../types";

export type FormType = {
    value: string; 
    error?: ErrorType;
    onSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void; 
    setValue: (value: string) => void; 
}
