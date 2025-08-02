import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Folder, FolderPlus } from "lucide-react";
import { FolderData } from "./FolderManager";
import { useToast } from "@/hooks/use-toast";

interface AddToFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  folders: FolderData[];
  imageName: string;
  onAddToFolder: (folderId: string) => void;
  onCreateFolder: (name: string) => string;
}

export const AddToFolderModal: React.FC<AddToFolderModalProps> = ({
  isOpen,
  onClose,
  folders,
  imageName,
  onAddToFolder,
  onCreateFolder,
}) => {
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const { toast } = useToast();

  const handleCreateAndAdd = () => {
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

    const newFolderId = onCreateFolder(trimmedName);
    onAddToFolder(newFolderId);
    setNewFolderName("");
    setShowCreateNew(false);
    onClose();
    toast({
      title: "Image added",
      description: `"${imageName}" added to "${trimmedName}"`,
    });
  };

  const handleAddToExisting = (folderId: string) => {
    const folder = folders.find(f => f.id === folderId);
    if (folder?.images.includes(imageName)) {
      toast({
        title: "Already exists",
        description: `"${imageName}" is already in "${folder.name}"`,
        variant: "destructive",
      });
      return;
    }

    onAddToFolder(folderId);
    onClose();
    toast({
      title: "Image added",
      description: `"${imageName}" added to "${folder?.name}"`,
    });
  };

  const resetAndClose = () => {
    setShowCreateNew(false);
    setNewFolderName("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Folder</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Add "{imageName}" to a folder
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {showCreateNew ? (
            <div className="space-y-3">
              <Label htmlFor="new-folder">Create New Folder</Label>
              <Input
                id="new-folder"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Enter folder name..."
                maxLength={50}
                onKeyDown={(e) => e.key === "Enter" && handleCreateAndAdd()}
                autoFocus
              />
              <div className="flex gap-2">
                <Button onClick={handleCreateAndAdd} className="flex-1">
                  Create & Add
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateNew(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label>Select Existing Folder</Label>
                {folders.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No folders available
                  </p>
                ) : (
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {folders.map((folder) => (
                      <div
                        key={folder.id}
                        className="folder-item cursor-pointer"
                        onClick={() => handleAddToExisting(folder.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Folder className="h-4 w-4 text-primary" />
                            <span className="font-medium">{folder.name}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {folder.images.length}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                onClick={() => setShowCreateNew(true)}
                className="w-full"
              >
                <FolderPlus className="h-4 w-4 mr-2" />
                Create New Folder
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};