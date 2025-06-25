import React from 'react';
import ReminderCard from '../../../components/reminders/ReminderCard/ReminderCard.jsx';
import {Grid} from "@mui/material";

const ProductsGrid = ({reminders, onDone}) => {
    return (
        <Grid container spacing={{xs: 2, md: 3}}>
            {reminders.map((reminder) => (
                <Grid key={reminder.id} size={{xs: 12, sm: 12, md: 12, lg: 12}}>
                    <ReminderCard reminder={reminder} onDone={onDone}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductsGrid;
