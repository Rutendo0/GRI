"use client"

import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings, Lock, Unlock, Shield, Loader2 } from "lucide-react";

export function AdminToggle() {
  const { isAdmin, toggleAdmin, setAdmin } = useAdmin();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLogin = async () => {
    // For demo purposes, use a simple password check
    // In production, this should call your API
    if (password === "admin123") {
      setAdmin(true);
      setShowPasswordDialog(false);
      setPassword("");
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  const handleAdminLogout = () => {
    setAdmin(false);
    setPassword("");
    setError("");
  };

  if (isAdmin) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="destructive" className="flex items-center gap-1">
          <Shield className="w-3 h-3" />
          Admin Mode
        </Badge>
        <Button variant="outline" size="sm" onClick={handleAdminLogout}>
          Exit Admin
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Admin Access</DialogTitle>
          <DialogDescription>
            Enter the admin password to access editing features.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAdminLogin();
                }
              }}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowPasswordDialog(false);
                setPassword("");
                setError("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAdminLogin} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}