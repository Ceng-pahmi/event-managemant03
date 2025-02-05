'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { MainNavToken } from '@/components/main-nav-after-token';
import Cookies from 'js-cookie';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isOrganizerMode, setIsOrganizerMode] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token');
      const url = 'http://localhost:5000/api/users/user';

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data.data);
        setIsOrganizerMode(data.data.role === 'EventOrganizer');
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (user) {
      const updatedUser = {
        ...user,
        role: isOrganizerMode ? 'EventOrganizer' : 'User',
      };
      setUser(updatedUser);
      localStorage.setItem('userRole', updatedUser.role);
    }
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser: any) => (prevUser ? { ...prevUser, [name]: value } : null));
  };

  const handleOrganizerModeToggle = (checked: boolean) => {
    setIsOrganizerMode(checked);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNavToken onSearch={function (searchTerm: string): void {
        throw new Error('Function not implemented.');
      } } />
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-20 w-20">
              {user.avatarUrl ? (
                <AvatarImage src={user.avatarUrl} alt={user.name} />
              ) : (
                <AvatarFallback>
                  {user.name ? user.name.charAt(0) : 'N/A'}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">
                {user.first_name + ' ' + user.last_name || 'N/A'}
              </h2>
              <p className="text-gray-500">{user.email || 'N/A'}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={user.first_name + ' ' + user.last_name || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={user.email || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>Role</Label>
              <Input
                value={user.role === 'User' ? 'User' : 'Event Organizer'}
                disabled
              />
            </div>
            <div>
              <Label>Points</Label>
              <Input
                value={
                  user.points !== undefined ? user.points.toLocaleString() : '0'
                }
                disabled
              />
            </div>
            <div>
              <Label>Referral Code</Label>
              <Input value={user.referral_code || ''} disabled />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="organizer-mode"
                checked={isOrganizerMode}
                onCheckedChange={handleOrganizerModeToggle}
                disabled={!isEditing}
              />
              <Label htmlFor="organizer-mode">
                Enable Event Organizer Mode
              </Label>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            {isEditing ? (
              <Button onClick={handleSave}>Save Changes</Button>
            ) : (
              <Button onClick={handleEdit}>Edit Profile</Button>
            )}
            {user.role === 'EventOrganizer' && (
              <Button onClick={() => router.push('/dashboard')}>
                Go to Dashboard
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}