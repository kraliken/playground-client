"use client"

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

const AreaChartComponent = ({ data }) => {

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
        <Card className="flex flex-col h-full">
            <CardHeader className="flex-shrink-0">
                <CardTitle>Bevételek és kiadások</CardTitle>
            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer config={chartConfig} className="h-[220px] w-full">
                    <AreaChart accessibilityLayer data={data}>
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
                            tickFormatter={value => value.toLocaleString('hu-HU')}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <defs>
                            <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-income)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-income)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-expense)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-expense)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="expense"
                            type="natural"
                            fill="url(#fillExpense)"
                            fillOpacity={0.4}
                            stroke="var(--color-expense)"
                        />
                        <Area
                            dataKey="income"
                            type="natural"
                            fill="url(#fillIncome)"
                            fillOpacity={0.4}
                            stroke="var(--color-income)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent >
        </Card >
    )
}

export default AreaChartComponent