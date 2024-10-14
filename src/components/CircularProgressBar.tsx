import { PieChart, Pie, Cell } from "recharts";
import { defaultColor } from "../../color";

interface CircularProgressBarProps {
    progress: number;
}


const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ progress }) => {
    const data = [
        { name: "Completed", value: progress },
        { name: "Remaining", value: 100 - progress }
    ]

    const COLORS = [defaultColor.default, "#edf2f4"];
    return (
        <PieChart
            width={200}
            height={160}
            margin={{ top: -20, right: 0, bottom: 40, left: 0 }}
        >
            <Pie
                data={data}
                cx={100}
                cy={100}
                startAngle={180}
                endAngle={-180}
                innerRadius={67}
                outerRadius={progress === 100 ? 80 : 78}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
                stroke="none"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index%COLORS.length]} />
                    ))}
            </Pie>
        </PieChart>
    )
}

export default CircularProgressBar