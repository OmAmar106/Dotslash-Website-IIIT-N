import { useState, useEffect, useCallback, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { ExternalLink, Save, Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    codeforces: '',
    leetcode: '',
    codechef: '',
    atcoder: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Reset form data when dialog opens
  useEffect(() => {
    if (open && user) {
      setFormData({
        name: user.name || '',
        codeforces: user.connectedAccounts?.codeforces || '',
        leetcode: user.connectedAccounts?.leetcode || '',
        codechef: user.connectedAccounts?.codechef || '',
        atcoder: user.connectedAccounts?.atcoder || '',
      });
      setIsSubmitting(false);
    }
  }, [open, user]);

  // Cleanup when dialog closes
  useEffect(() => {
    if (!open) {
      // Reset states after a short delay to ensure proper cleanup
      const timer = setTimeout(() => {
        setIsSubmitting(false);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSave = useCallback(async () => {
    if (!user || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      updateProfile({
        name: formData.name,
        connectedAccounts: {
          codeforces: formData.codeforces,
          leetcode: formData.leetcode,
          codechef: formData.codechef,
          atcoder: formData.atcoder,
        },
      });
      
      // Close dialog after successful update
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [user, formData, updateProfile, onOpenChange, isSubmitting]);

  const handleCancel = useCallback(() => {
    if (isSubmitting) return;
    
    // Reset form data to original values
    if (user) {
      setFormData({
        name: user.name || '',
        codeforces: user.connectedAccounts?.codeforces || '',
        leetcode: user.connectedAccounts?.leetcode || '',
        codechef: user.connectedAccounts?.codechef || '',
        atcoder: user.connectedAccounts?.atcoder || '',
      });
    }
    
    // Close dialog
    onOpenChange(false);
  }, [user, onOpenChange, isSubmitting]);

  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (isSubmitting) return;
    
    // Force cleanup if closing
    if (!newOpen) {
      setIsSubmitting(false);
    }
    
    onOpenChange(newOpen);
  }, [onOpenChange, isSubmitting]);

  // Prevent rendering if no user
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent 
        ref={dialogRef}
        className="max-w-2xl max-h-[80vh] overflow-y-auto"
        onPointerDownOutside={(e) => {
          if (isSubmitting) {
            e.preventDefault();
            return;
          }
        }}
        onEscapeKeyDown={(e) => {
          if (isSubmitting) {
            e.preventDefault();
            return;
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
          <DialogDescription>
            Manage your profile information and connected accounts.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            {/* Profile Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={user.email} disabled />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dotslash Membership</p>
                    <p className="text-sm text-muted-foreground">
                      Your membership status in the coding community
                    </p>
                  </div>
                  <Badge variant={user.isDotslashMember ? "default" : "secondary"}>
                    {user.isDotslashMember ? "Active Member" : "Not a Member"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Connected Accounts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Connected Accounts</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Link your competitive programming profiles
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {/* Codeforces */}
                  <div className="flex items-end gap-3">
                    <div className="flex-1">
                      <Label htmlFor="codeforces" className="flex items-center gap-2">
                        Codeforces
                        <ExternalLink className="h-3 w-3" />
                      </Label>
                      <Input
                        id="codeforces"
                        placeholder="Username"
                        value={formData.codeforces}
                        onChange={(e) => handleInputChange('codeforces', e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    {formData.codeforces && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(`https://codeforces.com/profile/${formData.codeforces}`, '_blank')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verify
                      </Button>
                    )}
                  </div>
                  
                  {/* LeetCode */}
                  <div className="flex items-end gap-3">
                    <div className="flex-1">
                      <Label htmlFor="leetcode" className="flex items-center gap-2">
                        LeetCode
                        <ExternalLink className="h-3 w-3" />
                      </Label>
                      <Input
                        id="leetcode"
                        placeholder="Username"
                        value={formData.leetcode}
                        onChange={(e) => handleInputChange('leetcode', e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    {formData.leetcode && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(`https://leetcode.com/u/${formData.leetcode}`, '_blank')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verify
                      </Button>
                    )}
                  </div>
                  
                  {/* CodeChef */}
                  <div className="flex items-end gap-3">
                    <div className="flex-1">
                      <Label htmlFor="codechef" className="flex items-center gap-2">
                        CodeChef
                        <ExternalLink className="h-3 w-3" />
                      </Label>
                      <Input
                        id="codechef"
                        placeholder="Username"
                        value={formData.codechef}
                        onChange={(e) => handleInputChange('codechef', e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    {formData.codechef && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(`https://codechef.com/users/${formData.codechef}`, '_blank')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verify
                      </Button>
                    )}
                  </div>
                  
                  {/* AtCoder */}
                  <div className="flex items-end gap-3">
                    <div className="flex-1">
                      <Label htmlFor="atcoder" className="flex items-center gap-2">
                        AtCoder
                        <ExternalLink className="h-3 w-3" />
                      </Label>
                      <Input
                        id="atcoder"
                        placeholder="Username"
                        value={formData.atcoder}
                        onChange={(e) => handleInputChange('atcoder', e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    {formData.atcoder && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(`https://atcoder.jp/users/${formData.atcoder}`, '_blank')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verify
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Separator />

            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={handleCancel}
                disabled={isSubmitting}
                type="button"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                disabled={isSubmitting}
                type="button"
              >
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            {/* Password Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Password Settings
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Update your password to keep your account secure
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPasswords.current ? "text" : "password"}
                      placeholder="Enter current password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      disabled={isSubmitting}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                    >
                      {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPasswords.new ? "text" : "password"}
                      placeholder="Enter new password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      disabled={isSubmitting}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                    >
                      {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPasswords.confirm ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      disabled={isSubmitting}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                    >
                      {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={() => {
                    // Handle password change
                    console.log('Password change requested');
                  }}
                  disabled={!passwordData.currentPassword || !passwordData.newPassword || passwordData.newPassword !== passwordData.confirmPassword}
                >
                  Update Password
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}