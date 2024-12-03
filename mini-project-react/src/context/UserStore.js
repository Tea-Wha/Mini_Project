import { createContext, useState } from "react";

export const UserContext = createContext(null);

const UserStore = (props) => {
	// ID 전역 변수화
	const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
	const [nickname, setNickname] = useState(localStorage.getItem("nickname") || null);
	
	const updateUserId = (id) => {
		setUserId(id);
		localStorage.setItem("userId", id);
	};
	
	const updateNickname = (name) => {
		setNickname(name);
		localStorage.setItem("nickname", name);
	};
	
	return (
		<UserContext.Provider value={{ userId, setUserId: updateUserId, nickname, setNickname: updateNickname }}>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserStore;
