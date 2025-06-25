import React from 'react';
import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const buttonColors = ['primary', 'secondary', 'success', 'warning', 'info', 'error'];

const CategoryScroller = ({ categories, onAddCategoryClick, onCategoryClick = () => {} }) => {
    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>My Categories:</Typography>
            <Box
                sx={{
                    overflowX: 'auto',
                    pb: 1,
                    '&::-webkit-scrollbar': {
                        height: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(0,0,0,.2)',
                        borderRadius: '4px',
                    }
                }}
            >
                <Stack direction="row" spacing={1.5}>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={onAddCategoryClick}
                        sx={{ flexShrink: 0}}
                    >
                        Category
                    </Button>

                    {categories.map((category, index) => (
                        <Button
                            key={category.id}
                            variant="contained"
                            color={buttonColors[index % buttonColors.length]}
                            onClick={() => onCategoryClick(category)}
                            sx={{ flexShrink: 0 }}
                        >
                            {category.name}
                        </Button>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
};

export default CategoryScroller;