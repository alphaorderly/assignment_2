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
        <header className="mx-5 mt-20 lg:mx-20">
            <nav className="flex flex-row items-center justify-between lg:justify-start">
                <img
                    src={logo}
                    alt="상상텃밭 로고"
                    width={75}
                    onClick={logoClickHandler}
                    className="cursor-pointer"
                />
                <p className="ml-2 text-lg font-bold lg:ml-14 lg:text-2xl">
                    {account.name} 님의 스마트팜
                </p>
                <div className="ml-5 cursor-pointer rounded-lg bg-[#52b788] py-2 pl-6 pr-5 lg:ml-20">
                    <LogoutIcon
                        className="text-white"
                        fontSize="medium"
                        onClick={logoutHandler}
                    />
                </div>
            </nav>
        </header>
    );
};

export default React.memo(Header);
