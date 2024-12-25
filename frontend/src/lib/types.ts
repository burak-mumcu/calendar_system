export interface UserCredentials {
    email: string;
    password: string;
  }
  

  
  export interface LoginFormProps {
    onSubmit: (data: UserCredentials) => void;
    isLoading?: boolean;
}
