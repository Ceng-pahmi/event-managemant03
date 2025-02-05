'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TransactionList } from '@/components/TransactionList';
import { MainNavToken } from '@/components/main-nav-after-token';

type Transaction = {
  id: number;
  eventName: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'refunded';
  customerName: string;
  customerEmail: string;
};

export default function TransactionsPage() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get('filter') || 'all');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'date');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          'http://localhost:5000/api/events/transactions',
        );
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data = await response.json();
        setTransactions(data.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  return (
    <div>
      <MainNavToken onSearch={function (searchTerm: string): void {
        throw new Error('Function not implemented.');
      } } />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Transactions</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search transactions..."
                value={search}
                onChange={handleSearchChange}
              />
            </div>
            <div>
              <Label htmlFor="filter">Filter</Label>
              <Select value={filter} onValueChange={handleFilterChange}>
                <SelectTrigger id="filter">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sort">Sort By</Label>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger id="sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        {isLoading ? (
          <div className="text-center">Loading transactions...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <TransactionList
            transactions={transactions}
            filter={filter}
            search={search}
            sortBy={sortBy}
          />
        )}
      </div>
    </div>
  );
}
