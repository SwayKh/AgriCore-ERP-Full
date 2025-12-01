import * as React from 'react';
import { useState } from 'react';
import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';

export default function CategoryDialog({ open, onClose, onSave }) {
    const [newCategory, setNewCategory] = useState({ categoryName: '', unit: '' });

    const handleNewCategoryChange = (e) => {
        setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(newCategory);
        onClose(); // Close the dialog after saving
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="categoryName"
                    label="Category Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={newCategory.categoryName}
                    onChange={handleNewCategoryChange}
                />
                <TextField
                    margin="dense"
                    name="unit"
                    label="Unit"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={newCategory.unit}
                    onChange={handleNewCategoryChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}
