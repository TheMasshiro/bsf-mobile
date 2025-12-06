import { useEffect, useRef } from 'react';
import annotationPlugin from 'chartjs-plugin-annotation';
import Chart from 'chart.js/auto';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle } from '@ionic/react';

interface BarGraph {
    sensorType: string,
    upperLimit: number,
    lowerLimit: number,
    warningLimit: number,
    unit: string,
}

Chart.register(annotationPlugin);
function BarGraph({ sensorType, upperLimit, lowerLimit, warningLimit, unit }: BarGraph) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);

    const temperatureData = [
        { time: '12 AM', value: 22 },
        { time: '1 AM', value: 22 },
        { time: '2 AM', value: 21.5 },
        { time: '3 AM', value: 21 },
        { time: '4 AM', value: 21 },
        { time: '5 AM', value: 21.5 },
        { time: '6 AM', value: 22 },
        { time: '7 AM', value: 22.5 },
        { time: '8 AM', value: 23 },
        { time: '9 AM', value: 24 },
        { time: '10 AM', value: 25 },
        { time: '11 AM', value: 26 },
        { time: '12 PM', value: 26 },
        { time: '1 PM', value: 27 },
        { time: '2 PM', value: 28 },
        { time: '3 PM', value: 28 },
        { time: '4 PM', value: 28 },
        { time: '5 PM', value: 27 },
        { time: '6 PM', value: 26 },
        { time: '7 PM', value: 25 },
        { time: '8 PM', value: 25 },
        { time: '9 PM', value: 24 },
        { time: '10 PM', value: 23.5 },
        { time: '11 PM', value: 23 }
    ];

    const humidityData = [
        { time: '12 AM', value: 65 },
        { time: '1 AM', value: 66 },
        { time: '2 AM', value: 68 },
        { time: '3 AM', value: 70 },
        { time: '4 AM', value: 70 },
        { time: '5 AM', value: 69 },
        { time: '6 AM', value: 68 },
        { time: '7 AM', value: 68 },
        { time: '8 AM', value: 68 },
        { time: '9 AM', value: 66 },
        { time: '10 AM', value: 63 },
        { time: '11 AM', value: 60 },
        { time: '12 PM', value: 60 },
        { time: '1 PM', value: 58 },
        { time: '2 PM', value: 55 },
        { time: '3 PM', value: 55 },
        { time: '4 PM', value: 55 },
        { time: '5 PM', value: 57 },
        { time: '6 PM', value: 59 },
        { time: '7 PM', value: 62 },
        { time: '8 PM', value: 62 },
        { time: '9 PM', value: 64 },
        { time: '10 PM', value: 66 },
        { time: '11 PM', value: 67 }
    ];

    const moistureData = [
        { time: '12 AM', value: 72 },
        { time: '1 AM', value: 71.5 },
        { time: '2 AM', value: 71 },
        { time: '3 AM', value: 70 },
        { time: '4 AM', value: 70 },
        { time: '5 AM', value: 69 },
        { time: '6 AM', value: 68 },
        { time: '7 AM', value: 68 },
        { time: '8 AM', value: 68 },
        { time: '9 AM', value: 67 },
        { time: '10 AM', value: 66 },
        { time: '11 AM', value: 65 },
        { time: '12 PM', value: 65 },
        { time: '1 PM', value: 68 },
        { time: '2 PM', value: 72 },
        { time: '3 PM', value: 75 },
        { time: '4 PM', value: 75 },
        { time: '5 PM', value: 76 },
        { time: '6 PM', value: 77 },
        { time: '7 PM', value: 78 },
        { time: '8 PM', value: 78 },
        { time: '9 PM', value: 76 },
        { time: '10 PM', value: 75 },
        { time: '11 PM', value: 74 }
    ];

    const getData = () => {
        switch (sensorType.toLowerCase()) {
            case "temperature":
                return temperatureData;
            case "humidity":
                return humidityData;
            case "substrate moisture":
                return moistureData;
            default:
                return temperatureData;
        }
    };

    const chartData = getData();

    useEffect(() => {
        if (canvasRef.current) {
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            chartRef.current = new Chart(canvasRef.current, {
                type: 'line',
                data: {
                    labels: chartData.map(row => row.time),
                    datasets: [{
                        label: `${sensorType} ${unit}`,
                        data: chartData.map(row => row.value),
                        backgroundColor: 'rgba(96, 165, 250, 0.2)',
                        borderColor: 'rgba(96, 165, 250, 1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: chartData.map(row => {
                            if (row.value >= upperLimit) return 'rgba(255, 99, 132, 1)';
                            if (row.value >= warningLimit) return 'rgba(255, 205, 86, 1)';
                            if (row.value <= lowerLimit) return 'rgba(54, 162, 235, 1)';
                            return 'rgba(96, 165, 250, 1)';
                        }),
                        pointBorderColor: '#fff',
                        pointBorderWidth: 1,
                        pointRadius: 3,
                        pointHoverRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        annotation: {
                            annotations: {
                                upperLimit: {
                                    type: 'line',
                                    yMin: upperLimit,
                                    yMax: upperLimit,
                                    borderColor: 'rgb(255, 99, 132)',
                                    borderWidth: 2,
                                    borderDash: [5, 5],
                                },
                                warningLimit: {
                                    type: 'line',
                                    yMin: warningLimit,
                                    yMax: warningLimit,
                                    borderColor: 'rgb(255, 205, 86)',
                                    borderWidth: 2,
                                    borderDash: [5, 5],
                                },
                                lowerLimit: {
                                    type: 'line',
                                    yMin: lowerLimit,
                                    yMax: lowerLimit,
                                    borderColor: 'rgb(54, 162, 235)',
                                    borderWidth: 2,
                                    borderDash: [5, 5],
                                }
                            }
                        },
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [sensorType, upperLimit, lowerLimit, warningLimit]);

    return (
        <IonCard mode="ios">
            <IonCardHeader>
                <IonCardSubtitle>{sensorType.toUpperCase() === "MOISTURE" ? "SUBSTRATE MOISTURE" : sensorType.toUpperCase()}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                <div style={{ height: '250px' }}>
                    <canvas ref={canvasRef} id="acquisitions"></canvas>
                </div>
            </IonCardContent>
        </IonCard>
    )
}


export default BarGraph;
