import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

const UserStore = (props) => {
  // ID 전역 변수화
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [nickName, setNickName] = useState(localStorage.getItem("nickName") || null);

  const updateUserId = (newUserId) => {
    setUserId(newUserId);
    localStorage.setItem("userId", newUserId);
    console.log("업데이트 된 아이디:", localStorage.getItem("userId"));
  };

  const updateNickName = (newNickName) => {
    setNickName(newNickName);
    localStorage.setItem("nickName", newNickName);
    console.log("업데이트 된 닉네임:", localStorage.getItem("nickName"));
  };

  // 로그아웃시 저장된 아이디와 비밀번호 삭제
  const logout = () => {
    setUserId(null);
    setNickName(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("nickName");
  };

  // 컴포넌트가 마운트 될 때 localStorage에 저장된 정보가 있다면 state에 설정
  useEffect(() => {
    // localStorage에서 값 가져오기
    const storedUserId = localStorage.getItem("userId");
    const storedNickName = localStorage.getItem("nickName");

    // 값이 있다면 state 설정
    if (storedUserId) {
      setUserId(storedUserId);
    }

    if (storedNickName) {
      setNickName(storedNickName);
    }
  }, []); // 컴포넌트 마운트 시 1회 실행

  return <UserContext.Provider value={{ userId, nickName, updateUserId, updateNickName, logout }}>{props.children}</UserContext.Provider>;
};

export default UserStore;
