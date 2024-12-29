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

export interface ICalendars {
  name:string,
  subtitle:string,
  calendar:AcademicEvent[]
}

export interface NavbarProps {
  onLogout:() => void
}

export interface IUser {
  name: string,
  email: string,
  password: string,
  role: string
}