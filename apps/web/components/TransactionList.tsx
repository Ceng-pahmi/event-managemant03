'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

type Transaction = {
  id: number;
  eventName: string;
  date: string;
  amount?: number; // Make amount optional to handle undefined values
  status?: 'completed' | 'pending' | 'refunded'; // Make status optional to handle undefined values
  customerName: string;
  customerEmail: string;
};

type TransactionListProps = {
  filter: string;
  search: string;
  sortBy: string;
  transactions: Transaction[];
};

export function TransactionList({
  filter,
  search,
  sortBy,
  transactions,
}: TransactionListProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/events/transactions',
        );
        const data = await response.json();
        if (response.ok) {
          setTransactionsList(data.data);
        } else {
          throw new Error(data.error);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div>Error: {error}</div>;

  let filteredTransactions = transactions.filter(Boolean);
  if (filter !== 'all') {
    filteredTransactions = filteredTransactions.filter(
      (t: Transaction) => t.status === filter,
    );
  }
  if (search) {
    filteredTransactions = filteredTransactions.filter(
      (t: Transaction) =>
        t.eventName.toLowerCase().includes(search.toLowerCase()) ||
        t.customerName.toLowerCase().includes(search.toLowerCase()) ||
        t.customerEmail.toLowerCase().includes(search.toLowerCase()),
    );
  }

  filteredTransactions.sort((a: Transaction, b: Transaction) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (
      sortBy === 'amount' &&
      a.amount !== undefined &&
      b.amount !== undefined
    ) {
      return b.amount - a.amount;
    } else if (
      sortBy === 'status' &&
      a.status !== undefined &&
      b.status !== undefined
    ) {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Event Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredTransactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.eventName}</TableCell>
            <TableCell>{transaction.date.split('T')[0]}</TableCell>
            <TableCell>
              {transaction.amount ? transaction.amount.toLocaleString() : 'N/A'}{` pcs`}
            </TableCell>
            <TableCell>
              {transaction.status ? (
                <Badge
                  variant={
                    transaction.status === 'completed'
                      ? 'default'
                      : transaction.status === 'pending'
                        ? 'secondary'
                        : 'destructive'
                  }
                >
                  {transaction.status.charAt(0).toUpperCase() +
                    transaction.status.slice(1)}
                </Badge>
              ) : (
                'N/A'
              )}
            </TableCell>
            <TableCell>{transaction.customerName}</TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Transaction Details</DialogTitle>
                    <DialogDescription>
                      Transaction ID: {transaction.id}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Event</Label>
                      <div className="col-span-3">{transaction.eventName}</div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Date</Label>
                      <div className="col-span-3">
                        {transaction.date.split('T')[0]}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Amount</Label>
                      <div className="col-span-3">
                        {transaction.amount
                          ? transaction.amount.toLocaleString()
                          : 'N/A'}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Status</Label>
                      <div className="col-span-3">
                        {transaction.status ? (
                          <Badge
                            variant={
                              transaction.status === 'completed'
                                ? 'default'
                                : transaction.status === 'pending'
                                  ? 'secondary'
                                  : 'destructive'
                            }
                          >
                            {transaction.status.charAt(0).toUpperCase() +
                              transaction.status.slice(1)}
                          </Badge>
                        ) : (
                          'N/A'
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Customer</Label>
                      <div className="col-span-3">
                        {transaction.customerName}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Email</Label>
                      <div className="col-span-3">
                        {transaction.customerEmail}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
