"use client"

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"

const NetBarChartComponent = ({ data }) => {

    const chartConfig = {
        net_income: {
            label: "Nettó eredmény",
            color: "var(--chart-1)",
        },
    }


    return (
        <Card className="flex flex-col">
            <CardHeader className="flex-shrink-0">
                <CardTitle>Nettó eredmény alakulása havonta</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 items-center justify-center">
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <BarChart accessibilityLayer data={data}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <YAxis
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={value => value.toLocaleString('hu-HU')}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="net_income">
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.net_income >= 0 ? "var(--chart-2)" : "var(--color-overdue)"}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent >
        </Card >
    )
}

export default NetBarChartComponent