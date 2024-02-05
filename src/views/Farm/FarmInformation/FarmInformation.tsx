import { useParams } from 'react-router-dom';
import PowerSettingsNew from '@mui/icons-material/PowerSettingsNew';
import React, { useState } from 'react';
import { Modal } from '@mui/material';
import useFetch from '../../../hooks/useFetch';
import LineChart from '../../../components/LineChart';
import UserFarmSelector from '../../../components/UserFarmSelector';
import usePatch from '../../../hooks/usePatch';
import Loading from '../../../components/Loading';

type Device = {
    key: string;
    id: number;
    name: string;
    connection: boolean;
    smartFarmId: number;
    power: boolean;
};

/**
 * 자신이 가진 개별 스마트팜의 세부정보
 * /farms/[:farmId]
 * @returns
 */
const FarmInformation: React.FC = () => {
    const { farmId } = useParams();

    const [farm, farmLoading, farmError] = useFetch(
        'smartfarm.json',
        'id',
        Number(farmId)
    );
    const [devices, , , reload] = useFetch(
        'device.json',
        'smartFarmId',
        Number(farmId)
    );

    const [deviceModal, setDeviceModal] = useState<Device | null>(null);

    const patch = usePatch();

    const devicePowerHandler = (
        deviceKey: string,
        currentPower: boolean
    ): void => {
        patch('device', deviceKey, { power: !currentPower }).then(() => {
            reload();
        });
    };

    if (farmLoading) {
        return <Loading />;
    }

    if (farmError || farm.length !== 1) {
        return <div>데이터를 불러오는 중 에러가 발생했습니다.</div>;
    }

    const currentFarm = farm[0];

    const closeModalHandler = (): void => {
        setDeviceModal(null);
    };

    const deviceClickHandler = (device: Device): void => {
        setDeviceModal(device);
    };

    return (
        <div className="m-5 lg:m-20">
            <div>
                <UserFarmSelector className="mb-7" />
            </div>
            <div>
                <p className="mb-10 text-4xl font-bold">{currentFarm.name}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                <LineChart
                    start={20}
                    count={1000}
                    title={'기온'}
                    color="red"
                    scale="℃"
                />
                <LineChart
                    start={60}
                    count={1000}
                    title={'습도'}
                    color="blue"
                    scale="%"
                />
                <LineChart
                    start={100}
                    count={1000}
                    title={'co2'}
                    color="green"
                    scale="ppm"
                />
                <LineChart
                    start={1000}
                    count={1000}
                    title={'EC'}
                    color="red"
                    scale="μS/cm"
                />
                <LineChart
                    start={6.5}
                    count={1000}
                    title={'pH'}
                    color="blue"
                    scale="pH"
                />
                <LineChart
                    start={24}
                    count={1000}
                    title={'수온'}
                    color="green"
                    scale="℃"
                />
            </div>
            <div className="lg: mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {devices.map((device) => (
                    <div
                        key={device.id}
                        className="cursor-pointer rounded-lg bg-gray-50 p-5 shadow-md"
                        role="presentation"
                        onClick={(): void => {
                            deviceClickHandler(device as Device);
                        }}
                    >
                        <div className="flex flex-row justify-between">
                            <p>{device.name}</p>
                            <PowerSettingsNew
                                className={`${device.power ? 'rounded-lg text-green-900 shadow-lg shadow-gray-500' : 'text-gray-300'} mr-3 cursor-pointer`}
                                onClick={(e): void => {
                                    devicePowerHandler(
                                        device.key,
                                        device.power
                                    );
                                    e.stopPropagation();
                                }}
                            />
                        </div>
                        <div className="mt-5 grid grid-cols-1">
                            <div className="mx-2 flex flex-row justify-between">
                                <p className="font-bold">연결 상태</p>
                                <p>
                                    {device.connection
                                        ? '연결 됨'
                                        : '연결 안됨'}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {deviceModal && (
                <Modal open={deviceModal !== null}>
                    <div
                        className="fixed left-0 top-0 z-10 flex h-[100vh] w-[100%] items-center justify-center bg-[#00000055]"
                        onClick={(): void => {
                            closeModalHandler();
                        }}
                        role="presentation"
                    >
                        <div className="w-[500px] rounded-lg bg-white p-5">
                            <div className="flex flex-row items-center justify-between">
                                <p>{deviceModal.name}</p>
                                <PowerSettingsNew
                                    className={`${deviceModal.power ? 'rounded-lg text-green-900 shadow-lg shadow-gray-500' : 'text-gray-300'} mr-3 cursor-pointer`}
                                    onClick={(e): void => {
                                        devicePowerHandler(
                                            deviceModal.key,
                                            deviceModal.power
                                        );
                                        e.stopPropagation();
                                    }}
                                />
                                <button
                                    type="submit"
                                    onClick={(): void => {
                                        closeModalHandler();
                                    }}
                                    className="cursor-pointer rounded-lg bg-red-300 px-3 py-2"
                                >
                                    닫기
                                </button>
                            </div>
                            <div className="mt-5 flex flex-row items-center justify-between">
                                <p>연결상태</p>
                                <div className="mx-3 h-[1px] flex-1 border-separate border-b border-dashed border-gray-600" />
                                <p>
                                    {deviceModal.connection
                                        ? '연결됨'
                                        : '연결 안됨'}
                                </p>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default FarmInformation;
