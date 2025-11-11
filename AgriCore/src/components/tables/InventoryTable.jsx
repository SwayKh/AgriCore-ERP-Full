import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton,
    Select, MenuItem, FormControl, InputLabel, Box, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const initialInventory = [
    { id: 1, name: 'Carrot Seeds', quantity: 100, price: 10, category: 'Seeds', seedVariety: 'Nantes', sowingSeason: 'Spring' },
    { id: 2, name: 'NPK Fertilizer', quantity: 50, price: 25, category: 'Fertilizers', composition: '10-10-10' },
    { id: 3, name: 'Neem Oil', quantity: 75, price: 15, category: 'Pesticides', toxicityLevel: 'Low' },
    { id: 4, name: 'Tomato Seeds', quantity: 120, price: 12, category: 'Seeds', seedVariety: 'Roma', sowingSeason: 'Spring' },
];

const categorySpecificFields = {
    'Seeds': [
        { name: 'seedVariety', label: 'Seed Variety', type: 'text' },
        { name: 'sowingSeason', label: 'Sowing Season', type: 'text' },
    ],
    'Fertilizers': [
        { name: 'composition', label: 'Composition', type: 'text' },
    ],
    'Pesticides': [
        { name: 'toxicityLevel', label: 'Toxicity Level', type: 'text' },
    ]
};

export default function InventoryTable() {
    const [inventory, setInventory] = useState(initialInventory);
    const [open, setOpen] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', quantity: '', price: '', category: '' });
    const [categories, setCategories] = useState(['Seeds', 'Fertilizers', 'Pesticides']);
    const [categoryUnits, setCategoryUnits] = useState({ Seeds: 'kg', Fertilizers: 'kg', Pesticides: 'l' });
    const [newCategory, setNewCategory] = useState('');
    const [newCategoryUnit, setNewCategoryUnit] = useState('');
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewItem({ name: '', quantity: '', price: '', category: '' });
    };

    const handleAddItem = () => {
        const newId = inventory.length > 0 ? Math.max(...inventory.map(item => item.id)) + 1 : 1;
        const itemToAdd = { ...newItem, id: newId };
        setInventory([...inventory, itemToAdd]);
        setNewItem({ name: '', quantity: '', price: '', category: '' });
        handleClose();
    };

    const handleDeleteItem = (id) => {
        setInventory(inventory.filter(item => item.id !== id));
    };

    const handleNewItemChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleAddCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setCategoryUnits({ ...categoryUnits, [newCategory]: newCategoryUnit });
            setNewCategory('');
            setNewCategoryUnit('');
        }
    };

    const groupedInventory = inventory.reduce((acc, item) => {
        const category = item.category || 'Uncategorized';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(item);
        return acc;
    }, {});

    return (
        <TableContainer component={Paper}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Add New Item
                </Button>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        label="New Category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        size="small"
                    />
                    <TextField
                        label="Unit"
                        value={newCategoryUnit}
                        onChange={(e) => setNewCategoryUnit(e.target.value)}
                        size="small"
                    />
                    <Button variant="contained" onClick={handleAddCategory}>Add Category</Button>
                </Box>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Inventory Item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Item Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newItem.name}
                        onChange={handleNewItemChange}
                    />
                    <TextField
                        margin="dense"
                        name="quantity"
                        label="Quantity"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={newItem.quantity}
                        onChange={handleNewItemChange}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={newItem.price}
                        onChange={handleNewItemChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Category</InputLabel>
                        <Select
                            name="category"
                            value={newItem.category}
                            onChange={handleNewItemChange}
                        >
                            {categories.map(cat => (
                                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {newItem.category && categorySpecificFields[newItem.category] && categorySpecificFields[newItem.category].map(field => (
                        <TextField
                            key={field.name}
                            margin="dense"
                            name={field.name}
                            label={field.label}
                            type={field.type}
                            fullWidth
                            variant="standard"
                            value={newItem[field.name] || ''}
                            onChange={handleNewItemChange}
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddItem}>Add</Button>
                </DialogActions>
            </Dialog>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price ($)</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(groupedInventory).map(category => (
                        <React.Fragment key={category}>
                            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                <TableCell colSpan={4} sx={{ fontWeight: 'bold' }}>
                                    <Typography variant="h6">{category}</Typography>
                                </TableCell>
                            </TableRow>
                            {groupedInventory[category].map((item) => (
                                <React.Fragment key={item.id}>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {item.name}
                                        </TableCell>
                                        <TableCell align="right">{item.quantity} {categoryUnits[item.category]}</TableCell>
                                        <TableCell align="right">{item.price}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => handleDeleteItem(item.id)} aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={`${item.id}-details`}>
                                        <TableCell colSpan={4}>
                                            {categorySpecificFields[item.category]?.map(field => (
                                                <Typography key={field.name} variant="body2" sx={{ pl: 2 }}>
                                                    <strong>{field.label}:</strong> {item[field.name]}
                                                </Typography>
                                            ))}
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
