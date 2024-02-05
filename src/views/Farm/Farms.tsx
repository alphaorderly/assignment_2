import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../components/Header';
import MyFarmList from './MyFarmList/MyFarmList';
import FarmInformation from './FarmInformation/FarmInformation';

/**
 * 로그인 이후 화면
 * /farms/*
 * @returns
 */
const Farms: React.FC = () => (
    <>
        <Header />
        <main>
            <Routes>
                <Route path="" element={<MyFarmList />} />
                <Route path=":farmId" element={<FarmInformation />} />
            </Routes>
        </main>
    </>
);

export default Farms;
