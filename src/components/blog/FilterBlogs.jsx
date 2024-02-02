import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useSelector } from 'react-redux';
import { Stack, Typography, Divider, ListItemText, Avatar, ListItemAvatar, ListItem, List } from '@mui/material';
import { Link } from 'react-router-dom';

export default function FilterBlogs({ categories }) {
    const { bloglist } = useSelector(state => state.blog);
    const [selectedValue, setSelectedValue] = React.useState(null);

   
    const filteredAndSortedBlogList = bloglist
        .filter(blog => !selectedValue || selectedValue?._id === blog.categoryId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <Stack sx={{marginRight: 2,marginLeft: 2, borderRadius: "8px"}}>
            <Autocomplete
                id="highlights-demo"               
                options={categories}
                getOptionLabel={(category) => category.name}
                value={selectedValue}
                onChange={(event, newValue) => {
                    setSelectedValue(newValue);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Select Blog's Category" margin="normal" />
                )}
                renderOption={(props, category, { inputValue }) => {
                    const matches = match(category.name, inputValue, { insideWords: true });
                    const parts = parse(category.name, matches);

                    return (
                        <li {...props}>
                            <Stack>
                                <Typography variant="h6">{category.name}</Typography>
                            </Stack>
                        </li>
                    );
                }}
            />
            <Stack >
            <Typography variant='h6' textAlign={"center"} sx={{fontFamily: "monospace", fontSize: "1.2rem"}}>Latest Published Blog</Typography>
                <List sx={{ width: '100%',   borderRadius: "8px", marginLeft: "6px", marginTop: "12px" }} >
                    {filteredAndSortedBlogList.map((blog) => (
                        <React.Fragment key={blog._id}>
                            <ListItem alignItems="flex-start" sx={{ padding: '8px' }}>
                                <Link to={`/detail/${blog._id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={blog.title}
                                            src={blog.image}
                                            sx={{ width: '60px', height: '70px', borderRadius: '8px', marginRight: '10px' }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={blog.title}
                                        sx={{ color: "black" }}
                                        secondary={
                                            <Stack>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    Görüntülenme Sayısı: {blog.countOfVisitors}
                                                </Typography>
                                                {`  ${new Date(blog.createdAt).toLocaleString('tr-TR')}`}
                                            </Stack>
                                        }
                                    />
                                </Link>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))}
                </List>
            </Stack>
        </Stack>
    );
}
