import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import React, { ReactNode, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import usePatch from '../hooks/usePatch';

type FarmItemProp = {
    key: string;
    id: number;
    name: string;
    ownerId: string;
};

/**
 * 스마트팜 목록에서 개별 스마트팜을 표시하기 위한 컴포넌트
 * @param { string } key 파이어베이스 키
 * @param { number } id 스마트팜 id
 * @param { string } name 스마트팜 이름
 * @param { string } ownerId 스마트팜 소유자 id
 * @returns
 */
const FarmItem: React.FC<FarmItemProp> = (props) => {
    const temperature = useMemo(() => Math.floor(Math.random() * 10) + 20, []);
    const humidity = useMemo(() => Math.floor(Math.random() * 30) + 40, []);
    const co2 = useMemo(() => Math.floor(Math.random() * 30) + 80, []);
    const ec = useMemo(() => Math.floor(Math.random() * 400) + 800, []);
    const ph = useMemo(() => Math.floor(Math.random() * 2) + 5.5, []);
    const waterTemperature = useMemo(
        () => Math.floor(Math.random() * 10) + 20,
        []
    );

    const navigate = useNavigate();

    const [devices, loading, , reload] = useFetch(
        'device.json',
        'smartFarmId',
        props.id
    );

    const patch = usePatch();

    const devicePowerHandler = (
        deviceKey: string,
        currentPower: boolean
    ): void => {
        patch('device', deviceKey, { power: !currentPower }).then(() => {
            reload();
        });
    };

    const clickHandler = (): void => {
        navigate(`/farms/${props.id}`);
    };

    return (
        <div className="m-4">
            <div
                className="cursor-pointer rounded-lg hover:shadow-lg hover:shadow-black"
                onClick={clickHandler}
            >
                <div className="rounded-t-lg bg-[#95d5b2] p-4 shadow-sm">
                    <p className="text-2xl font-bold">{props.name}</p>
                </div>
                <div className="grid grid-cols-1 gap-3 bg-[#d8f3dc] p-4 shadow-lg">
                    {loading && <div>loading...</div>}
                    {loading ||
                        devices.map(
                            (device): ReactNode => (
                                <div
                                    key={device.id}
                                    className="mx-4 flex justify-between"
                                >
                                    <p>{device.name}</p>
                                    <div>
                                        <PowerSettingsNewIcon
                                            className={`${device.power ? 'rounded-lg text-green-900 shadow-inner shadow-gray-500' : 'text-gray-300'} mr-3 cursor-pointer`}
                                            onClick={(e): void => {
                                                devicePowerHandler(
                                                    device.key,
                                                    device.power
                                                );
                                                e.stopPropagation();
                                            }}
                                        />
                                        <span>
                                            {device.power ? '켜짐' : '꺼짐'}
                                        </span>
                                    </div>
                                </div>
                            )
                        )}
                </div>
                <div className="grid grid-cols-2 gap-3 rounded-b-lg bg-[#95d5b2] p-4 shadow-sm">
                    <div className="flex justify-around ">
                        <p className="font-bold">기온</p>
                        <p>{temperature}℃</p>
                    </div>
                    <div className="flex justify-around">
                        <p className="font-bold">습도</p>
                        <p>{humidity}%</p>
                    </div>
                    <div className="flex justify-around">
                        <p className="font-bold">이산화탄소</p>
                        <p>{co2}ppm</p>
                    </div>
                    <div className="flex justify-around">
                        <p className="font-bold">EC</p>
                        <p>{ec}</p>
                    </div>
                    <div className="flex justify-around">
                        <p className="font-bold">pH</p>
                        <p>{ph}</p>
                    </div>
                    <div className="flex justify-around">
                        <p className="font-bold">수온</p>
                        <p>{waterTemperature}℃</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FarmItem;
