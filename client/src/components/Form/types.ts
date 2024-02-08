import { ErrorType } from "../../types";

export type FormType = {
    value: string; 
    error?: ErrorType;
    addTask: (event: React.SyntheticEvent<HTMLFormElement>) => void; 
    setValue: (value: string) => void; 
}
