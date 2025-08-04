"use client"

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Label, Pie, PieChart, Sector } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from 'react';

const ALL_PARTNERS_VALUE = "all"

const PieChartComponent = ({ data, partners }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialPartner = searchParams.get("partner") || ALL_PARTNERS_VALUE

    const [selectedPartner, setSelectedPartner] = useState(initialPartner);

    const handlePartnerChange = (newPartner) => {
        setSelectedPartner(newPartner);
        const params = new URLSearchParams(Array.from(searchParams.entries()));

        if (!newPartner || newPartner === ALL_PARTNERS_VALUE) {
            params.delete("partner");
        } else {
            params.set("partner", newPartner);
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const chartConfig = {
        in_progress: {
            label: "Nyitott",
            color: "var(--chart-3)",
        },
        overdue: {
            label: "Lejárt",
            color: "var(--chart-5)",
        },
        paid: {
            label: "Fizetve",
            color: "var(--chart-2)",
        },
    }
    return (
        <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center">
                <CardTitle className="flex-1">Számlák összértéke állapot szerint</CardTitle>
                <Select value={selectedPartner} onValueChange={handlePartnerChange}>
                    <SelectTrigger
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Select partner" />
                    </SelectTrigger>
                    <SelectContent className="trounded-xl">
                        <SelectItem value="all">
                            Összes partner
                        </SelectItem>
                        {partners.map((partner) => {
                            return (
                                <SelectItem
                                    key={partner}
                                    value={partner}
                                    className="text-sm rounded-lg [&_span]:flex"
                                >
                                    {partner}
                                </SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
                <ChartContainer
                    config={chartConfig}
                    className="h-[185px] w-full"
                >
                    <PieChart className='h-full w-full'>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={data}
                            dataKey="total_amount"
                            nameKey="status"
                            innerRadius={55}
                            outerRadius={80}
                            strokeWidth={10}
                            activeIndex={1}
                            activeShape={({
                                outerRadius = 0,
                                ...props
                            }) => (
                                <g>
                                    <Sector {...props} outerRadius={outerRadius + 6} />
                                    <Sector
                                        {...props}
                                        outerRadius={outerRadius + 12}
                                        innerRadius={outerRadius + 8}
                                    />
                                </g>
                            )}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {data[1].total_amount.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground text-[10px]"
                                                >
                                                    Lejárt számlák
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />

                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent >
        </Card >
    )
}

export default PieChartComponent