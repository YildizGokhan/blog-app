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
    return (
      <List sx={{ borderRadius: "8px", marginLeft: "6px", marginTop: "12px" }}>
        {blogList.map((blog) => (
          <React.Fragment key={blog?._id}>
            <ListItem alignItems="flex-start" sx={{ padding: '8px' }}>
              <Link to={`/detail/${blog?._id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <ListItemAvatar>
                  <Avatar
                    alt={blog?.title}
                    src={blog?.image}
                    sx={{ width: '60px', height: '70px', borderRadius: '8px', marginRight: '10px' }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={blog?.title}
                  sx={{ color: "black" }}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Görüntülenme Sayısı: {blog?.countOfVisitors}
                      </Typography>
                      <span>
                        {`  ${new Date(blog?.createdAt).toLocaleString('tr-TR')}`}
                      </span>
                    </>
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
  
