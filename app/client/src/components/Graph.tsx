import { useEffect, useRef } from 'react';
import annotationPlugin from 'chartjs-plugin-annotation';
import Chart from 'chart.js/auto';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle } from '@ionic/react';

Chart.register(annotationPlugin);
function BarGraph({ sensorType, upperLimit, lowerLimit, warningLimit }: { sensorType: string, upperLimit: number, lowerLimit: number, warningLimit: number }) {
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
            case "moisture":
                return moistureData;
            default:
                return temperatureData;
        }
    };

    const getBarColor = () => {
        switch (sensorType.toLowerCase()) {
            case "temperature":
                return {
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)'
                };
            case "humidity":
                return {
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)'
                };
            case "moisture":
                return {
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgb(75, 192, 192)'
                };
            default:
                return {
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgb(75, 192, 192)'
                };
        }
    };

    const getLabel = () => {
        switch (sensorType.toLowerCase()) {
            case "temperature":
                return {
                    unit: "Temperature",
                    symbol: "°C  "
                }
            case "humidity":
                return {
                    unit: "Humidity",
                    symbol: "%  "
                }
            case "moisture":
                return {
                    unit: "Substrate Moisture",
                    symbol: "%  "
                }
            default:
                return {
                    unit: "Temperature",
                    symbol: "°C  "
                }
        }
    }

    const chartData = getData();
    const chartLabel = getLabel();
    const colors = getBarColor();

    useEffect(() => {
        if (canvasRef.current) {
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            chartRef.current = new Chart(canvasRef.current, {
                type: 'bar',
                data: {
                    labels: chartData.map(row => row.time),
                    datasets: [{
                        label: `${chartLabel.unit} ${chartLabel.symbol}`,
                        data: chartData.map(row => row.value),
                        backgroundColor: colors.backgroundColor,
                        borderColor: colors.borderColor,
                        borderWidth: 1
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
                            display: true,
                            position: 'top',
                            align: 'center',
                            labels: {
                                font: {
                                    size: 12,
                                },
                                padding: 8,
                                boxWidth: 22,
                                boxHeight: 5,
                                generateLabels: (chart) => {
                                    const original = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                                    original.push(
                                        {
                                            text: `Upper ${upperLimit}${chartLabel.symbol}`,
                                            fillStyle: 'transparent',
                                            strokeStyle: 'rgb(255, 99, 132)',
                                            lineWidth: 2,
                                            lineDash: [5, 5],
                                            pointStyle: 'line',
                                        },
                                        {
                                            text: `Warning ${warningLimit}${chartLabel.symbol}`,
                                            fillStyle: 'transparent',
                                            strokeStyle: 'rgb(255, 205, 86)',
                                            lineWidth: 2,
                                            lineDash: [5, 5],
                                            pointStyle: 'line',
                                        },
                                        {
                                            text: `Lower ${lowerLimit}${chartLabel.symbol}`,
                                            fillStyle: 'transparent',
                                            strokeStyle: 'rgb(54, 162, 235)',
                                            lineWidth: 2,
                                            lineDash: [5, 5],
                                            pointStyle: 'line',
                                        }
                                    );
                                    return original;
                                }
                            },
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
