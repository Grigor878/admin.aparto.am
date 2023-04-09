import { useSelector } from "react-redux";
export const API_BASE_URL = 'http://127.0.0.1:8000';
export const APP_BASE_URL = 'http://localhost:3000';

export const GetAxiosConfig = () => {
	// const token = localStorage.getItem('token') ? localStorage.getItem('token') : ''
	const { token } = useSelector((state) => state.auth)

	return  {
	  headers: { Authorization: 'Bearer ' + token }
	};
}

export const getAxiosConfig = () => {
	const  token  = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3NpZ25pbiIsImlhdCI6MTY4MDk2MTQ0OCwiZXhwIjoxNjgyNDczNDQ4LCJuYmYiOjE2ODA5NjE0NDgsImp0aSI6IkU1MHVKNEZYUXkzNGhZQ24iLCJzdWIiOiIxIiwicHJ2IjoiMGI1Zjc4NmIzY2ExODkzNDUzY2JkYmZiMmRlZTRiYTJmZDMzMmFmYyJ9.wJxLikS6JSxLRYUI0O_UaOv7PhbP6gP-rJ4kw5qvr9k"

	return  {
	  headers: { Authorization: 'Bearer ' + token }
	};
}