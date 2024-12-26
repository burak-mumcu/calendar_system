export interface UserCredentials {
    email: string;
    password: string;
  }
  
export interface LoginFormProps {
    onSubmit: (data: UserCredentials) => void;
    isLoading?: boolean;
}

export interface AcademicEvent {
  event: string;
  fallStart: string;
  fallEnd: string;
  springStart: string;
  springEnd: string;
}
