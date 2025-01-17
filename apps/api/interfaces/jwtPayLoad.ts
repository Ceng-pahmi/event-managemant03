interface JwtPayload {
  id: number;
  name: string;
  email: string; 
  // Removed password property as it is not included in the token payload
}

export default JwtPayload;
