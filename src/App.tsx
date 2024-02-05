import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import accountState from './store/account-state';
import Farms from './views/Farm/Farms';
import Login from './views/Login/Login';
import NotFound from './views/NotFound';

const App: React.FC = () => {
    const account = useRecoilValue(accountState);

    return (
        <Routes>
            {/* 로그인 여부에 따라 로그인 화면 혹은 농장 화면으로 라우팅 합니다. */}
            <Route
                path="/"
                element={
                    account.id === undefined ? (
                        <Navigate replace to={'/login'} />
                    ) : (
                        <Navigate replace to={'/farms'} />
                    )
                }
            />
            <Route
                path="/login"
                element={
                    account.id === undefined ? (
                        <Login />
                    ) : (
                        <Navigate replace to={'/farms'} />
                    )
                }
            />
            <Route
                path="/farms/*"
                element={
                    account.id === undefined ? (
                        <Navigate replace to={'/login'} />
                    ) : (
                        <Farms />
                    )
                }
            />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
};

export default App;
