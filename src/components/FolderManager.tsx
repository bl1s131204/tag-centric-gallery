import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Folder, FolderPlus, Trash2, Edit3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface FolderData {
  id: string;
  name: string;
  images: string[];
  createdAt: number;
}

interface FolderManagerProps {
  folders: FolderData[];
  onCreateFolder: (name: string) => void;
  onDeleteFolder: (id: string) => void;
  onRenameFolder: (id: string, newName: string) => void;
  onSelectFolder: (folder: FolderData) => void;
}

export const FolderManager: React.FC<FolderManagerProps> = ({
  folders,
  onCreateFolder,
  onDeleteFolder,
  onRenameFolder,
  onSelectFolder,
}) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [editingFolder, setEditingFolder] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const { toast } = useToast();

  const handleCreateFolder = () => {
    const trimmedName = newFolderName.trim();
    if (!trimmedName) {
      toast({
        title: "Invalid name",
        description: "Folder name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (folders.some(f => f.name.toLowerCase() === trimmedName.toLowerCase())) {
      toast({
        title: "Duplicate name",
        description: "A folder with this name already exists",
        variant: "destructive",
      });
      return;
    }

    onCreateFolder(trimmedName);
    setNewFolderName("");
    setIsCreateOpen(false);
    toast({
      title: "Folder created",
      description: `"${trimmedName}" has been created`,
    });
  };

  const handleRename = (folderId: string) => {
    const trimmedName = editName.trim();
    if (!trimmedName) {
      toast({
        title: "Invalid name", 
        description: "Folder name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (folders.some(f => f.id !== folderId && f.name.toLowerCase() === trimmedName.toLowerCase())) {
      toast({
        title: "Duplicate name",
        description: "A folder with this name already exists",
        variant: "destructive",
      });
      return;
    }

    onRenameFolder(folderId, trimmedName);
    setEditingFolder(null);
    setEditName("");
    toast({
      title: "Folder renamed",
      description: `Folder renamed to "${trimmedName}"`,
    });
  };

  const handleDelete = (folder: FolderData) => {
    if (window.confirm(`Are you sure you want to delete "${folder.name}"? This action cannot be undone.`)) {
      onDeleteFolder(folder.id);
      toast({
        title: "Folder deleted",
        description: `"${folder.name}" has been deleted`,
      });
    }
  };

  const startEdit = (folder: FolderData) => {
    setEditingFolder(folder.id);
    setEditName(folder.name);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">My Folders</h3>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <FolderPlus className="h-4 w-4 mr-2" />
              New Folder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="folder-name">Folder Name</Label>
                <Input
                  id="folder-name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Enter folder name..."
                  maxLength={50}
                  onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateFolder}>Create</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3">
        {folders.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Folder className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No folders yet. Create your first folder to organize images.</p>
          </div>
        ) : (
          folders.map((folder) => (
            <div key={folder.id} className="folder-item group">
              <div className="flex items-center justify-between">
                <div 
                  className="flex items-center gap-3 flex-1 cursor-pointer"
                  onClick={() => onSelectFolder(folder)}
                >
                  <Folder className="h-5 w-5 text-primary" />
                  {editingFolder === folder.id ? (
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRename(folder.id);
                        if (e.key === "Escape") {
                          setEditingFolder(null);
                          setEditName("");
                        }
                      }}
                      onBlur={() => handleRename(folder.id)}
                      className="h-8 text-sm"
                      autoFocus
                    />
                  ) : (
                    <div className="flex-1">
                      <div className="font-medium">{folder.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {folder.images.length} image{folder.images.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {folder.images.length}
                  </Badge>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => startEdit(folder)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDelete(folder)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};