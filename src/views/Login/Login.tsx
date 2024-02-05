import React, { useRef } from 'react';
import useLogin from '../../hooks/useLogin';
import logo from '../../assets/logo.png';

const Login: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [login, success] = useLogin();

    const loginClickHandler = (): void => {
        login(inputRef.current?.value ?? '');
    };

    const loginEnterHandler = (
        e: React.KeyboardEvent<HTMLInputElement>
    ): void => {
        if (e.key === 'Enter') {
            login(inputRef.current?.value ?? '');
        }
    };

    return (
        <div className="flex h-[100vh] w-[100%] flex-col justify-center bg-green-200 pl-10 shadow-lg shadow-green-400 lg:w-[40vw] lg:pl-20">
            <img
                src={logo}
                width={200}
                className="mb-10"
                alt="상상텃밭 투명 로고"
            />
            <p className="mb-5 select-none text-3xl font-bold">
                텃밭 관리 페이지 로그인
            </p>
            <p className="mb-8 select-none text-lg">
                올바른 아이디를 입력해 로그인 하십시오.
            </p>
            <div className="flex flex-col items-start">
                <input
                    className="mb-1 w-[300px] border-b border-gray-300 bg-[#FFFFFFEE] p-2 shadow-lg outline-none transition duration-100 ease-in focus:border-b-2 focus:border-gray-700"
                    type="text"
                    placeholder="아이디를 입력해주십시오"
                    ref={inputRef}
                    onKeyDown={loginEnterHandler}
                />
                {success || (
                    <p className="mt-1 text-sm text-red-500">
                        올바른 아이디가 아닙니다.
                    </p>
                )}
                <button
                    type="button"
                    className="mt-5 rounded-lg bg-green-500 px-4 py-2 font-bold shadow-lg"
                    onClick={loginClickHandler}
                >
                    로그인
                </button>
            </div>
        </div>
    );
};

export default Login;
