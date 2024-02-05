import React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import accountState from '../store/account-state';
import logo from '../assets/logo.png';

const Header: React.FC = () => {
    const logout = useResetRecoilState(accountState);
    const account = useRecoilValue(accountState);
    const navigate = useNavigate();

    const logoutHandler = (): void => {
        logout();
    };

    const logoClickHandler = (): void => {
        navigate('/');
    };

    return (
        <header className="mx-20 mt-20">
            <nav className="flex flex-row items-center">
                <img
                    src={logo}
                    alt="상상텃밭 로고"
                    width={100}
                    onClick={logoClickHandler}
                    className="cursor-pointer"
                />
                <p className="ml-14 text-2xl font-bold">
                    {account.name} 님의 스마트팜
                </p>
                <div className="ml-20 cursor-pointer rounded-lg bg-[#52b788] py-2 pl-6 pr-5">
                    <LogoutIcon
                        className="text-white"
                        fontSize="large"
                        onClick={logoutHandler}
                    />
                </div>
            </nav>
        </header>
    );
};

export default Header;
