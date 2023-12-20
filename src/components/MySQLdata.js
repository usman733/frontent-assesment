import { useState } from "react";
import { LineChart, XAxis, YAxis, Line, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import { ConnectionAndData } from "../services/api.service";
export default function MySQLdata() {

    const [search, setSearch] = useState(false);
    const [records, setRecords] = useState([]);
    const [credentialQuery, setCredentialsQuery] = useState({
        host: '',
        username: '',
        password: '',
        database: '',
        query: ''
    })

    const handleChange = (e) => {
        setCredentialsQuery({
            ...credentialQuery,
            [e.target.name]: e.target.value,
        })
    }

    const handleSearch = async () => {
        setSearch(true);

        if (credentialQuery.database && credentialQuery.host && credentialQuery.query && credentialQuery.username) {
            const res = await ConnectionAndData(credentialQuery);
            setRecords(res.data);
        }
    }


    return (
        <>
            <label className="my-sql-lbl">MySQL Data</label>

            <div className="my-sql">
                <div>
                    <input style={{ borderColor: `${search && !credentialQuery.host ? 'red' : 'black'}` }} type="text" placeholder="MySQL Host" name="host" onChange={handleChange} />
                    <input style={{ borderColor: `${search && !credentialQuery.username ? 'red' : 'black'}` }} type="text" placeholder="MySQL Username" name="username" onChange={handleChange} />
                </div>
                <div>
                    <input style={{ borderColor: `${search && !credentialQuery.database ? 'red' : 'black'}` }} type="text" placeholder="MySQL Database" name="database" onChange={handleChange} />
                    <input type="password" placeholder="MySQL Password" name="password" onChange={handleChange} />
                </div>
            </div>

            <label className="my-sql-lbl">MySQL Query</label>

            <div className="mysql-query">
                <div>
                    <textarea style={{ borderColor: `${search && !credentialQuery.query ? 'red' : 'black'}` }} type="text" name="query" onChange={handleChange}
                        placeholder="SELECT * from database.table;
                    OR
                SELECT
                MONTH(SaleDate) AS SaleMonth, COUNT(SaleID) AS TotalSalesCount, SUM(Quantity) AS Total QuantitySold, AVG(Quantity) AS AverageQuantity PerSale
                FROM database.Sales
                WHERE YEAR(SaleDate) = YEAR(CURRENT_DATE - INTERVAL 1 YEAR)
                GROUP BY MONTH(SaleDate)
                ORDER BY MONTH(SaleDate);" />
                </div>

                <button onClick={handleSearch}>Search</button>
            </div>
            <LineChart
                className="mysql-chart"
                width={900}
                height={500}
                data={records}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="quantity" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="price" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>

        </>
    );
}




