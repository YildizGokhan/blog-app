import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';

export default function SideList({ blogList }) {
    console.log(blogList);

    return (
        <List sx={{ width: '100%',  bgcolor: '#FDFAF6', border: "2px solid #e1cfc0", borderRadius: "8px", marginLeft: "6px", marginTop: "12px" }} >
            {blogList.map((blog) => (
                <React.Fragment key={blog._id}>
                    <ListItem alignItems="flex-start" sx={{ padding: '8px' }}>
                        <Link to={`/detail/${blog._id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                            <ListItemAvatar>
                                <Avatar
                                    alt={blog.author}
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
    );
}
