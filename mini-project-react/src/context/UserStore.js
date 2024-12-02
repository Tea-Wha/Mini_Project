import {createContext, useEffect, useState} from "react";


export const UserContext = createContext(null)

const UserStore = (props) => {
	// ID 전역 변수화
	const [userId, setUserId] = useState(
	localStorage.getItem("userId") || null
	);
	useEffect(() => {
		localStorage.setItem("nickname", nickname);
	},[nickname]);
	// 닉네임 전역 변수화
	const [nickname, setNickname] = useState(
	localStorage.getItem("nickname") || null
	);
	useEffect(() => {
		localStorage.setItem("userId",userId);
	},[userId]);
	
	
	return (
		<UserContext.Provider value={{userId, setUserId, nickname, setNickname}}>
			{props.children}
		</UserContext.Provider>
	)
}
export default UserStore;