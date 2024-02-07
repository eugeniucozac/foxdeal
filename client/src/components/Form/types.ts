export type FormType = {
    value: string; 
    error: string; 
    addTask: (event: React.SyntheticEvent<HTMLFormElement>) => void; 
    setValue: (value: string) => void; 
    setError?: (value: string) => void; 
}
