import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, IconButton, Menu, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import useBlogCalls from '../../hooks/useBlogCalls';
import { ListItemDecorator, Textarea } from '@mui/joy';
import { Check, FormatBold, FormatItalic, KeyboardArrowDown } from '@mui/icons-material';

export default function CommentUpdateModal({ open, handleClose, commentId }) {
  const { detail, comment } = useSelector(state => state.blog);
  const { _id } = useSelector(state => state.auth);
  const { putComment, getDetailBlogs, getSingleComments } = useBlogCalls()
  const [italic, setItalic] = useState(false);
  const [fontWeight, setFontWeight] = useState('normal');
  const [anchorEl, setAnchorEl] = useState(null);

  const [commentData, setCommentData] = useState({
    blogId: comment?.blogId,
    comment: comment.comment,
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= 500) {
      setCommentData((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (commentId) {
      getSingleComments(comment._id);
      getDetailBlogs(detail._id)
      setCommentData((prevInfo) => ({
        ...prevInfo,
        comment: comment.comment,
      }));
    }
  }, [comment?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await putComment(comment?._id, commentData);
    getDetailBlogs(detail?._id);
    handleClose()
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <FormControl
          component="form"
          onSubmit={handleSubmit}
          sx={{
            margin: 'auto',
            mt: "20%",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <FormLabel sx={{ color: "##000010", mt: 2, mx: 2, fontSize: "20px" }}>Your comment</FormLabel>
          <Textarea
            placeholder="Type something here in 500 characters"
            minRows={3}
            onChange={handleChange}
            name="comment"
            value={commentData.comment}
            endDecorator={
              <Box
                sx={{
                  display: 'flex',
                  gap: 'var(--Textarea-paddingBlock)',
                  pt: 'var(--Textarea-paddingBlock)',
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  flex: 'auto',
                  maxHeight: '150px',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                }}
              >
                <IconButton
                  variant="plain"
                  color="neutral"
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                >
                  <FormatBold />
                  <KeyboardArrowDown fontSize="md" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  size="sm"
                  placement="bottom-start"
                  sx={{ '--ListItemDecorator-size': '24px' }}
                >
                  {['200', 'normal', 'bold'].map((weight) => (
                    <MenuItem
                      key={weight}
                      selected={fontWeight === weight}
                      onClick={() => {
                        setFontWeight(weight);
                        setAnchorEl(null);
                      }}
                      sx={{ fontWeight: weight }}
                    >
                      <ListItemDecorator>
                        {fontWeight === weight && <Check fontSize="sm" />}
                      </ListItemDecorator>
                      {weight === '200' ? 'lighter' : weight}
                    </MenuItem>
                  ))}
                </Menu>
                <IconButton
                  variant={italic ? 'soft' : 'plain'}
                  color={italic ? 'primary' : 'neutral'}
                  aria-pressed={italic}
                  onClick={() => setItalic((bool) => !bool)}
                >
                  <FormatItalic />
                </IconButton>
                <Button type="submit" sx={{ ml: 'auto', px: 8 }}>
                  Update
                </Button>
              </Box>
            }
            sx={{
              minWidth: 300,
              fontWeight,
              fontStyle: italic ? 'italic' : 'initial',
              maxHeight: '250px',
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          />
        </FormControl>
      </Modal>
    </div>
  );
}
