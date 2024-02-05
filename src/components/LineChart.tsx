import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

type LineChartProp = {
    start: number;
    count: number;
    title: string;
    color: string;
    scale?: string;
};

const randomNumber = (current: number): number =>
    current + Math.random() * (Math.random() >= 0.5 ? -1 : 1);

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

/**
 * 스마트팜의 센서 상태를 표시하기 위한 차트
 * @param { number } start 시작값
 * @param { number } count 차트 데이터 갯수
 * @param { string } title 차트 제목
 * @param { string } color 차트 색상
 * @param { scale? } scale 차트에 해당하는 데이터의 단위
 * @returns 차트
 */
const LineChart: React.FC<LineChartProp> = ({
    start,
    count,
    title,
    color,
    scale,
}) => {
    const labels: number[] = [];

    for (let i = 0; i < count; i += 1) {
        labels.push(i);
    }

    let value = start;

    const values = labels.map(() => {
        value = randomNumber(value);
        return value;
    });

    const data = {
        labels,
        datasets: [
            {
                data: values,
                borderColor: color,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointRadius: 1,
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                display: false,
            },
        },
    };

    return (
        <div className="rounded-lg shadow-lg shadow-gray-400">
            <div className="m-4">
                <p className="text-xl font-bold">{title}</p>
            </div>
            <div className="m-4">
                <Line options={options} data={data} />
            </div>
            <div className="m-4 flex justify-end text-xl font-bold">
                <p>
                    {Math.round(values.slice(-1)[0])} {scale}
                </p>
            </div>
        </div>
    );
};

export default React.memo(LineChart);
