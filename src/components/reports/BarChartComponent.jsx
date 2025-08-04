"use client"

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

const BarChartComponent = ({ data }) => {

    const chartConfig = {
        income: {
            label: "Bevétel",
            color: "var(--chart-2)",
        },
        expense: {
            label: "Kiadás",
            color: "var(--chart-1)",
        },
    }

    const monthNames = [
        "Jan", "Feb", "Márc", "Ápr", "Máj", "Jún",
        "Júl", "Aug", "Szept", "Okt", "Nov", "Dec"
    ];


    return (
        <Card >
            <CardHeader>
                <CardTitle>Bevételek és kiadások</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <BarChart accessibilityLayer data={data}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={value => monthNames[(value || 1) - 1]}
                        />
                        <YAxis
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                        <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent >
        </Card >
    )
}

export default BarChartComponent