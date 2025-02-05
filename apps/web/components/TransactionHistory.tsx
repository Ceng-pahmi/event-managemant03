"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Transaction = {
  id: string
  eventName: string
  date: string
  amount: number
  status: "completed" | "pending" | "refunded"
}

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    // Fetch transaction data from API
    // This is a mock implementation
    const mockTransactions: Transaction[] = [
      { id: "1", eventName: "Summer Music Festival", date: "2023-07-15", amount: 250000, status: "completed" },
      { id: "2", eventName: "Tech Conference 2023", date: "2023-07-16", amount: 500000, status: "completed" },
      { id: "3", eventName: "Food and Wine Expo", date: "2023-07-17", amount: 150000, status: "pending" },
      { id: "4", eventName: "Art Gallery Opening", date: "2023-07-18", amount: 100000, status: "refunded" },
      { id: "5", eventName: "Startup Pitch Night", date: "2023-07-19", amount: 75000, status: "completed" },
    ]
    setTransactions(mockTransactions)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.eventName}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>IDR {transaction.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${
                      transaction.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : transaction.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

